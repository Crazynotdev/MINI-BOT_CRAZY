import 'dotenv/config';
import axios from "axios";
import util from "util";
import fetch from "node-fetch";
import { spawn, exec, execSync } from 'child_process';
import { makeWASocket, proto, generateWAMessage, generateWAMessageFromContent, getContentType, prepareWAMessageMedia, downloadContentFromMessage, jidDecode } from "@whiskeysockets/baileys";
import chalk from 'chalk';
import fs from 'fs';
import jimp from "jimp";
import moment from 'moment-timezone';
import ms from 'parse-ms';
import { yushi, shadow, danscot } from './library/couleur.js';
import mess from './messages.js';
import {
    addPremiumUser,
    getPremiumExpired,
    getPremiumPosition,
    expiredCheck,
    checkPremiumUser,
    getAllPremiumUser
} from './library/prem.js';
import {
    smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, sleep
} from './library/myfunc.js';

// Handler principal
export default async function CaseHandler(crazyNotDev, m, chatUpdate, store) {
    try {
        // Quelques variables utiles
        const isGroup = m.isGroup || false;
        const senderNumber = m.sender;
        const botNumber = crazyNotDev.user?.id || process.env.OWNER_NUMBER;
        const command = m.command || '';
        const prefix = process.env.PREFIX || '!';
        const Access = m.isOwner || false;
        const version = crazyNotDev.version || "1.0.0";

        // Group infos
        let groupMetadata = isGroup ? await crazyNotDev.groupMetadata(m.chat).catch(() => ({})) : {};
        let groupName = groupMetadata.subject || "";
        let groupAdmins = isGroup ? groupMetadata.participants?.filter(v => v.admin !== null).map(v => v.id) : [];
        let isGroupAdmins = isGroup ? groupAdmins.includes(senderNumber) : false;
        let isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;

        // Premium check
        const isPremium = Access ? true : checkPremiumUser(senderNumber);

        // Photo
        const monimage = fs.readFileSync('./media/mini.jpeg');

        // Logging
        if (m.message) {
            console.log(danscot("MINI BOT CRAZY °_°"), 'deeppink');
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
            if (isGroup) {
                console.log(
                    chalk.bgHex("#00FF00").black(
                        `   ⌬ Group: ${groupName} \n` +
                        `   ⌬ GroupJid: ${m.chat}`
                    )
                );
            }
            console.log();
        }

        // Resize helper
        const resize = async (image, width, height) => {
            const img = await jimp.read(image);
            return await img.resize(width, height).getBufferAsync(jimp.MIME_JPEG);
        };

        // Réponse helper
        async function reponse(textes) {
            await crazyNotDev.sendMessage(m.chat, {
                text: textes,
                mentions: [senderNumber]
            }, { quoted: m });
        }

        // Switch commandes
        switch (command) {
            case 'menu': {
                const runtimeStr = runtime(process.uptime());
                const crazymenu = `
╭───────°❀°───────╮
│  *MINI BOT CRAZY*  │
│   *Developed By Crazy*   │
╰───────°❀°───────╯
╭───────────────╮
│  *LISTE DES COMMANDES*  │
│  *PREFIX :* ${prefix}  │
│  *VERSION :* ${version}  │
│  *RUNTIME :* ${runtimeStr}  │
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
                break;
            }

            case 'ping': {
                const a = Date.now();
                // Ici on peut attendre une petite opération pour mesurer la latence
                await sleep(100);
                const b = Date.now();
                const pong = b - a;
                await crazyNotDev.sendMessage(m.chat, { text: `Latence : *${pong} ms*` }, { quoted: m });
                break;
            }

            case 'owner':
            case 'proprietaire': {
                await crazyNotDev.sendMessage(m.chat, { react: { text: '👑', key: m.key } });
                await crazyNotDev.sendMessage(m.chat, {
                    contacts: {
                        displayName: "Crazy",
                        contacts: [{
                            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;Crazy;;;\nFN:Crazy\nORG:Crazy Inc.;\nTEL;type=CELL;type=VOICE;waid=${process.env.OWNER_NUMBER}:${process.env.OWNER_NUMBER}\nEND:VCARD`
                        }]
                    }
                }, { quoted: m });
                break;
            }

            case 'private': {
                if (!Access) return reponse(mess.owner);
                await crazyNotDev.sendMessage(m.chat, { text: "Mode privé activé." }, { quoted: m });
                break;
            }

            // Ajoutez d'autres commandes ici selon vos besoins

            default: {
                // Commande inconnue
                await reponse(mess.badFormat);
            }
        }

    } catch (err) {
        console.error("Erreur dans CaseHandler:", err);
        await crazyNotDev.sendMessage(m.chat, { text: `Erreur: ${err.message}` }, { quoted: m });
    }
}
