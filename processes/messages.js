import { sendMessage } from '../templates/sendMessage.js';
import { sendAction } from '../templates/sendAction.js';

import { getTime } from '../services/time.js';

import { getRandom, checkDictionary } from '../utils/functions.js';

import dictionary from '../dictionary.js';

const determineMessage = ({ text }) => {
  if (checkDictionary(dictionary.greetings, text))
    return `${getRandom(dictionary.responses.greetings)} ${getRandom(
      dictionary.emoticons.greetings
    )}`;

  if (checkDictionary(dictionary.requests.time, text)) {
    return getTime();
  }

  return getRandom(dictionary.responses.problem);
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
