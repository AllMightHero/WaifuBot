/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */

/**
 * This source code below is free, please DO NOT sell this in any form!
 * Source code ini gratis, jadi tolong JANGAN jual dalam bentuk apapun!
 *
 * If you copying one of our source code, please give us CREDITS. Because this is one of our hardwork.
 * Apabila kamu menjiplak salah satu source code ini, tolong berikan kami CREDIT. Karena ini adalah salah satu kerja keras kami.
 *
 * If you want to contributing to this source code, pull requests are always open.
 * Apabila kamu ingin berkontribusi ke source code ini, pull request selalu kami buka.
 *
 * Thanks for the contributions.
 * Terima kasih atas kontribusinya.
 */

/********** MODULES **********/
const { decryptMedia, Client } = require('@open-wa/wa-automate')
const fs = require('fs-extra')
const Nekos = require('nekos.life')
const neko = new Nekos()
const os = require('os')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const api = new API()
const { removeBackgroundFromImageBase64 } = require('remove.bg')
const sagiri = require('sagiri')
const NanaAPI = require('nana-api')
const nana = new NanaAPI()
const bdr = require('rumus-bdr')
const fetch = require('node-fetch')
const isPorn = require('is-porn')
const exec = require('await-exec')
const webp = require('webp-converter')
const sharp = require('sharp')
const config = require('../config.json')
const saus = sagiri(config.nao, { results: 5 })
const axios = require('axios')
const tts = require('node-gtts')
const nekobocc = require('nekobocc')
const ffmpeg = require('fluent-ffmpeg')
const bent = require('bent')
const path = require('path')
const ms = require('parse-ms')
const toMs = require('ms')
const canvas = require('canvacord')
const mathjs = require('mathjs')
const emojiUnicode = require('emoji-unicode')
const moment = require('moment-timezone')
const translate = require('@vitalets/google-translate-api')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const genshin = require('genshin')
const google = require('google-it')
const cron = require('node-cron')
const ytsr = require ('ytsr')
const ytdl = require ('ytdl-core')
/********** END OF MODULES **********/

/********** UTILS **********/
const { msgFilter, color, processTime, isUrl, createSerial } = require('../tools')
const { nsfw, weeaboo, downloader, fun, misc, toxic } = require('../lib')
const { uploadImages } = require('../tools/fetcher')
const { ind, eng } = require('./text/lang/')
const { daily, level, register, afk, reminder, premium, limit} = require('../function')
const Exif = require('../tools/exif')
const exif = new Exif()
const cd = 4.32e+7
const limitCount = 25
const errorImg = 'https://i.ibb.co/jRCpLfn/user.png'
const tanggal = moment.tz('Asia/Jakarta').format('DD-MM-YYYY')
const { warnss } = require('../function')
const warnCount = 1
/********** END OF UTILS **********/

/********** DATABASES **********/
const _nsfw = JSON.parse(fs.readFileSync('./database/group/nsfw.json'))
const _antilink = JSON.parse(fs.readFileSync('./database/group/antilink.json'))
const _antinsfw = JSON.parse(fs.readFileSync('./database/group/antinsfw.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/group/leveling.json'))
const _welcome = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
const _autosticker = JSON.parse(fs.readFileSync('./database/group/autosticker.json'))
const _ban = JSON.parse(fs.readFileSync('./database/bot/banned.json'))
const _premium = JSON.parse(fs.readFileSync('./database/bot/premium.json'))
const _registered = JSON.parse(fs.readFileSync('./database/bot/registered.json'))
const _level = JSON.parse(fs.readFileSync('./database/user/level.json'))
let _limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
const _afk = JSON.parse(fs.readFileSync('./database/user/afk.json'))
const _reminder = JSON.parse(fs.readFileSync('./database/user/reminder.json'))
const _daily = JSON.parse(fs.readFileSync('./database/user/daily.json'))
const _stick = JSON.parse(fs.readFileSync('./database/bot/sticker.json'))
const _setting = JSON.parse(fs.readFileSync('./database/bot/setting.json'))
let { memberLimit, groupLimit } = _setting
const _warn = JSON.parse(fs.readFileSync('./database/group/warn.json'))
/********** END OF DATABASES **********/

/********** MESSAGE HANDLER **********/
// eslint-disable-next-line no-undef
module.exports = msgHandler = async (bocchi = new Client(), message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName
        const botNumber = await bocchi.getHostNumber() + '@c.us'
        const blockNumber = await bocchi.getBlockedIds()
        const ownerNumber = config.ownerBot
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await bocchi.getGroupAdmins(groupId) : ''
        const time = moment(t * 1000).format('DD/MM/YY HH:mm:ss')

        const chats = (type === 'chat') ? body : ((type === 'image' || type === 'video')) ? caption : ''
        const prefix = config.prefix
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const uaOverride = config.uaOverride
        const q = args.join(' ')
        const ar = args.map((v) => v.toLowerCase())
        const url = args.length !== 0 ? args[0] : ''

        /********** VALIDATOR **********/
        const isCmd = body.startsWith(prefix)
        const isBlocked = blockNumber.includes(sender.id)
        const isOwner = sender.id === ownerNumber
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isBanned = _ban.includes(sender.id)
        const isPremium = premium.checkPremiumUser(sender.id, _premium)
        const isRegistered = register.checkRegisteredUser(sender.id, _registered)
        const isNsfw = isGroupMsg ? _nsfw.includes(groupId) : false
        const isWelcomeOn = isGroupMsg ? _welcome.includes(groupId) : false
        const isDetectorOn = isGroupMsg ? _antilink.includes(groupId) : false
        const isLevelingOn = isGroupMsg ? _leveling.includes(groupId) : false
        const isAutoStickerOn = isGroupMsg ? _autosticker.includes(groupId) : false
        const isAntiNsfw = isGroupMsg ? _antinsfw.includes(groupId) : false
        const isAfkOn = afk.checkAfkUser(sender.id, _afk)
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'
        const isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif'
        const isQuotedAudio = quotedMsg && quotedMsg.type === 'audio'
        const isQuotedVoice = quotedMsg && quotedMsg.type === 'ptt'
        const isImage = type === 'image'
        const isVideo = type === 'video'
        const isAudio = type === 'audio'
        const isVoice = type === 'ptt'
        /********** END OF VALIDATOR **********/

        // Automate
        premium.expiredCheck(_premium)
        cron.schedule('0 0 * * *', () => {
            const reset = []
            _limit = reset
            console.log('Resetting user limit...')
            fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
            console.log('Success!')
        }, {
            scheduled: true,
            timezone: 'Asia/Jakarta'
        })
       
        // ROLE (Change to what you want, or add) and you can change the role sort based on XP.
        const levelRole = level.getLevelingLevel(sender.id, _level)
        var role = 'COBRE  V'
        if (levelRole >= 5) {
            role = 'COBRE  IV'
        } else if (levelRole >= 10) {
            role = 'COBRE  III'
        } else if (levelRole >= 15) {
            role = 'COBRE  II'
        } else if (levelRole >= 20) {
            role = 'COBRE  I'
        } else if (levelRole >= 25) {
            role = 'PLATA  V'
        } else if (levelRole >= 30) {
            role = 'PLATA  IV'
        } else if (levelRole >= 35) {
            role = 'PLATA  III'
        } else if (levelRole >= 40) {
            role = 'PLATA  II'
        } else if (levelRole >= 45) {
            role = 'PLATA  I'
        } else if (levelRole >= 50) {
            role = 'ORO V'
        } else if (levelRole >= 55) {
            role = 'ORO IV'
        } else if (levelRole >= 60) {
            role = 'ORO III'
        } else if (levelRole >= 65) {
            role = 'ORO II'
        } else if (levelRole >= 70) {
            role = 'ORO I'
        } else if (levelRole >= 75) {
            role = 'PLATINO V'
        } else if (levelRole >= 80) {
            role = 'PLATINO IV'
        } else if (levelRole >= 85) {
            role = 'PLATINO III'
        } else if (levelRole >= 90) {
            role = 'PLATINO II'
        } else if (levelRole >= 95) {
            role = 'PLATINO I'
        } else if (levelRole >= 100) {
            role = 'EXTERMINADOR'
        }

        // Leveling [BETA] by Slavyan
        if (isGroupMsg && isRegistered && !level.isGained(sender.id) && !isBanned && isLevelingOn) {
            try {
                level.addCooldown(sender.id)
                const currentLevel = level.getLevelingLevel(sender.id, _level)
                const amountXp = Math.floor(Math.random() * (15 - 25 + 1) + 15)
                const requiredXp = 5 * Math.pow(currentLevel, 2) + 50 * currentLevel + 100
                level.addLevelingXp(sender.id, amountXp, _level)
                if (requiredXp <= level.getLevelingXp(sender.id, _level)) {
                    level.addLevelingLevel(sender.id, 1, _level)
                    const userLevel = level.getLevelingLevel(sender.id, _level)
                    const fetchXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100
                    await bocchi.reply(from, `*「 LEVEL UP 」*\n\n➸ *Nombre*: ${pushname}\n➸ *XP*: ${level.getLevelingXp(sender.id, _level)} / ${fetchXp}\n➸ *Nivel*: ${currentLevel} -> ${level.getLevelingLevel(sender.id, _level)} 🆙 \n➸ *Rol*: *${role}*\n\nFelicidades!! 🎉🎉`, id)
                }
            } catch (err) {
                console.error(err)
            }
        }

        // Anti-group link detector
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isDetectorOn && !isOwner) {
            if (chats. match(new RegExp(/(https:\/\/chat.whatsapp.com)/gi))) {
                const valid = await bocchi.inviteInfo(chats)
                if (valid) {
                    console.log(color('[KICK]', 'red'), color('Received a group link and it is a valid link!', 'yellow'))
                    await bocchi.reply(from, ind.linkDetected(), id)
                    await bocchi.removeParticipant(groupId, sender.id)
                } else {
                    console.log(color('[WARN]', 'yellow'), color('Received a group link but is not a valid link!', 'yellow'))
                }
            }
        }

       // Anti virtext by: @VideFrelan
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && !isOwner) {
           if (chats.length > 5000) {
               await bocchi.sendTextWithMentions(from, `@${sender.id} has enviado exceso de texto.\nTendre que sacarte del grupo!`)
               await bocchi.removeParticipant(groupId, sender.id)
            }
        } 
               
        // Sticker keywords by: @hardianto02_
        if (isGroupMsg && isRegistered) {
            if (_stick.includes(chats)) {
                await bocchi.sendImageAsSticker(from, `./temp/sticker/${chats}.webp`, { author: '@Orumaito' , pack: 'Creado por WaifuBot' })
            }
        }
        
        // Anti-fake-group link detector
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isDetectorOn && !isOwner) {
            if (chats. match(new RegExp(/(https:\/\/chat.(?!whatsapp.com))/gi))) {
                console.log(color('[KICK]', 'red'), color('Received a fake group link.', 'yellow'))
                await bocchi.reply(from, 'Fake group link detected!', id)
                await bocchi.removeParticipant(groupId, sender.id)
            }
        }

        // Anti NSFW link
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isAntiNsfw && !isOwner) {
            if (isUrl(chats)) {
                const classify = new URL(isUrl(chats))
                console.log(color('[FILTER]', 'yellow'), 'Checking link:', classify.hostname)
                isPorn(classify.hostname, async (err, status) => {
                    if (err) return console.error(err)
                    if (status) {
                        console.log(color('[NSFW]', 'red'), color('The link is classified as NSFW!', 'yellow'))
                        await bocchi.reply(from, ind.linkNsfw(), id)
                        await bocchi.removeParticipant(groupId, sender.id)
                    } else {
                        console.log(('[NEUTRAL]'), color('The link is safe!'))
                    }
                })
            }
        }

        // Auto-sticker
        if (isGroupMsg && isAutoStickerOn && isMedia && isImage && !isCmd) {
            const mediaData = await decryptMedia(message, uaOverride)
            const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            await bocchi.sendImageAsSticker(from, imageBase64, { author: '@Orumaito', pack: 'WaifuBot', keepScale: false })
            console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
        }

        // Auto-sticker-video
        if (isGroupMsg && isAutoStickerOn && isMedia && isVideo && !isCmd) {
            const mediaData = await decryptMedia(message, uaOverride)
            const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            await bocchi.sendMp4AsSticker(from, videoBase64, null, { stickerMetadata: true, pack: 'WaifuBot', author: '@Orumaito', fps: 10, startTime: '00:00:00.0', endTime : '00:00:05.0', crop: false, loop: 0 })
            console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
        }

        // AFK by Slavyan
        if (isGroupMsg) {
            for (let ment of mentionedJidList) {
                if (afk.checkAfkUser(ment, _afk)) {
                    const getId = afk.getAfkId(ment, _afk)
                    const getReason = afk.getAfkReason(getId, _afk)
                    const getTime = afk.getAfkTime(getId, _afk)
                    await bocchi.reply(from, ind.afkMentioned(getReason, getTime), id)
                }
            }
            if (afk.checkAfkUser(sender.id, _afk) && !isCmd) {
                _afk.splice(afk.getAfkPosition(sender.id, _afk), 1)
                fs.writeFileSync('./database/user/afk.json', JSON.stringify(_afk))
                await bocchi.sendText(from, ind.afkDone(pushname))
            }
        }
            // Fix By Orumaito 
        if (chats == 'Hentai') {
        if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                bocchi.sendPtt(from, './audios/hentai.mp3', id)
        }
        
           //Fix By Orumaito 
        if (chats == 'Nya') {
        if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                bocchi.sendPtt(from, './audios/nya.mp3', id)
        }
        
        // Fix By Orumaito 
        if (chats == 'Yamete') {
        if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                bocchi.sendPtt(from, './audios/yamete.mp3', id)
        }
        
         // Fix By Orumaito 
        if (chats == 'Baka') {
        if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                bocchi.sendPtt(from, './audios/baka.mp3', id)
        }
        
         // Fix By Orumaito 
        if (chats == 'Senpai') {
        if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                bocchi.sendPtt(from, './audios/senpai.mp3', id)
        }
        
           // Fix By Orumaito 
        if (chats == 'Buenos dias') {
        if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                bocchi.sendPtt(from, './audios/buenos dias.mp3', id)
        }
        
        // Fix By Orumaito 
        if (chats == 'Onichan') {
        if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                bocchi.sendPtt(from, './audios/onichan.mp3', id)
        }
      
      // Fix By Orumaito 
        if (chats == 'Test') {
        if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                bocchi.sendPtt(from, './audios/test.mp3', id)
        }
        
        // Fix By Orumaito 
        if (chats == 'Sawarasenai') {
        if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                bocchi.sendPtt(from, './audios/sawarasenai.mp3', id)
        }
       
       
        // Ignore banned and blocked users
        if (isCmd && (isBanned || isBlocked) && !isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && (isBanned || isBlocked) && isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Anti-spam
        if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Log
        if (isCmd && !isGroupMsg) {
            console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
            await bocchi.sendSeen(from)
        }
        if (isCmd && isGroupMsg) {
            console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))
            await bocchi.sendSeen(from)
        }

        if (isCmd && !isPremium && !isOwner) msgFilter.addFilter(from)

        switch (command) {
            case 'antiporn': // Premium, chat VideFikri
                await bocchi.reply(from, 'Premium Feature!\n\nContact: wa.me/6285692655520?text=Buy%20Anti%20Porn', id)
            break

            // Register by Slavyan
            case 'registrar':
                if (isRegistered) return await bocchi.reply(from, eng.registeredAlready(), id)
                if (args.length !==2) return await bocchi.reply(from, ind.wrongFormat(), id)
                const namaUser = q.substring(0, q.indexOf(' ') - 0)
                const umurUser = q.substring(q.lastIndexOf(' ') + 1)
                const serialUser = createSerial(20)
                if (isGroupMsg) {
                    register.addRegisteredUser(sender.id, namaUser, umurUser, time, serialUser, _registered)
                    await bocchi.reply(from, eng.pc(pushname), id)
                    
                    console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'), 'in', color(name || formattedTitle))
                } else {
                    register.addRegisteredUser(sender.id, namaUser, umurUser, time, serialUser, _registered)
                    await bocchi.reply(from, eng.registered(namaUser, umurUser, sender.id, time, serialUser), id)
                    console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
                }
            break

            // Nivel [BETA] por Slavyan
            case 'nivel':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isLevelingOn) return await bocchi.reply(from, ind.levelingNotOn(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const userLevel = level.getLevelingLevel(sender.id, _level)
                const userXp = level.getLevelingXp(sender.id, _level)
                const ppLink = await bocchi.getProfilePicFromServer(sender.id)
                if (ppLink === undefined) {
                    var pepe = errorImg
                } else {
                    pepe = ppLink
                }
                const requiredXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100
                const rank = new canvas.Rank()
                    .setAvatar(pepe)
                    .setLevel(userLevel)
                    .setLevelColor('#ffa200', '#ffa200')
                    .setRank(Number(level.getUserRank(sender.id, _level)))
                    .setCurrentXP(userXp)
                    .setOverlay('#000000', 100, false)
                    .setRequiredXP(requiredXp)
                    .setProgressBar('#ffa200', 'COLOR')
                    .setBackground('COLOR', '#000000')
                    .setUsername(pushname)
                    .setDiscriminator(sender.id.substring(6, 10))
                rank.build()
                    .then(async (buffer) => {
                        canvas.write(buffer, `${sender.id}_card.png`)
                        await bocchi.sendFile(from, `${sender.id}_card.png`, `${sender.id}_card.png`, '', id)
                        fs.unlinkSync(`${sender.id}_card.png`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'listadenivel':
            case 'top':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isLevelingOn) return await bocchi.reply(from, ind.levelingNotOn(), id)
                if (!isGroupMsg) return await bocchi.reply(from. ind.groupOnly(), id)
                const resp = _level
                _level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
                let leaderboard = '-----[ *TABLA DE CLASIFICACION* ]----\n\n'
                try {
                    for (let i = 0; i < 10; i++) {
                        var roles = 'COBRE  V'
                        if (resp[i].level >= 5) {
                            roles = 'COBRE  IV'
                        } else if (resp[i].level >= 10) {
                            roles = 'COBRE  III'
                        } else if (resp[i].level >= 15) {
                            roles = 'COBRE  II'
                        } else if (resp[i].level >= 20) {
                            roles = 'COBRE  I'
                        } else if (resp[i].level >= 25) {
                            roles = 'PLATA  V'
                        } else if (resp[i].level >= 30) {
                            roles = 'PLATA  IV'
                        } else if (resp[i].level >= 35) {
                            roles = 'PLATA  III'
                        } else if (resp[i].level >= 40) {
                            roles = 'PLATA  II'
                        } else if (resp[i].level >= 45) {
                            roles = 'PLATA  I'
                        } else if (resp[i].level >= 50) {
                            roles = 'ORO V'
                        } else if (resp[i].level >= 55) {
                            roles = 'ORO IV'
                        } else if (resp[i].level >= 60) {
                            roles = 'ORO III'
                        } else if (resp[i].level >= 65) {
                            roles = 'ORO II'
                        } else if (resp[i].level >= 70) {
                            roles = 'ORO I'
                        } else if (resp[i].level >= 75) {
                            roles = 'PLATINO V'
                        } else if (resp[i].level >= 80) {
                            roles = 'PLATINO IV'
                        } else if (resp[i].level >= 85) {
                            roles = 'PLATINO III'
                        } else if (resp[i].level >= 90) {
                            roles = 'PLATINO II'
                        } else if (resp[i].level >= 95) {
                            roles = 'PLATINO I'
                        } else if (resp[i].level >= 100) {
                            roles = 'EXTERMINADOR'
                        }
                        leaderboard += `${i + 1}. wa.me/${_level[i].id.replace('@c.us', '')}\n➸ *XP*: ${_level[i].xp} *Nivel*: ${_level[i].level}\n➸ *Rol*: ${roles}\n\n`
                    }
                    await bocchi.reply(from, leaderboard, id)
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, ind.minimalDb(), id)
                }
            break

            // DESCARGAS
                       case 'musica':
                if (args.length == 0) return bocchi.reply(from, `Para descargar una musica solo usa el comando: ${prefix}musica � nombre � o � enlace �`, id)
                await bocchi.reply(from, `*Descargando musica...*`, id)
                const playOptions = {
                    limit: 1,
                    gl: 'ID',
                    hl: 'pt'
                }
                const res = await ytsr(body.slice(6), playOptions).catch(err => {
                    return bocchi.reply(from, `No puedo encontrar alguna musica en YouTube con ese t�tulo`, id)
                })

                const videoResult = res.items.filter(item => item.type === 'video')[0]

                if (!videoResult) {
                    return bocchi.reply(from, `No puedo encontrar alguna musica en YouTube con ese título`, id)
                }

                const playInfo = await ytdl.getInfo(videoResult.url, {
                    quality: 'highestaudio'
                });

                let playStream = ytdl(videoResult.url, {
                    quality: 'highestaudio'
                });

                let songPlayInfo = {
                    title: playInfo.videoDetails.title,
                    url: playInfo.videoDetails.video_url,
                    lengthSeconds: playInfo.videoDetails.lengthSeconds,
                    authorName: playInfo.videoDetails.author.name,
                    videoId: playInfo.videoDetails.videoId,
                    isPrivate: playInfo.videoDetails.isPrivate,
                }
        const durase = `${songPlayInfo.lengthSeconds}/60`
                console.log(durase)
                bocchi.sendFileFromUrl(from, videoResult.bestThumbnail.url, 'yt.jpg', `*PLAY YOUTUBE MP3*\n\n*Titulo:*  ${songPlayInfo.title.replace('Official','').replace('Unofficial','').replace('Cover','').replace('Video','').replace('Clip','').replace('|','').replace('Music','').replace('UNOFFICIAL','').replace('OFFICIAL','').replace('MUSIC','').replace('VIDEO','').replace('(','').replace(')','').replace('lirik','').replace('Lyric','').replace('Lirik','')}\n\n*Formato Del Archivo:*  MPEG-2 Audio Layer III\n\n*Enviando tu audio...*\n\n*Espere...*`, id)

                //console.log(songinfo);
                let testPlaySize = (((songPlayInfo.lengthSeconds * 128000) / 8) / 1024) / 1024
                console.log(`Tamaño de la musica : ${testPlaySize} MB`);

                if (testPlaySize >= 15) {
                    return bocchi.reply(from, `Lo siento el limite de audio es de 15MB.`, id)
                }

                if (songPlayInfo.lengthSeconds > 900) {
                    return bocchi.reply(from, `Lo siento el limite de audio es de 15MB.`, id)
                }

                ffmpeg(playStream)
                    .audioBitrate(128)
                    .save(`./temp/${songPlayInfo.videoId}.mp3`)
                    .on('end', () => {
                        var playStats = fs.statSync(`./temp/${songPlayInfo.videoId}.mp3`)
                        let realSize = playStats.size / (1024 * 1024);
                        console.log(`Tama�o original: ${realSize} MB`);
                        if (realSize <= 15) {
                            bocchi.sendFile(from, `./temp/${songPlayInfo.videoId}.mp3`, `${songPlayInfo.videoId}.mp3`, null, id).then(f => {
                                try {
                                    fs.unlinkSync(`./temp/${songPlayInfo.videoId}.mp3`);
                                    console.log(`Archivo Temporal Eliminado: ${songPlayInfo.videoId}.mp3`);
                                    bocchi.reply(from, `Archivo Temporal Eliminado: ${songPlayInfo.videoId}.mp3`);
                                } catch (err) {
                                    // handle the error
                                    console.log(err);
                                }
                            })
                        } else {
                            return bocchi.reply(from, `Upsss no he podido descargar la música señor.`, id)
                        }
                    });
                break
case 'video':
                if (args.length == 0) return bocchi.reply(from, `Para descargar un video solo usa el comando: ${prefix}video nombre o enlace`, id)
                await bocchi.reply(from, `*Descargando video...*`, id)
                const resa = await ytsr(body.slice(6)).catch(err => {
                    return bocchi.reply(from, `No puedo encontrar algun video en YouTube con ese t�tulo`, id)
                })
                const videoDatas = resa.items.filter(item => item.type === 'video')[0];
                //console.log(videoDatas)
                console.log(videoDatas.url)
                var viidio = videoDatas.url.replace('https://m.youtu.be/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/', '').replace('watch?v=', '')
                let info = await ytdl.getInfo(viidio);
                let format = ytdl.chooseFormat(info.formats, { quality: '18' });
                //console.log('Format found!', format)
                if (format.contentLength >= 45000000) {
                        return bocchi.reply(from, `Lo siento el limite de video es de 45MB.`, id)
                    } else {
                await bocchi.sendFileFromUrl(from, format.url, `${videoDatas.title}.mp4`, '*YOUTUBE MP4* \n\n*Titulo:*  '+ `${videoDatas.title}` +'\n\n*Subido Por:*  ' + `${videoDatas.author.name}` + '\n\n*Formato Del Archivo:*  MPEG-4 parte 14' + '\n\n*Publicado:*  ' + `${videoDatas.uploadedAt.replace('years ago','A�os atras')}` +'\n\n*Enlace Directo:*  ' + `${videoDatas.url}` + '\n\n*Listo...*')
                    }
                console.log('Video Enviado Exitosamente.')
                break
                case 'facebook':
                case 'fb':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isUrl(url) && !url.includes('facebook.com')) return await bocchi.reply(from, eng.wrongFormat(), id)
                await bocchi.reply(from, eng.wait(), id)
                downloader.fb(url)
                    .then(async (res) => {
                        if (res.status === 'error') {
                            await bocchi.reply(from, res.pesan, id)
                        } else {
                            await bocchi.sendFileFromUrl(from, res.result.url, 'video.mp4', '*FACEBOOK Video*', id)
                            console.log('Success sending Facebook video!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'moddroid': // Chikaa Chantekkzz
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                downloader.modroid(q)
                    .then(async ({ status, result }) => {
                        if (status !== 200) {
                            await bocchi.reply(from, 'Not found.', id)
                        } else {
                            await bocchi.sendFileFromUrl(from, result[0].image, 'ksk.jpg', `*「 MOD ENCONTRADO 」*\n\n➸ *APK*: ${result[0].title}\n\n➸ *Tama�o*: ${result[0].size}\n➸ *Publicado*: ${result[0].publisher}\n➸ *Version*: ${result[0].latest_version}\n➸ *Genero*: ${result[0].genre}\n\n*Link de descarga*\n${result[0].download}`, id)
                            console.log('Success sending APK mod!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'happymod': // chikaa chantexxzz
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                downloader.happymod(q)
                    .then(async ({ status, result }) => {
                        if (status !== 200) {
                            await bocchi.reply(from, 'Not found.', id)
                        } else {
                            await bocchi.sendFileFromUrl(from, result[0].image, 'ksk.jpg', `*「 MOD ENCONTRADO 」*\n\n➸ *APK*: ${result[0].title}\n\n➸ *Tama�o*: ${result[0].size}\n➸ *Root*: ${result[0].root}\n➸ *Version*: ${result[0].version}\n➸ *Precio*: ${result[0].price}\n\n*Link de descarga*\n${result[0].download}`, id)
                            console.log('Success sending APK mod!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            
            // DIVERSOS 
            case 'decir':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.sendText(from, q)
            break
            case 'audio':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const speech = q.substring(q.indexOf('|') + 2)
                const ptt = tts(ar[0])
                try {
                    ptt.save(`${speech}.mp3`, speech, async () => {
                        await bocchi.sendPtt(from, `${speech}.mp3`, id)
                        fs.unlinkSync(`${speech}.mp3`)
                    })
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case 'afk': // by Slavyan
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (isAfkOn) return await bocchi.reply(from, ind.afkOnAlready(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const reason = q ? q : 'Nothing.'
                afk.addAfkUser(sender.id, time, reason, _afk)
                await bocchi.reply(from, ind.afkOn(pushname, reason), id)
            break
            case 'calculadora':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (typeof mathjs.evaluate(q) !== 'number') {
                    await bocchi.reply(from, ind.notNum(q), id)
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, `*「 MATH 」*\n\n${q} = ${mathjs.evaluate(q)}`, id)
                }
            break
            case 'aleatorio':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) return await bocchi.reply(from, 'Este comando no se puede usar en un grupo!', id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, 'Looking for a partner...', id)
                await bocchi.sendContact(from, register.getRegisteredRandomId(_registered))
                await bocchi.sendText(from, `Contacto encontrado: 🙉\n*${prefix}siguente* — para encontrar un nuevo contacto`)
            break
            case 'siguiente':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) return await bocchi.reply(from, 'Este comando no se puede usar en un grupo!', id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, 'Looking for a partner...', id)
                await bocchi.sendContact(from, register.getRegisteredRandomId(_registered))
                await bocchi.sendText(from, `Contacto encontrado: 🙉\n*${prefix}next* — para buscar un nuevo compañero`)
            break 
            case 'recordatorio': // by Slavyan
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const timeRemind = q.substring(0, q.indexOf('|') - 1)
                const messRemind = q.substring(q.lastIndexOf('|') + 2)
                const parsedTime = ms(toMs(timeRemind))
                reminder.addReminder(sender.id, messRemind, timeRemind, _reminder)
                await bocchi.sendTextWithMentions(from, `*「 RECORDATORIO 」*\n\nRecordatorio activado! :3\n\n➸ *Mensaje*: ${messRemind}\n➸ *Duracion*: ${parsedTime.hours} Horas ${parsedTime.minutes} Minutos ${parsedTime.seconds} Segundos\n➸ *A*: @${sender.id.replace('@c.us', '')}`, id)
                const intervRemind = setInterval(async () => {
                    if (Date.now() >= reminder.getReminderTime(sender.id, _reminder)) {
                        await bocchi.sendTextWithMentions(from, `⏰ *「 RECORDATORIO 」* ⏰\n\nFinalmente a tiempo~ @${sender.id.replace('@c.us', '')}\n\n➸ *Mensaje*: ${reminder.getReminderMsg(sender.id, _reminder)}`)
                        _reminder.splice(reminder.getReminderPosition(sender.id, _reminder), 1)
                        fs.writeFileSync('./database/user/reminder.json', JSON.stringify(_reminder))
                        clearInterval(intervRemind)
                    }
                }, 1000)
            break
            case 'imagetourl':
            case 'imgtourl':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const linkImg = await uploadImages(mediaData, `${sender.id}_img`)
                    await bocchi.reply(from, linkImg, id)
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'traducir':
            case 'trad':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const texto = q.substring(0, q.indexOf('|') - 1)
                const languaget = q.substring(q.lastIndexOf('|') + 2)
                translate(texto, {to: languaget}).then(res => {bocchi.reply(from, res.text, id)})
            break
            case 'covid': // by CHIKAA CHANTEKKXXZZ
            case 'coronavirus':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                misc.corona(q)
                    .then(async (res) => {
                        await bocchi.sendText(from, '🌎️ Covid Info - ' + q.charAt(0).toUpperCase() + q.slice(1) + ' 🌍️\n\n✨️ Casos totales: ' + `${res.cases}` + '\n📆️ Casos de hoy: ' + `${res.todayCases}` + '\n☣️ Muertes totales: ' + `${res.deaths}` + '\n☢️ Muertes de hoy: ' + `${res.todayDeaths}` + '\n⛩️ Casos activos: ' + `${res.active}` + '.')
                        console.log('Success sending Result!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'imagen':
            case 'image':
            if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
            if (!isGroupMsg) return bocchi.reply(from, 'Este comando solo funciona en grupos!', id)
            
            if (args.length == 0) return bocchi.reply(from, 'Falto un nombre!', id)
            await bocchi.reply(from, eng.wait(), id)
            const linp = await fetch(`https://api.fdci.se/sosmed/rep.php?gambar=${body.slice(7)}`)
			const pint = await linp.json()
            let erest = pint[Math.floor(Math.random() * pint.length) + 1]
			console.log(erest)
            await bocchi.sendFileFromUrl(from, erest, '', '', id)
            
			.catch(() => {
                bocchi.reply(from, 'Ningun imagen con ese nombre, intenta mas tarde.', id)
            })
            break
            case 'google': // chika-chantekkzz
            case 'googlesearch':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                google({ 'query': q, 'no-display': true })
                    .then(async (results) => {
                        let txt = `-----[ *GOOGLE SEARCH* ]-----\n\n*by: rashidsiregar28*\n\n_*Search results for: ${q}*_`
                        for (let i = 0; i < results.length; i++) {
                            txt += `\n\n➸ *Title*: ${results[i].title}\n➸ *Desc*: ${results[i].snippet}\n➸ *Link*: ${results[i].link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.reply(from, txt, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            
            // COMANDOS DEL BOT
            case 'reglas':
            case 'regla':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.sendText(from, ind.rules())
            break
            case 'menu':
            case 'ayuda':
                const jumlahUser = _registered.length
                const levelMenu = level.getLevelingLevel(sender.id, _level)
                const xpMenu = level.getLevelingXp(sender.id, _level)
                const reqXpMenu = 5 * Math.pow(levelMenu, 2) + 50 * 1 + 100
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (args[0] === '1') {
                    await bocchi.sendFile(from, './imagenes/menu1.png', 'menu.png', ind.menuDownloader(), id)
                } else if (args[0] === '2') {
                    await bocchi.sendFile(from, './imagenes/menu2.png', 'menu.png', ind.menuBot(), id)
                } else if (args[0] === '3') {
                    await bocchi.sendFile(from, './imagenes/menu3.png', 'menu.png', ind.menuMisc(), id)
                } else if (args[0] === '4') {
                    await bocchi.sendFile(from, './imagenes/menu4.png', 'menu.png', ind.menuSticker(), id)
                } else if (args[0] === '5') {
                    await bocchi.sendFile(from, './imagenes/menu5.png', 'menu.png', ind.menuWeeaboo(), id)
                } else if (args[0] === '6') {
                    await bocchi.sendFile(from, './imagenes/menu6.png', 'menu.png', ind.menuFun(), id)
                } else if (args[0] === '7') {
                    await bocchi.sendFile(from, './imagenes/menu7.png', 'menu.png', ind.menuModeration(), id)
                } else if (args[0] === '8') {
                    if (isGroupMsg && !isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    await bocchi.sendFile(from, './imagenes/menu8.png', 'menu.png', ind.menuNsfw(), id)
                } else if (args[0] === '9') {
                    if (!isOwner) return await bocchi.reply(from, ind.ownerOnly())
                    await bocchi.sendFile(from, './imagenes/menu9.png', 'menu.png', ind.menuOwner(), id)
                } else if (args[0] === '10') {
                    if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                    await bocchi.sendFile(from, './imagenes/menu10.png', 'menu.png', ind.menuLeveling(), id)
                } else {
                    await bocchi.sendFile(from, './menu.png', 'menu.png', ind.menu(jumlahUser, levelMenu, xpMenu, role, pushname, reqXpMenu, isPremium ? 'YES' : 'NO'), id)
                }
            break
            case 'estado':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.sendText(from, `*RAM*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${Math.round(os.totalmem / 1024 / 1024)} MB\n*CPU*: ${os.cpus()[0].model}`)
            break
            case 'bloqueados':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                let block = ind.listBlock(blockNumber)
                for (let i of blockNumber) {
                    block += `@${i.replace('@c.us', '')}\n`
                }
                await bocchi.sendTextWithMentions(from, block)
            break
            case 'activo': // BY HAFIZH
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                const formater = (seconds) => {
                    const pad = (s) => {
                        return (s < 10 ? '0' : '') + s
                    }
                    const hrs = Math.floor(seconds / (60 * 60))
                    const mins = Math.floor(seconds % (60 * 60) / 60)
                    const secs = Math.floor(seconds % 60)
                    return ' ' + pad(hrs) + ':' + pad(mins) + ':' + pad(secs)
                }
                const uptime = process.uptime()
                await bocchi.reply(from, `── *「 BOT UPTIME 」* ──\n\n ❏${formater(uptime)}`, id)
            break
            case 'ping':
            case 'p':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.sendText(from, `Pong!\nMi rapidez es de: ${processTime(t, moment())} segundos`)
            break
            case 'borrar':
            case 'del':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!quotedMsg) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!quotedMsgObj.fromMe) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
            case 'reporte':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.emptyMess(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const lastReport = daily.getLimit(sender.id, _daily)
                if (lastReport !== undefined && cd - (Date.now() - lastReport) > 0) {
                    const time = ms(cd - (Date.now() - lastReport))
                    await bocchi.reply(from, ind.daily(time), id)
                } else {
                    if (isGroupMsg) {
                        await bocchi.sendText(ownerNumber, `-----[ REPORTE ]-----\n\n*De*: ${pushname}\n*ID*: ${sender.id}\n*Gropo*: ${(name || formattedTitle)}\n*Mensaje*: ${q}`)
                        await bocchi.reply(from, ind.received(pushname), id)
                    } else {
                        await bocchi.sendText(ownerNumber, `-----[ REPORTE ]-----\n\n*De*: ${pushname}\n*ID*: ${sender.id}\n*Mensaje*: ${q}`)
                        await bocchi.reply(from, ind.received(pushname), id)
                    }
                    daily.addLimit(sender.id, _daily)
                }
            break
            case 'tyc':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.sendLinkWithAutoPreview(from, 'https://github.com/SlavyanDesu/BocchiBot', ind.tos(ownerNumber))
            break
            case 'unir':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isUrl(url) && !url.includes('chat.whatsapp.com')) return await bocchi.reply(from, ind.wrongFormat(), id)
                const checkInvite = await bocchi.inviteInfo(url)
                if (isOwner) {
                    await bocchi.joinGroupViaLink(url)
                    await bocchi.reply(from, ind.ok(), id)
                    await bocchi.sendText(checkInvite.id, `Hola!! fui invitada por ${pushname}`)
                } else {
                    const getGroupData = await bocchi.getAllGroups()
                    if (getGroupData.length >= groupLimit) {
                        await bocchi.reply(from, `Invitacion rechazada. Limite maximo de integrantes: ${groupLimit}`, id)
                    } else if (getGroupData.size <= memberLimit) {
                        await bocchi.reply(from, `Invitacion rechazada. Minimo de intrgrantes requetidos: ${memberLimit}`, id)
                    } else {
                        if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                        limit.addLimit(sender.id, _limit, isPremium, isOwner)
                        await bocchi.joinGroupViaLink(url)
                        await bocchi.reply(from, ind.ok(), id)
                        await bocchi.sendText(checkInvite.id, `Hola!! fui invitada por ${pushname}`)
                    }
                }
            break
            case 'propietario':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.sendContact(from, ownerNumber)
            break
            case 'getpic':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (mentionedJidList.length !== 0) {
                    const userPic = await bocchi.getProfilePicFromServer(mentionedJidList[0])
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    if (userPic === undefined) {
                        var pek = errorImg
                    } else {
                        pek = userPic
                    }
                    await bocchi.sendFileFromUrl(from, pek, 'pic.jpg', '', id)
                } else if (args.length !== 0) {
                    const userPic = await bocchi.getProfilePicFromServer(args[0] + '@c.us')
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    if (userPic === undefined) {
                        var peks = errorImg
                    } else {
                        peks = userPic
                    }
                    await bocchi.sendFileFromUrl(from, peks, 'pic.jpg', '', id)
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'tiempopremium':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isPremium) return await bocchi.reply(from, ind.notPremium(), id)
                const cekExp = ms(premium.getPremiumExpired(sender.id, _premium) - Date.now())
                await bocchi.reply(from, `*「 TIEMPO PREMIUM RESTANTE 」*\n\n➸ *ID*: ${sender.id}\n➸ *Premium sobrante*: ${cekExp.days} dias(s) ${cekExp.hours} horas(s) ${cekExp.minutes} minuto(s)`, id)
            break
            case 'listapremium':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                let listPremi = '「 *LISTA DE USUARIOS PREMIUM* 」\n\n'
                const deret = premium.getAllPremiumUser(_premium)
                const arrayPremi = []
                for (let i = 0; i < deret.length; i++) {
                    const checkExp = ms(premium.getPremiumExpired(deret[i], _premium) - Date.now())
                    arrayPremi.push(await bocchi.getContact(premium.getAllPremiumUser(_premium)[i]))
                    listPremi += `${i + 1}. wa.me/${premium.getAllPremiumUser(_premium)[i].replace('@c.us', '')}\n➸ *Nombre*: ${arrayPremi[i].pushname}\n➸ *Expira*: ${checkExp.days} dia(s) ${checkExp.hours} hora(s) ${checkExp.minutes} minuto(s)\n\n`
                }
                await bocchi.reply(from, listPremi, id)
            break
            case 'limite':
                if (isPremium || isOwner) return await bocchi.reply(from, '⤞ Limite: ∞ (ILIMITADO)', id)
                await bocchi.reply(from, `⤞ Limite: ${limit.getLimit(sender.id, _limit, limitCount)} / 25\n\n*_El l�mite se restablece en 00:00 HORAS_*`, id)
            break
            
            // ZONA OTAKU
            case 'neko':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Getting neko image...')
                await bocchi.sendFileFromUrl(from, (await neko.sfw.neko()).url, 'neko.jpg', '', null, null, true)
                    .then(() => console.log('Success sending neko image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'wallpaper':
            case 'wp':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Getting wallpaper image...')
                await bocchi.sendFileFromUrl(from, (await neko.sfw.wallpaper()).url, 'wallpaper.jpg', '', null, null, true)
                    .then(() => console.log('Success sending wallpaper image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id )
                    })
            break
            case 'kemono':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Getting kemonomimi image...')
                await bocchi.sendFileFromUrl(from, (await neko.sfw.kemonomimi()).url, 'kemono.jpg', '', null, null, true)
                    .then(() => console.log('Success sending kemonomimi image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'queanime':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    weeaboo.wait(imageBase64)
                        .then(async (result) => {
                            if (result.docs && result.docs.length <= 0) {
                                return await bocchi.reply(from, 'Anime not found! :(', id)
                            } else {
                                const { title, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = result.docs[0]
                                let teks = ''
                                if (similarity < 0.92) {
                                    teks = 'Low similarity. 🤔\n\n'
                                } else {
                                    teks += `*Title*: ${title}\n*Romaji*: ${title_romaji}\n*English*: ${title_english}\n*Episode*: ${episode}\n*Similarity*: ${(similarity * 100).toFixed(1)}%`
                                    const video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`
                                    await bocchi.sendFileFromUrl(from, video, `${title_romaji}.mp4`, teks, id)
                                        .then(() => console.log('Success sending anime source!'))
                                }
                            }
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'waifu':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                weeaboo.waifu(false)
                    .then(async ({ url }) => {
                        await bocchi.sendFileFromUrl(from, url, 'waifu.png', '', id)
                            .then(() => console.log('Success sending waifu!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
           
            // DIVERCION
            case 'kiss':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                        limit.addLimit(sender.id, _limit, isPremium, isOwner)
                        await bocchi.reply(from, ind.wait(), id)
                        const encryptMedia = isQuotedImage ? quotedMsg : message
                        const ppRaw = await bocchi.getProfilePicFromServer(sender.id)
                        const ppSecond = await decryptMedia(encryptMedia, uaOverride)
                        if (ppRaw === undefined) {
                            var ppFirst = errorImg
                        } else {
                            ppFirst = ppRaw
                        }
                        canvas.Canvas.kiss(ppFirst, ppSecond)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_kiss.png`)
                                await bocchi.sendFile(from, `${sender.id}_kiss.png`, `${sender.id}_kiss.png`, '', id)
                                fs.unlinkSync(`${sender.id}_kiss.png`)
                            })
                    } else {
                        await bocchi.reply(from, ind.wrongFormat(), id)
                    }
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case 'comentarioph':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const usernamePh = q.substring(0, q.indexOf('|') - 1)
                const commentPh = q.substring(q.lastIndexOf('|') + 2)
                const ppPhRaw = await bocchi.getProfilePicFromServer(sender.id)
                if (ppPhRaw === undefined) {
                    var ppPh = errorImg
                } else {
                    ppPh = ppPhRaw
                }
                const dataPpPh = await bent('buffer')(ppPh)
                const linkPpPh = await uploadImages(dataPpPh, `${sender.id}_ph`)
                await bocchi.reply(from, ind.wait(), id)
                const preprocessPh = await axios.get(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${linkPpPh}&text=${commentPh}&username=${usernamePh}`)
                await bocchi.sendFileFromUrl(from, preprocessPh.data.message, 'ph.jpg', '', id)
                console.log('Success creating image!')
            break
            case 'patear':
            if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
            arq = body.trim().split(' ')
            const person6 = pushname.replace('@c.us', '')
            await bocchi.sendStickerfromUrl(from, 'https://raw.githubusercontent.com/AllMightHero/Acciones/main/patada.gif')
            bocchi.sendTextWithMentions(from, `@${sender.id.replace('@c.us', '')}`+' *Le da una patada a* ' + arq[1])
            break
            case 'besar':
            if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
            arq = body.trim().split(' ')
            const person7 = pushname.replace('@c.us', '')
            await bocchi.sendStickerfromUrl(from, 'https://raw.githubusercontent.com/AllMightHero/Acciones/main/beso.gif')
            bocchi.sendTextWithMentions(from, `@${sender.id.replace('@c.us', '')}`+' *Le da un beso a* ' + arq[1])
            break
            case 'golpear':
            if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
            arq = body.trim().split(' ')
            const person5 = pushname.replace('@c.us', '')
            await bocchi.sendStickerfromUrl(from, 'https://raw.githubusercontent.com/AllMightHero/Acciones/main/golpe.gif')
            bocchi.sendPtt(from, './audios/smash.mp3', id)
            bocchi.sendTextWithMentions(from, `@${sender.id.replace('@c.us', '')}`+' *golpea a* ' + arq[1])
            break
                       
            // STICKER 
                    case 'stiker':
            case 'sticker':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return bocchi.reply(from, 'Comando solo para grupos!', id)
                if (isMedia && isImage || isQuotedImage) {
                    await bocchi.reply(from, eng.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    
                    await bocchi.sendImageAsSticker(from, imageBase64, { author: '@Orumaito', pack: 'Creado por WaifuBot', keepScale:'true'})
                        .then(async () => {
                            await bocchi.sendText(from, eng.ok())
                            console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case 'circular':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return bocchi.reply(from, 'Comando solo para grupos!', id)
                if (isMedia && isImage || isQuotedImage) {
                    await bocchi.reply(from, eng.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    
                    await bocchi.sendImageAsSticker(from, imageBase64, { circle:true, author: '@Orumaito ', pack: 'Creado por WaifuBot '})
                        .then(async () => {
                            await bocchi.sendText(from, eng.ok())
                            console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case 'gif':
            case 'stickergif':
            case 'stikergif':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return bocchi.reply(from, 'Comando solo para grupos!', id)
                if (isMedia && type === 'video' || mimetype === 'image/gif') {
                    await bocchi.reply(from, eng.wait(), id)
                    try {
                        const mediaData = await decryptMedia(message, uaOverride)
                        const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        await bocchi.sendMp4AsSticker(from, videoBase64, { keepScale: true, fps: 10, startTime: `00:00:00.0`, endTime : `00:00:10.0`, loop: 0 }, { author: '@Orumaito', pack: 'Creado por WaifuBot' })
                        
                            .then(async () => {
                                console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                await bocchi.sendText(from, eng.ok())
                            })
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, eng.videoLimit(), id)
                    }
                } else if (isQuotedGif || isQuotedVideo) {
                    await bocchi.reply(from, eng.wait(), id)
                    try {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const videoBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await bocchi.sendMp4AsSticker(from, videoBase64, { keepScale: true, fps: 10, startTime: `00:00:00.0`, endTime : `00:00:10.0`, loop: 0 }, { author: '@Orumaito', pack: 'Creado por WaifuBot' })
                        
                            .then(async () => {
                                console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                await bocchi.sendText(from, eng.ok())
                            })
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, eng.videoLimit(), id)
                    }
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case 'stickertoimg':
            case 'stikertoimg':
            case 'toimg':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isQuotedSticker) {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    try {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await bocchi.sendFile(from, imageBase64, 'sticker.jpg', '', id)
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
case 'ttp':
			    if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return bocchi.reply(from, 'Comando solo para grupos!', id)
			if (args.length == 0) return bocchi.reply(from, 'Falta la frase', id)
			await bocchi.reply(from, eng.wait(), id)
			axios.get(`https://api.areltiyan.site/sticker_maker?text=${body.slice(5)}`)
			.then(res => {
				bocchi.sendImageAsSticker(from, res.data.base64, { author: '@Orumaito' , pack: 'Creado por WaifuBot', keepScale:'true'})
			})
			break
                    case 'cstick':  // By: Orumaito  
	                case 'renombrar':   
                    if (args.length == 0) return bocchi.reply(from, `Para cambiarle el nombre de paquete y de autor a un sticker mencionalo junto al comando:\n\n*${prefix}cstick (nombre del paquete) | (autor)*\n\n_Es obligatorio que uses esta rata *" | "* para dividir cada texto......_\n\nejemplo: *${prefix}cstick (WaifuBot) | (@Orumaito)*\n\n*Intenta usar letras y n?meros originales... para que no hayan problema con el cambio de nombres.*`, id)
                    if (!q.includes('|')) return await bocchi.reply(from, eng.wrongFormat(), id)
                    if (quotedMsg && quotedMsg.type == 'sticker') {
                        const mediaDataTake = await decryptMedia(quotedMsg)
                        await bocchi.reply(from, eng.wait(), id)
                        const packnames = q.substring(0, q.indexOf('|') - 1)
                        const authors = q.substring(q.lastIndexOf('|') + 2)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaDataTake.toString('base64')}`
                        await bocchi.sendImageAsSticker(from, imageBase64, { author: `${authors}`, pack: `${packnames}` })
                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                    } else {
                        await bocchi.reply(from, eng.wrongFormat(), id)
                    }
            break
            case 'wasted':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    const encryptMediaWt = isQuotedImage ? quotedMsg : message
                    const dataPotoWt = await decryptMedia(encryptMediaWt, uaOverride)
                    const fotoWtNya = await uploadImages(dataPotoWt, `fotoProfilWt.${sender.id}`)
                    await bocchi.reply(from, ind.wait(), id)
                    await bocchi.sendFileFromUrl(from, `https://some-random-api.ml/canvas/wasted?avatar=${fotoWtNya}`, 'Wasted.jpg', 'enviando imagen', id).then(() => bocchi.sendStickerfromUrl(from, `https://some-random-api.ml/canvas/wasted?avatar=${fotoWtNya}`))
                    console.log('Success sending Wasted image!')
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'triggered':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await bocchi.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.gif`)
                    const fileOutputPath = path.join(temp, 'video', `${name}.mp4`)
                    canvas.Canvas.trigger(mediaData)
                        .then((buffer) => {
                            canvas.write(buffer, fileInputPath)
                            ffmpeg(fileInputPath)
                                .outputOptions([
                                    '-movflags faststart',
                                    '-pix_fmt yuv420p',
                                    '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'
                                ])
                                .inputFormat('gif')
                                .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                                .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                                .on('end', async () => {
                                    console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                    await bocchi.sendMp4AsSticker(from, fileOutputPath, { fps: 30, startTime: '00:00:00.0', endTime : '00:00:05.0', loop: 0 }, { author: '@Orumaito', pack: 'Creado por WaifuBot' })
                                    console.log(color('[WAPI]', 'green'), 'Success sending GIF!')
                                    setTimeout(() => {
                                        fs.unlinkSync(fileInputPath)
                                        fs.unlinkSync(fileOutputPath)
                                    }, 30000)
                                })
                                .save(fileOutputPath)
                        })
                } else {
                    await bocchi.reply(from, ind.wait(), id)
                    const ppRaw = await bocchi.getProfilePicFromServer(sender.id)
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(ppRaw, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.gif`)
                    const fileOutputPath = path.join(temp, 'video', `${name}.mp4`)
                    canvas.Canvas.trigger(mediaData)
                        .then((buffer) => {
                            canvas.write(buffer, fileInputPath)
                            ffmpeg(fileInputPath)
                                .outputOptions([
                                    '-movflags faststart',
                                    '-pix_fmt yuv420p',
                                    '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'
                                ])
                                .inputFormat('gif')
                                .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                                .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                                .on('end', async () => {
                                    console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                    await bocchi.sendMp4AsSticker(from, fileOutputPath, { fps: 30, startTime: '00:00:00.0', endTime : '00:00:05.0', loop: 0 })
                                    console.log(color('[WAPI]', 'green'), 'Success sending GIF!')
                                    setTimeout(() => {
                                        fs.unlinkSync(fileInputPath)
                                        fs.unlinkSync(fileOutputPath)
                                    }, 30000)
                                })
                                .save(fileOutputPath)
                        })
                }
            break
            case 'rojo':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                    const encryptMediaWt2 = isQuotedImage ? quotedMsg : message
                    const dataPotoWt2 = await decryptMedia(encryptMediaWt2, uaOverride)
                    const fotoWtNya2 = await uploadImages(dataPotoWt2, `fotoProfilWt2.${sender.id}`)
                    await bocchi.reply(from, eng.wait(), id)
                    await bocchi.sendFileFromUrl(from, `https://some-random-api.ml/canvas/red?avatar=${fotoWtNya2}`, 'Wasted.jpg', 'El sticker esta siendo enviado', id).then(() => bocchi.sendStickerfromUrl(from, `https://some-random-api.ml/canvas/red?avatar=${fotoWtNya2}`))
                    console.log('Success sending Wasted image!')
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case 'gay':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                    const encryptMediaWt5 = isQuotedImage ? quotedMsg : message
                    const dataPotoWt5 = await decryptMedia(encryptMediaWt5, uaOverride)
                    const fotoWtNya5 = await uploadImages(dataPotoWt5, `fotoProfilWt5.${sender.id}`)
                    await bocchi.reply(from, eng.wait(), id)
                    await bocchi.sendFileFromUrl(from, `https://some-random-api.ml/canvas/gay?avatar=${fotoWtNya5}`, 'Wasted.jpg', 'El sticker esta siendo enviado', id).then(() => bocchi.sendStickerfromUrl(from, `https://some-random-api.ml/canvas/gay?avatar=${fotoWtNya5}`))
                    console.log('Success sending Wasted image!')
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
                break
            case 'nobg':
            case 'removebg':
            case 'stickernobg':
            case 'recorte':
            if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
            if (!isGroupMsg) return bocchi.reply(from, 'Comando solo para grupos!', id)
            if (!isOwner ) return await bocchi.reply(from, eng.notPremium(), id)
                            if (isMedia && type === 'image') {
                                try {
                                    bocchi.reply(from, '?? Espere...', id)
                                    var mediaData = await decryptMedia(message, uaOverride)
                                    var imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                                    var base64img = imageBase64
                                    var outFile = './media/img/noBg.png' //
                                    var result = await removeBackgroundFromImageBase64({ base64img, apiKey: '52kbBgHxRt5USDQzAh8xKLeF ', size: 'auto', type: 'auto', outFile })
                                    await fs.writeFile(outFile, result.base64img)
                                    
                                    await bocchi.sendImageAsSticker(from, `data:${mimetype};base64, ${result.base64img}, author: '@Orumaito ', pack: 'Creado por WaifuBot', keepScale:'true' `)
                                    
                                } catch (err) {
                                    console.log(err)
                                    bocchi.reply(from, 'Ocurrio una falla al procesar la imagen!', id)
                                }
                            } else {
                                bocchi.reply(from, 'Envie una imagen con la etiqueta *-stickernobg*', id)
                            }
                            break
                            case 'emoji':
                            case 'emot':
                 if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return bocchi.reply(from, 'Comando solo para grupos!', id)
                if (!q) return await bocchi.reply(from, `Formato incorrecto`, id)
                try {
                await bocchi.reply(from, eng.wait(), id)
                const emoji = emojiUnicode(q)
                await bocchi.sendImageAsSticker(from, await bocchi.download(`https://videfikri.com/api/emojitopng/?emojicode=${emoji}`), { author: '@Orumaito', pack: 'Creado por WaifuBot' })
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case 'colores': // By Poker fix the emojis
            if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
            if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
            const colorstick = body.slice(9)
            
            try {
            	await bocchi.reply(from, eng.wait(), id)
                const ttpc = await axios.get(`https://api.xteam.xyz/attp?text=${encodeURIComponent(colorstick)}`)
                const attp = ttpc.data.result
                await bocchi.sendImageAsSticker(from, attp, { author: '@Orumaito', pack: 'Creado por WaifuBot' })
            } catch(err) {
                console.error(err)
                await bocchi.reply(from, 'Error!', id)
            }
            break

            // NSFW
            case 'lewds':
            case 'lewd':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    nsfw.randomLewd()
                        .then(async ({ url }) => {
                            await bocchi.sendFileFromUrl(from, url, 'lewd.jpg', '', null, null, true)
                                .then(() => console.log('Success sending lewd!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    nsfw.randomLewd()
                        .then(async ({ url }) => {
                            await bocchi.sendFileFromUrl(from, url, 'lewd.jpg', '', null, null, true)
                                .then(() => console.log('Success sending lewd!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                }
            break
            case 'nhentai':
            case 'nh':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (args.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (isNaN(Number(args[0]))) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    console.log(`Searching nHentai for ${args[0]}...`)
                    const validate = await nhentai.exists(args[0])
                    if (validate === true) {
                        try {
                            const pic = await api.getBook(args[0])
                                .then((book) => {
                                     return api.getImageURL(book.cover)
                                })
                            const dojin = await nhentai.getDoujin(args[0])
                            const { title, details, link } = dojin
                            const { tags, artists, languages, categories } = details
                            let teks = `*Title*: ${title}\n\n*Tags*: ${tags.join(', ')}\n\n*Artists*: ${artists}\n\n*Languages*: ${languages.join(', ')}\n\n*Categories*: ${categories}\n\n*Link*: ${link}`
                            await bocchi.sendFileFromUrl(from, pic, 'nhentai.jpg', teks, id)
                            console.log('Success sending nHentai info!')
                        } catch (err) {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        }
                    } else {
                        await bocchi.reply(from, ind.nhFalse(), id)
                    }
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    console.log(`Searching nHentai for ${args[0]}...`)
                    const validate = await nhentai.exists(args[0])
                    if (validate === true) {
                        try {
                            const pic = await api.getBook(args[0])
                                .then((book) => {
                                     return api.getImageURL(book.cover)
                                })
                            const dojin = await nhentai.getDoujin(args[0])
                            const { title, details, link } = dojin
                            const { tags, artists, languages, categories } = details
                            let teks = `*Title*: ${title}\n\n*Tags*: ${tags.join(', ')}\n\n*Artists*: ${artists}\n\n*Languages*: ${languages.join(', ')}\n\n*Categories*: ${categories}\n\n*Link*: ${link}`
                            await bocchi.sendFileFromUrl(from, pic, 'nhentai.jpg', teks, id)
                            console.log('Success sending nHentai info!')
                        } catch (err) {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        }
                    } else {
                        await bocchi.reply(from, ind.nhFalse(), id)
                    }
                }
            break
               case 'waifu18':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    weeaboo.waifu(true)
                        .then(async ({ url }) => {
                            await bocchi.sendFileFromUrl(from, url, 'waifu.png', '', id)
                                .then(() => console.log('Success sending waifu!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    weeaboo.waifu(true)
                        .then(async ({ url }) => {
                            await bocchi.sendFileFromUrl(from, url, 'waifu.png', '', id)
                                .then(() => console.log('Success sending waifu!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                }
            break
            case 'fetish':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (ar.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    try {
                        if (ar[0] === 'armpits') {
                            nsfw.armpits()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'armpits.jpg', '', id)
                                        .then(() => console.log('Success sending armpits pic!'))
                                })
                        } else if (ar[0] === 'feets') {
                            nsfw.feets()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'feets.jpg', '', id)
                                        .then(() => console.log('Success sending feets pic!'))
                                })
                        } else if (ar[0] === 'thighs') {
                            nsfw.thighs()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'thighs.jpg', '', id)
                                        .then(() => console.log('Success sending thighs pic!'))
                                })
                        } else if (ar[0] === 'ass') {
                            nsfw.ass()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'ass.jpg', '', id)
                                        .then(() => console.log('Success sending ass pic!'))
                                })
                        } else if (ar[0] === 'boobs') {
                            nsfw.boobs()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'boobs.jpg', '', id)
                                        .then(() => console.log('Success sending boobs pic!'))
                                })
                        } else if (ar[0] === 'belly') {
                            nsfw.belly()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'belly.jpg', '', id)
                                        .then(() => console.log('Success sending belly pic!'))
                                })
                        } else if (ar[0] === 'sideboobs') {
                            nsfw.sideboobs()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'sideboobs.jpg', '', id)
                                        .then(() => console.log('Success sending sideboobs pic!'))
                                })
                        } else if (ar[0] === 'ahegao') {
                            nsfw.ahegao()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'ahegao.jpg', '', id)
                                        .then(() => console.log('Success sending ahegao pic!'))
                                })
                        } else {
                            await bocchi.reply(from, 'Tag not found.', id)
                        }
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, err, id)
                    }
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    try {
                        if (ar[0] === 'armpits') {
                            nsfw.armpits()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'armpits.jpg', '', id)
                                        .then(() => console.log('Success sending armpits pic!'))
                                })
                        } else if (ar[0] === 'feets') {
                            nsfw.feets()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'feets.jpg', '', id)
                                        .then(() => console.log('Success sending feets pic!'))
                                })
                        } else if (ar[0] === 'thighs') {
                            nsfw.thighs()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'thighs.jpg', '', id)
                                        .then(() => console.log('Success sending thighs pic!'))
                                })
                        } else if (ar[0] === 'ass') {
                            nsfw.ass()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'ass.jpg', '', id)
                                        .then(() => console.log('Success sending ass pic!'))
                                })
                        } else if (ar[0] === 'boobs') {
                            nsfw.boobs()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'boobs.jpg', '', id)
                                        .then(() => console.log('Success sending boobs pic!'))
                                })
                        } else if (ar[0] === 'belly') {
                            nsfw.belly()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'belly.jpg', '', id)
                                        .then(() => console.log('Success sending belly pic!'))
                                })
                        } else if (ar[0] === 'sideboobs') {
                            nsfw.sideboobs()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'sideboobs.jpg', '', id)
                                        .then(() => console.log('Success sending sideboobs pic!'))
                                })
                        } else if (ar[0] === 'ahegao') {
                            nsfw.ahegao()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'ahegao.jpg', '', id)
                                        .then(() => console.log('Success sending ahegao pic!'))
                                })
                        } else {
                            await bocchi.reply(from, 'Tag not found.', id)
                        }
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                }
            break
               case 'phdl':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isUrl(url) && !url.includes('pornhub.com')) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    try {
                        nsfw.phDl(url)
                            .then(async ({ title, download_urls, thumbnail_url }) => {
                                const count = Object.keys(download_urls).length
                                if (count !== 2) {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    const shortsMid = await misc.shortener(download_urls['480P'])
                                    const shortsHigh = await misc.shortener(download_urls['720P'])
                                    await bocchi.sendFileFromUrl(from, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)\n${shortsMid} (480P)\n${shortsHigh} (720P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                } else {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    await bocchi.sendFileFromUrl(from, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                }
                            })
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    try {
                        nsfw.phDl(url)
                            .then(async ({ title, download_urls, thumbnail_url }) => {
                                const count = Object.keys(download_urls).length
                                if (count !== 2) {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    const shortsMid = await misc.shortener(download_urls['480P'])
                                    const shortsHigh = await misc.shortener(download_urls['720P'])
                                    await bocchi.sendFileFromUrl(from, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)\n${shortsMid} (480P)\n${shortsHigh} (720P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                } else {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    await bocchi.sendFileFromUrl(from, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                }
                            })
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                }
            break
            case 'yuri':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    await bocchi.sendFileFromUrl(from, (await neko.nsfw.eroYuri()).url, 'yuri.jpg', '', id)
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    await bocchi.sendFileFromUrl(from, (await neko.nsfw.eroYuri()).url, 'yuri.jpg', '', id)
                }
            break
                 case 'lewdavatar':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    await bocchi.sendFileFromUrl(from, (await neko.nsfw.avatar()).url, 'avatar.jpg', '', id)
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    await bocchi.sendFileFromUrl(from, (await neko.nsfw.avatar()).url, 'avatar.jpg', '', id)
                }
            break
            case 'femdom':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    await bocchi.sendFileFromUrl(from, (await neko.nsfw.femdom()).url, 'femdom.jpg', '', id)
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    await bocchi.sendFileFromUrl(from, (await neko.nsfw.femdom()).url, 'femdom.jpg', '', id)
                }
            break
            case 'nhsearch':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (args.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    console.log(`Searching nHentai for ${q}...`)
                    nana.search(q)
                        .then(async (g) => {
                            let txt = `-----[ *NHENTAI* ]-----\n\n➸ *Result for*: ${q}`
                            for (let i = 0; i < g.results.length; i++) {
                                const { id, title, language } = g.results[i]
                                txt += `\n\n➸ *Title*: ${title}\n➸ *Language*: ${language.charAt(0).toUpperCase() + language.slice(1)}\n➸ *Link*: nhentai.net/g/${id}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                            }
                            await bocchi.sendFileFromUrl(from, g.results[0].thumbnail.s, `${g.results[0].title}`, txt, id)
                                .then(() => console.log('Success sending nHentai results!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    console.log(`Searching nHentai for ${q}...`)
                    nana.search(q)
                        .then(async (g) => {
                            let txt = `-----[ *NHENTAI* ]-----\n\n➸ *Result for*: ${q}`
                            for (let i = 0; i < g.results.length; i++) {
                                const { id, title, language } = g.results[i]
                                txt += `\n\n➸ *Title*: ${title}\n➸ *Language*: ${language.charAt(0).toUpperCase() + language.slice(1)}\n➸ *Link*: nhentai.net/g/${id}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                            }
                            await bocchi.sendFileFromUrl(from, g.results[0].thumbnail.s, `${g.results[0].title}`, txt, id)
                                .then(() => console.log('Success sending nHentai results!'))
                        })
                        .catch(async(err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                }
            break
            
            // COMANDOS DE GRUPOS
            case 'agregar':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await bocchi.reply(from, ind.botNotAdmin(), id)
                if (args.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                try {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.addParticipant(from, `${args[0]}@c.us`)
                    await bocchi.sendText(from, '🎉 Welcome! 🎉')
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case 'kill':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, eng.adminOnly(), id)
                if (!isBotGroupAdmins) return await bocchi.reply(from, eng.botNotAdmin(), id)
                if (mentionedJidList.length === 0) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await bocchi.reply(from, eng.wrongFormat(), id)
                await bocchi.sendStickerfromUrl(from, 'https://raw.githubusercontent.com/AllMightHero/Acciones/main/kill.gif')
                await bocchi.sendTextWithMentions(from, `Adios ~\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
                for (let i of mentionedJidList) {
                    if (groupAdmins.includes(i)) return bocchi.reply(from, 'Los administradores son inmunes a la DeathNote', id)
                    await bocchi.removeParticipant(groupId, i)
                }
            break
            break
            case 'promote':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await bocchi.reply(from, ind.botNotAdmin(), id)
                if (mentionedJidList.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (groupAdmins.includes(mentionedJidList[0])) return await bocchi.reply(from, ind.adminAlready(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.promoteParticipant(groupId, mentionedJidList[0])
                await bocchi.reply(from, ind.ok(), id)
            break
            case 'demote':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await bocchi.reply(from, ind.botNotAdmin(), id)
                if (mentionedJidList.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!groupAdmins.includes(mentionedJidList[0])) return await bocchi.reply(from, ind.notAdmin(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.demoteParticipant(groupId, mentionedJidList[0])
                await bocchi.reply(from, ind.ok(), id)
            break
            case 'vete':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                await bocchi.sendText(from, 'Sayonara...u.u~ 👋')
                await bocchi.leaveGroup(groupId)
            break
            case 'todos':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const groupMem = await bocchi.getGroupMembers(groupId)
                const lastEveryone = daily.getLimit(sender.id, _daily)
                if (lastEveryone !== undefined && cd - (Date.now() - lastEveryone) > 0) {
                    const time = ms(cd - (Date.now() - lastEveryone))
                    await bocchi.reply(from, ind.daily(time), id)
                } else if (isOwner) {
                    let txt = '╔══✪〘 *TODOS* 〙✪══\n'
                        for (let i = 0; i < groupMem.length; i++) {
                            txt += '╠➥'
                            txt += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                        }
                    txt += '╚═〘 *W A I F U B O T* 〙'
                    await bocchi.sendTextWithMentions(from, txt)
                } else {
                    let txt = '╔══✪〘 Mencionar a todos 〙✪══\n'
                        for (let i = 0; i < groupMem.length; i++) {
                            txt += '╠➥'
                            txt += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                        }
                    txt += '╚═〘 *W A I F U B O T* 〙'
                    await bocchi.sendTextWithMentions(from, txt)
                    daily.addLimit(sender.id, _daily)
                }
            break
            case 'nsfw':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (ar[0] === 'activar') {
                    if (isNsfw) return await bocchi.reply(from, ind.nsfwAlready(), id)
                    _nsfw.push(groupId)
                    fs.writeFileSync('./database/group/nsfw.json', JSON.stringify(_nsfw))
                    await bocchi.reply(from, ind.nsfwOn(), id)
                } else if (ar[0] === 'desactivar') {
                    _nsfw.splice(groupId, 1)
                    fs.writeFileSync('./database/group/nsfw.json', JSON.stringify(_nsfw))
                    await bocchi.reply(from, ind.nsfwOff(), id)
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'cambiarfoto':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return bocchi.reply(from, ind.botNotAdmin(), id)
                if (isMedia && isImage || isQuotedImage) {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await bocchi.setGroupIcon(groupId, imageBase64)
                    await bocchi.sendText(from, ind.ok())
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'antilink':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await bocchi.reply(from, ind.botNotAdmin(), id)
                if (ar[0] === 'activar') {
                    if (isDetectorOn) return await bocchi.reply(from, ind.detectorOnAlready(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    _antilink.push(groupId)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await bocchi.reply(from, ind.detectorOn(name, formattedTitle), id)
                } else if (ar[0] === 'desactivar') {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    _antilink.splice(groupId, 1)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await bocchi.reply(from, ind.detectorOff(), id)
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'bienvenida':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (ar[0] === 'activar') {
                    if (isWelcomeOn) return await bocchi.reply(from, ind.welcomeOnAlready(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    _welcome.push(groupId)
                    fs.writeFileSync('./database/group/welcome.json', JSON.stringify(_welcome))
                    await bocchi.reply(from, ind.welcomeOn(), id)
                } else if (ar[0] === 'desactivar') {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    _welcome.splice(groupId, 1)
                    fs.writeFileSync('./database/group/welcome.json', JSON.stringify(_welcome))
                    await bocchi.reply(from, ind.welcomeOff(), id)
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'autosticker':
            case 'autostiker':
            case 'autostik':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (ar[0] === 'activar') {
                    if (isAutoStickerOn) return await bocchi.reply(from, ind.autoStikOnAlready(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    _autosticker.push(groupId)
                    fs.writeFileSync('./database/group/autosticker.json', JSON.stringify(_autosticker))
                    await bocchi.reply(from, ind.autoStikOn(), id)
                } else if (ar[0] === 'desactivar') {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    _autosticker.splice(groupId, 1)
                    fs.writeFileSync('./database/group/autosticker.json', JSON.stringify(_autosticker))
                    await bocchi.reply(from, ind.autoStikOff(), id)
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'soloadmins':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return bocchi.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return bocchi.reply(from, ind.botNotAdmin(), id)
                if (ar[0] === 'activar') {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.setGroupToAdminsOnly(groupId, true)
                    await bocchi.sendText(from, ind.gcMute())
                } else if (ar[0] === 'desactivar') {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.setGroupToAdminsOnly(groupId, false)
                    await bocchi.sendText(from, ind.gcUnmute())
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'nuevolink':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return bocchi.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return bocchi.reply(from, ind.botNotAdmin(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.revokeGroupInviteLink(groupId);
                bocchi.sendTextWithMentions(from, `link de grupo actualizado por wa.me/${sender.id.replace('@c.us', '')}`)
            break
            case 'linkgrupo':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await bocchi.reply(from, ind.botNotAdmin(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const gcLink = await bocchi.getGroupInviteLink(groupId)
                const linkGc = `Grupo: *${formattedTitle}*\n\nLink: ${gcLink}`
                bocchi.reply(from, linkGc, id)
            break
            case 'creadorgrupo':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const ownerGc = chat.groupMetadata.owner
                await bocchi.sendTextWithMentions(from, `Propietario del grupo: @${ownerGc}`)
            break
            case 'admins':
            case 'admin':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const groupAdm = await bocchi.getGroupAdmins(groupId)
                const lastAdmin = daily.getLimit(sender.id, _daily)
                if (lastAdmin !== undefined && cd - (Date.now() - lastAdmin) > 0) {
                    const time = ms(cd - (Date.now() - lastAdmin))
                    await bocchi.reply(from, ind.daily(time), id)
                } else if (isOwner) {
                    let txt = '╔══✪〘 *ADMINISTRADORES* 〙✪══\n'
                    for (let i = 0; i < groupAdm.length; i++) {
                        txt += '╠➥'
                        txt += ` @${groupAdm[i].replace(/@c.us/g, '')}\n`
                    }
                    txt += '╚═〘 *W A I F U B O T* 〙'
                    await bocchi.sendTextWithMentions(from, txt)
                } else {
                    let txt = '╔══✪〘 *ADMINISTRADORES* 〙✪══\n'
                    for (let i = 0; i < groupAdm.length; i++) {
                        txt += '╠➥'
                        txt += ` @${groupAdm[i].replace(/@c.us/g, '')}\n`
                    }
                    txt += '╚═〘 *W A I F U B O T* 〙'
                    await bocchi.sendTextWithMentions(from, txt)
                    daily.addLimit(sender.id, _daily)
                }
            break
            case 'niveles':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (ar[0] === 'activar') {
                    if (isLevelingOn) return await bocchi.reply(from, ind.levelingOnAlready(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    _leveling.push(groupId)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    await bocchi.reply(from, ind.levelingOn(), id)
                } else if (ar[0] === 'desactivar') {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    _leveling.splice(groupId, 1)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    await bocchi.reply(from, ind.levelingOff(), id)
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
              case 'perfil':
            case 'yo':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                if (quotedMsg) {
                    const getQuoted = quotedMsgObj.sender.id
                    const profilePic = await bocchi.getProfilePicFromServer(getQuoted)
                    const username = quotedMsgObj.sender.name
                    const statuses = await bocchi.getStatus(getQuoted)
                    const benet = _ban.includes(getQuoted) ? 'Yes' : 'No'
                    const adm = groupAdmins.includes(getQuoted) ? 'Yes' : 'No'
                    const premi = premium.checkPremiumUser(getQuoted, _premium) ? 'Yes' : 'No'
                    const levelMe = level.getLevelingLevel(getQuoted, _level)
                    const xpMe = level.getLevelingXp(getQuoted, _level)
                    const req = 5 * Math.pow(levelMe, 2) + 50 * 1 + 100
                    const { status } = statuses
                    if (profilePic === undefined) {
                        var pfp = errorImg
                    } else {
                        pfp = profilePic
                    }
                    await bocchi.sendFileFromUrl(from, pfp, `${username}.jpg`, ind.profile(username, status, premi, benet, adm, levelMe, req, xpMe), id)
                } else {
                    const profilePic = await bocchi.getProfilePicFromServer(sender.id)
                    const username = pushname
                    const statuses = await bocchi.getStatus(sender.id)
                    const benet = isBanned ? 'Si' : 'No'
                    const adm = isGroupAdmins ? 'Si' : 'No'
                    const premi = isPremium ? 'Si' : 'No'
                    const levelMe = level.getLevelingLevel(sender.id, _level)
                    const xpMe = level.getLevelingXp(sender.id, _level)
                    const req = 5 * Math.pow(levelMe, 2) + 50 * 1 + 100
                    const { status } = statuses
                    if (profilePic === undefined) {
                        var pfps = errorImg
                    } else {
                        pfps = profilePic
                    }
                    await bocchi.sendFileFromUrl(from, pfps, `${username}.jpg`, ind.profile(username, status, premi, benet, adm, levelMe, req, xpMe), id)
                }
            break
            case 'wame':
		await bocchi.reply(from, `wa.me/${sender.id.replace(/@c.us/g, '')}`, id)
	        break
	case 'grupoinfo':
                 var totalMem = chat.groupMetadata.participants.length
                 const timestp = chat.groupMetadata.creation
                 const created = moment(timestp * 1000).format('DD-MM-YYYY HH:mm:ss')
                 var groupnameee = name
                 var desc = chat.groupMetadata.desc
                 var antilinkgc = isDetectorOn ? 'activado' : 'desactivado'
                 var autosticker = isAutoStickerOn ? 'activado' : 'desactivado'
                 var bienvenida = isWelcomeOn ? 'activado' : 'desactivado'
                 var grouppic = await bocchi.getProfilePicFromServer(chat.id)
                 if (grouppic == undefined) {
                    var pfp = errorImg
                 } else {
                 var pfp = grouppic 
                 }
                 bocchi.sendFileFromUrl(from, pfp, 'group.png', `Nombre Del Grupo: ${groupnameee}\n\nFecha De Creación: ${created}\n\nDescripción:\n${desc}\n\nUsuarios:  ${totalMem}\n\nBienvenida:  ${bienvenida}\n\nAuto-Sticker:  ${autosticker}\n\nAnti-Enlace:  ${antilinkgc}`, id)
            break
            case 'advertencia' :
        if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
        if (isGroupMsg && isGroupAdmins || isGroupMsg && isOwner) {
        if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly2(), id)
        if (!isBotGroupAdmins) return await bocchi.reply(from, ind.botNotAdmin(), id)
        if (quotedMsg) {
            const war = quotedMsgObj.sender.id
            const warss = warnss.getwarns(war, _warn, warnCount)
            if (Number(warss) >= 3) {
                bocchi.sendTextWithMentions(from, `    *⺀ EXPULSIÓN ⺀* ❌‼️\n\nEl usuario *@${war}* ha llego a su ultima advertencia, por lo cual será eliminado del grupo.`) 
                await bocchi.removeParticipant(groupId, war)
                warnss.resetwarn(war, _warn)
            } else {
            warnss.addwarn(war, _warn)
            bocchi.sendTextWithMentions(from, `    *⺀ ADVERTENCIA ⺀* ⚠️‼️\n\nEl usuario *@${war}* Ha sido advertido.\n\n*○ ${warss}/3*\n\n*Si tus advertencias llegan a 3 serás expulsado del grupo.*`)
            }  
        }}
    break
            // COMANDOS DEL DUEÑO 
            case 'bcgroup':
            if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
            let msgi = body.slice(9)
            const chatg = await bocchi.getAllGroups()
            for (let idg of chatg) {
                var cpk = await bocchi.getChatById(idg)
                if (!cpk.isReadOnly) await bocchi.sendText(idg.contact.id, `[ MENSAJE ]\n\n${msgi}`)
            }
            bocchi.reply(from, 'Transmision enviada!', id)
            break
            case 'limpiarchats':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                const allChats = await bocchi.getAllChats()
                for (let delChats of allChats) {
                    await bocchi.deleteChat(delChats.id)
                }
                await bocchi.reply(from, ind.doneOwner(), id)
            break
            case 'ss':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                const ses = await bocchi.getSnapshot()
                await bocchi.sendFile(from, ses, 'session.png', ind.doneOwner())
            break
            case 'ban':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                if (ar[0] === 'add') {
                    if (mentionedJidList.length !== 0) {
                        for (let benet of mentionedJidList) {
                            if (benet === botNumber) return await bocchi.reply(from, ind.wrongFormat(), id)
                            _ban.push(benet)
                            fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        }
                        await bocchi.reply(from, ind.doneOwner(), id)
                    } else {
                        _ban.push(args[1] + '@c.us')
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await bocchi.reply(from, ind.doneOwner(), id)
                    }
                } else if (ar[0] === 'del') {
                    if (mentionedJidList.length !== 0) {
                        if (mentionedJidList[0] === botNumber) return await bocchi.reply(from, ind.wrongFormat(), id)
                        _ban.splice(mentionedJidList[0], 1)
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await bocchi.reply(from, ind.doneOwner(), id)
                    } else{
                        _ban.splice(args[1] + '@c.us', 1)
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await bocchi.reply(from, ind.doneOwner(), id)
                    }
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'dejargrupos':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                if (!q) return await bocchi.reply(from, ind.emptyMess(), id)
                const allGroup = await bocchi.getAllGroups()
                for (let gclist of allGroup) {
                    await bocchi.sendText(gclist.contact.id, q)
                    await bocchi.leaveGroup(gclist.contact.id)
                }
                await bocchi.reply(from, ind.doneOwner())
            break
            case 'eval':
            case 'ev':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                try {
                    let evaled = await eval(q)
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    await bocchi.sendText(from, evaled)
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case 'apagar':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                await bocchi.sendText(from, 'Otsukaresama deshita~ 👋')
                    .then(async () => await bocchi.kill())
                    .catch(() => new Error('Target closed.'))
            break
            case 'premium':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                if (ar[0] === 'add') {
                    if (mentionedJidList.length !== 0) {
                        for (let prem of mentionedJidList) {
                            if (prem === botNumber) return await bocchi.reply(from, ind.wrongFormat(), id)
                            premium.addPremiumUser(prem, args[2], _premium)
                            await bocchi.reply(from, `*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${prem}\n➸ *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`, id)
                        }
                    } else {
                        premium.addPremiumUser(args[1] + '@c.us', args[2], _premium)
                        await bocchi.reply(from, `*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${args[1]}@c.us\n➸ *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`, id)
                    }
                } else if (ar[0] === 'del') {
                    if (mentionedJidList.length !== 0) {
                        if (mentionedJidList[0] === botNumber) return await bocchi.reply(from, ind.wrongFormat(), id)
                        _premium.splice(premium.getPremiumPosition(mentionedJidList[0], _premium), 1)
                        fs.writeFileSync('./database/bot/premium.json', JSON.stringify(_premium))
                        await bocchi.reply(from, ind.doneOwner(), id)
                    } else {
                        _premium.splice(premium.getPremiumPosition(args[1] + '@c.us', _premium), 1)
                        fs.writeFileSync('./database/bot/premium.json', JSON.stringify(_premium))
                        await bocchi.reply(from, ind.doneOwner(), id)
                    }
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'infowa':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                if (!q) return await bocchi.reply(from, ind.emptyMess(), id)
                await bocchi.setMyStatus(q)
                await bocchi.reply(from, ind.doneOwner(), id)
            break
            case 'serial':
                if (!isRegistered) return await bocchi.reply(from, ind.registered(), id)
                if (isGroupMsg) return await bocchi.reply(from, ind.pcOnly(), id)
                if (args.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                const serials = args[0]
                if (register.checkRegisteredUserFromSerial(serials, _registered)) {
                    const name = register.getRegisteredNameFromSerial(serials, _registered)
                    const age = register.getRegisteredAgeFromSerial(serials, _registered)
                    const time = register.getRegisteredTimeFromSerial(serials, _registered)
                    const id = register.getRegisteredIdFromSerial(serials, _registered)
                    await bocchi.sendText(from, ind.registeredFound(name, age, time, serials, id))
                } else {
                    await bocchi.sendText(from, ind.registeredNotFound(serials))
                }
            break
            case 'ns':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                const namaPack = q.substring(0, q.indexOf('|') - 1)
                const authorPack = q.substring(q.lastIndexOf('|') + 2)
                exif.create(namaPack, authorPack)
                await bocchi.reply(from, ind.doneOwner(), id)
            break
            case 'nuevonombre':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                if (!q || q.length > 25) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.setMyName(q)
                await bocchi.reply(from, `Listo!\n\nNombre cambiado a: ${q}`, id)
            break
            case 'dar':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                if (args.length !== 2) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (mentionedJidList.length !== 0) {
                    for (let give of mentionedJidList) {
                        level.addLevelingXp(give, Number(args[1]), _level)
                        await bocchi.reply(from, `XP agregado exitosamente a: ${give}\nCantidad agregada: ${args[1]}`, id)
                    }
                } else {
                    level.addLevelingXp(args[0] + '@c.us', Number(args[1]), _level)
                    await bocchi.reply(from, `XP agregado exitosamente a: ${args[0]}\nCantidad agregada: ${args[1]}`, id)
                }
            break
            case 'listagrupos':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                    bocchi.getAllGroups().then((res) => {
                    let gc = '*Group list*:\n'
                    for (let i = 0; i < res.length; i++) {
                        gc += `\n\n*No*: ${i+1}\n*Nama*: ${res[i].name}\n*Unread messages*: ${res[i].unreadCount} messages\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                    }
                    bocchi.reply(from, gc, id)
                })
            break
            case 'reset':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                const reset = []
                _limit = reset
                console.log('Resetting user\'s limit...')
                fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
                await bocchi.reply(from, ind.doneOwner(), id)
                console.log('Success!')
            break
            
            default:
                if (isCmd) {
                    await bocchi.reply(from, ind.cmdNotFound(command), id)
                }
            break
        }
    } catch (err) {
        console.error(color('[ERROR]', 'red'), err)
    }
}
/********** END OF MESSAGE HANDLER **********/
