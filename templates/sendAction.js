import fetch from 'node-fetch';
import { url } from '../constants/url.js';

export const sendAction = async (recipientId, senderAction) => {
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
