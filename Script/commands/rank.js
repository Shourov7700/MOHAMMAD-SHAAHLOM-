const fs = require("fs-extra");
const path = require("path");

const DATA_PATH = path.join(__dirname, "../../data/rank.json");

const getRole = level => {
  if (level >= 30) return "🛡️ SHOUROV LEGEND";
  if (level >= 20) return "🔥 Royal Warrior";
  if (level >= 10) return "👑 Champion";
  if (level >= 5) return "⚔️ Fighter";
  return "🔰 Newbie";
};

module.exports.config = {
  name: "rank",
  description: "নিজের লেভেল ও রোল দেখাবে",
  usage: "/rank",
  version: "1.0.0",
  credits: "King_Shourav"
};

module.exports.run = async function({ api, event }) {
  const { senderID, threadID } = event;
  if (!fs.existsSync(DATA_PATH)) return api.sendMessage("⚠️ Rank ডাটা পাওয়া যায়নি", threadID);

  const data = fs.readJsonSync(DATA_PATH);
  const user = data[senderID];

  if (!user) return api.sendMessage("🙃 আপনি এখনও র‍্যাঙ্কে নেই। কিছু মেসেজ দিন!", threadID);

  const level = user.rank;
  const role = getRole(level);

  api.sendMessage(`🎖️ আপনার Level: ${level}\n🏷️ Role: ${role}`, threadID);
};
