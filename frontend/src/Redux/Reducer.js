const newMessage = (state = { message: '' }, action) => {
  switch (action.type) {
    case 'STORE MESSAGE':
      return action.payload;
    default:
      return state;
  }
};

const allMessages = (state = [], action) => {
  switch (action.type) {
    case 'STORE MESSAGES':
      return action.payload;
    default:
      return state;
  }
};

export { newMessage, allMessages };
