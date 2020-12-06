import express from 'express';

import Emitter from 'events';

import { Chat } from './Chat.js';

export class Bot extends Emitter {
  constructor(options) {
    if (!options.VERIFY_TOKEN || !options.PORT || !options.URL)
      throw new Error('Please specify options, url and port to start on..');

    super();

    this.VERIFY_TOKEN = options.VERIFY_TOKEN;
    this.PORT = options.PORT;

    this.chat = new Chat(options.URL);

    this.initApp();
  }

  initApp() {
    this.app = express();
    this.app.use(express.json());
    this.setWebhook();
    this.app.listen(this.PORT);
  }

  setWebhook() {
    this.app.get('/webhook', (req, res) => {
      if (req.query['hub.verify_token'] === this.VERIFY_TOKEN) {
        res.status(200).send(req.query['hub.challenge']);
      } else {
        res.sendStatus(403);
      }
    });

    this.app.post('/webhook', (req, res) => {
      if (req.body.object === 'page') {
        req.body.entry.forEach((entry) => {
          entry.messaging.forEach((event) => {
            if (event.message)
              this.emit('message', [event.message, this.chat, event]);
            if (event.postback)
              this.emit('postback', [event.postback, this.chat, event]);
            if (event.attachment)
              this.emit('attachment', [event.attachment, this.chat, event]);
          });
        });
        res.sendStatus(200);
      }
    });
  }

  on(event, cb) {
    this.on(event, (data) => {
      cb(...data);
    });
  }

  hear(message, cb) {
    this.on('message', (data) => {
      switch (typeof message) {
        case 'string':
          if (data[0].text.toLowerCase().includes(message.toLowerCase()))
            cb(...data);
          break;

        case 'object':
          const array = Object.values(message).map((msg) => msg.toLowerCase());
          if (array.includes(data[0].text.toLowerCase())) cb(...data);
          break;

        default:
          throw new Error('Please enter valid message to listen for..');
      }
    });
  }
}
