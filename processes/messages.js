const sendMessage = require('../templates/sendMessage');
const senderAction = require('../templates/senderAction');

const determineMessage = (message) => {
  const msg = message.toLowerCase();
  console.log(msg);
  switch (msg) {
    case 'hey':
    case 'hi':
    case 'hello':
      return 'Hello, sir!';
  }
};

module.exports = (event) => {
  if (!event.message.is_echo) {
    const message = event.message;
    console.log(message);
    const senderID = event.sender.id;
    senderAction(senderID);
  }
};
