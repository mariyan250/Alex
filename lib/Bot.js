import http from 'http';
import express from 'express';
import * as socket_io from 'socket.io';

import { EventEmitter } from 'events';
import { Chat } from './Chat.js';

export class Bot extends EventEmitter {
  constructor(options) {
    if (!options.VERIFY_TOKEN || !options.PORT)
      throw new Error('Please specify options, url and port to start on..');

    super();

    this.VERIFY_TOKEN = options.VERIFY_TOKEN;
    this.PORT = options.PORT;
    this.chat = new Chat();
    this.initApp();
  }

  initApp() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new socket_io.Server(this.server);
    this.app.use(express.json());
    this.setWebhook();
    this.server.listen(8080 || this.PORT);

    this.io.on('connection', () => {
      console.log('user connected!');
    });
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

    this.chat.sendGetStarted();
  }
}
