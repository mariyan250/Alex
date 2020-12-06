import { sendMessage } from '../templates/sendMessage.js';
import { sendAction } from '../templates/sendAction.js';

import { getTime } from '../services/time.js';
import { getWeather } from '../services/weather.js';
import { getWikipedia } from '../services/wikipedia.js';

import {
  getRandom,
  checkDictionary,
  parseWeather,
} from '../utils/functions.js';

import dictionary from '../dictionary.js';

const determineMessage = async ({ text }) => {
  // Words
  if (checkDictionary(dictionary.greetings, text))
    return `${getRandom(dictionary.responses.greetings)} ${getRandom(
      dictionary.emoticons.greetings
    )}`;

  // Тime
  if (checkDictionary(dictionary.requests.time, text)) {
    return getTime();
  }

  // Weather
  if (checkDictionary(dictionary.requests.weather, text)) {
    const data = await getWeather('Rudozem');
    return parseWeather(data);
  }

  // Wikipedia searching
  if (text.toLowerCase().includes('search')) {
    const data = await getWikipedia(text);
    console.log(data);
    return data;
  }

  return getRandom(dictionary.responses.problems.understand);
};

export const processMessage = async (event) => {
  if (!event.message.is_echo) {
    const message = event.message;
    const senderID = event.sender.id;
    await sendAction(senderID, 'mark_seen');
    await sendAction(senderID, 'typing_on');
    await sendMessage(senderID, await determineMessage(message));
  }
};
