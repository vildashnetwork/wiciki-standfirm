// components/Sidebar.js
import React from 'react';

const Sidebar = ({ currentPage, navigate, isMobileMenuOpen }) => {
  const menuItems = [
    { id: 'gists', icon: 'home', label: 'Home (Gists)' },
    { id: 'reachouts', icon: 'people', label: 'Reachouts' },
    { id: 'calls', icon: 'call', label: 'Calls' },
    { id: 'reels', icon: 'play-circle', label: 'Reels' },
    { id: 'vibes', icon: 'chatbubbles', label: 'Vibes' },
    { id: 'notifications', icon: 'notifications', label: 'Notifications' },
    { id: 'search', icon: 'search', label: 'Search & Discovery' },
    { id: 'settings', icon: 'settings', label: 'Settings' },
  ];

  const handleItemClick = (pageId) => {
    navigate(`/${pageId}`);
    if (window.innerWidth <= 768) {
      // Close mobile menu after navigation on mobile
      document.querySelector('.sidebar-overlay').click();
    }
  };

  return (
    <div className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`} id="sidebar">
      <div className="logo">
        <h1>WICIKI</h1>
      </div>
      <nav className="nav-menu">
        {menuItems.map(item => (
          <button 
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`} 
            onClick={() => handleItemClick(item.id)}
          >
            <span className="nav-icon">
              <ion-icon name={item.icon}></ion-icon>
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;