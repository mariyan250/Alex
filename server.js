const express = require('express');
const morgan = require('morgan');
const app = express();

// setup our express application
app.use(morgan('dev')); // log every request to the console.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app routes
require('./routes/webhook_verify')(app);

// warming up the engines !! setta !! go !!!.
app.listen(process.env.PORT || 3000);
