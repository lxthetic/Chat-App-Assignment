const http = require('http');
const app = require('express')();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});
const { instrument } = require('@socket.io/admin-ui');
const mongoose = require('mongoose');
const messageSchema = require('./Schema');

const cors = require('cors');
app.use(cors);

require('dotenv').config();
mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to atlas');
  })
  .catch(() => {
    console.log('Not connected to db');
  });

// let messages = [];

function timeFormat(time) {
  var hours = time.getHours();
  var minutes = time.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function dateFormat(date) {
    return `${date.toString().slice(4, 7)} ${date.toString().slice(8, 10)}, ${date.toString().slice(11, 15)}`;
}

io.on('connection', socket => {
  //   console.log(socket.id);
  messageSchema.find().then(data => {
    //   console.log(data);
    io.sockets.emit('recieve-msg', data);
  });

  socket.on('send-msg', (message, user_no) => {
    const saveMessage = new messageSchema({
      message,
      user_no,
      time: timeFormat(new Date()),
      date: dateFormat(new Date()),
    });
    saveMessage
      .save()
      .then(saved => {
        messageSchema.find().then(data => {
          //   console.log(data);
          io.sockets.emit('recieve-msg', data);
        });
      })
      .catch(err => {
        console.log('not saved');
      });
    // messages = [...messages, { message, user_no }];
  });

  socket.on('disconnect', () => {
    messages = [];
  });
});

server.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
instrument(io, { auth: false });
