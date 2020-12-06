import fetch from 'node-fetch';

export class Chat {
  constructor(url) {
    this.URL = url;
  }

  async sendMessage(recipientId, message) {
    try {
      await fetch(this.URL, {
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
