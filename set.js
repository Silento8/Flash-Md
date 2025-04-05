const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia00xcXI0cnNYT3kvSGxXVFFnR2R5TVpGWVoyYllHT0NYanhBaTdkU2IxYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1R6NmRlSkxFbkF5NkU3cHltM0hydmpiUmlXRlZUMFdaNzk1NlEzRzRDST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVRmpHMXlZK2IwMzNZSkdvazJHSWZ1SDJkU1NmSFN2aEd6WEx0azgvd25ZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsTURJSWYrQlpGRTVuTzViVGxOV2dJNUpMbnllbmZBUFRuK1A2S1NvV1ZjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFHUTZQZVN3M3E2TC9mUzZvbjZULzdzTE5KOW5XQmhhMmZOMVNDQnRPR3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImV3bTlhQmVjR0dTQVcrNTFFZHI3QS9QREg0MjJxbGRBT1hNaWlkYys4M3M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0s2c2ZZcWdOSG1FUGdRUnNuc3JNbFh2MkUzVVB4YTNQVXpiYUMvUjFrST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia3FqVm4rcHlzaHhkVTRHMnVGSE1rY3NBMitPZFcrUnRHb1ZDUFFvR2todz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlRV0VwbXA3VUg2cldPeTJJcndaRG5VT3VkRE8veEUyYmQ2ck9rN3RCR2R4TlN3dmwxekdBdWhJRlhMT016YmlyZ1E4dWx3RWxhMmdmVThwc0F0bmpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE1LCJhZHZTZWNyZXRLZXkiOiJCN3NHY3lTWFZRTi95SGduaUhXb3dKY09CWlQ2NnVRbFY0ZSs1WUFua1JNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJmNGhCM1dWWFNyR0JwZUVSdDhZMDFnIiwicGhvbmVJZCI6IjU3MWY2YWFiLTRiZjEtNDY1OC1iYjdkLTEwY2U0ZGY2NmZiNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrNjNmMFdzWlVrTS9uTHBielMyNS9aRW0xSG89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTlQxb1NUR1ZyY0FzREFyNEt5bkpnUVUwcTFZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkdZVjdNVFE4IiwibWUiOnsiaWQiOiIyNTQ3MTgzODc4MTg6NTZAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05lVW8vQUZFTW5neEw4R0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InovclF6OExNMmtuZFR3THBCZ3dtalVzTW03TjdHVHdwLzZjQnVpRk9SVU09IiwiYWNjb3VudFNpZ25hdHVyZSI6ImFzakVUYjhDcGthd2dteGJwa1NYZVM4cTZDdnk0YXFXZlJuMGtEd1IxbUUyQXVjZE1TU2VRRXZpVDNXOXhnRFEyWkFJcFUyMXZ4c0FTQnZ5blJFTENnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJmT0xiK1ZSL002b1NKSVp5Vk9IVEpuYStweHFaRkM3Smo1RzdROWZRS09xNEd4ZlhaVkt0WncwWjF3WjZhY2JuM2pleERoRWY1YVpXVVNJN2liV2FoUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcxODM4NzgxODo1NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjLzYwTS9Dek5wSjNVOEM2UVlNSm8xTERKdXpleGs4S2YrbkFib2hUa1ZEIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQzODU5Nzk4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU1oMyJ9;;;=>',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254718387818",
    AUTO_LIKE: process.env.STATUS_LIKE || "off",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    ANTIVIEW: process.env.VIEWONCE,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
