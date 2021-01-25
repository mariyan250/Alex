import { Bot } from './lib/Bot.js';
import { YouTube } from 'youtube-sr';

const bot = new Bot({
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  PORT: process.env.PORT,
});

// SocketIO
let io;

bot.on('socket connection', (socket) => {
  io = socket;
});

// Messages
bot.on('message', async (event, chat) => {
  const { text } = event.message;

  if (['hey', 'hi', 'hello'].includes(text.toLowerCase())) {
    await chat.sendMessage('Hello, sir!');
  } else if (
    text.toLowerCase().includes('син цвят' || 'sin cvqt' || 'color blue')
  ) {
    io.emit('color', 'blue');
  } else if (
    text.toLowerCase().includes('червен цвят' || 'cherven cvqt' || 'color red')
  ) {
    io.emit('color', 'red');
  } else if (
    text
      .toLowerCase()
      .includes('диско' || 'дискотека' || 'disko' || 'diskoteka')
  ) {
    io.emit('color', 'disco');
  } else if (
    text.toLowerCase().includes('стоп' || 'спри' || 'stop' || 'spri')
  ) {
    io.emit('color', 'stop');
  } else if (text.toLowerCase().includes('пусни' || 'pusni')) {
    const music = text.toLowerCase().split('пусни')[1];
    YouTube.search(music, { limit: 1 })
      .then((res) => {
        io.emit('youtube link', res[0].id);
      })
      .catch((err) => console.log(err));
  } else if (text.toLowerCase().includes('покажи' || 'pokaji')) {
    io.emit('video controls', 'show');
  } else if (
    text.toLowerCase().includes('скрии' || 'skrii' || 'skri')
  ) {
    io.emit('video controls', 'hide');
  }
});
