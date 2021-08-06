const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  user_no: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true
  }
});

const messages = new mongoose.model('Message', messageSchema);

module.exports = messages;
