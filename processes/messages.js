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

  if (text.toLowerCase().includes('search')) {
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: {
            id: senderID,
          },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'button',
                text: 'What do you want to do next?',
                buttons: [
                  {
                    type: 'web_url',
                    url: 'https://www.messenger.com',
                    title: 'Visit Messenger',
                  },
                ],
              },
            },
          },
        }),
      });
    } catch (error) {
      console.log(error);
    }
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
