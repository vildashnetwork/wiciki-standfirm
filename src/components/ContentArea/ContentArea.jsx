// components/ContentArea.js
import React from 'react';
import GistsPage from '../../pages/GistsPage';
import ProfilePage from '../../pages/ProfilePage';
import VibesPage from '../../pages/VibesPage';
import ReachoutsPage from '../../pages/ReachoutsPage';
import NotificationsPage from '../../pages/NotificationsPage';
import SearchPage from '../../pages/SearchPage';
import SettingsPage from '../../pages/SettingsPage';
import ReelsPage from '../../pages/ReelsPage';
import CallsPage from '../../pages/Callspage/CallsPage';

const ContentArea = ({ currentPage, showPage, openFullscreenReels }) => {
  const renderPage = () => {
    switch(currentPage) {
      case 'gists':
        return <GistsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'vibes':
        return <VibesPage />;
      case 'reachouts':
        return <ReachoutsPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'search':
        return <SearchPage />;
      case 'settings':
        return <SettingsPage />;
      case 'reels':
        return <ReelsPage openFullscreenReels={openFullscreenReels} />;
      case 'calls':
        return <CallsPage />;
      default:
        return <GistsPage />;
    }
  };

  return (
    <div className="content-area">
      {renderPage()}
    </div>
  );
};

export default ContentArea;