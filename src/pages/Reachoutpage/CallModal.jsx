// components/CallModal.jsx
import React from 'react';
import './CallModal.css';

const CallModal = ({ name, avatar, onClose }) => {
  return (
    <div className="call-modal-overlay">
      <div className="call-modal">
        <div className="call-avatar-ring">
          <div className="call-avatar">{avatar}</div>
        </div>
        <h3>Call {name}</h3>
        <div className="call-options">
          <button className="call-btn audio">📞 Audio</button>
          <button className="call-btn video">🎥 Video</button>
          <button className="call-btn cancel" onClick={onClose}>❌ Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CallModal;
