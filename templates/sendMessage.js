const fetch = require('node-fetch');
const url = require('../constants/url');

module.exports = async (recipientId, message) => {
  try {
    const response = await fetch(url, {
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

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
