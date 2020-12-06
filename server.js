import { Bot } from './models/Bot.js';
import { URL } from './constants/url.js';

const bot = new Bot({
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  PORT: process.env.PORT,
  URL,
});

bot.hear(['Hey', 'hello', 'Hi'], (message, chat, event) => {
  console.log({ message, chat, event });
  chat.sendMessage(event.sender.id, message.text);
});
