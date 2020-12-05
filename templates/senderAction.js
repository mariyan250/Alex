const fetch = require('node-fetch');
const url = require('../constants/url');

module.exports = async (recipientId) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipient: { id: recipientId },
        sender_action: 'typing_on',
      }),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
