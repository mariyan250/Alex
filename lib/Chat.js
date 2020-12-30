import fetch from 'node-fetch';

import { URL } from '../constants/url.js';
import {
  MESSENGER_PROFILE_URL,
  MESSENGER_ATTACHMENT_URL,
} from '../constants/url.js';

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
      const data = await fetch(MESSENGER_ATTACHMENT_URL, {
        ...this.requestConfig,
        body: JSON.stringify({
          message: {
            attachment: {
              type: 'image',
              payload: {
                is_reusable: true,
                url,
              },
            },
          },
        }),
      });

      console.log(await data.json());
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
