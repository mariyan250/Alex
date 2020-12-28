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

bot.on('message', async (event, chat) => {
  if (
    event.message.text.includes('Кой е') ||
    event.message.text.includes('кой е') ||
    event.message.text.includes('Какво е') ||
    event.message.text.includes('какво е')
  ) {
    message = event.message.text.split(/[Кой е?]/g);
  }
  const data = await getWikipedia('Elon');
  console.log(data.query.pages);
});
