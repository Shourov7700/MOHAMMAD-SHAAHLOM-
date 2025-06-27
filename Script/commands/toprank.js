const fs = require("fs-extra");
const path = require("path");

const DATA_PATH = path.join(__dirname, "../../data/rank.json");

module.exports.config = {
  name: "toprank",
  description: "টপ ৫ র‍্যাঙ্কড ইউজার দেখাবে",
  usage: "/toprank",
  version: "1.0.0",
  credits: "King_Shourav"
};

module.exports.run = async function({ api, event }) {
  const { threadID } = event;
  if (!fs.existsSync(DATA_PATH)) return api.sendMessage("⚠️ Rank ডাটা পাওয়া যায়নি", threadID);

  const data = fs.readJsonSync(DATA_PATH);
  const sorted = Object.entries(data)
    .sort((a, b) => b[1].rank - a[1].rank)
    .slice(0, 5);

  if (sorted.length === 0) return api.sendMessage("📉 এখনও কেউ লেভেল আপ করেনি!", threadID);

  let msg = "🏆 টপ ৫ র‍্যাঙ্কড ইউজার:\n\n";
  for (let i = 0; i < sorted.length; i++) {
    const [uid, info] = sorted[i];
    const userInfo = await api.getUserInfo(uid);
    const name = userInfo[uid]?.name || "Unknown";

    msg += `#${i + 1} • ${name}\nLevel: ${info.rank}\n\n`;
  }

  api.sendMessage(msg, threadID);
};
