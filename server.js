import { Bot } from './lib/Bot.js';
import { YouTube } from 'youtube-sr';
import { checkWord } from './utils/functions.js';
import { dictionary } from './dictionary.js';

const bot = new Bot({
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  PORT: process.env.PORT,
});

// Socket
bot.on('socket connection', (socket) => {
  global.io = socket;
});

// Messages
bot.on('message', async (event, chat) => {
  const { text } = event.message;

  if (checkWord(dictionary.greetings, text)) {
    try {
      await chat.sendMessage('Здравей!');
    } catch (error) {
      console.log(error);
    }
  }

  if (checkWord(dictionary.music.play, text)) {
    if (text.toLowerCase() === 'пусни') {
      io.emit('video controls', 'play');
      return;
    }

    const music = text.toLowerCase().split('пусни')[1];

    try {
      const data = await YouTube.search(music, { limit: 1 });
      io.emit('youtube link', data[0].id);
    } catch (error) {
      console.log(error);
    }
  }

  if (checkWord(dictionary.music.stop, text)) {
    io.emit('video controls', 'stop');
  }

  if (checkWord(dictionary.music.show, text)) {
    io.emit('video controls', 'show');
  }

  if (checkWord(dictionary.music.hide, text)) {
    io.emit('video controls', 'hide');
  }

  if (checkWord(dictionary.colors, text)) {
    if (text.toLowerCase().includes('червено')) {
      io.emit('color', 'red');
    }

    if (text.toLowerCase().includes('синьо')) {
      io.emit('color', 'blue');
    }

    if (text.toLowerCase().includes('зелено')) {
      io.emit('color', 'green');
    }

    if (text.toLowerCase().includes('черно')) {
      io.emit('color', 'black');
    }

    if (text.toLowerCase().includes('бяло')) {
      io.emit('color', 'white');
    }

    if (text.toLowerCase().includes('диско')) {
      io.emit('color', 'disco');
    }

    if (text.toLowerCase().includes('покажи часа')) {
      io.emit('hours', 'show');
    }

    if (text.toLowerCase().includes('скрии часа')) {
      io.emit('hours', 'hide');
    }
  }
});
