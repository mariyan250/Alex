const sendMessage = require('../templates/sendMessage');

module.exports = (event) => {
  if (!event.message.is_echo) {
    const message = event.message;
    const senderID = event.sender.id;
    console.log('Received message from senderId: ' + senderID);
    console.log('Message is: ' + JSON.stringify(message.text));
    sendMessage(senderID, 'Fuck you!');
  }
};
