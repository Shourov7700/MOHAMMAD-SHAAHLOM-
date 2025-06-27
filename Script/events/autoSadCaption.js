const fs = require("fs-extra");

module.exports.config = {
  name: "autoSadCaption",
  version: "1.1.0",
  credits: "King_Shourav",
  description: "Send sad caption in all active groups every 15 minutes"
};

// সৌরভ নিয়ে Royal Sad Captions
const sadCaptions = [
  "👑 সবাই রাজা হতে চায়, কিন্তু সৌরভ রাজা হয়েও একা...",
  "💔 সৌরভ কখনো কাঁদে না, শুধু চুপচাপ হারিয়ে যায়…",
  "🌙 রাতের চাঁদ জানে, সৌরভ কতোটা একা হাসে!",
  "🥀 সৌরভ কখনো অভিমান করে না… সরে যায় চুপচাপ!",
  "💭 মানুষ বদলায় না, পরিস্থিতি বদলায়… সৌরভ শুধু চুপ করে যায়।",
  "🖤 সৌরভ কারো উপর রাগ করে না… সে সরে যায়, চিরদিনের জন্য!",
  "💫 কেউ জানে না— সৌরভ হারানোর ভয় কতটা অনুভব করেছে!",
  "📚 আজও সৌরভ সেই পুরনো কথাগুলো মনে রাখে, যেগুলো সবাই ভুলে গেছে!"
];

module.exports.onLoad = function({ api }) {
  console.log("✅ Auto sad caption system active...");

  setInterval(async () => {
    try {
      const threads = await api.getThreadList(100, null, ["INBOX"]);
      const groupThreads = threads.filter(thread => thread.isGroup);

      const randomCaption = sadCaptions[Math.floor(Math.random() * sadCaptions.length)];

      for (const thread of groupThreads) {
        api.sendMessage(randomCaption, thread.threadID);
      }

      console.log(`✅ Sent sad caption to ${groupThreads.length} groups.`);
    } catch (err) {
      console.error("❌ Failed to send auto sad caption:", err.message);
    }
  }, 15 * 60 * 1000); // প্রতি ১৫ মিনিটে একবার
};
