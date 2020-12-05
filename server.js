import express from 'express';
import { setRoute } from './routes/webhook.js';

const app = express();

app.use(express.json());

setRoute(app);

app.listen(process.env.PORT || 3000);
