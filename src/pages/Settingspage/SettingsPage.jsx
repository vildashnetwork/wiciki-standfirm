// pages/SettingsPage.js
import React, { useState } from 'react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    profileVisibility: true,
    skillRecommendations: true,
    afroFuturisticTheme: true,
    notificationSounds: false
  });

  const toggleSetting = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
  };

  const tabs = ['Account', 'Privacy', 'Skills & Goals', 'Theme'];

  return (
    <div id="settings" className="page">
      <div className="settings-tabs">
        {tabs.map(tab => (
          <div 
            key={tab}
            className={`settings-tab ${activeTab === tab.toLowerCase().replace(' & ', '').replace(' ', '') ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.toLowerCase().replace(' & ', '').replace(' ', ''))}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="settings-section">
        <div className="setting-item">
          <div>
            <h4>Profile Visibility</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Make your profile visible to everyone</p>
          </div>
          <div 
            className={`toggle-switch ${settings.profileVisibility ? 'active' : ''}`}
            onClick={() => toggleSetting('profileVisibility')}
          ></div>
        </div>
        <div className="setting-item">
          <div>
            <h4>Skill Recommendations</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Get personalized skill suggestions</p>
          </div>
          <div 
            className={`toggle-switch ${settings.skillRecommendations ? 'active' : ''}`}
            onClick={() => toggleSetting('skillRecommendations')}
          ></div>
        </div>
        <div className="setting-item">
          <div>
            <h4>Afro-Futuristic Theme</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Enable enhanced visual effects</p>
          </div>
          <div 
            className={`toggle-switch ${settings.afroFuturisticTheme ? 'active' : ''}`}
            onClick={() => toggleSetting('afroFuturisticTheme')}
          ></div>
        </div>
        <div className="setting-item">
          <div>
            <h4>Notification Sounds</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Play sounds for new notifications</p>
          </div>
          <div 
            className={`toggle-switch ${settings.notificationSounds ? 'active' : ''}`}
            onClick={() => toggleSetting('notificationSounds')}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;