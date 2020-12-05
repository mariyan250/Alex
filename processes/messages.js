import { sendMessage } from '../templates/sendMessage.js';
import { sendAction } from '../templates/sendAction.js';

import { getTime } from '../services/time.js';

import { getRandomMessage, checkDictionary } from '../utils/functions.js';

import dictionary from '../dictionary.js';

const determineMessage = ({ text }) => {
  if (checkDictionary(dictionary.greetings, text))
    return getRandomMessage(dictionary.responses.greetings);

  if (checkDictionary(dictionary.requests.time, text)) {
    return getTime();
  }

  return getRandomMessage(dictionary.responses.problem);
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
