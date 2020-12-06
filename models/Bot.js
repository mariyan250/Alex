import express from 'express';
import Emitter from 'events';

export default class Bot extends Emitter {
  constructor(options) {
    if (!options.verify_token || !options.page_access_token || !options.port)
      throw new Error('Please specify options and port to start on..');

    super();

    this.verify_token = options.verify_token;
    this.page_access_token = options.page_access_token;
    this.port = options.port;

    this.initApp();
  }

  initApp() {
    this.app = express();
    this.app.use(express.json());
    this.setWebhook();
    this.app.listen(this.port, () => console.log('Server started..'));
  }

  setWebhook() {
    this.app.get('/webhook', (req, res) => {
      if (req.query['hub.verify_token'] === this.verify_token) {
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
      if (
        typeof message === 'string' &&
        payload.text.toLowerCase().includes(message.toLowerCase())
      ) {
        cb(payload);
      } else if (typeof message === 'object') {
        const array = Object.entries(message).map((msg) => msg.toLowerCase());
        if (array.includes(payload)) cb(payload);
      }
    });
  }
}
