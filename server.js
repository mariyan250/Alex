import { Bot } from './lib/Bot.js';
import { dictionary } from './dictionary.js';
import { getRandom, parseWeather } from './utils/functions.js';
import { getWeather } from './services/weather.js';
import wiki from 'wikipedia';

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
  const query = event.message.text.toLowerCase().split('what is')[1];

  try {
    const data = await wiki.page(query);
    const summary = await data.summary();
    const images = await data.images();

    await chat.sendMessage(images[0].url);
    await chat.sendMessage(summary.extract);
  } catch (error) {
    console.log(error);
  }
});

bot.listen('Who is', async (event, chat) => {
  const query = event.message.text.toLowerCase().split('what is')[1];
});
