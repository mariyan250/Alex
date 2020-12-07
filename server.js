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

bot.listen(/send payload/g, async (event, chat) => {
  await chat.sendAction('mark_seen');
  await chat.sendAction('typing_on');
  await chat.sendPersistantMenu([
    {
      type: 'postback',
      title: 'Talk to an agent',
      payload: 'CARE_HELP',
    },
    {
      type: 'postback',
      title: 'Outfit suggestions',
      payload: 'CURATION',
    },
    {
      type: 'web_url',
      title: 'Shop now',
      url: 'https://www.originalcoastclothing.com/',
      webview_height_ratio: 'full',
    },
  ]);
});

bot.on('postback', async (event, chat) => {
  await chat.sendAction('mark_seen');
  await chat.sendAction('typing_on');

  if (event.postback.payload === 'GET_WEATHER') {
    await chat.sendMessage(parseWeather(await getWeather('Rudozem')));
  } else if (event.postback.payload === 'GET_GREETING') {
    await chat.sendMessage(
      `${getRandom(dictionary.responses.greetings)} ${getRandom(
        dictionary.emoticons.greetings
      )}`
    );
  }
});
