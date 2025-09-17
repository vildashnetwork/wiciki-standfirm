// pages/ProfilePage.js
import React from 'react';

const ProfilePage = () => {
  return (
    <div id="profile" className="page">
      <div className="profile-banner">
        <div className="profile-main">
          <div className="profile-pic">AK</div>
          <div className="profile-details">
            <h2>Akosua Kwarteng</h2>
            <div className="skill-tags">
              <span className="skill-tag">Full-Stack Developer</span>
              <span className="skill-tag">React</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">AI/ML</span>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-stats">
        <div className="stat-item">
          <div className="stat-number">156</div>
          <div className="stat-label">Gists</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">2.4K</div>
          <div className="stat-label">Reachers</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">89</div>
          <div className="stat-label">Skills</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">12</div>
          <div className="stat-label">Goals</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;