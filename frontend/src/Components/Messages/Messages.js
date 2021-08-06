import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './Messages.css';

const Messages = ({ messages, userNo }) => {
  let prevDate = '';

  return (
    <ScrollToBottom className="messages">
      <div className="padding"></div>
      {messages.map(({ message, user_no, time, date }, id) => {
        return (
          <div key={id}>
            {date !== prevDate ? <p className="date">{date}</p> : null}
            <div style={{ display: 'none' }}>{date !== prevDate ? (prevDate = date) : null}</div>
            
            <div className="message" style={{ alignItems: user_no === userNo ? 'flex-end' : 'flex-start' }}>
              <div style={{ background: user_no === userNo ? '' : '#b228f9' }}>
                {message}
                <p className="time">{time}</p>
              </div>
            </div>
          </div>
        );
      })}
      <div className="padding"></div>
    </ScrollToBottom>
  );
};

export default Messages;
