import { Bot } from './models/Bot.js';
import { URL } from './constants/url.js';

const bot = new Bot({
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  PAGE_ACCESS_TOKEN: process.env.PAGE_ACCESS_TOKEN,
  PORT: process.env.PORT,
  REQUEST_URL: URL,
});

bot.hear(['Hey', 'hello', 'Hi'], (message, chat, event) => {
  console.log({ message, chat, event });
  chat.sendMessage(event.sender.id, message.text);
});
