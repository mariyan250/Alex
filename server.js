import { Bot } from './lib/Bot.js';
import { dictionary } from './dictionary.js';
import { getRandom, parseWeather } from './utils/functions.js';
import { getWeather } from './services/weather.js';
import { getWikipedia } from './services/wikipedia.js';

const bot = new Bot({
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  PORT: process.env.PORT,
});

// Get started
bot.on('postback', async (event, chat) => {
  const { payload } = event.postback;

  switch (payload) {
    case 'GET_STARTED':
      await chat.sendMessage(`${getRandom(dictionary.responses.start)}`);
      break;
  }
});

// Greetings
bot.listen(dictionary.greetings, async (event, chat) => {
  await chat.sendMessage(
    `${getRandom(dictionary.responses.greetings)} ${getRandom(
      dictionary.emoticons.greetings
    )}`
  );
});

// Functionalities
bot.listen(dictionary.requests.functionalities, async (event, chat) => {
  await chat.sendMessage(
    `${getRandom(dictionary.responses.functionalities)} ${getRandom(
      dictionary.emoticons.problem
    )}`
  );
});

// Weather
bot.listen(dictionary.requests.weather, async (event, chat) => {
  await chat.sendMessage(parseWeather(await getWeather('Smolyan')));
});

bot.listen('search', async (event, chat) => {
  const data = await getWikipedia('Car');
  console.log(data.query.pages['0'].extract);
});
