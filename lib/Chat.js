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

  async sendAction(senderAction) {
    try {
      const res = await fetch(URL, {
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

  async sendButton(title, buttons) {
    try {
      await fetch(URL, {
        ...this.requestConfig,
        body: JSON.stringify({
          recipient: { id: this.senderID },
          sender: { id: this.senderID },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'button',
                text: title,
                buttons,
              },
            },
          },
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async sendPersistantMenu(callToActions) {
    try {
      const res = await fetch(MESSENGER_PROFILE_URL, {
        ...this.requestConfig,
        body: JSON.stringify({
          persistent_menu: [
            {
              locale: 'default',
              composer_input_disabled: false,
              call_to_actions: callToActions,
            },
          ],
        }),
      });

      console.log(await res.json());
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
