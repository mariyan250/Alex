import express from 'express';
import Emitter from 'events';

export default class Bot extends Emitter {
  app = express();

  constructor(options) {
    super();

    if (!options.verifyToken || !options.pageAccessToken || !options.port)
      throw new Error('Please specify options and port to start on..');

    this.verifyToken = options.verifyToken;
    this.pageAccessToken = options.pageAccessToken;
    this.port = options.port;

    this.setWebhook();
  }

  setWebhook() {
    this.app.get('/webhook', (req, res) => {
      if (req.query['hub.verify_token'] === this.verifyToken) {
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

    this.app.listen(this.port, () => console.log('Server started..'));
  }
}
