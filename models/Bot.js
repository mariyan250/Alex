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
            this.chat.senderID = event.sender.id;
            if (event.message) this.emit('message', event, this.chat);
            if (event.postback) this.emit('postback', event, this.chat);
            if (event.attachment) this.emit('attachment', event, this.chat);
          });
        });
        res.sendStatus(200);
      }
    });
  }

  hear(message, cb) {
    this.on('message', (event, chat) => {
      if (message instanceof RegExp) {
        if (event.message.text.match(message)) cb(event, chat);
        return;
      }

      switch (typeof message) {
        case 'string':
          if (event.message.text.toLowerCase().includes(message.toLowerCase()))
            cb(event, chat);
          break;

        case 'object':
          const array = Object.values(message).map((msg) => msg.toLowerCase());
          const contains = array.some((el) =>
            event.message.text.toLowerCase().includes(el.toLowerCase())
          );
          if (contains) cb(event, chat);
          break;

        default:
          throw new Error('Please enter valid message to listen for..');
      }
    });
  }
}
