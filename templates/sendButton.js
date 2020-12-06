import { url } from '../constants/url.js';

export const sendButton = async (senderID) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipient: {
          id: senderID,
        },
        message: {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'button',
              text: 'What do you want to do next?',
              buttons: [
                {
                  type: 'web_url',
                  url: 'https://www.messenger.com',
                  title: 'Visit Messenger',
                },
              ],
            },
          },
        },
      }),
    });

    console.log(await response.json());
  } catch (error) {
    console.log(error);
  }
};
