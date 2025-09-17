// components/Topbar.js
import React from 'react';

const Topbar = ({ toggleMobileMenu, navigate }) => {
  return (
    <div className="topbar">
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <ion-icon name="menu"></ion-icon>
      </button>
      <div className="quick-actions">
        <button className="quick-btn" onClick={() => alert('Post Gist feature would open a modal here!')}>
          ✨ Post Gist
        </button>
        <button className="quick-btn" onClick={() => navigate('/goals')}>
          🎯 Goals
        </button>
        <button className="quick-btn" onClick={() => navigate('/memtors')}>
          👨‍🏫 Memtors
        </button>
      </div>
      <div className="profile-section">
        <div className="profile-avatar" onClick={() => navigate('/profile')}>AK</div>
      </div>
    </div>
  );
};

export default Topbar;