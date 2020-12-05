import fetch from 'node-fetch';
import { url } from '../constants/url.js';

export const sendMessage = async (recipientId, message) => {
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
