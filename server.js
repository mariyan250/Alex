import { Bot } from './lib/Bot.js';
import { YouTube } from 'youtube-sr';
import { checkWord } from './utils/functions.js';
import { dictionary } from './dictionary.js';

const bot = new Bot({
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  PORT: process.env.PORT,
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
  } else if (text.toLowerCase() === 'музика') {
    io.emit('video controls', 'start');
  } else if (text.toLowerCase() === 'спри музиката') {
    io.emit('video controls', 'stop music');
  } else if (text.toLowerCase() === 'пусни') {
    io.emit('video controls', 'play');
  } else if (
    text.toLowerCase() === 'спри' ||
    text.toLowerCase() === 'стоп' ||
    text.toLowerCase() === 'пауза'
  ) {
    io.emit('video controls', 'stop');
    return;
  } else if (text.toLowerCase() === 'покажи') {
    io.emit('video controls', 'show');
  } else if (text.toLowerCase() === 'скрий') {
    io.emit('video controls', 'hide');
  } else if (checkWord(dictionary.colors, text)) {
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
  } else {
    const music = text.toLowerCase();

    try {
      const data = await YouTube.search(music, { limit: 1 });
      io.emit('youtube link', data[0].id);
    } catch (error) {
      console.log(error);
    }
  }
});
