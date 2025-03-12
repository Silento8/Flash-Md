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
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUt5d2M4ZGcxQVhFaWVjelJpQi92QXRiUldWRnhPYWdkSDYvdjdJbjRVcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM1lBZVk0cGRwKzZidE9PdmZ2UElKcmVSSVVZU3JaaERyTDlQOE5WT2FUVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZT2MvaW5aOGJ5NHVFSGcrYkRNYkRhTmpFeXhSNWNCcXQyZGY4Q2p3OFY0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2aVR5dGhsQjhWbmxLM1NQVHpZNGN6NG94bDVnUFVDY0tES01PbnVhc2d3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklCd0ppSFJDWHk1NEJCR2NtWU9Tbno5VG1GdURVZUc1eTR0RTkxSG5xM3c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjREaGxYY0l0YzA0aFdVY2h1OUM4dlUzUVpRZ3VVTTVSVS9FYlpjUzNtaXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS1B5YVlOSjAzV0VFWHo2YzZHekNiUFUyVzdvdmY2MStkc01yOEc0YlFWST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNnB2OTg3TXIrN01RRVJBOXpUYlI1bFNmWkdVWUg0SHdrUGw4U3ZaYkZUND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjczOCttWWJPRGl1ZW1KSTBrU3A0NUdteE9oUEVlSW52YnIyMk4wMEg0Um5VaGZTcUJlWHNpU0czb01MWjdjUUlLMGVlczZOMzhQWmNiMjF4eGxiVENnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUyLCJhZHZTZWNyZXRLZXkiOiJxRUI5dlM0VUgwOXNkVVJwTU5EZ3JzUTg4ZlBQTVhLTlA5UFBSVzhFMWd3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcxODM4NzgxOEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1NzQ3RDhBNDUzRjhBMjY4ODc1NjIzNDUzNTgzQjgxNSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQxNzk5NTM4fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIxRUd5M1hZaFNVS2hWbUhUYk8wNFFRIiwicGhvbmVJZCI6ImE4NmIxMDI5LWJhNDktNDA3MS1hNDI0LWQyNDgxOWE0ZWVjMiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZSExnZHNTc2orMmJMOFZSeWFaUmoxZCtEdWc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR2hWR0ozd0pxdHZ1TWx6Y1hrMHRNYWhFbXZFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjhTN1JNNFNMIiwibWUiOnsiaWQiOiIyNTQ3MTgzODc4MTg6NTFAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05TVW8vQUZFTnFBeDc0R0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InovclF6OExNMmtuZFR3THBCZ3dtalVzTW03TjdHVHdwLzZjQnVpRk9SVU09IiwiYWNjb3VudFNpZ25hdHVyZSI6IkhOSmxPNFpVMWVOQlNlSk9NYjFKTUlWdXNxNEJSOGVjZC9Ea280bExFR3UrYjh6bTl3MGR5QzRJQitETElOYzdHNTlKU0tWTWg2Tmt0Y0crZnJrU0F3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJmaWcyZkt1SE9aZFJteEJoZm1EYlVtQkkrWURIbUw0Tnl4aFNTeExVMmVmeGxPUVRKcnlGbVdvZkFVa0RGeUY3b21qcVBtY3ZXdW00VEs0V3FYRXFDQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcxODM4NzgxODo1MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjLzYwTS9Dek5wSjNVOEM2UVlNSm8xTERKdXpleGs4S2YrbkFib2hUa1ZEIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQxNzk5NTI3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU5pdyJ9;;;=>',
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
