// components/ChatBox.jsx
import React from 'react';
import './ChatBox.css';
import { useState } from 'react';

const ChatBox = ({ name, onClose }) => {
  const [message, setMessage] = useState('');
  const handleSend = () => {
    if (message.trim()) {
      // Add message logic here
      setMessage('');
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <div className="chatbox-avatar">{name[0]}</div>
        <div className="chatbox-title">{name}</div>
        <button className="chatbox-close" onClick={onClose}>✖</button>
      </div>

      <div className="chatbox-messages">
        <div className="message received">
          <div className="bubble">Hey there! 👋</div>
          <span className="timestamp">18:45</span>
        </div>
        <div className="message sent">
          <div className="bubble">Hi! Ready to connect.</div>
          <span className="timestamp">18:46</span>
        </div>
        <div className="typing-indicator">
          <span>.</span><span>.</span><span>.</span>
        </div>
      </div>

      <div className="chatbox-input">
        <input
          type="text"
          placeholder="Message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button className="send-btn" onClick={handleSend}>➤</button>
      </div>
    </div>
  );
};
export default ChatBox;
