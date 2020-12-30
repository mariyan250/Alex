const GRAPH_URL = 'https://graph.facebook.com';

export const URL = `${GRAPH_URL}/v9.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`;
export const MESSENGER_PROFILE_URL = `${GRAPH_URL}/v9.0/me/messenger_profile?access_token=${process.env.PAGE_ACCESS_TOKEN}`;
export const MESSENGER_ATTACHMENT_URL = `${GRAPH_URL}/v2.6/me/message_attachments?access_token=${process.env.PAGE_ACCESS_TOKEN}`;
