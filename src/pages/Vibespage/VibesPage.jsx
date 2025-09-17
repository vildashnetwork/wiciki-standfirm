// pages/VibesPage.js
import React, { useState } from 'react';

const VibesPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! I saw your latest gist about the banking app. The accessibility features are brilliant!",
      sent: false
    },
    {
      id: 2,
      text: "Thank you! I'd love to hear your thoughts on the color contrast choices.",
      sent: true
    },
    {
      id: 3,
      text: "The warm earth tones work perfectly with the gold accents. Very Afro-futuristic!",
      sent: false
    }
  ]);

  const sendMessage = (e) => {
    if (e && e.key !== 'Enter' && e.type !== 'click') return;
    
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sent: true
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate response after a delay
      setTimeout(() => {
        const response = {
          id: messages.length + 2,
          text: "That's a great point! Let's discuss this further.",
          sent: false
        };
        setMessages(prev => [...prev, response]);
      }, 1500);
    }
  };

  return (
    <div id="vibes" className="page">
      <div className="chat-container">
        <div className="chat-list">
          <h3 style={{ marginBottom: '24px', color: 'var(--accent-gold)' }}>Conversations</h3>
          <div className="chat-item active">
            <div className="gist-avatar" style={{ marginRight: '12px' }}>AM</div>
            <div>
              <h4>Amara Okafor</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Great work on the design!</p>
            </div>
          </div>
          <div className="chat-item">
            <div className="gist-avatar" style={{ marginRight: '12px' }}>KN</div>
            <div>
              <h4>Kwame Nkrumah</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Let's collaborate on this project</p>
            </div>
          </div>
        </div>
        <div className="chat-main">
          <div className="chat-header">
            <div className="gist-avatar">AM</div>
            <div>
              <h3>Amara Okafor</h3>
              <div className="skill-tags">
                <span className="skill-tag">UI/UX Design</span>
              </div>
            </div>
          </div>
          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.sent ? 'sent' : ''}`}>
                <div className="message-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => sendMessage(e)}
            />
            <button className="quick-btn" onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VibesPage;