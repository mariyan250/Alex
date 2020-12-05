const processPostback = require('../processes/postback');
const processMessage = require('../processes/messages');

module.exports = (app) => {
  app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
      console.log('Webhook Verified');
      res.status(200).send(req.query['hub.challenge']);
    } else {
      console.error('Verification failed. Token mismatch.');
      res.sendStatus(403);
    }
  });

  app.post('/webhook', function (req, res) {
    if (req.body.object === 'page') {
      req.body.entry.forEach(function (entry) {
        entry.messaging.forEach(function (event) {
          if (event.postback) {
            processPostback(event);
          } else if (event.message) {
            processMessage(event);
          }
        });
      });
      res.sendStatus(200);
    }
  });
};
