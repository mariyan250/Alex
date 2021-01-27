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

  if (checkWord(dictionary.music.volume, Number(text))) {
    io.emit('video volume', Number(text));
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
      break;

    case 'скрий':
      io.emit('video controls', 'hide');
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
