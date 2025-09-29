import React, { useState } from 'react';
import { X, ChevronRight, Bell, Shield, Palette, User, Globe, HelpCircle, Menu, SearchCheckIcon, EyeIcon } from 'lucide-react';

const SettingsPage = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('general');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [settings, setSettings] = useState({
    // Notifications
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: false,
    soundEnabled: true,
    vibration: true,

    // Privacy
    profileVisibility: 'public',
    messageRequests: 'everyone',
    storySharing: true,
    locationServices: false,
    dataSaver: false,

    // Theme & Appearance
    darkMode: true,
    reduceMotion: false,
    fontSize: 'medium',
    language: 'english',

    // Account
    twoFactorAuth: false,
    loginAlerts: true,
    backupData: false
  });

  const toggleSetting = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
  };

  const updateSetting = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value
    });
  };

  const settingsSections = {
    general: {
      icon: <Bell size={20} />,
      title: 'Notifications',
      settings: [
        {
          type: 'toggle',
          key: 'pushNotifications',
          label: 'Push Notifications',
          description: 'Receive notifications on your device',
          value: settings.pushNotifications
        },
        {
          type: 'toggle',
          key: 'emailNotifications',
          label: 'Email Notifications',
          description: 'Get updates via email',
          value: settings.emailNotifications
        },
        {
          type: 'toggle',
          key: 'soundEnabled',
          label: 'Notification Sounds',
          description: 'Play sounds for new notifications',
          value: settings.soundEnabled
        }
      ]
    },
    privacy: {
      icon: <Shield size={20} />,
      title: 'Privacy & Security',
      settings: [
        {
          type: 'select',
          key: 'profileVisibility',
          label: 'Profile Visibility',
          description: 'Who can see your profile',
          value: settings.profileVisibility,
          options: [
            { label: 'Public', value: 'public' },
            { label: 'Friends', value: 'friends' },
            { label: 'Private', value: 'private' }
          ]
        },
        {
          type: 'toggle',
          key: 'twoFactorAuth',
          label: 'Two-Factor Authentication',
          description: 'Extra security for your account',
          value: settings.twoFactorAuth
        },
        {
          type: 'toggle',
          key: 'loginAlerts',
          label: 'Login Alerts',
          description: 'Get notified of new logins',
          value: settings.loginAlerts
        }
      ]
    },
    appearance: {
      icon: <Palette size={20} />,
      title: 'Theme & Appearance',
      settings: [
        {
          type: 'toggle',
          key: 'darkMode',
          label: 'Dark Mode',
          description: 'Use dark theme across app',
          value: settings.darkMode
        },
        {
          type: 'select',
          key: 'fontSize',
          label: 'Font Size',
          description: 'Adjust text size',
          value: settings.fontSize,
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' }
          ]
        },
        {
          type: 'toggle',
          key: 'reduceMotion',
          label: 'Reduce Motion',
          description: 'Minimize animations',
          value: settings.reduceMotion
        }
      ]
    },
    account: {
      icon: <User size={20} />,
      title: 'Account Settings',
      settings: [
        {
          type: 'button',
          key: 'changePassword',
          label: 'Change Password',
          description: 'Update your login password'
        },
        {
          type: 'button',
          key: 'backupData',
          label: 'Backup Data',
          description: 'Download your information'
        },
        {
          type: 'button',
          key: 'deactivate',
          label: 'Deactivate Account',
          description: 'Temporarily disable your account',
          danger: true
        }
      ]
    }
  };

  if (!isOpen) return null;

  return (
    <div className="aviary-overlay">
      <div className="aviary">
        {/* Header */}
        <div className="aviary-header">
          <div className="aviary-brand">
            <div className="feather-logo">W</div>
            <h1 className="aviary-name">WICIKI</h1>
          </div>

          <div className="aviary-actions">
            <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu size={24} />
            </button>

            <button className="robin-search">
              <i className="search-icon"><SearchCheckIcon /> </i>
              <span className="search-text">Search settings</span>
            </button>

            <button className="falcon-exit" onClick={onClose}>
              <EyeIcon size={24} />

            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="aviary-content">
          {/* Mobile Navigation Overlay */}
          {isMobileMenuOpen && (
            <div className="mobile-nav-overlay" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="mobile-nav-content" onClick={(e) => e.stopPropagation()}>
                <div className="mobile-nav-header">
                  <h3>Settings & Privacy</h3>
                  <button onClick={() => setIsMobileMenuOpen(false)}>
                    <X size={24} />
                  </button>
                </div>

                <div className="mobile-nav-sections">
                  {Object.entries(settingsSections).map(([key, section]) => (
                    <div
                      key={key}
                      className={`mobile-nav-item ${activeSection === key ? 'active' : ''}`}
                      onClick={() => {
                        setActiveSection(key);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <div className="mobile-nav-icon">
                        {section.icon}
                      </div>
                      <span className="mobile-nav-text">{section.title}</span>
                      <ChevronRight size={16} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Side Navigation */}
          <div className="aviary-nest">
            <div className="flock-section">
              <h3 className="flock-title">Settings & Privacy</h3>
              {Object.entries(settingsSections).map(([key, section]) => (
                <div
                  key={key}
                  className={`bird-perch ${activeSection === key ? 'active' : ''}`}
                  onClick={() => setActiveSection(key)}
                >
                  <div className="bird-feather">
                    {section.icon}
                  </div>
                  <span className="bird-call">{section.title}</span>
                  <ChevronRight size={16} className="bird-wing" />
                </div>
              ))}
            </div>

            <div className="flock-section">
              <h3 className="flock-title">More Options</h3>
              <div className="bird-perch">
                <div className="bird-feather">
                  <HelpCircle size={20} />
                </div>
                <span className="bird-call">Help & Support</span>
                <ChevronRight size={16} className="bird-wing" />
              </div>

              <div className="bird-perch">
                <div className="bird-feather">
                  <Globe size={20} />
                </div>
                <span className="bird-call">Language & Region</span>
                <ChevronRight size={16} className="bird-wing" />
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="aviary-main">
            <div className="aviary-main-header">
              <h2 className="aviary-main-title">
                {settingsSections[activeSection].icon}
                {settingsSections[activeSection].title}
              </h2>
              <p className="aviary-main-description">
                Manage your {settingsSections[activeSection].title.toLowerCase()} preferences
              </p>
            </div>

            <div className="aviary-main-content">
              <div className="bird-grid">
                {settingsSections[activeSection].settings.map((item, index) => (
                  <div key={item.key} className="bird-nest">
                    <div className="nest-content">
                      <div className="bird-info">
                        <h4 className={`bird-name ${item.danger ? 'danger' : ''}`}>
                          {item.label}
                        </h4>
                        {item.description && (
                          <p className="bird-whisper">{item.description}</p>
                        )}
                      </div>

                      <div className="bird-control">
                        {item.type === 'toggle' && (
                          <div
                            className={`eagle-toggle ${settings[item.key] ? 'active' : ''}`}
                            onClick={() => toggleSetting(item.key)}
                          >
                            <div className="eagle-track"></div>
                            <div className="eagle-thumb"></div>
                          </div>
                        )}

                        {item.type === 'select' && (
                          <select
                            className="hawk-select"
                            value={settings[item.key]}
                            onChange={(e) => updateSetting(item.key, e.target.value)}
                          >
                            {item.options.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        )}

                        {item.type === 'button' && (
                          <button className={`owl-action ${item.danger ? 'danger' : ''}`}>
                            <ChevronRight size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="aviary-footer">
          <div className="footer-nest">
            <div className="bird-links">
              <a href="#" className="bird-link">Privacy</a>
              <a href="#" className="bird-link">Terms</a>
              <a href="#" className="bird-link">Advertising</a>
              <a href="#" className="bird-link">Cookies</a>
              <a href="#" className="bird-link">More</a>
            </div>
            <div className="bird-song">
              Vildash Network © {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;