module.exports = (event) => {
  const senderID = event.sender.id;
  const payload = event.postback.payload;
  console.log({ senderId, payload });
};
