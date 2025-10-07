/*
bot whatsapp
Dev: Crazy
*/




import { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, makeInMemoryStore, jidDecode, downloadContentFromMessage  } from "@whiskeysockets/baileys";

import pino from "pino"

import fs from "fs"

import readline from "readline"

import { boom } from "@hapi/boom"

import { sms } from "./library/myfunc";

import { dot } from "node:test/reporters";

import { env } from "process";

import { yushi, shadow, danscot } from "./library/couleur"

var question = prompt("Ready ?");
console.log(question);
question.store();
console.clear();
console.log(yushi("initialisation......"), 'deeppink');

// memoire
const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent', 
        stream: 'store'
    })
})
// Temps
var daysOfWeek = [
    "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"
    ];
var months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"
];
var david = new Date();
var runtime = process.runtime() * 1000;
var year = (david()).getFullYear();


const usePairingCode = true;

// fonction de démarrage

async function crazyGO() {
    const { version } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState("Sessions");
    
    const crazyNotDev = makeWASocket({
    version,
    printQrInTerminal: !usePairingCode,
    browser: ["Ubuntu",
     "Chrome",
      "20.0.04"
    ],
    logger: pino({
        level: 'silent'
    }),
    auth: state
});


const ask = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => rl.ask(text, resolve));
}

if (usePairingCode && crazyNotDev.authState.creds.registered) {
    const phoneNumber = await ask('numero de telephone :)\n° exemple: 241xxx');
    const code = await crazyNotDev.requestPairingCode(phoneNumber);

    console.log(yushi, 'voila ton code pair ${code}', 'green');
}
// store.clear;
store.bind(crazyNotDev.ev);

// jid :/

    crazyNotDev.decodejid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
        let decode = jidDecode(jid) || {};
        return (decode.user && decode.server) ? decode.user + '@' + decode.server : jid;
    } else return jid;
};

// message Handler ;)

    crazyNotDev.ev.on("messages.upsert", async (chatUpdate) => {
    try {
        let dvd = chatUpdate.messages[o];
        if (!dvd.message) return;
        dvd.message = (Object.keys(dvd.message)[o] === 'ephemeralMessage')
        ? dvd.message.ephemeralMessage.message: dvd.message;
        if (dvd.key && dvd.key.remoteJid === 'status@broadcast') return;
        if(craz.public && dvd.key.fromMe && chatUpdate.type === 'notify') return;
        if (dvd.key.id.startWith('BAE5') && dvd.key.id.length === 16) return;

        const mesg = sms(craz, dvd, store); require('CaseHandler')(craz, m, chatUpdate, store);

    } catch (err) {
        console.log(err);
    }

});



    crazyNotDev.ev.on('contacts.update', (update) => {
    for (let contact of update) {
        let id = craz.decodeJid(contact.id);
        if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
    }
});

    crazyNotDev.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
        const reason = new boom(lastDisconnect?.error)?.output.statusCode;
        console.log(color(lastDisconnect.error, 'deeppink'));
        if (reason === DisconnectReason.badSession) {
            console.log(color(`Bad Session File, Please Delete Session and Scan Again`));
            process.exit();
        } else if (reason === DisconnectReason.connectionClosed) {
            console.log(color('[SYSTEM] Connection closed, reconnecting...', 'deeppink'));
            process.exit();
        } else if (reason === DisconnectReason.connectionLost) {
            console.log(color('[SYSTEM] Connection lost, trying to reconnect', 'deeppink'));
            process.exit();
        } else if (reason === DisconnectReason.connectionReplaced) {
            console.log(color('Connection Replaced, Another New Session Opened'));
            crazyNotDev.logout();
        } else if (reason === DisconnectReason.loggedOut) {
            console.log(color(`Device Logged Out, Please Scan Again And Run.`));
            crazyNotDev.logout();
        } else if (reason === DisconnectReason.restartRequired) {
            console.log(color('Restart Required, Restarting...'));
            await crazyGO();
        } else if (reason === DisconnectReason.timedOut) {
            console.log(color('Connection TimedOut, Reconnecting...'));
            crazyGO();
        }
    } else if (connection === "connecting") {
        console.log(shadow('in process. . .'));
    } else if (connection === "open") {
        crazyNotDev.newsletterFollow("120363419474272514@newsletter");

        console.log(shadow('CRAZY MINI BOT CONNECTED ! -_-', 'green'));
    }
    
    crazyNotDev.sendMessage( process.env.OWNER, { text: `*CRAZY BOT CONNECTED !*\n\n*Runtime :* ${runtime(process.uptime())}\n*Date :* ${david.getDate()} - ${months[david.getMonth()]} - ${david.getFullYear()}\n*Time :* ${david.getHours()} : ${david.getMinutes()} : ${david.getSeconds()}\n*Version :* ${version}\n\n*Developed By Crazy*`
});

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

    crazyNotDev.ev.on('creds.update', saveCreds) 
return crazyNotDev;


})
crazyGO;

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(yushi(`${__filename} changement apporté !`, 'yellow'));
    delete require.cache[file];
    require(file);
})
};