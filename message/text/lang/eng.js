/* eslint-disable quotes */
const fs = require('fs-extra')
const { prefix, ownerNumber } = JSON.parse(fs.readFileSync('config.json'))

exports.wait = () => {
    return `Por favor espera un momento~`
}

exports.ok = () => {
    return `Listo~`
}

exports.wrongFormat = () => {
    return `¡Formato incorrecto! Por favor revisa el uso en *${prefix}menu*.`
}

exports.emptyMess = () => {
    return `¡Por favor envia el mensaje!`
}

exports.cmdNotFound = (cmd) => {
    return `Comando *${prefix}${cmd}* ¡no encontrado!`
}

exports.blocked = () => {
    return `WaifuBot no recibe llamadas. ¡Seras bloqueado por romper las reglas!\n\nContacta al propietario: wa.me/${ownerNumber.replace('@c.us', '')}`
}

exports.ownerOnly = () => {
    return `¡Este comando solo Orumaito-sama puede usarlo!`
}

exports.doneOwner = () => {
    return `Hecho, Orumaito-sama~`
}

exports.groupOnly = () => {
    return `¡Este comando solo puede usarse en grupos!`
}

exports.adminOnly = () => {
    return `Este comando solo pueden usarlo los administradores del grupo!`
}

exports.notNsfw = () => {
    return `El comando NSFW no se ha habilitado!`
}

exports.nsfwOn = () => {
    return `El comando NSFW se *habilitó* con éxito!`
}

exports.nsfwOff = () => {
    return `El comando NSFW fue exitosamente *deshabilitado*!`
}

exports.nsfwAlready = () => {
    return `El comando NSFW se habilitó con éxito antes.`
}

exports.addedGroup = (chat) => {
    return `Gracias por invitarme, miembros de *${chat.contact.name}*!\n\nRegístrese escribiendo:\n*${prefix}register* nombre  edad`
}

exports.nhFalse = () => {
    return `¡Codigo invalido!`
}

exports.listBlock = (blockNumber) => {
    return `------[ SALA DE LA VERGUENZA ]------\n\nTotal bloqueados: *${blockNumber.length}* usuario(s)\n`
}

exports.notPremium = () => {
    return `¡Perdon! Este comando solo puede ser utilizado por usuarios premium.`
}

exports.notAdmin = () => {
    return `¡El usuario no es un administrador!`
}

exports.adminAlready = () => {
    return `¡No se puede promocionar a un usuario que ya es administrador!`
}

exports.botNotPremium = () => {
    return `Este bot no admite comandos premium.  Comuníquese con el propietario de este bot.`
}

exports.botNotAdmin = () => {
    return `¡Primero haz que el bot sea administrador!`
}

exports.ytFound = (res) => {
    return `*¡Video encontrado!*\n\n➸ *Titulo*: ${res.title}\n➸ *Descripcion*:\n${res.desc}\n➸ *Duracion*: ${res.duration} minutes\n\nSe están enviando los medios, espere...`
}

exports.notRegistered = () => {
    return `¡No te has registrado en nuestra base de datos!\n\nRegistrese escribiendo:\n*${prefix}registrar* nombre  edad`
}

exports.registered = (name, age, userId, time, serial) => {
    return `*「 REGISTRO 」*\n\nSu cuenta se registro con exito con los datos:\n\n➸ *Nombre*: ${name}\n➸ *Edad*: ${age}\n➸ *ID*: ${userId}\n➸ *Tiempo registrado*: ${time}\n➸ *Serial*: ${serial}\n\nNote:\nNO compartas tu *serial* con otros!\n\n Considera leer las reglas *${prefix}reglas* primero.`
}

exports.registeredAlready = () => {
    return `Ya te has registrado antes.`
}

exports.received = (pushname) => {
    return `Hola ${pushname}!\nGracias por informar, trabajaremos en ello lo antes posible.`
}

exports.limit = (time) => {
    return `Lo siento, pero has alcanzado el límite con estos comandos..\nPor favor espera *${time.hours}* hora(s) *${time.minutes}* minuto(s) *${time.seconds}* segundo(s) mas.`
}

exports.videoLimit = () => {
    return `¡El tamaño del video es demasiado grande!`
}

exports.joox = (result) => {
    return `*¡Cancion encontrada!*\n\n➸ *Cantante*: ${result[0].penyanyi}\n➸ *Titulo*: ${result[0].judul}\n➸ *Album*: ${result[0].album}\n➸ *Ext*: ${result[0].ext}\n➸ *Tamano*: ${result[0].filesize}\n➸ *Duracion*: ${result[0].duration}\n\nSe están enviando los medios, espere...`
}

exports.gsm = (result) => {
    return `➸ *Modelo de telefono*: ${result.title}\n➸ *Especificaciones*: ${result.spec}`
}

exports.receipt = (result) => {
    return `${result.title}\n\n${result.desc}\n\n*Ingredientes*: ${result.bahan}\n\n*Pasos*:\n${result.cara}`
}

exports.ytResult = (urlyt, title, channel, duration, views) => {
    return `➸ *Titulo*: ${title}\n➸ *Canal*: ${channel}\n➸ *Duraciones*: ${duration}\n➸ *Vistas*: ${views}\n➸ *Link*: ${urlyt}`
}

exports.profile = (username, status, premi, benet, adm) => {
    return `-----[ *INFO DE USUARIO* ]-----\n\n➸ *Nombre de usuario*: ${username}\n➸ *Estado*: ${status}\n➸ *Premium*: ${premi}\n➸ *Banneado*: ${benet}\n➸ *Admin*: ${adm}`
}

exports.detectorOn = (name, formattedTitle) => {
    return `*「 ANTI LINKS DE GRUPOS 」*\n\nAnuncio para todos los miembros del grupo de ${(name || formattedTitle)}\nSi alguien envia un enlace de grupo en este grupo, sera expulsado automáticamente por WaifuBot.\n\nGracias.\n- Admin ${(name || formattedTitle)}`
}

exports.detectorOff = () => {
    return `¡La funcion de enlace anti-grupo se *deshabilito* con exito!`
}

exports.detectorOnAlready = () => {
    return `La funcion de enlace anti-grupo se ha habilitado antes.`
}

exports.linkDetected = () => {
    return `*「 ANTI LINKS DE GRUPOS 」*\n\n¡Has enviado un enlace de grupo!\nLo siento, pero tienes que irte...\nEncantada de conocerte~`
}

exports.levelingOn = () => {
    return `¡La funcion de niveles se *habilito* con exito!`
}

exports.levelingOff = () => {
    return `¡La funcion de niveles se *deshabilito* con exito!`
}

exports.levelingOnAlready = () => {
    return `La funcion de niveles se ha habilitado antes.`
}

exports.levelingNotOn = () => {
    return `¡La funcion de niveles no ha sido habilitada!`
}

exports.levelNull = () => {
    return `¡Aun no tienes ningun nivel!`
}

exports.welcome = (event) => {
    return `Bienvenido @${event.who.replace('@c.us', '')}!`
}

exports.welcomeOn = () => {
    return `¡La funcion de bienvenida se *habilito* con exito!`
}

exports.welcomeOff = () => {
    return `¡La funcion de bienvenida se *deshabilito* con exito!`
}

exports.welcomeOnAlready = () => {
    return `La funcion de bienvenida se ha habilitado antes.`
}

exports.minimalDb = () => {
    return `¡Necesito al menos *10* usuarios que tengan un nivel en la base de datos!`
}

exports.autoStikOn = () => {
    return `¡La funcion de Auto-sticker se *habilito* con exito!`
}

exports.autoStikOff = () => {
    return `¡La función de Auto-sticker se *deshabilito* con exito!`
}

exports.autoStikOnAlready = () => {
    return `La funcion de Auto-sticker ya ha sido activada antes.`
}

exports.afkOn = (pushname, reason) => {
    return `¡La funcion AFK se *habilito* con exito!\n\n➸ *Nombre de usuario*: ${pushname}\n➸ *Razon*: ${reason}`
}

exports.afkOnAlready = () => {
    return `¡La funcion AFK se ha habilitado antes!`
}

exports.afkMentioned = (getReason, getTime) => {
    return `*「 MODO AFK 」*\n\nSssttt! La persona está en estado AFK, ¡no lo molestes!\n➸ *Razon*: ${getReason}\n➸ *Desde*: ${getTime}`
}

exports.afkDone = (pushname) => {
    return `*${pushname}* ha vuelto de AFK, bienvenido~`
}

exports.gcMute = () => {
    return `*「 SILENCIO 」*\n\nSolo los administradores pueden enviar mensajes en este grupo.` 
}

exports.gcUnmute = () => {
    return `*「 SILENCIO DESACTIVADO 」*\n\nTodos los miembros pueden enviar mensajes en este grupo ahora.`
}

exports.notNum = (q) => {
    return `"${q}", ¡No son números!`
}

exports.playstore = (app_id, title, developer, description, price, free) => {
    return `➸ *Nombre*: ${title}\n➸ *ID*: ${app_id}\n➸ *Desarrollador*: ${developer}\n➸ *Gratis*: ${free}\n➸ *Precio*: ${price}\n➸ *Descripcion*: ${description}`
}

exports.shopee = (nama, harga, terjual, shop_location, description, link_product) => {
    return `➸ *Nombre*: ${nama}\n➸ *Precio*: ${harga}\n➸ *Vendido*: ${terjual}\n➸ *Locacion*: ${shop_location}\n➸ *Link del producto*: ${link_product}\n➸ *Descripcion*: ${description}`
}

exports.pc = (pushname) => {
    return `*「 REGISTRO 」*\n\n¡Su cuenta está registrada correctamente! ${pushname}~ :3`
}

exports.registeredFound = (name, age, time, serial, userId) => {
    return `*「 REGISTRADO 」*\n\n¡Cuenta encontrada!\n\n➸ *Nombre*: ${name}\n➸ *Edad*: ${age}\n➸ *ID*: ${userId}\n➸ *Tiempo registrado*: ${time}\n➸ *Serial*: ${serial}`
}

exports.registeredNotFound = (serial) => {
    return `Cuenta con numero de serie: *${serial}* no encontrada!`
}

exports.ytPlay = (result) => {
    return `*「 PLAY 」*\n\n➸ *Titulo*: ${result.title}\n➸ *Duracion*: ${result.duration}\n➸ *Link*: ${result.url}\n\nSe están enviando los medios, espere...`
}

exports.pcOnly = () => {
    return `¡Este comando solo se puede usar en un chat privado!`
}

exports.linkNsfw = () => {
    return `*「 ANTI NSFW LINK 」*\n\n¡Has enviado un enlace NSFW!\nLo siento, pero tienes que irte...`
}

exports.ageOld = () => {
    return `¡Eres demasiado mayor para usar esta función!  Vuelva a su juventud para poder utilizar esta funcion1.`
}

exports.fakeLink = () => {
    return `Ow, este enlace parece un poco sospechoso, por la seguridad de los miembros de este grupo, te sacare.\nBye~.`
}

exports.limit = () => {
    return `
*── 「 LIMITE 」 ──*

¡Se agotó el limite de uso! Por favor haz lo siguiente:
❏ *_Espera hasta 12:00 AM (GMT+7)_*
    `
}

exports.menu = (jumlahUser, level, xp, role, pushname, requiredXp, premium) => {
    return `
------[ BIENVENIDO ]-----

======================
➸ *Nombre*: ${pushname}
➸ *Nivel*: ${level}
➸ *XP*: ${xp} / ${requiredXp}
➸ *Rol*: ${role}
➸ *Premium*: ${premium}
======================

Total registrados: *${jumlahUser}*

Los siguientes menus están disponibles:

➸ *[1]* Descarga 
➸ *[2]* Bot
➸ *[3]* Diversos
➸ *[4]* Sticker
➸ *[5]* Otaku 
➸ *[6]* Diversión 
➸ *[7]* Grupos
➸ *[8]* NSFW
➸ *[9]* Dueño
➸ *[10]* Nivel

Teclea *${prefix}menu* + número índice para abrir el menú de la página seleccionada, ejemplo *-menu* 1.

Nota:
Trate bien al bot, el propietario actuará con firmeza si el usuario viola las reglas.
 Este bot tiene anti-spam en forma de comando de enfriamiento durante *5 segundos* cada vez que lo usa.
    `
}

exports.menuDownloader = () => {
    return `
-----[ DESCARGA ]-----
1. *${prefix}musica* ( *NO USE CONTINUAMENTE* )
Descarga canciones de YouTube
Otros usos: -
Uso: *${prefix}musica* Artista+Cancion/Link

2. *${prefix}video* ( *NO USE CONTINUAMENTE* )
Descarga videos de YouTube
Otros usos: -
Uso: *${prefix}video* Artista+Cancion/Link

3. *${prefix}facebook*
Descarga videos de Facebook
Otros usos: *fb*
Uso: *${prefix}facebook* link

4. *${prefix}moddroid*
Buscar un mod en moddroid.
Otros usos: -
Uso: *${prefix}moddroid* nombre de APK. 

5. *${prefix}happymod*
Buscar un mod en happymod.
Otros usos: -
Uso: *${prefix}happymod* nombre de APK. 

_Indice de menu [1]_
    `
}

exports.menuBot = () => {
    return `
-----[ BOT ]-----

1. *${prefix}reglas*
Lea las reglas.
Otros usos: *regla*
Uso: *${prefix}reglas*

2. *${prefix}menu*
Muestra los comandos disponibles.
Otros usos: ayuda
Uso: *${prefix}menu* + numero Indice. 

3. *${prefix}estado*
Muestra el estado del bot.
Otros usos: -
Uso: *${prefix}estado*

4. *${prefix}bloqueados*
Verifique los números bloqueados.
Otros usos: -
Uso: *${prefix}bloqueados*

5. *${prefix}ping*
Comprueba la velocidad del bot.
Otros usos: *p*
Uso: *${prefix}ping*

6. *${prefix}borrar*
Eliminar mensajes del bot.
Otros usos: *del*
Uso: Responder a los mensajes que desea eliminar con el texto *${prefix}borrar*.

7. *${prefix}reporte*
Informar errores al propietario. 
Otros usos: -
Uso: *${prefix}reporte* texto

8. *${prefix}tyc*
Términos y Condiciones.
Otros usos: -
Uso: *${prefix}tyc*

9. *${prefix}unir*
Uneme a un grupo a traves del enlace.
Otros usos: -
Uso: *${prefix}unir* link del grupo. 

10. *${prefix}propietario*
Enviare el contacto del propietario.
Otros usos: -
Uso: *${prefix}propietario*

11. *${prefix}getpic*
Enviaré la foto de perfil de un usuario.
Otros usos: -
Uso: *${prefix}getpic* @user/62812xxxxxxxx

12. *${prefix}tiempopremium*
Verificación de tiempo activo premium.
Otros usos: *cekpremium*
Uso: *${prefix}tiempopremium*

13. *${prefix}listapremium*
Lista de usuarios premium.
Otros usos: -
Uso: *${prefix}listapremium*

14. *${prefix}limite*
Verifique su límite restante.
Otros usos: -
Uso: *${prefix}limite*

15. *${prefix}activo*
Verifique el tiempo de actividad del bot. 
Uso: *${prefix}activo*

_Indice de menu [2]_
    `
}

exports.menuMisc = () => {
    return `
-----[ DIVERSOS ]-----

1. *${prefix}decir*
El bot repetirá tu mensaje.
Otros usos: -
Uso: *${prefix}decir* texto. 

2. *${prefix}audio*
Crea un texto a voz. Necesito un codigo de idioma, puede encontrarlo aqui https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
Otros usos: -
Uso: *${prefix}audio* código de lenguaje | texto. 

3. *${prefix}afk*
Configurare su cuenta en modo AFK, le dire quienes lo mencionaron.
Otros usos: -
Uso: *${prefix}afk* razón. Envíe cualquier mensaje al grupo para deshabilitarlo.

4. *${prefix}calculadora*
Una calculadora.
* = multiplicacion.
+ = suma. 
- = resta. 
/ = división. 
Otros usos: - 
Uso: *${prefix}calculadora* 12*12

5. *${prefix}aleatorio*
Obtenga un contacto aleatorio (en privado).
Otros usos: -
Uso: *${prefix}aleatorio*

6. *${prefix}IP*
Búsqueda de IP.
Otros usos: -
Uso: *${prefix}IP* direccion de IP. 

7. *${prefix}recordatorio*
Recordatorio. 
*s* - segundos
*m* - minutos
*h* - houras
*d* - dias
Otros usos: -
Uso: *${prefix}recordatorio* 10s | asunto del recordatorio. 

8. *${prefix}imagetourl*
Crea un URL/Link de una imagen que envíes.
Otros usos: *imgtourl*
Uso: Envía una imagen con el comando *${prefix}imagetourl* o responde a una imagen con el comando *${prefix}imagetourl*.

9. *${prefix}traducir*
Traduce un texto. 
Otros usos: *trad*
Uso: *${prefix}traducir* texto | código de lenguaje. 

10. *${prefix}coronavirus*
Muestra los casos de COVID-19 de un país.
Otros usos: *covid*
Uso: *${prefix}coronavirus* País. 

11. *${prefix}imagen*
Busca una imagen! 
Otros usos: *image*
Uso: *${prefix}imagen* imagen a buscar. 

12. *${prefix}google*
Busca algo en google! 
Otros usos: *googlesearch*
Uso: ejemplo *${prefix}google* Anime español. 

_Indice de menu [3]_
    `
}

exports.menuSticker = () => {
    return `
-----[ STICKER ]-----

1. *${prefix}sticker*
Crea stickers con imágenes enviadas o respondidas. 
Otros usos: *stiker*
Uso: Envia una imagen con el comando *${prefix}sticker* o responde a una imagen con el comando *${prefix}sticker*.

2. *${prefix}stickergif*
Crea sticker a partir de videos/GIFs.
Otros usos: *stikergif*
Uso: Envia videos/GIFs con el comando *${prefix}stickergif* o responda a los videos/GIFs con el comando *${prefix}stickergif*.

3. *${prefix}stickertoimg*
Convierte un sticker a imagen.
Otros usos: *stikertoimg*
Uso: Responda a un sticker con el comando *${prefix}stickertoimg*.

4. *${prefix}ttp*
Texto a sticker. 
Otros usos: -
Uso *${prefix}ttp* texto. 

5. *${prefix}renombrar*
Cambia el nombre de paquete y autor de un Sticker.
Otros usos: *cstick*
Uso: Responda a un sticker con el comando *${prefix}rename* y el nuevo texto que desea agregar ej. *${prefix}rename* Orumaito | WaifuBot.

6. *${prefix}wasted*
Crea un efecto de wasted como GTA.
Otros usos: -
Uso: Envía una imagen con el comando *${prefix}wasted* o responde a una imagen con el comando *${prefix}wasted*.
 
 7. *${prefix}triggered*
Crea un gif con la leyenda triggered. 
Otros usos: -
Uso: Envía una imagen con el comando *${prefix}triggered* o responde a una imagen con el comando *${prefix}triggered*.

 8. *${prefix}rojo*
Crea una imagen y sticker con un filtro rojo .
Otros usos: -
Uso: Envía una imagen con el comando *${prefix}rojo* o responde a una imagen con el comando *${prefix}rojo*.

9. *${prefix}gay*
Crea una imagen y sticker con los colores de la bandera gay. 
Otros usos: -
Uso: Envía una imagen con el comando *${prefix}gay* o responde a una imagen con el comando *${prefix}gay*.

10. *${prefix}nobg*
Crea Stickers sin fondo (exclusivo para el propietario). 
Otros usos: *recorte*
Uso: Envie una imagen con el comando *${prefix}nobg*

11. *${prefix}emoji*
Crea un sticker de un emoji (solo algunos) 
Otros usos : - 
Uso: Responda a un emoji con el comando *${prefix}emoji*

12. *${prefix}colores*
Crea un sticker de texto/emoji con colores. 
Uso: *${prefix}emoji* texto/emoji 

_Indice de menu [4]_
    `
}

exports.menuWeeaboo = () => {
    return `
-----[ ZONA OTAKU ]-----

1. *${prefix}neko*
Envío la imagen de una chica neko :3.
Otros usos: -
Uso: *${prefix}neko*

2. *${prefix}wallpaper*
Envío anime wallpapers.
Otros usos: *wp*
Uso: *${prefix}wallpaper*

3. *${prefix}kemono*
Envío chicas anime con Kemono.
Otros usos: -
Uso: *${prefix}kemono*

7. *${prefix}queanime*
Busque un anime a través de una captura de pantalla. 
Otros usos: -
Uso: Mande capturas de pantalla con el comando *${prefix}queanime* o responda a capturas de pantalla con el comando *${prefix}queanime*.

8. *${prefix}waifu*
Envío fotos de Waifus random.
Otros usos: -
Uso: *${prefix}waifu*

_Indice de menu [5]_
    `
}

exports.menuFun = () => {
    return `
-----[  DIVERSIÓN ]-----

1. *${prefix}kiss*
Besa a alguien  ( ͡° ͜ʖ ͡°) (formato de imagen).
Otros usos: -
Uso: Manda una imagen con el comando *${prefix}kiss* o responde a una imagen con el comando *${prefix}kiss*.

2. *${prefix}comentarioph*
Crea un comentario al estilo PornHub.
Otros usos: -
Uso: *${prefix}comentarioph* Nombre de usuario | texto. 

6. *${prefix}patear*
Dale una patada a alguien del grupo. 
Otros usos. - 
Uso:  *${prefix}patear* @miembro1

7. *${prefix}besar*
Date un beso con alguien del grupo 7u7. 
Otros usos. - 
Uso:  *${prefix}besar* @miembro1

8. *${prefix}golpear*
Golpea a alguien del grupo. 
Otros usos. - 
Uso:  *${prefix}golpear* @miembro1

9. *${prefix}logo*
Otros usos: - 
Uso: *{prefix}logo* Nombre. 


_Indice de menu [6]_
    `
}

exports.menuModeration = () => {
    return `
-----[ GRUPOS ]-----

1. *${prefix}agregar*
Agrega usuarios a tu grupo.
Otros usos: -
Uso: *${prefix}agregar* 628xxxxxxxxxx

2. *${prefix}kill*
Saca a usuarios de tu grupo.
Otros usos: -
Uso: *${prefix}kill* @member1

3. *${prefix}promote*
Convierte en admins a miembros de tu grupo.
Otros usos: -
Uso: *${prefix}promote* @member1

4. *${prefix}demote*
Retira el admin a un miembro de tu grupo. 
Otros usos: -
Uso: *${prefix}demote* @member1

5. *${prefix}vete*
Hazme salir de tu grupo :(.
Otros usos: -
Uso: *${prefix}vete*

6. *${prefix}todos*
Mencionare a todos los miembros del grupo.
Otros usos: -
Uso: *${prefix}todos*

7. *${prefix}cambiarfoto*
Cambia la foto del tu grupo.
Otros usos: -
Uso: Envía imágenes con em comando *${prefix}cambiarfoto* o responde a imágenes con el comando *${prefix}cambiarfoto*

8. *${prefix}antilink*
Activa la función a ti-links de grupos. 
Otros usos: -
Uso: *${prefix}antilink* activar/desactivar

9. *${prefix}bienvenida*
Activa la función de bienvenida y adiós. 
Otros usos: -
Uso: *${prefix}bienvenida* activar/desactivar

10. *${prefix}autosticker*
Activa la cuncion de  auto-stickers. Toda imagen que manden será convertida en un sticker.
Otros usos: *autostiker autostik*
Uso: *${prefix}autostiker* activar/desactivar

11. *${prefix}antinsfw*
Activa la función anti-NSFW links. 
Otros usos: -
Uso: *${prefix}antinsfw* activar/desactivar

12. *${prefix}soloadmins*
Configure el grupo para que solo administradores puedan enviar mensajes. 
Otros usos: -
Uso: *${prefix}soloadmins* activar/desactivar

13. *${prefix}nuevolink*
Restablezca el enlace de su grupo.
Otros usos: -
Uso: *${prefix}nuevolink*

14. *${prefix}linkgrupo*
Obtenga el enlace de su grupo.
Otros usos: -
Uso: *${prefix}linkgrupo*

15. *${prefix}creadorgrupo*
Mire quien creo el grupo.
Otros usos: -
Uso: *${prefix}creadorgrupo*

16. *${prefix}admins*
Muestra a los administradores del grupo.
Otros usos: *admin*
Uso: *${prefix}admins*

17. *${prefix}niveles*
Active la funcion de niveles
Otros usos: -
Uso: *${prefix}niveles* activar /desactivar 

18. *${prefix}perfil*
Muestra su perfil de usuario.
Otros usos: *yo*
Uso: *${prefix}perfil*

19. *${prefix}wame*
Enviaré tu wa.me.
Otros usos: -
Uso: *${prefix}wame*

_Indice de menu [7]_
    `
}

exports.menuNsfw = () => {
    return `
-----[ NSFW ]-----

1. *${prefix}lewds*
Envío fotos de anime lascivo.
Otros usos: *lewd*
Uso: *${prefix}lewds*

2. *${prefix}nhentai*
Envío información de un doujinshi desde nHentai.
Otros usos: *nh*
Uso: *${prefix}nhentai* codigo nuclear

3. *${prefix}waifu18*
Envío fotos waifu NSFW aleatorias.
Otros usos: -
Uso: *${prefix}waifu18*

4. *${prefix}fetish*
Envío fotos de fetiches.
Otros usos: -
Uso: *${prefix}fetish* armpits/feets/thighs/ass/boobs/belly/sideboobs/ahegao

5. *${prefix}phdl*
Genera links de descarga de videos de Pornhub.
Otros usos: -
Uso *${prefix}phdl* link

6. *${prefix}yuri*
Envío fotos de yuri al azar.
Otros usos: -
Uso: *${prefix}yuri*

7. *${prefix}lewdavatar*
Envío avatares lascivos al azar.
Otros usos: -
Uso: *${prefix}lewdavatar*

8. *${prefix}femdom*
Envío fotos de femdom al azar.
Otros usos: -
Uso: *${prefix}femdom*

9. *${prefix}nhsearch*
nHentai búsqueda.
Otros usos: -
Uso: *${prefix}nhsearch* Género. 

_Indice de menu [8]_
    `
}

exports.menuOwner = () => {
    return `
-----[ DUEÑO ]-----
Hola Orumaito-sama ヽ(・∀・)ﾉ!

1. *${prefix}transmision*
Haz una transmisión.
Otros usos: -
Uso: *${prefix}transmision* texto. 

2. *${prefix}limpiarchats*
Elimina todos los chats de la cuenta del bot.
Otros usos: -
Uso: *${prefix}limpiarchats*

3. *${prefix}ss*
Tomó una captura de pantalla de la sesión desde la cuenta del bot.
Otros usos: -
Uso: *${prefix}ss*

4. *${prefix}ban*
Agregué / elimine usuarios baneados. 
Otros usos: -
Uso: *${prefix}ban* add/del @user/62812xxxxxxxx. 

5. *${prefix}dejargrupos*
Hágame salir de todos los grupos.
Otros usos: -
Uso: *${prefix}dejargrupos*

6. *${prefix}eval*
Evalúe el código JavaScript.
Otros usos: *ev*
Uso: *${prefix}eval*

7. *${prefix}apagar*
Apagar bot.
Otros usos: -
Uso: *${prefix}apagar*

8. *${prefix}premium*
Agregué / elimine usuarios premium.
Otros usos: -
Uso: *${prefix}premium* add/del @user. 

9. *${prefix}infowa*
Cambie mi info de Whatsapp.
Otros usos: *setstatus setstat*
Uso: *${prefix}infowa* texto.

10. *${prefix}serial*
Verifique el número de serie del usuario.
Otros usos: -
Uso: *${prefix}serial* numero de serie del usuario. 

11. *${prefix}ns*
Ajuste el nombre de paquete de los stickers.
Otros usos: -
Uso: *${prefix}ns* nombre del paquete  | nombre del autor

12. *${prefix}nuevonombre*
Cambia el nombre del bot.  Máximo 25 caracteres.
Otros usos: -
Uso: *${prefix}nuevonombre* texto.

13. *${prefix}dar*
De experiencia a los usuarios.
Otros usos: -
Uso: *${prefix}dar* @usuario 1000XP

14. *${prefix}listagrupos*
Mire los grupos en los que estoy.
Otros usos: -
Uso: *${prefix}listagrupos*

15. *${prefix}reset*
Me reiniciare.
Otros usos: -
Uso: *${prefix}reset*

16. *Texto sin prefijo*
Mandare un audio 7u7
Uso: Baka , Senpai , Onichan , Buenos dias, Test, Sawarasenai, 

17. *Musica Random*
Las favoritas de Orumaito
Uso: Hentai, 

_Indice de menu [9]_
    `
}

exports.menuLeveling = () => {
    return `
-----[ NIVEL ]-----

1. *${prefix}nivel*
Comprueba tu nivel.
Otros usos: -
Uso: *${prefix}nivel*

2. *${prefix}listadenivel*
Consulte la tabla de clasificación.
Otros usos: *top*
Uso: *${prefix}listadenivel*

_Indice de menu [10]_
    `
}

exports.rules = () => {
    return `
-----[ REGLAS ]-----

1. NO envíe spam al bot. 
 Penalización: *ADVERTENCIA / BLOQUEO TEMPORAL*
 
2. NO LLAME/TEXTEE AL BOT
Penalización: *BLOQUEO TEMPORAL*

3. No abuse del bot.
Penalización: *BLOQUEO PERMANENTE*
 
4. No agrege a grupos al bot.
Penalización: *BLOQUEO PERMANENTE*

Si comprende estas reglas, escriba *${prefix}menu* para empezar.

Dueño:
wa.me/+525518064309 (Orumaito)

Código fuente de:
wa.me/+6281294958473 (Slavyan)
    `
}

// Note for owner/hoster, please DO NOT edit this section.
exports.tos = () => {
    return `
-----[ TÉRMINOS Y CONDICIONES ]-----

Este bot es un bot de código abierto, viene con el nombre de BocchiBot que está disponible en GitHub de forma gratuita.
El propietario / hoster de este bot es independiente de la responsabilidad y supervisión del desarrollador (Slavyan).
El propietario / hoster puede plagiar, agregar, eliminar, reemplazar el código fuente con notas *NO VENDER* este código fuente en ninguna forma.
Si ocurre un error, la primera persona con la que debe comunicarse es el propietario / hoster.
 
Si quieres contribuir a este proyecto, vista:
https://github.com/AllMightHero/WaifuBot

Personas de contacto:

Dueño:
wa.me/+525518064309 (Orumaito)

(Desarrollador) 
wa.me/+6281294958473 (Slavyan)

Gracias!

- Slavyan
    `
}
