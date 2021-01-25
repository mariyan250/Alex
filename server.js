import { Bot } from './lib/Bot.js';
import { YouTube } from 'youtube-sr';
import { checkWord } from './utils/functions.js';
import { dictionary } from './dictionary.js';
import { Body } from 'node-fetch';

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
    try {
      await chat.sendMessage('Здравей!');
    } catch (error) {
      console.log(error);
    }
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

  if (checkWord(dictionary.music.stop, text)) {
    io.emit('color', 'stop');
  }

  if (checkWord(dictionary.music.show, text)) {
    io.emit('video controls', 'show');
  }

  if (checkWord(dictionary.music.hide, text)) {
    io.emit('video controls', 'hide');
  }

  if (checkWord(dictionary.help, text)) {
    try {
      await chat.sendMessage('');
    } catch (error) {
      console.log(error);
    }
  }

  if (checkWord(dictionary.colors, text)) {
    try {
      switch (dictionary.colors) {
        case 'червено':
          body.style.background = 'red';
          break;

        case 'синьо':
          body.style.background = 'blue';
          break;

        case 'зелено':
          body.style.background = 'green';
          break;

        case 'черно':
          body.style.background = 'black';
          break;

        case 'бяло':
          body.style.background = 'white';
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }
});
