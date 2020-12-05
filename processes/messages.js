const sendMessage = require('../templates/sendMessage');
const senderAction = require('../templates/senderAction');

const dictionary = require('../dictionary.json');

const checkDictionary = (dictionary, text) => {
  dictionary.forEach((word) => {
    if (text.toLowerCase().includes(word)) {
      return true;
    }
  });
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
    await senderAction(senderID);
    await sendMessage(senderID, determineMessage(message));
  }
};
