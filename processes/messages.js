const sendMessage = require('../templates/sendMessage');
const senderAction = require('../templates/senderAction');

const determineMessage = (msg) => {
  const message = msg.toLowerCase();
  switch (message) {
    case 'hey':
    case 'hi':
    case 'hello':
      return 'Hello, sir!';
  }
};

module.exports = (event) => {
  if (!event.message.is_echo) {
    const message = event.message;
    const senderID = event.sender.id;
    senderAction(senderID);
    sendMessage(senderID, determineMessage(message));
  }
};
