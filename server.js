import { Bot } from './lib/Bot.js';
import { YouTube } from 'youtube-sr';
import { checkWord, getRandom } from './utils/functions.js';
import { dictionary } from './dictionary.js';
import wiki from 'wikipedia';

const bot = new Bot({
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  PORT: process.env.PORT,
});

// Message from messenger
bot.on('message', async (event, chat) => {
  const { text } = event.message;

  if (text.includes('какво е') || text.includes('Какво е')) {
    const query = event.message.text.toLowerCase().split('какво е')[1];
    try {
      const data = await wiki.page(query);
      const summary = await data.summary();
      const images = await data.images();
      const att = await chat.sendImage(images[0].url);
      console.log(att);
      await chat.sendMessage(summary.extract);
    } catch (error) {
      console.log(error);
    }
  }

  if (checkWord(dictionary.greetings, text)) {
    try {
      await chat.sendMessage(getRandom(['Здравей! 🙋‍♂️', 'Хей! 👋']));
    } catch (error) {
      console.log(error);
    }
    return;
  }

  if (dictionary.music.volume.includes(text)) {
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
