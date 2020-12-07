import fetch from 'node-fetch';

import { MESSENGER_PROFILE_URL } from '../constants/url.js';

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

  async sendButton(title, buttons) {
    try {
      await fetch(this.URL, {
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
      await fetch(this.URL, {
        ...this.requestConfig,
        body: JSON.stringify({
          persistent_menu: [
            {
              locale: 'default',
              composer_input_disabled: false,
              call_to_actions: {
                title: 'Info',
                type: 'nested',
                call_to_actions: callToActions,
              },
            },
          ],
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async sendGetStarted() {
    console.log('SENDING GETING STARTED ');
    try {
      const req = await fetch(MESSENGER_PROFILE_URL, {
        ...this.requestConfig,
        body: JSON.stringify({
          message: { payload: 'GET_STARTED' },
        }),
      });

      console.log(await req.json());
    } catch (error) {
      console.log(error);
    }
  }
}
