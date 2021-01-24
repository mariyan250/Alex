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
  } else if (text.toLowerCase().includes('синьо')) {
    io.emit('color', 'blue');
  } else if (text.toLowerCase().includes('червено')) {
    io.emit('color', 'red');
  } else if (text.toLowerCase().includes('дискотека')) {
    io.emit('color', 'disco');
  } else if (text.toLowerCase().includes('стоп')) {
    io.emit('color', 'stop');
  } else if (text.toLowerCase().includes('пусни')) {
    const music = text.toLowerCase().split('пусни')[1];
    YouTube.search(music, { limit: 1 })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
});
