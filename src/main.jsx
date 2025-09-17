
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './components/Sidebar/Sidebar.css';
import './components/TopNav/TopNav.css';
import './components/ContentArea/ContentArea.css';
import './components/BottomNav/BottomNav.css';
import './components/ReelsOverlay/ReelsOverlay.css';

// Page styles
import './pages/Gists/Gists.css';
import './pages/Profilepage/Profile.css';
import './pages/Reelspage/ReelsPage.css';
import './pages/Reachoutpage/Reachout.css';
import './pages/Notification/Notification.css';
import './pages/SearchPage/Search.css';
import './pages/Settingspage/Settings.css';
import './pages/Vibespage/Vibes.css';
import './pages/Callspage/Callspage.css';
import './pages/ReelsFullscreen/Reelsfullscreen.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);