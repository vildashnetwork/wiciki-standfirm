// pages/NotificationsPage.js
import React from 'react';

const NotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      icon: '👏',
      title: 'New Taps on your Gist',
      content: 'Amara and 12 others tapped your AI agriculture project',
      time: '2 minutes ago'
    },
    {
      id: 2,
      icon: '🤝',
      title: 'New Reachout Request',
      content: 'Kwame Nkrumah wants to connect with you',
      time: '1 hour ago'
    },
    {
      id: 3,
      icon: '💬',
      title: 'New Message',
      content: 'Zara sent you a message about collaboration',
      time: '3 hours ago'
    }
  ];

  return (
    <div id="notifications" className="page">
      <h2 style={{
        marginBottom: '32px', 
        fontSize: '28px', 
        background: 'linear-gradient(45deg, var(--accent-gold), var(--accent-orange))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Notifications
      </h2>
      {notifications.map(notification => (
        <div key={notification.id} className="notification-item">
          <div className="notification-icon">{notification.icon}</div>
          <div>
            <h4>{notification.title}</h4>
            <p style={{ color: 'var(--text-muted)' }}>{notification.content}</p>
            <small style={{ color: 'var(--text-muted)' }}>{notification.time}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsPage;