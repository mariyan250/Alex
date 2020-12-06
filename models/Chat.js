import fetch from 'node-fetch';

export class Chat {
  postHeader = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  constructor(url) {
    this.URL = url;
  }

  async sendMessage(senderID, message) {
    try {
      await fetch(this.URL, {
        ...this.postHeader,
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
        ...this.postHeader,
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
