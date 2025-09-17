import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ isMobileMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: '', icon: 'home', label: 'Home (Gists)' },
    { id: 'reachouts', icon: 'people', label: 'Reachouts' },
    { id: 'calls', icon: 'call', label: 'Calls' },
    { id: 'reels', icon: 'play-circle', label: 'Reels' },
    { id: 'vibes', icon: 'chatbubbles', label: 'Vibes' },
    { id: 'notifications', icon: 'notifications', label: 'Notifications' },
    { id: 'search', icon: 'search', label: 'Search & Discovery' },
    { id: 'settings', icon: 'settings', label: 'Settings' },
  ];

  const handleItemClick = (id) => {
    navigate(`/${id}`);
    if (window.innerWidth <= 768) {
      document.querySelector('.sidebar-overlay')?.click();
    }
  };

  return (
    <div className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="logo">
        <h1>WICIKI</h1>
      </div>
      <nav className="nav-menu">
        {menuItems.map(item => {
          const isActive = location.pathname === `/${item.id}`;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleItemClick(item.id)}
            >
              <span className="nav-icon">
                <ion-icon name={item.icon}></ion-icon>
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
