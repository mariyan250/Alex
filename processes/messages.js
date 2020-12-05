const sendMessage = require('../templates/sendMessage');
const senderAction = require('../templates/senderAction');

const dictionary = require('../dictionary.json');

const determineMessage = ({ text }) => {
  const message = text.toLowerCase();

  if (dictionary.greetings.includes(message)) {
    return 'Hello!';
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
