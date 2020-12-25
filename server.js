import { Bot } from './lib/Bot.js';
import { dictionary } from './dictionary.js';
import { getRandom, parseWeather } from './utils/functions.js';
import { getWeather } from './services/weather.js';

const bot = new Bot({
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  PORT: process.env.PORT,
});

// Weather
bot.listen(dictionary.requests.weather, async (event, chat) => {
  await chat.sendMessage(parseWeather(await getWeather('Rudozem')));
});

// Wikipedia
bot.listen('search', async (event, chat) => {});

// Greetings
bot.listen(dictionary.greetings, async (event, chat) => {
  await chat.sendMessage(
    `${getRandom(dictionary.responses.greetings)} ${getRandom(
      dictionary.emoticons.greetings
    )}`
  );
});

bot.on('postback', async (event, chat) => {
  const { payload } = event.postback;

  switch (payload) {
    case 'GET_WEATHER':
      await chat.sendMessage(parseWeather(await getWeather('Rudozem')));
      break;

    case 'GET_GREETING':
      await chat.sendMessage(
        `${getRandom(dictionary.responses.greetings)} ${getRandom(
          dictionary.emoticons.greetings
        )}`
      );
      break;

    case 'GET_STARTED':
      await chat.sendMessage(
        'Здравей! Аз съм Алекс и съм твоят персонален асистент!'
      );
      break;
  }
});
