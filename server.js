import wiki from 'wikipedia';
import brain from 'brain.js';
import fs from 'fs';

import { Bot } from './lib/Bot.js';
import { dictionary } from './dictionary.js';
import { getRandom, parseWeather } from './utils/functions.js';
import { getWeather } from './services/weather.js';

const net = new brain.recurrent.LSTM();
const netData = JSON.parse(fs.readFileSync('trained-data.json'));
net.fromJSON(netData);

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

bot.on('message', async (event, chat) => {
  const { text } = event.message;
  const output = net.run(text);

  if (output.includes('greeting')) {
    await chat.sendMessage(
      `${getRandom(dictionary.responses.greetings)} ${getRandom(
        dictionary.emoticons.greetings
      )}`
    );
  }

  if (output.includes('weather')) {
    await chat.sendMessage(parseWeather(await getWeather('Smolyan')));
  }

  if (output.includes('what is') || output.includes('who is')) {
    const query = event.message.text.toLowerCase().split(' is ')[1];

    try {
      const data = await wiki.page(query);
      const summary = await data.summary();
      await chat.sendMessage(summary.extract);
    } catch (error) {
      console.log(error);
    }
  }
});
