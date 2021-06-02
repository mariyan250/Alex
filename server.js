import { Bot } from './lib/Bot.js';
import { YouTube } from 'youtube-sr';
import { checkWord } from './utils/functions.js';
import { dictionary } from './dictionary.js';

const bot = new Bot({
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  PORT: process.env.PORT,
});

// Receive messages
bot.on('message', async (event, chat) => {
  const { text } = event.message;

  console.log(text);

  if (checkWord(dictionary.love, text)) {
    try {
      await chat.sendMessage(
        'Смятам, че на всички вече им е ясно, че обичаш Меди 😉❤️'
      );
    } catch (error) {
      console.log(error);
    }
    return;
  }

  if (checkWord(dictionary.greetings, text)) {
    try {
      await chat.sendMessage('Здравей!');
    } catch (error) {
      console.log(error);
    }
    return;
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
