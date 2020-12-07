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

// Weather
bot.listen(dictionary.requests.weather, async (event, chat) => {
  await chat.sendAction('mark_seen');
  await chat.sendAction('typing_on');
  await chat.sendMessage(parseWeather(await getWeather('Rudozem')));
});

// Wikipedia
bot.listen('search', async (event, chat) => {
  await chat.sendAction('mark_seen');
  await chat.sendAction('typing_on');
  await getWikipedia('Elon Musk!');
});

// Greetings
bot.listen(dictionary.greetings, async (event, chat) => {
  await chat.sendAction('mark_seen');
  await chat.sendAction('typing_on');
  await chat.sendMessage(
    `${getRandom(dictionary.responses.greetings)} ${getRandom(
      dictionary.emoticons.greetings
    )}`
  );
});

bot.on('postback', async (event, chat) => {
  const { payload } = event.postback;

  await chat.sendAction('mark_seen');
  await chat.sendAction('typing_on');

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
      await chat.sendPersistantMenu([
        {
          title: 'Какво е времето? ☀️',
          type: 'postback',
          payload: 'GET_WEATHER',
        },
      ]);
      break;
  }
});
