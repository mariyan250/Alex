import { Bot } from './models/Bot.js';

const bot = new Bot({
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  PAGE_ACCESS_TOKEN: process.env.PAGE_ACCESS_TOKEN,
  PORT: process.env.PORT || 3000,
});

bot.hear(['Hey', 'hello', 'Hi'], (message) => {
  console.log(message.text);
});
