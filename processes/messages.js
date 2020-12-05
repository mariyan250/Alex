const sendMessage = require('../templates/sendMessage');
const senderAction = require('../templates/senderAction');

const dictionary = require('../dictionary.json');

const checkDictionary = (dictionary, text) => {
  return dictionary.find((word) => text.toLowerCase().includes(word));
};

const getRandomMessage = (dictionary) => {
  return dictionary[Math.floor(Math.random() * dictionary.length)];
};

const determineMessage = ({ text }) => {
  if (checkDictionary(dictionary.greetings, text)) {
    return getRandomMessage(dictionary.responses.greetings);
  }
  return `I don't understand you!`;
};

module.exports = async (event) => {
  if (!event.message.is_echo) {
    const message = event.message;
    const senderID = event.sender.id;
    await senderAction(senderID, 'mark_seen');
    await senderAction(senderID, 'typing_on');
    await sendMessage(senderID, determineMessage(message));
  }
};
