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

  get senderID() {
    return this._senderID;
  }

  set senderID(id) {
    this._senderID = id;
  }

  async sendMessage(message) {
    try {
      await fetch(this.URL, {
        ...this.requestConfig,
        body: JSON.stringify({
          recipient: { id: this.senderID },
          message: { text: message },
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async sendAction(senderAction) {
    try {
      await fetch(this.URL, {
        ...this.requestConfig,
        body: JSON.stringify({
          recipient: { id: this.senderID },
          sender_action: senderAction,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async sendPostback(title, payloadTitle) {
    try {
      await fetch(this.URL, {
        ...history.requestConfig,
        body: JSON.stringify({
          recipient: { id: this.senderID },
          sender: { id: this.senderID },
          postback: {
            title: 'Get Weather',
            payload: 'GET_WEATHER',
          },
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }
}
