import { processMessage } from '../processes/messages.js';
import { processPostback } from '../processes/postback.js';

export const setRoute = (app) => {
  app.get('/webhook', (req, res) => {
    if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
      res.status(200).send(req.query['hub.challenge']);
    } else {
      res.sendStatus(403);
    }
  });

  app.post('/webhook', (req, res) => {
    if (req.body.object === 'page') {
      req.body.entry.forEach((entry) => {
        entry.messaging.forEach((event) => {
          if (event.message) processMessage(event);
          if (event.postback) processPostback(event);
        });
      });
      res.sendStatus(200);
    }
  });
};
