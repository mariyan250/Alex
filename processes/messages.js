import { sendMessage } from '../templates/sendMessage.js';
import { sendAction } from '../templates/sendAction.js';

import { getTime } from '../services/time.js';
import { getWeather } from '../services/weather.js';

import {
  getRandom,
  checkDictionary,
  parseWeather,
} from '../utils/functions.js';

import dictionary from '../dictionary.js';

const determineMessage = ({ text }) => {
  let message;

  // Words
  if (checkDictionary(dictionary.greetings, text))
    message = `${getRandom(dictionary.responses.greetings)} ${getRandom(
      dictionary.emoticons.greetings
    )}`;

  // Тime
  if (checkDictionary(dictionary.requests.time, text)) {
    message = getTime();
  }

  // Weather
  if (checkDictionary(dictionary.requests.weather, text)) {
    getWeather('Rudozem').then((data) => {
      message = parseWeather(data);
    });
  }

  if (message) {
    return message;
  } else {
    return getRandom(dictionary.responses.problems.understand);
  }
};

export const processMessage = async (event) => {
  if (!event.message.is_echo) {
    const message = event.message;
    const senderID = event.sender.id;
    await sendAction(senderID, 'mark_seen');
    await sendAction(senderID, 'typing_on');
    await sendMessage(senderID, determineMessage(message));
  }
};
