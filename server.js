import { Bot } from './lib/Bot.js';

const bot = new Bot({
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  PORT: process.env.PORT,
});

// SocketIO
let io;

bot.on('socket connection', (socket) => {
  io = socket;
  console.log(socket);
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
  }
});
