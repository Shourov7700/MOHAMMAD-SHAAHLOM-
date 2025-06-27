const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");

const DATA_PATH = path.join(__dirname, "../../data/rank.json");

module.exports.config = {
  name: "AutoRankUp",
  eventType: ["message"],
  version: "1.1.0",
  credits: "King_Shourav",
  description: "Auto rank-up system with role unlock"
};

const rankRoles = level => {
  if (level >= 30) return "🛡️ SHOUROV LEGEND";
  if (level >= 20) return "🔥 Royal Warrior";
  if (level >= 10) return "👑 Champion";
  if (level >= 5) return "⚔️ Fighter";
  return "🔰 Newbie";
};

module.exports.run = async function ({ api, event }) {
  const { senderID, threadID } = event;

  // Ensure data file exists
  if (!fs.existsSync(DATA_PATH)) fs.writeJsonSync(DATA_PATH, {});
  const data = fs.readJsonSync(DATA_PATH);

  // Initialize user
  if (!data[senderID]) data[senderID] = { count: 0, rank: 0 };

  // Count message
  data[senderID].count += 1;

  // Calculate level
  const newRank = Math.floor(data[senderID].count / 10);

  // If level increased
  if (newRank > data[senderID].rank) {
    const oldRole = rankRoles(data[senderID].rank);
    const newRole = rankRoles(newRank);
    data[senderID].rank = newRank;

    try {
      const userInfo = await api.getUserInfo(senderID);
      const name = userInfo[senderID]?.name || "বন্ধু";

      const gifUrl = "https://media.giphy.com/media/l0HlUQY3S1tTzv5a0/giphy.gif"; // Royal rank up gif
      const filePath = path.join(__dirname, `temp_rank_${senderID}.gif`);

      const response = await axios({
        url: gifUrl,
        method: "GET",
        responseType: "stream"
      });

      const writer = response.data.pipe(fs.createWriteStream(filePath));

      writer.on("finish", () => {
        api.sendMessage({
          body: `🏆 𝗖𝗢𝗡𝗚𝗥𝗔𝗧𝗦, ${name}!\n🌟 আপনি এখন Level ${newRank} এ পৌঁছেছেন!\n\n📛 নতুন রোল আনলকড: ${newRole}\n🕹️ আগের রোল ছিল: ${oldRole}\n\n🔱 Respect from: 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯 👑`,
          attachment: fs.createReadStream(filePath)
        }, threadID, () => fs.unlink(filePath));
      });
    } catch (err) {
      console.error("❌ Rank up error:", err.message);
    }
  }

  fs.writeJsonSync(DATA_PATH, data, { spaces: 2 });
};
