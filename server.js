import { Bot } from './models/Bot.js';
import { URL } from './constants/url.js';
import { dictionary } from './dictionary.js';

const bot = new Bot({
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  PORT: process.env.PORT,
  URL,
});

bot.hear(dictionary.greetings, async (event, chat) => {
  console.log('GREETING!');
  await chat.sendAction('mark_seen');
  await chat.sendAction('typing_on');
  await chat.sendMessage('Hey!');
});
