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

    return;
  }

  if (checkWord(dictionary.colors.show, text)) {
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

  if (checkWord(dictionary.colors.hide, text)) {
    io.emit('display controls', 'hide');
  }

  if (checkWord(dictionary.music.volume, text)) {
    io.emit('video volume', Number(text));
    return;
  }

  switch (text.toLowerCase()) {
    case 'музика':
    case 'пусни музика':
      io.emit('video controls', 'start');
      await chat.sendMessage('Режим "Музика" активиран!');
      break;

    case 'спри музиката':
      io.emit('video controls', 'stop music');
      await chat.sendMessage('Режим "Музика" деактивиран!');
      break;

    case 'пусни':
      io.emit('video controls', 'play');
      break;

    case 'спри':
    case 'стоп':
    case 'пауза':
      io.emit('video controls', 'stop');
      break;

    case 'покажи':
      io.emit('video controls', 'show');
      io.emit('display controls', 'hide');
      break;

    case 'скрий':
      io.emit('video controls', 'hide');
      io.emit('display controls', 'show');
      break;

    case 'яла си':
      io.emit('video volume', 100);
      await chat.sendMessage('Селям Айлекум');
      break;

    case 'тблууу':
      io.emit('video volume', 10);
      break;

    default:
      const music = text.toLowerCase();

      try {
        const data = await YouTube.search(music, { limit: 1 });
        io.emit('youtube link', data[0].id);
      } catch (error) {
        console.log(error);
      }

      break;
  }
});

bot.on('app-message', async (text) => {
  switch (text.toLowerCase()) {
    case 'пусни':
      io.emit('video controls', 'play');
      break;

    case 'спри':
    case 'стоп':
    case 'пауза':
      io.emit('video controls', 'stop');
      break;

    case 'покажи':
      io.emit('video controls', 'show');
      break;

    case 'скрий':
      io.emit('video controls', 'hide');
      break;

    default:
      const music = text.toLowerCase();

      try {
        const data = await YouTube.search(music, { limit: 1 });
        io.emit('youtube link', data[0].id);
        io.emit('video controls', 'start');
        io.emit('video controls', 'show');
      } catch (error) {
        console.log(error);
      }

      break;
  }
});
