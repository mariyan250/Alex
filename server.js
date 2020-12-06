import { Bot } from './models/Bot.js';
import { URL } from './constants/url.js';

const bot = new Bot({
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  PORT: process.env.PORT,
  URL,
});

bot.hear(['Hey'], async (event, chat) => {
  await chat.sendAction('mark_seen');
  await chat.sendAction('typing_on');
  console.log(event.message);
});
