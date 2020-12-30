import fetch from 'node-fetch';

import { URL } from '../constants/url.js';
import { MESSENGER_PROFILE_URL } from '../constants/url.js';

export class Chat {
  constructor() {
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
      await fetch(URL, {
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

  async sendImage(url) {
    try {
      await fetch(MESSENGER_PROFILE_URL, {
        ...this.requestConfig,
        body: JSON.stringify({
          get_started: { payload: 'GET_STARTED' },
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async sendGetStarted() {
    try {
      await fetch(MESSENGER_PROFILE_URL, {
        ...this.requestConfig,
        body: JSON.stringify({
          get_started: { payload: 'GET_STARTED' },
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }
}
