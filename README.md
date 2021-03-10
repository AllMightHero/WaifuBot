<div align="center">
<img src="https://images5.alphacoders.com/911/911614.png" alt="BocchiBot" width="500" />

# _**BocchiBot**_
>BocchiBot es un bot de WhatsApp multipropósito que usa wa-automate-nodejs library!
>Traducido para toda latinoamericana al español, por Orumaito.
>Adición de funciones y corrección de errores.

<h3 align="center">Hecho con ❤️ por</h3>
<p align="center">
  <a href="https://github.com/SlavyanDesu"><img src="https://avatars3.githubusercontent.com/u/28254882?s=400&u=25765902db0b709938966cf4127ac11af5eafb5d&v=4" height="128" width="128" /></a>
  <a href="https://github.com/AlvioAdjiJanuar"><img src="https://avatars2.githubusercontent.com/u/68207798?s=400&u=29439908cd661d11443391cb74f5b07267b71117&v=4" height="128" width="128" /></a>
  <a href="https://github.com/VideFrelan"><img src="https://avatars1.githubusercontent.com/u/76523793?s=400&u=365f732cd3fc09ce75f6556715a00386005db57c&v=4" height="128" width="128" /></a>
</p>

<p align="center">
  <a href="https://github.com/SlavyanDesu"><img title="Author" src="https://img.shields.io/badge/Author-SlavyanDesu-purple.svg?style=for-the-badge&logo=github" /></a>
</p>

<p align="center">
  <a href="https://github.com/SlavyanDesu/BocchiBot"><img title="Stars" src="https://img.shields.io/github/stars/SlavyanDesu/BocchiBot?color=red&style=flat-square" /></a>
  <a href="https://github.com/SlavyanDesu/BocchiBot/network/members"><img title="Forks" src="https://img.shields.io/github/forks/SlavyanDesu/BocchiBot?color=red&style=flat-square" /></a>
  <a href="https://github.com/SlavyanDesu/BocchiBot/watchers"><img title="Watching" src="https://img.shields.io/github/watchers/SlavyanDesu/BocchiBot?label=watchers&color=blue&style=flat-square" /></a> <br>
  <a href="https://www.npmjs.com/package/@open-wa/wa-automate"><img src="https://img.shields.io/npm/v/@open-wa/wa-automate.svg?color=green" /></a>
  <img src="https://img.shields.io/node/v/@open-wa/wa-automate" />
  <img src="https://img.shields.io/badge/maintained%3F-yes-green.svg?style=flat" />
  <img src="https://img.shields.io/github/repo-size/SlavyanDesu/BocchiBot" /> <br>
  <a href="https://app.fossa.com/projects/git%2Bgithub.com%2FSlavyanDesu%2FBocchiBot?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FSlavyanDesu%2FBocchiBot.svg?type=shield"/></a>
  <a href="https://www.codefactor.io/repository/github/SlavyanDesu/BocchiBot"><img src="https://www.codefactor.io/repository/github/SlavyanDesu/BocchiBot/badge" /></a>
</p>

<p align="center">
  <a href="https://github.com/SlavyanDesu/BocchiBot#requirements">Requirements</a> •
  <a href="https://github.com/SlavyanDesu/BocchiBot#installation">Installation</a> •
  <a href="https://github.com/SlavyanDesu/BocchiBot#features">Features</a> •
  <a href="https://github.com/SlavyanDesu/BocchiBot#thanks-to">Thanks to</a> •
  <a href="https://github.com/SlavyanDesu/BocchiBot#license">License</a>
</p>

<h4 align="center">
  <a href="https://chat.whatsapp.com/KSG5C4SGlT2IpRtFm05owk">Join WA BOT DEV Indonesia!</a>
</h4>
</div>

# Requerimientos 
* [Node.js](https://nodejs.org/en/)
* [Git](https://git-scm.com/downloads)
* [FFmpeg](https://www.gyan.dev/ffmpeg/builds/)
* [libwebp](https://developers.google.com/speed/webp/download)
* Cualquier editor de texto

# Instalacion
## 📝 Clona este repositorio
```cmd
> git clone https://github.com/SlavyanDesu/BocchiBot.git
> cd BocchiBot
```

## ✍️ Edita el archivo
Edita los valores requeridos en `config.json`.
```json
{
    "ownerBot": "62812xxxxxxxx@c.us", 
    "prefix": "$",
    "uaOverride": "WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36",
    "itech": "api-key",
    "nao": "api-key",
    "vhtear": "api-key",
    "melodic": "administrator",
    "tobz": "BotWeA",
    "lol": "api-key"
}
```

`ownerBot`: tu numero de Whatsapp.  
`prefix`: prefijo a usar.  
`uaOverride`: tu "user agent".  
`itech`: I-Tech API key. Puedes conseguirlo [aqui](https://api.i-tech.id) creando una cuenta.  Después de eso, configure su IP/host estático en [here](https://api.i-tech.id/settings/profile).  
`nao`: SauceNAO API key. Puedes conseguirlo [aqui](https://saucenao.com/user.php) creando una cuents.  
`vhtear`: VHTear API key. Puedes conseguirlo [aqui](https://api.vhtear.com/) comprando su API key.  
`melodic`: MelodicXT API key. Puedes usar`administrator` key.   
`tobz`: Tobz API key. Puedes usar`BotWeA` key.   
`lol`: LolHuman API key. Puedes conseguirlo [aqui](https://lolhuman.herokuapp.com/) creando una cuenta. 

## 🗣️ Cambio de idioma
`Si desea cambiar el idioma a inglés, reemplace todas las funciones `ind` por` eng`.   
Example:
```js
ind.wrongFormat()
```
To:
```js
eng.wrongFormat()
```

## 🛠️ Instalando el FFmpeg
* Descargue una de las versiones disponibles de FFmpeg haciendo clic en [este link](https://www.gyan.dev/ffmpeg/builds/).
* Extrae el archivo en`C:\` path.
* Cambie el nombre de la carpeta extraída a ffmpeg`.
* Ejecute el símbolo del sistema como administrador.
* Ejecute este comando:
```cmd
> setx /m PATH "C:\ffmpeg\bin;%PATH%"
```
Nos dará una devolución de llamada como `SUCCESS: se guardó el valor especificado`.
*Ahora que tiene FFmpeg instalado, verifique que esté funcionando ejecutando este comando para ver el número de versión :
```cmd
> ffmpeg -version
```

## 📷 Instalando el libwebp
La instalación es la misma que instalar FFmpeg pero igual. Lo dejaré claro.
* Descargue el archivo de acuerdo con el sistema operativo que está utilizando haciendo clic en [este link](https://developers.google.com/speed/webp/download).
* Extrae el archivo en`C:\` path.
* Cambie el nombre del archivo extraído a `libwebp`.
* Ejecute el símbolo del sistema como administrador.
* Ejecute este comando:
```cmd
> setx /m PATH "C:\libwebp\bin;%PATH%"
```
Nos dará una devolución de llamada como `SUCCESS: se guardó el valor especificado`.
* Ahora que tiene libwebp instalado, verifique que esté instalado ejecutando este comando para ver el número de versión:
```cmd
> webpmux -version
```

## 🔍 Instala las dependencias
```cmd
> npm install
```

## 🆗 Ejecute el bot
Regular node:
```cmd
> npm start
```

PM2:
```cmd
> pm2 start index.js
> pm2 monit
```

PM2 with cron job  (restart after 5 hours):
```cmd
> pm2 start index.js --cron "* */5 * * *"
> pm2 monit
```

Después de eso, escanee el código QR usando su WhatsApp en su teléfono!

# Features
If you want to unlock premium commands, please buy me a coffee at least 1 on Ko-fi platform.

|     Leveling     |  Availability  |
| :--------------: | :------------: |
| Leveling         |       ✔️       |
| Set level color  |      Soon      |
| Set bar color    |      Soon      |

|     Sticker Maker     | Availability |
| :-------------------: | :----------: |
| Send/reply image      |      ✔️      |
| Send/reply GIF        |      ✔️      |
| Send/reply MP4        |      ✔️      |
| Text to sticker       |      ✔️      |
| Text to sticker GIF   |      ✔️      |
| Sticker to image      |      ✔️      |
| Sticker WM            |      ✔️      |
| Take sticker          |      ✔️      |

|      Downloader     | Availability |
| :-----------------: | :----------: |
| Facebook video      |      ✔️      |
| YouTube audio/video |      ✔️      |
| Joox musics         |      ✔️      |
| TikTok video        |      ✔️      |
| TikTok profile pic  |      ✔️      |
| Twitter video/image |      ✔️      |
| Instagram post      |      ✔️      |
| Instagram story     |      ✔️      |
| LK21                |      ✔️      |
| TikTok no WM        |      ✔️      |

|         Misc         | Availability |
| :------------------: | :----------: |
| Say                  |      ✔️      |
| Search lyrics        |      ✔️      |
| Shortlink maker      |      ✔️      |
| Wikipedia (EN)       |      ✔️      |
| Wikipedia (ID)       |      ✔️      |
| KBBI scarper         |      ✔️      |
| Stalk IG account     |      ✔️      |
| GSMArena scraper     |      ✔️      |
| Search food receipts |      ✔️      |
| YouTube search       |      ✔️      |
| Text to speech       |      ✔️      |
| AFK                  |      ✔️      |
| Distance calculator  |      ✔️      |
| Sticker search       |      ✔️      |
| Calculator           |      ✔️      |
| Al-Qur'an surah      |      ✔️      |
| List surah           |      ✔️      |
| Random contact       |      ✔️      |
| YouTube play         |      ✔️      |
| Whois                |      ✔️      |
| SMS gateway          |      ✔️      |
| Al-Qur'an tafseer    |      ✔️      |
| Al-Kitab search      |      ✔️      |
| LK21 scraper         |      ✔️      |
| Reminder             |      ✔️      |
| Image uploader       |      ✔️      |
| Sholat schedule      |      ✔️      |
| Latest Line stickers |      ✔️      |
| Check postage        |      ✔️      |
| Sending email        |      ✔️      |
| Random quotes        |      ✔️      |
| Genshin chara info   |      ✔️      |
| Bass boost           |      ✔️      |

|          Fun          | Availability |
| :-------------------: | :----------: |
| Weton jodoh           |      ✔️      |
| Horoscope             |      ✔️      |
| Harta tahta maker     |      ✔️      |
| Writing text maker    |      ✔️      |
| Glitch text maker     |      ✔️      |
| SimSimi chatbot       |      ✔️      |
| Blackpink logo maker  |      ✔️      |
| Pornhub logo maker    |      ✔️      |
| Galaxy text maker     |      ✔️      |
| Truth or dare         |      ✔️      |
| Asupan TikTok         |      ✔️      |
| PH comment maker      |      ✔️      |
| Triggered maker       |      ✔️      |
| Kiss image maker      |      ✔️      |
| 3D text maker         |      ✔️      |
| Freefire logo maker   |      ✔️      |
| Freefire banner maker |      ✔️      |
| Sliding text maker    |      ✔️      |
| Hero ML maker         |      ✔️      |
| Fire text maker       |      ✔️      |
| Couple balloon maker  |      ✔️      |
| Wasted maker          |      ✔️      |
| Cakl Lontong quiz     |      ✔️      |
| Hilih-ify text        |      ✔️      |
| Tebak gambar quiz     |      ✔️      |
| Random doge stickers  |      ✔️      |
| Dice                  |      ✔️      |

|       Weeb Zone       | Availability |
| :-------------------: | :----------: |
| Random neko girl      |      ✔️      |
| Random wallpaper      |      ✔️      |
| Random kemonomimi     |      ✔️      |
| Kusonime scraper      |      ✔️      |
| Komiku scraper        |      ✔️      |
| Anime tracer          |      ✔️      |
| Source finder         |      ✔️      |
| Random waifu pics     |      ✔️      |
| Anitoki latest update |      ✔️      |
| Random anime stickers |      ✔️      |
| Neonime latest update |      ✔️      |
| Anoboy on-going list  |      ✔️      |
| Search character      |      ✔️      |

|        Bot       | Availability |
| :--------------: | :----------: |
| Server usage     |      ✔️      |
| Blocked list     |      ✔️      |
| Ping             |      ✔️      |
| Delete messages  |      ✔️      |
| Bug report       |      ✔️      |
| Join group       |      ✔️      |
| Check serials    |      ✔️      |

|        Owner       | Availability |
| :----------------: | :----------: |
| Broadcasting       |      ✔️      |
| Clear all messages |      ✔️      |
| Leave all groups   |      ✔️      |
| Get snapshot       |      ✔️      |
| Ban                |      ✔️      |
| Eval               |      ✔️      |
| Shutdown           |      ✔️      |
| Add premium user   |      ✔️      |
| Set bot's info     |      ✔️      |
| Mute bot           |      ✔️      |

|    Moderation    | Availability |
| :--------------: | :----------: |
| Add              |      ✔️      |
| Kick             |      ✔️      |
| Promote          |      ✔️      |
| Demote           |      ✔️      |
| Leave bot        |      ✔️      |
| Everyone         |      ✔️      |
| Toogle NSFW      |      ✔️      |
| Set group icon   |      ✔️      |
| Anti-group link  |      ✔️      |
| Toogle welcome   |      ✔️      |
| Auto-sticker     |      ✔️      |
| Mute group       |      ✔️      |
| Anti-NSFW link   |      ✔️      |
| Anti-porn        |    Premium   |

|        NSFW        | Availability |
| :----------------: | :----------: |
| Lewds              |      ✔️      |
| nHentai lookup     |      ✔️      |
| Fetish             |      ✔️      |
| Latest Nekopoi     |      ✔️      |
| Pornhub downloader |      ✔️      |
| Waifu 18+          |      ✔️      |
| Yuri               |      ✔️      |
| Femdom             |      ✔️      |
| Lewd avatars       |      ✔️      |
| nHentai search     |      ✔️      |
| nHentai downloader | Premium/Free |
| Multi-lewds        |    Premium   |
| Multi-fetish       |    Premium   |

# Thanks to
* [`open-wa/wa-automate-nodejs`](https://github.com/open-wa/wa-automate-nodejs)
* [`YogaSakti/imageToSticker`](https://github.com/YogaSakti/imageToSticker)
* [`uukina`](https://github.com/uukina)
* [`MrPawNO`](https://github.com/MrPawNO)
* [`Pahri123`](https://github.com/Pahri123)
* [`LeviathanH`](https://github.com/LeviathanH)
* [`ferlitopym`](https://github.com/ferlitopym)
* [`AlvioAdjiJanuar`](https://github.com/AlvioAdjiJanuar)
* [`VideFrelan`](https://github.com/VideFrelan)
* [`VirusLauncher`](https://github.com/VirusLauncher)
* [`shansekai`](https://github.com/shansekai)
* [`Baguettou`](https://github.com/Baguettou)
* [`HAFizh-15`](https://github.com/HAFizh-15)
* [`TheSploit`](https://github.com/TheSploit)
* [`rashidsiregar28`](https://github.com/rashidsiregar28)
* [`irham01`](https://github.com/irham01)
* [`hardiantojek93`](https://github.com/hardiantojek93)

# License
**BocchiBot** © [SlavyanDesu](https://github.com/SlavyanDesu), released under the MIT License.
Authored and maintained by SlavyanDesu.

<p align="center">
  <a href="https://app.fossa.com/projects/git%2Bgithub.com%2FSlavyanDesu%2FBocchiBot?ref=badge_large"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FSlavyanDesu%2FBocchiBot.svg?type=large" />
</p>
