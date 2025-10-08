/*
bot whatsapp
Dev: Crazy
*/

import { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, makeInMemoryStore, jidDecode, downloadContentFromMessage } from "@whiskeysockets/baileys";
import pino from "pino";
import fs from "fs";
import readline from "readline";
import boom from "@hapi/boom";
import { sms } from "./library/myfunc.js";
import { yushi, shadow, danscot } from "./library/couleur.js";
// const { boom } = pkg;
const usePairingCode = true;

// memoire
const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
});

async function crazyGO() {
    const { version } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState("Sessions");

    const crazyNotDev = makeWASocket({
        version,
        printQrInTerminal: !usePairingCode,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        logger: pino({ level: 'silent' }),
        auth: state
    });

    const ask = (text) => {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        return new Promise((resolve) => rl.question(text, (answer) => {
            rl.close();
            resolve(answer);
        }));
    };

    if (usePairingCode && crazyNotDev.authState.creds.registered) {
        const phoneNumber = await ask('numero de telephone :)\n° exemple: 241xxx\n');
        const code = await crazyNotDev.requestPairingCode(phoneNumber);
        console.log(yushi(`voila ton code pair ${code}`, 'green'));
    }

    crazyNotDev.sendText = (jid, text, quoted = '', options) =>
        crazyNotDev.sendMessage(jid, { text, ...options }, { quoted });

    crazyNotDev.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || '';
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
        const stream = await downloadContentFromMessage(message, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        return buffer;
    };

    crazyNotDev.ev.on('creds.update', saveCreds);
    return crazyNotDev;
}

// Hot-reload du fichier
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(yushi(`${__filename} changement apporté !`, 'yellow'));
    delete require.cache[file];
    require(file);
});

crazyGO();

