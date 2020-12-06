import { Bot } from './models/Bot.js';
import { URL } from './constants/url.js';
import { dictionary } from './dictionary.js';
import { getRandom, parseWeather } from './utils/functions.js';
import { getWeather } from './services/weather.js';
import { getWikipedia } from './services/wikipedia.js';

const bot = new Bot({
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  PORT: process.env.PORT,
  URL,
});

bot.on('message', async (event, chat) => {
  await chat.sendAction('mark_seen');
});

bot.hear(dictionary.greetings, async (event, chat) => {
  await chat.sendAction('typing_on');
  await chat.sendMessage(
    `${getRandom(dictionary.responses.greetings)} ${getRandom(
      dictionary.emoticons.greetings
    )}`
  );
});

bot.hear(dictionary.requests.weather, async (event, chat) => {
  await chat.sendAction('typing_on');
  await chat.sendMessage(parseWeather(await getWeather('Rudozem')));
});

bot.hear('search', async (event, chat) => {
  await getWikipedia('Elon Musk!');
});
