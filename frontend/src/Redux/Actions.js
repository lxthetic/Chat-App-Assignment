const storeMessage = (message, user_no) => {
  return {
    type: 'STORE MESSAGE',
    payload: { message, user_no },
  };
};
const storeMessages = messages => {
  return {
    type: 'STORE MESSAGES',
    payload: messages,
  };
};

export { storeMessage, storeMessages };
