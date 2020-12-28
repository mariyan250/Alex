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

bot.listen('What is', async (event, chat) => {
  const message = event.message.text.split('what is ')[1];
  const data = await getWikipedia(message);
  console.log(data);
  Object.entries(data.query.pages).map(async ([key, val]) => {
    await chat.sendMessage(val.extract);
  });
});

bot.listen('Who is', async (event, chat) => {
  const message = event.message.text.split('who is ')[1];
  const data = await getWikipedia(message);
  console.log(data);
  Object.entries(data.query.pages).map(async ([key, val]) => {
    await chat.sendMessage(val.extract);
  });
});
