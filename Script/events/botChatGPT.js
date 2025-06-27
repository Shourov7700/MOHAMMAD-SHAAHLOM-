const axios = require("axios");

module.exports.config = {
  name: "botChatGPT",
  eventType: ["message"],
  version: "1.0.0",
  credits: "King_Shourav",
  description: "No prefix GPT reply when message starts with 'bot'"
};

module.exports.run = async function({ api, event }) {
  const { body, threadID } = event;
  if (!body) return;

  const msg = body.toLowerCase();

  if (msg.startsWith("bot")) {
    const prompt = msg.slice(3).trim();
    if (!prompt) return api.sendMessage("🤖 'bot' এর পরে কিছু লিখুন", threadID);

    try {
      const apis = await axios.get("https://raw.githubusercontent.com/MOHAMMAD-SHOUROV/SHOUROV-BOT-STORAGE/main/api.json");
      const baseURL = apis.data.api;
      const res = await axios.get(`${baseURL}/shourov/gpt3?prompt=${encodeURIComponent(prompt)}`);
      const reply = res.data.response || "❌ উত্তর পাইনি";

      return api.sendMessage("🤖: " + reply, threadID);
    } catch (err) {
      return api.sendMessage("⚠️ GPT Error! পরে চেষ্টা করুন", threadID);
    }
  }
};
