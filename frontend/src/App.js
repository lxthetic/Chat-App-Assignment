import React, { useEffect } from 'react';
import ChatArea from './Components/Chat Area/Chat Area';
import { useSelector, useDispatch } from 'react-redux';
import { storeMessages } from './Redux/Actions';
import './App.css';

import io from 'socket.io-client';
let ENDPOINT = 'https://react-chat-app-assignment.herokuapp.com/';
let socket;

function App() {
  const dispatch = useDispatch();
  const { message, user_no } = useSelector(state => state.newMessage);

  useEffect(() => {
    socket = io(ENDPOINT);

    return () => {
      socket.off();
    };
  }, []);

  useEffect(() => {
    // console.log('msg');
    socket.on('recieve-msg', recievemsg => {
      // console.log(recievemsg);
      dispatch(storeMessages(recievemsg));
    });

    if (!message.replace(/\s/g, '').length <= 0) {
      socket.emit('send-msg', message, user_no);
    }
    return () => {
      socket.off();
    };
  });

  return (
    <>
      <h2 className="app-title">React Chat App</h2>
      <div className="main-container">
        <ChatArea user_no={1} />
        <ChatArea user_no={2} />
      </div>
    </>
  );
}

export default App;
