import axios from "axios";
import util from "util";
import moment from "moment-timezone";
import fs from "fs";

/**
 * Get a random string (optionally with extension)
 * @param {string} ext
 * @returns {string}
 */
export function getRandom(ext = '') {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
}

/**
 * Download a file as a buffer
 * @param {string} url
 * @param {object} options
 * @returns {Promise<Buffer>}
 */
export async function getBuffer(url, options = {}) {
    try {
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        });
        return res.data;
    } catch (err) {
        return err;
    }
}

/**
 * Format file size
 * @param {number} bytes
 * @returns {string}
 */
export function formatSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}

/**
 * Fetch JSON from a URL
 * @param {string} url
 * @param {object} options
 * @returns {Promise<any>}
 */
export async function fetchJson(url, options = {}) {
    try {
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        });
        return res.data;
    } catch (err) {
        return err;
    }
}

/**
 * Format uptime as human-readable string
 * @param {number} seconds
 * @returns {string}
 */
export function runtime(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    const dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
    const hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    const mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    const sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

/**
 * Sleep for x milliseconds
 * @param {number} ms
 * @returns {Promise<void>}
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Check if string is an URL
 * @param {string} url
 * @returns {boolean}
 */
export function isUrl(url) {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(url);
}

/**
 * Format date/time with moment
 * @param {string} format
 * @param {Date|string|number} date
 * @returns {string}
 */
export function getTime(format, date) {
    if (date) {
        return moment(date).locale('fr').format(format);
    } else {
        return moment.tz('Europe/Paris').locale('fr').format(format);
    }
}

/**
 * Format JS date to locale string
 * @param {number|Date} n
 * @param {string} locale
 * @returns {string}
 */
export function formatDate(n, locale = 'fr') {
    let d = new Date(n);
    return d.toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

/**
 * Utility to format JSON as pretty string
 * @param {object} string
 * @returns {string}
 */
export function jsonformat(string) {
    return JSON.stringify(string, null, 2);
}

/**
 * Utility to format using util.format
 */
export function format(...args) {
    return util.format(...args);
}

/**
 * Logic helper (return corresponding output if input matches check)
 * @param {any} check
 * @param {any[]} inp
 * @param {any[]} out
 * @returns {any}
 */
export function logic(check, inp, out) {
    if (inp.length !== out.length) throw new Error('Input and Output must have same length');
    for (let i in inp) {
        if (util.isDeepStrictEqual(check, inp[i])) return out[i];
    }
    return null;
}

// Autoreload (optionnel)
if (fs.existsSync && require.resolve) {
    let file = require.resolve(__filename);
    fs.watchFile(file, () => {
        fs.unwatchFile(file);
        console.log('[myfunc.js] File updated!');
        delete require.cache[file];
        require(file);
    });
}
