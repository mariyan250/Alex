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

  async sendButton(title, payload) {
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
                template_type: 'generic',
                elements: [
                  {
                    title: 'Welcome!',
                    image_url:
                      'https://petersfancybrownhats.com/company_image.png',
                    subtitle: 'We have the right hat for everyone.',
                    default_action: {
                      type: 'web_url',
                      url: 'https://petersfancybrownhats.com/view?item=103',
                      webview_height_ratio: 'tall',
                    },
                    buttons: [
                      {
                        type: 'web_url',
                        url: 'https://petersfancybrownhats.com',
                        title: 'View Website',
                      },
                      {
                        type: 'postback',
                        title: 'Start Chatting',
                        payload: 'DEVELOPER_DEFINED_PAYLOAD',
                      },
                    ],
                  },
                ],
              },
            },
          },
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }
}
