// components/BottomNav.js
import React from 'react';

const BottomNav = ({ currentPage, navigate }) => {
  const navItems = [
    { id: '', icon: 'home', label: 'Home' },
    { id: 'profile', icon: 'person', label: 'Profile' },
    { id: 'vibes', icon: 'chatbubbles', label: 'Vibes' },
  ];

  const handleItemClick = (pageId) => {
    navigate(`/${pageId}`);
  };

  return (
    <div className="bottom-nav">
      <div className="bottom-nav-container">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`bottom-nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => handleItemClick(item.id)}
          >
            <ion-icon name={item.icon}></ion-icon>
            <span className="bottom-nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;