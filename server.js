import { Bot } from './models/Bot.js';

const bot = new Bot({
  verifyToken: process.env.VERIFY_TOKEN,
  pageAccessToken: process.env.PAGE_ACCESS_TOKEN,
  port: process.env.PORT || 3000,
});

bot.on('message', (payload) => {
  console.log(payload.message.text);
});
