import { Bot } from './lib/Bot.js';

const bot = new Bot({
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  PORT: process.env.PORT,
});

// Messages
bot.on('message', async (event, chat) => {
  const { text } = event.message;

  if (['hey', 'hi', 'hello'].includes(text.toLowerCase())) {
    await chat.sendMessage('Hello!');
  }
});
