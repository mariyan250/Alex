import express from 'express';
import Emitter from 'events';

export default class Bot extends Emitter {
  constructor(options) {
    if (!options.VERIFY_TOKEN || !options.PAGE_ACCESS_TOKEN || !options.PORT)
      throw new Error('Please specify options and port to start on..');

    super();

    this.VERIFY_TOKEN = options.VERIFY_TOKEN;
    this.PAGE_ACCESS_TOKEN = options.PAGE_ACCESS_TOKEN;
    this.PORT = options.PORT;

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
            if (event.message) this.emit('message', event.message);
            if (event.postback) this.emit('postback', event.postback);
            if (event.attachment) this.emit('attachment', event.attachment);
          });
        });
        res.sendStatus(200);
      }
    });
  }

  listen(message, cb) {
    this.on('message', (payload) => {
      switch (typeof message) {
        case 'string':
          if (payload.text.toLowerCase().includes(message.toLowerCase()))
            cb(payload);
          break;

        case 'object':
          const array = Object.values(message).map((msg) => msg.toLowerCase());
          if (array.includes(payload)) cb(payload);
          break;
      }
    });
  }
}
