import fetch from 'node-fetch';

import fetch from 'node-fetch';
import { url } from '../constants/url.js';

export const processPostback = async (event) => {
  const senderID = event.sender.id;
  const payload = event.postback.payload;
};
