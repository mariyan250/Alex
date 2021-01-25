import { Bot } from './lib/Bot.js';
import { YouTube } from 'youtube-sr';
import { checkWord } from './utils/functions.js';
import { dictionary } from './dictionary.js';

const bot = new Bot({
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  PORT: process.env.PORT,
});

// Real time connection
bot.on('socket connection', (socket) => {
  global.io = socket;
});

// Messages
bot.on('message', async (event, chat) => {
  const { text } = event.message;

  if (checkWord(dictionary.greetings, text)) {
    await chat.sendMessage('Здравей!');
  }

  if (checkWord(dictionary.music.play, text)) {
    const music = text.toLowerCase().split('пусни')[1];

    try {
      const data = await YouTube.search(music, { limit: 1 });
      io.emit('youtube link', data[0].id);
    } catch (error) {
      console.log(error);
    }
  }
});
