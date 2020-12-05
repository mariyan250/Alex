const fetch = require('node-fetch');
const url = require('../constants/url');

module.exports = async (recipientId, message) => {
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipient: {
          id: recipientId,
        },
        message: {
          text: message,
        },
      }),
    });
  } catch (error) {
    console.log(error);
  }
};
