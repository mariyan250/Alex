import { Bot } from './models/Bot.js';
import { URL } from './constants/url.js';

const bot = new Bot({
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  PORT: process.env.PORT,
  URL,
});

bot.hear(['Hey', 'hello', 'Hi'], async (event, chat) => {
  const senderID = event.sender.id;
  const { text } = event.message;
  await chat.sendAction(senderID, 'mark_seen');
  await chat.sendAction(senderID, 'typing_on');
  await chat.sendMessage(senderID, text);
});
