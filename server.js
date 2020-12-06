import { Bot } from './models/Bot.js';
import { URL } from './constants/url.js';

const bot = new Bot({
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  PORT: process.env.PORT,
  URL,
});

bot.hear(['Hey', 'hello', 'Hi'], async (message, chat, event) => {
  await chat.sendAction(event.sender.id, 'mark_seen');
  await chat.sendAction(event.sender.id, 'typing_on');
  await chat.sendMessage(event.sender.id, message.text);
});
