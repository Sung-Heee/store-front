import React, { useState } from 'react';
import '../style/chatModal.scss';

export default function ChatModal({ isOpen, onClose }) {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleSendMessage = () => {
    const newMessage = {
      sender: 'Username',
      content: message,
    };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage('');
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <div className="chat-messages">
          {chatMessages.map((chatMessage, index) => (
            <div key={index}>
              <span>{chatMessage.sender}: </span>
              <span>{chatMessage.content}</span>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
