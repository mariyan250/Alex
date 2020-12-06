import fetch from 'node-fetch';

export class Chat {
  constructor(url) {
    this.URL = url;
    this.requestConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  async sendMessage(senderID, message) {
    try {
      await fetch(this.URL, {
        ...this.requestConfig,
        body: JSON.stringify({
          recipient: { id: senderID },
          message: { text: message },
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async sendAction(senderID, senderAction) {
    try {
      await fetch(this.URL, {
        ...this.requestConfig,
        body: JSON.stringify({
          recipient: { id: senderID },
          sender_action: senderAction,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }
}
