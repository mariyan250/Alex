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
  await chat.sendButton('Избери опция', [
    { type: 'postback', title: 'Кажи здравей на Алекс!', payload: 'GET_GREETING' }
    { type: 'postback', title: 'Какво е времето? ☀️', payload: 'GET_WEATHER' },
  ]);
});

bot.on('postback', async (event, chat) => {
  if (event.postback.payload === 'GET_WEATHER') {
    await chat.sendAction('mark_seen');
    await chat.sendAction('typing_on');
    await chat.sendMessage(parseWeather(await getWeather('Rudozem')));
  } else if (event.postback.payload === 'GET_GREETING') {
    await chat.sendAction('mark_seen');
    await chat.sendAction('typing_on');
    await chat.sendMessage(`${getRandom(dictionary.responses.greetings)} ${getRandom(
      dictionary.emoticons.greetings
    )}`);
  }
});
