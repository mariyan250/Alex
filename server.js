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
    text.toLowerCase().includes('син цвят') ||
    text.toLowerCase().includes('sin cvqt') ||
    text.toLowerCase().includes('color blue')
  ) {
    io.emit('color', 'blue');
  } else if (
    text.toLowerCase().includes('червен цвят') ||
    text.toLowerCase().includes('cherven cvqt') ||
    text.toLowerCase().includes('color red')
  ) {
    io.emit('color', 'red');
  } else if (
    text.toLowerCase().includes('диско') ||
    text.toLowerCase().includes('дискотека') ||
    text.toLowerCase().includes('diskoteka') ||
    text.toLowerCase().includes('disko')
  ) {
    io.emit('color', 'disco');
  } else if (
    text.toLowerCase().includes('стоп') ||
    text.toLowerCase().includes('спри') ||
    text.toLowerCase().includes('stop')
  ) {
    io.emit('color', 'stop');
  } else if (text.toLowerCase().includes('пусни')) {
    const music = text.toLowerCase().split('пусни')[1];
    YouTube.search(music, { limit: 1 })
      .then((res) => {
        io.emit('youtube link', res[0].id);
      })
      .catch((err) => console.log(err));
  } else if (text.toLowerCase().includes('покажи')) {
    io.emit('video controls', 'show');
  } else if (
    text.toLowerCase().includes('скрии') ||
    text.toLowerCase().includes('скрий') ||
    text.toLowerCase().includes('skrii') ||
    text.toLowerCase().includes('skri ')
  ) {
    io.emit('video controls', 'hide');
  } else if (
    text.toLowerCase().includes('покажи часа') ||
    text.toLowerCase().includes('покажи час') ||
    text.toLowerCase().includes('час')
  ) {
    io.emit('hours', 'show');
  } else if (
    text.toLowerCase().includes('скрий часа') ||
    text.toLowerCase().includes('скрии часа')
  ) {
    io.emit('hours', 'hide');
  }
});
