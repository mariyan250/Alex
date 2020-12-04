const request = require('request');
const sendMessage = require('../templates/sendMessage');

module.exports = function processMessage(event) {
  if (!event.message.is_echo) {
    const message = event.message;
    const senderID = event.sender.id;
    console.log('Received message from senderId: ' + senderID);
    console.log('Message is: ' + JSON.stringify(message));
    if (message.text === 'Hey') {
      console.log('Messageeeeeeeeeee ' + message.text);
      sendMessage(senderID, 'Hello, Mariyan!');
    }
  }
};
