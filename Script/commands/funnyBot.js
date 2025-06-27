const axios = require("axios");

module.exports.config = {
  name: "funnyBot",
  eventType: ["message"],
  version: "1.0.0",
  credits: "King_Shourav",
  description: "Auto reply with funny response"
};

const funnyTriggers = [
  "পাগল", "😂", "🤣", "গাধা", "ভাইরে", "lol", "hahaha", "kire", "batpar", "shala", "pagla"
];

const funnyReplies = [
  "তোর হাসিতে NASA সিগনাল পায় 🤣",
  "তুই এমন এক পাগল, Google-এ তোর নাম লিখলে 'error' আসে! 😂",
  "তুই এমন বোকা, দরজা খুলে ফেসবুকে ঢুকতে চাস! 😹",
  "তুই এমন হাসি হাসিস, bot এর RAM full হয়ে যায়! 🧠💥",
  "তোর IQ দেখলে calculator reboot চায়! 🧮😆",
  "তুই বললি আর আমি হেসে ambulance ডাকলাম 🤕🤣",
  "তুই এমন দারুণ, তোর মতো বানাতে OpenAI permission চায়! 🔥",
  "তোর কথা শুনে fridge freeze হয়ে গেল 😨❄️",
  "তুই হ্যাস তো এমন, যেন Facebook লাইভে জোকার নাম লিখে ফেললি! 🎪",
  "তুই joke করলি আর Mark Zuckerberg logout দিয়ে পালাইছে! 💻🏃"
];

module.exports.run = async function({ api, event }) {
  const msg = event.body?.toLowerCase();
  if (!msg) return;

  const matched = funnyTriggers.some(trigger => msg.includes(trigger));
  if (matched) {
    const reply = funnyReplies[Math.floor(Math.random() * funnyReplies.length)];
    return api.sendMessage("😹 " + reply, event.threadID);
  }
};
