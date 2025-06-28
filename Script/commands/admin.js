const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
    name: "admin",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ULLASH", //don't change my credit 
    description: "Show Owner Info",
    commandCategory: "info",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function({ api, event }) {
    var time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

    var callback = () => api.sendMessage({
        body: `
┏━━━━━━━━━━━━━━━━━━━━━┓
┃      🌟 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 🌟      
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 👤 𝐍𝐚𝐦𝐞      : ⃝—͟͟͞͞ 𝐂.𝐄.𝐎⸙𝐒𝐇ꫝꫝ𝐇𝐋𝐎𝐌𓆪
┃ 🚹 𝐆𝐞𝐧𝐝𝐞𝐫    : 𝐌𝐀𝐋𝐄
┃ ❤️ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧  : 𝐒𝐈𝐍𝐆𝐄𝐋
┃ 🎂 𝐀𝐠𝐞       : 18+
┃ 🕌 𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧  : 𝐈𝐒𝐋𝐀𝐌
┃ 🏫 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧 : *****
┃ 🏡 𝐀𝐝𝐝𝐫𝐞𝐬𝐬  :  𝐁𝐀𝐍𝐆𝐋𝐀𝐃𝐄𝐒𝐇
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 🎭 𝐓𝐢𝐤𝐭𝐨𝐤  : 
┃ 📢 𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦 : SHAAHLOM CHAT BOT
┃ 🌐 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 : https://www.facebook.com/pr.mbir.mtrr.m.par.mpir.m.cur.2025?mibextid=ZbWKwL
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 🕒 𝐔𝐩𝐝𝐚𝐭𝐞𝐝 𝐓𝐢𝐦𝐞:  ${time}
┗━━━━━━━━━━━━━━━━━━━━━┛
        `,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"));
  
    return request(encodeURI(`https://i.imgur.com/p8aN2vc.jpeg`))
        .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
        .on('close', () => callback());
};
