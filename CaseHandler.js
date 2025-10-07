// import { env } from 'node:process'

import 'dotenv/config'
import axios from "axios"

import util from "util";

import fetch from "node-fetch";

import JsConfuser from 'js-confuser';

import { spawn, exec, execSync } from 'child_process';

import { baileys, proto, generateWAMessage, generateWAMessageFromContent, getContentType, prepareWAMessageMedia, downloadContentFromMessage } from "@whiskeysockets/baileys";

import env from 'process';

import baileys from "@whiskeysockets/baileys";

import chalk from 'chalk'

import fs from 'fs'

import jimp from "jimp"

import moment from 'moment-timezone'

import ms from 'parse-ms'

import { yushi, shadow, danscot } from './library/couleur';

import {
    addPremiumUser,
    getPremiumExpired,
    getPremiumPosition,
    expiredCheck,
    checkPremiumUser,
    getAllPremiumUser
} from './library/prem';

import mess from './messages.js';
import index from './index.js';
// script

let Files = require.resolve(__filename);
require('fs').watchFile(Files, () => {
require('fs').unwatchFile(Files);
console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
delete require.cache[Files];
require(Files);
});module.exports = crazy = async (crazyNotDev, m, chatUpdate, store) => {
    try {
        // Message type handling
        const body = (
            m.mtype === "conversation" ? m.message.conversation :
                m.mtype === "imageMessage" ? m.message.imageMessage.caption :
                    m.mtype === "videoMessage" ? m.message.videoMessage.caption :
                        m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
                            m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
                                m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
                                    m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
                                        m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
                                            m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
                                                m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
        );

        const sender = m.key.fromMe
            ? crazyNotDev.user.id.split(":")[0] + "@s.whatsapp.net" || crazyNotDev.user.id
            : m.key.participant || m.key.remoteJid;

        const senderNumber = sender.split('@')[0];
        const budy = (typeof m.text === 'string' ? m.text : '');
        //const prefa = ["", "!", ".", ",", "🐤", "🗿"];
        const prefix = process.env.PREFIX;
        const from = m.key.remoteJid;
        const isGroup = from.endsWith("@g.us");
    } catch (e) {
        console.log(e);
    }
}
const contributeur = process.env.OWNER;

const botNumber = await crazyNotDev.decodeJid(crazyNotDev.user.id);
        const Access = [botNumber, ...contributeur, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
        const isCmd = body.startsWith(prefix);
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
        const args = body.trim().split(/ +/).slice(1);
        const pushname = m.pushName || "No Name";
        const text = q = args.join(" ");
        const quoted = m.quoted ? m.quoted : m;
        const mime = (quoted.msg || quoted).mimetype || '';
        const qmsg = (quoted.msg || quoted);
        const isMedia = /image|video|sticker|audio/.test(mime);

        // mes fonctions de groupes
        const groupMetadata = isGroup ? await crazy.groupMetadata(m.chat).catch((e) => { }) : "";
        const groupOwner = isGroup ? groupMetadata.owner : "";
        const groupName = isGroup ? groupMetadata.subject : "";
        const participants = isGroup ? await groupMetadata.participants : "";
        const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
        const groupMembers = isGroup ? groupMetadata.participants : "";
        const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
        const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
        const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;

        // autre fonctions
        import { smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, sleep } from './library/myfunc';

        import _prem from "./library/prem";
        const isPremium = Access ? true : _prem.checkPremiumUser(m.sender);

        // Photo
        let monimage = fs.readFileSync('./media/mini.jpeg');
        // Time
        const temps = moment.tz("Africa/Lagos").format("HH:mm:ss");


        // Console log
        if (m.message) {
            console.log(danscot("MINI BOT CRAZY °_°"), 'deeppink')
            console.log('\x1b[30m--------------------\x1b[0m');
            console.log(chalk.bgHex("#e74c3c").bold(`▢ New Message`));
            console.log(
                chalk.bgHex("#00FF00").black(
                    `   ⌬ Date: ${new Date().toLocaleString()} \n` +
                    `   ⌬ Message: ${m.body || m.mtype} \n` +
                    `   ⌬ Sender: ${m.pushname} \n` +
                    `   ⌬ JID: ${senderNumber}`
                )
            );
            if (m.isGroup) {
                console.log(
                    chalk.bgHex("#00FF00").black(
                        `   ⌬ Group: ${groupName} \n` +
                        `   ⌬ GroupJid: ${m.chat}`
                    )
                );
            }
            console.log();
        }

        let resize = async (image, width, height) => {
            let flemme = await jimp.read(image);
            let gabon = await flemme.resize(width, height).getBufferAsync(jimp.MIME_JPEG);
            return gabon;
        };

        async function reponse(textes) {
            crazyNotDev.sendMessage(m.chat, {
                text: textes,
                mentions: [m.sender],
                isForwaded: true,
            });
             {
                 quoted: m
             }
        };
        switch (command) {
            case 'menu': {
                const run = Date.now - Date.now;
                const runtime = process.runtime() * 1000;
                const crazymenu = `
╭───────°❀°───────╮
│  *MINI BOT CRAZY*  │
│   *Developed By Crazy*   │
╰───────°❀°───────╯
╭───────────────╮
│  *LISTE DES COMMANDES*  │

│  *PREFIX :* ${process.env.PREFIX}  │
│  *VERSION :* ${version}  │
│  *RUNTIME :* ${runtime(process.uptime())}  │
╰───────────────╯
╭───────────────╮
│  *OWNER*  │
│  ${process.env.OWNER_NUMBER}  │
╰───────────────╯
╭───────────────╮
│  *COMMANDES*  │
│  ${prefix}menu  │
│  ${prefix}owner  │
│  ${prefix}ping  │
│  ${prefix}alive  │
│  ${prefix}private  │
╰──────────────╯`;
                await crazyNotDev.sendMessage(m.chat, { image: monimage, caption: crazymenu }, { quoted: m });
            }
            break;

            case 'ping': {
                crazyNotDev.sendMessage(m.chat, 'Pong !', { quoted: m });

                const a = Date.now;

                const b = Date.now;

                const pong = a - b;

                await crazyNotDev.sendMessage(m.chat, 'Latence : *_${pong} Ms_*')
            }
            break;
            case 'owner':
            case 'proprietaire': {
                // react
                crazyNotDev.sendMessage(m.chat, { react: { text: '👑', key: m.key } });
                crazyNotDev.sendMessage(m.chat, { contacts: { displayName: "Crazy", contacts: [{ vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;Crazy;;;\nFN:Crazy\nORG:Crazy Inc.;\nTEL;type=CELL;type=VOICE;waid=${process.env.OWNER_NUMBER}:${process.env.OWNER_NUMBER}\nEND:VCARD` }] } }, { quoted: m });
            }
            break;
            // suis le .env
            case 'private': 
                if (!Access) return reponse(mess.owner);
                if (args[0] === "enable") {
                    if (process.env.PRIVATE === 'oui') return reponse('Le mode privé est déjà activé !');
                    process.env.PRIVATE = 'oui';
                    reponse('Le mode privé est maintenant activé !');
                } else if (args[0] === "disable") {
                    if (process.env.PRIVATE === 'non') return reponse('Le mode privé est déjà désactivé !');
                    process.env.PRIVATE = 'non';
                    reponse('Le mode privé est maintenant désactivé !');
                } else {
                    let buttons = [
                        { buttonId: `${prefix}private enable`, buttonText: { displayText: 'Enable' }, type: 1 },
                        { buttonId: `${prefix}private disable`, buttonText: { displayText: 'Disable' }, type: 1 }
                    ];
                    let buttonMessage = {
                        text: `*Current Status : ${process.env.PRIVATE}*\n\n*Usage : ${prefix}private <enable/disable>*`,
                        footer: process.env.FOOTER,
                        buttons: buttons,
                        headerType: 1
                    };
                    crazyNotDev.sendMessage(m.chat, buttonMessage, { quoted: m });
                }
                break;
                case 'alive':
                    const alivelogo = fs.readFileSync('./media/mini.jpeg');
                    crazyNotDev.sendMessage(m.chat, { image: alivelogo, caption: `*I am alive now!*\n\n*Runtime :* ${runtime(process.uptime())}\n*Date :* ${david.getDate()} - ${months[david.getMonth()]} - ${david.getFullYear()}\n*Time :* ${david.getHours()} : ${david.getMinutes()} : ${david.getSeconds()}\n*Version :* ${version}\n\n*Developed By Crazy*` }, { quoted: m });

                break;
        
            default: 
                if (isCmd && !craz.public) return;
                break;
        }

    
