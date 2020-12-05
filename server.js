const express = require('express');
const app = express();

app.use(express.json());

require('./routes/webhook_verify')(app);

app.listen(process.env.PORT || 3000);
