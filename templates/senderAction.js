const fetch = require('node-fetch');
const url = require('../constants/url');

module.exports = async (recipientId, senderAction) => {
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipient: { id: recipientId },
        sender_action: senderAction,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};
