import fetch from 'node-fetch';

export class Chat {
  async sendMessage(recipientId, message) {
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
  }
}
