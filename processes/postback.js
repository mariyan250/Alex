export const processPostback = async (event) => {
  const senderID = event.sender.id;
  const payload = event.postback.payload;
  console.log({ senderID, payload });
};
