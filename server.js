import Bot from './models/Bot.js';

const bot = new Bot({
  verify_token: process.env.VERIFY_TOKEN,
  page_access_token: process.env.PAGE_ACCESS_TOKEN,
  port: process.env.PORT || 3000,
});

bot.on('message', (message) => {
  console.log(message.text);
});

bot.listen('Hey', (message) => {
  console.log(message.text);
});
