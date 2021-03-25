/* eslint-disable no-unused-vars */
const { create, Client } = require('@open-wa/wa-automate')
const { color, options } = require('./tools')
const { ind, eng } = require('./message/text/lang/')
const { loader } = require('./function')
const { version, bugs } = require('./package.json')
const msgHandler = require('./message/index.js')
const figlet = require('figlet')
const canvas = require('discord-canvas')
const config = require('./config.json')
const ownerNumber = config.ownerBot
const fs = require('fs-extra')
const { groupLimit, memberLimit } = require('./database/bot/setting.json')

const start = (bocchi = new Client()) => {
    console.log(color(figlet.textSync('BocchiBot', 'Larry 3D'), 'cyan'))
    console.log(color('=> Bot successfully loaded! Database:', 'yellow'), color(loader.getAllDirFiles('./database').length), color('Library:', 'yellow'), color(loader.getAllDirFiles('./lib').length), color('Function:', 'yellow'), color(loader.getAllDirFiles('./function').length))
    console.log(color('=> Source code version:', 'yellow'), color(version))
    console.log(color('=> Bugs? Errores? Preguntas? Entre aqui:', 'yellow'), color(bugs.url))
    console.log(color('[BOCCHI]'), color('WaifuBot esta ahora online!', 'yellow'))
    console.log(color('[DEV]', 'cyan'), color('Bienvenido de vuelta Orumaito', 'magenta'))

    // Uncomment code di bawah untuk mengaktifkan auto-update file changes. Tidak disarankan untuk long-time use.
    // loader.nocache('../message/index.js', (m) => console.log(color('[WATCH]', 'orange'), color(`=> '${m}'`, 'yellow'), 'file is updated!'))

    bocchi.onStateChanged((state) => {
        console.log(color('[BOCCHI]'), state)
        if (state === 'UNPAIRED' || state === 'CONFLICT' || state === 'UNLAUNCHED') bocchi.forceRefocus()
    })

    bocchi.onAddedToGroup(async (chat) => {
        const gc = await bocchi.getAllGroups()
        console.log(color('[BOCCHI]'), 'Added to a new group. Name:', color(chat.contact.name, 'yellow'), 'Total members:', color(chat.groupMetadata.participants.length, 'yellow'))
        if (chat.groupMetadata.participants.includes(ownerNumber)) {
            await bocchi.sendText(chat.id, ind.addedGroup(chat))
        } else if (gc.length > groupLimit) {
            await bocchi.sendText(chat.id, `Grupos máximos alcanzados!\n\nEstado actual: ${gc.length}/${groupLimit}`)
            await bocchi.deleteChat(chat.id)
            await bocchi.leaveGroup(chat.id)
        } else if (chat.groupMetadata.participants.length < memberLimit) {
            await bocchi.sendText(chat.id, `Necesito al menos ${memberLimit} miembro(s) en el gupo!`)
            await bocchi.deleteChat(chat.id)
            await bocchi.leaveGroup(chat.id)
        } else {
            await bocchi.sendText(chat.id, ind.addedGroup(chat))
        }
    })

    bocchi.onMessage((message) => {
        // Uncomment code di bawah untuk mengaktifkan auto-delete cache pesan.
        /*
        bocchi.getAmountOfLoadedMessages()
            .then((msg) => {
                if (msg >= 1000) {
                    console.log(color('[BOCCHI]'), color(`Loaded message reach ${msg}, cuting message cache...`, 'yellow'))
                    bocchi.cutMsgCache()
                    console.log(color('[BOCCHI]'), color('Cache deleted!', 'yellow'))
                }
            })
        */
        
        // Comment code msgHandler di bawah untuk mengaktifkan auto-update. Kemudian, uncomment code require di bawah msgHandler.
        msgHandler(bocchi, message)
        // require('./message/index.js')(bocchi, message)
    })

    bocchi.onIncomingCall(async (callData) => {
        await bocchi.sendText(callData.peerJid, ind.blocked(ownerNumber))
        await bocchi.contactBlock(callData.peerJid)
        console.log(color('[BLOCK]', 'red'), color(`${callData.peerJid} has been blocked.`, 'yellow'))
    })

    bocchi.onGlobalParticipantsChanged(async (event) => {
        const _welcome = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
        const isWelcome = _welcome.includes(event.chat)
        const gcChat = await bocchi.getChatById(event.chat)
        const pcChat = await bocchi.getContact(event.who)
        let { pushname, verifiedName, formattedName } = pcChat
        pushname = pushname || verifiedName || formattedName
        const { name, groupMetadata } = gcChat
        const botNumbers = await bocchi.getHostNumber() + '@c.us'
        try {
            if (event.action === 'add' && event.who !== botNumbers && isWelcome) {
                const pic = await bocchi.getProfilePicFromServer(event.who)
                if (pic === undefined) {
                    var picx = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                } else {
                    picx = pic
                }
                const welcomer = await new canvas.Welcome()
                    .setUsername(pushname)
                    .setDiscriminator(event.who.substring(6, 10))
                    .setMemberCount(groupMetadata.participants.length)
                    .setGuildName(name)
                    .setAvatar(picx)
                    .setColor('border', '#00100C')
                    .setColor('username-box', '#00100C')
                    .setColor('discriminator-box', '#00100C')
                    .setColor('message-box', '#00100C')
                    .setColor('title', '#00FFFF')
                    .setBackground('https://www.photohdx.com/images/2016/05/red-blurry-background.jpg')
                    .toAttachment()
                const base64 = `data:image/png;base64,${welcomer.toBuffer().toString('base64')}`
                await bocchi.sendFile(event.chat, base64, 'welcome.png', `Bienvenido! ${pushname}! •Soy Waifubot, un bot de respuestas automaticas el cual te ayudara con diferentes opciones\n\n• Disfruta tu estancia en el grupo\n\n• No olvides registrate en mi sistema para usar mis comandos usando:\n\n• *-registrar* nombre  edad\n\n• Ejemplo: *-registrar* Alex  20\n\n• Si tienes dudas pregunta a los administradores del grupo\n\n• *NO me mandes privado*`)
            } else if (event.action === 'remove' && event.who !== botNumbers && isWelcome) {
                const pic = await bocchi.getProfilePicFromServer(event.who)
                if (pic === undefined) {
                    var picxs = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                } else {
                    picxs = pic
                }
                const bye = await new canvas.Goodbye()
                    .setUsername(pushname)
                    .setDiscriminator(event.who.substring(6, 10))
                    .setMemberCount(groupMetadata.participants.length)
                    .setGuildName(name)
                    .setAvatar(picxs)
                    .setColor('border', '#00100C')
                    .setColor('username-box', '#00100C')
                    .setColor('discriminator-box', '#00100C')
                    .setColor('message-box', '#00100C')
                    .setColor('title', '#00FFFF')
                    .setBackground('https://www.photohdx.com/images/2016/05/red-blurry-background.jpg')
                    .toAttachment()
                const base64 = `data:image/png;base64,${bye.toBuffer().toString('base64')}`
                await bocchi.sendFile(event.chat, base64, 'welcome.png', `Adios ${pushname}, igual ni haces falta aqui~`)
            }
        } catch (err) {
            console.error(err)
        }
    })
}

create(options(start))
    .then((bocchi) => start(bocchi))
    .catch((err) => console.error(err))
