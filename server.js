import Bot from './models/Bot.js';

const bot = new Bot({
  verify_token: process.env.VERIFY_TOKEN,
  page_access_token: process.env.PAGE_ACCESS_TOKEN,
  port: process.env.PORT || 3000,
});

bot.on('message', (event) => {
  if (event.message) {
    console.log(event.message);
  }
});
