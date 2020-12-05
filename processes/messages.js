import { sendMessage } from '../templates/sendMessage.js';
import { sendAction } from '../templates/sendAction.js';

import dictionary from '../dictionary.js';

const checkDictionary = (dictionary, text) => {
  return dictionary.find((word) => text.toLowerCase().includes(word));
};

const getRandomMessage = (dictionary) => {
  return dictionary[Math.floor(Math.random() * dictionary.length)];
};

const determineMessage = ({ text }) => {
  if (checkDictionary(dictionary.greetings, text))
    return getRandomMessage(dictionary.responses.greetings);
  return `I don't understand you!`;
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
