import React, { useEffect, useState } from 'react';
import Messages from '../Messages/Messages';
import SendLogo from '../../Assets/Send.svg';
import './Chat Area.css';
import { useDispatch, useSelector } from 'react-redux';
import { storeMessage } from '../../Redux/Actions';

const ChatArea = ({ user_no }) => {
  const messages = useSelector(state => state.allMessages);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setMessage(e.target.value);
  };

  const handleSubmit = e => {
    if (!message.replace(/\s/g, '').length <= 0) {
      dispatch(storeMessage(message, user_no));
      setMessage('');
      document.getElementById(`msg${user_no}`).focus();
    }
  };

  useEffect(() => {
    let enterClick;
    document.getElementById(`msg${user_no}`).addEventListener(
      'keyup',
      (enterClick = e => {
        // console.log(message);
        if (e.keyCode === 13) {
          if (!message.replace(/\s/g, '').length <= 0) {
            dispatch(storeMessage(message, user_no));
            setMessage('');
            document.getElementById(`msg${user_no}`).focus();
          }
        }
      })
    );

    return () => {
      document.getElementById(`msg${user_no}`).removeEventListener('keyup', enterClick);
    };
  });

  return (
    <div className="chatbox">
      <section>{`User ${user_no}`}</section>
      <Messages messages={messages} userNo={user_no} />
      <div className="input-area">
        <input
          type="text"
          value={message}
          placeholder="Type..."
          id={`msg${user_no}`}
          autoComplete="off"
          onChange={handleChange}
        />
        <div onClick={handleSubmit} id="sendMsg">
          <img src={SendLogo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
