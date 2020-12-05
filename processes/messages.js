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
    let message;

    getWeather('Рудозем').then((weatherData) => {
      if (weatherData.error) {
        message = `${getRandom(
          dictionary.responses.problems.weather
        )} ${getRandom(dictionary.emoticons.problem)}`;
      } else {
        message = parseWeather(weatherData);
        console.log(message);
      }
    });

    return message;
  }

  return getRandom(dictionary.responses.problems.understand);
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
