import { Bot } from './lib/Bot.js';
import { YouTube } from 'youtube-sr';
import { checkWord } from './utils/functions.js';
import { dictionary } from './dictionary.js';

let musicMode = true;

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

    return;
  }

  if (text.toLowerCase() === 'музика') {
    musicMode = true;
    io.emit('video controls', 'start');
    return;
  }

  if (text.toLowerCase() === 'спри музиката') {
    musicMode = false;
    io.emit('video controls', 'stop music');
    return;
  }

  if (text.toLowerCase() === 'пусни') {
    io.emit('video controls', 'play');
    return;
  }

  if (
    text.toLowerCase() === 'спри' ||
    text.toLowerCase() === 'стоп' ||
    text.toLowerCase() === 'пауза'
  ) {
    io.emit('video controls', 'stop');
    return;
  }

  if (text.toLowerCase() === 'покажи') {
    io.emit('video controls', 'show');
    return;
  }

  if (text.toLowerCase() === 'скрий') {
    io.emit('video controls', 'hide');
    return;
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

    return;
  }

  if (musicMode) {
    const music = text.toLowerCase();

    try {
      const data = await YouTube.search(music, { limit: 1 });
      io.emit('youtube link', data[0].id);
    } catch (error) {
      console.log(error);
    }
  }
});
