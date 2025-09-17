// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Topbar from './components/TopNav/Topbar';
import BottomNav from './components/BottomNav/BottomNav';
import ReelsFullscreenOverlay from './components/ReelsOverlay/ReelsFullscreenOverlay';
import GistsPage from './pages/Gists/GistsPage';
import ProfilePage from './pages/Profilepage/ProfilePage';
import VibesPage from './pages/Vibespage/VibesPage';
import ReachoutsPage from './pages/Reachoutpage/ReachoutsPage';
import NotificationsPage from './pages/Notification/NotificationsPage';
import SearchPage from './pages/SearchPage/SearchPage';
import SettingsPage from './pages/Settingspage/SettingsPage';
import ReelsPage from './pages/Reelspage/ReelsPage';
import CallsPage from './pages/Callspage/CallsPage';
import LoginPage from './pages/Login/LoginPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import WICIKIOnboarding from './pages/Questionings/Questionings';
function AppContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);

  // Shared reels data (lifted state)
  const [reels, setReels] = useState([
    {
      id: 1,
      avatar: 'AM',
      username: 'Amara Okafor',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description: 'Just finished designing this amazing mobile banking interface! The user experience is so smooth and intuitive.',
      hashtags: ['#UIDesign', '#MobileBanking', '#AfroTech'],
      likes: 2400,
      comments: 156,
      shares: 89,
      isFollowing: false,
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 2,
      avatar: 'KN',
      username: 'Kwame Nkrumah',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      description: 'Building AI solutions for African agriculture! This machine learning model can predict crop yields with 95% accuracy.',
      hashtags: ['#AI', '#Agriculture', '#MachineLearning'],
      likes: 3700,
      comments: 234,
      shares: 167,
      isFollowing: false,
      isLiked: false,
      isBookmarked: false
    },
  ]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const openFullscreenReels = (index) => {
    console.log('[App] openFullscreenReels called with index:', index);
    setCurrentReelIndex(index);
    setIsFullscreenMode(true);
  };

  const closeFullscreenReels = () => {
    setIsFullscreenMode(false);
  };

  // Get current page from pathname
  const location = useLocation();
  const navigate = useNavigate();
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'gists';
    return path.substring(1); // Remove the leading slash
  };
  const currentPage = getCurrentPage();

  const hideLayout = location.pathname === "/login" || location.pathname === "/questions"; 
  // return (
  //   <div className="App">
  //     <div className={`sidebar-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu} />

  //     <div className="app-container">
  //       <Sidebar currentPage={currentPage} navigate={navigate} isMobileMenuOpen={isMobileMenuOpen} />

  //       <div className="main-content">
  //         <Topbar toggleMobileMenu={toggleMobileMenu} navigate={navigate} />

  //         <div className="content-area">
  //           <Routes>
  //             <Route path="/" element={<GistsPage />} />
  //             <Route path="/gists" element={<GistsPage />} />
  //             <Route path="/profile" element={<ProfilePage />} />
  //             <Route path="/vibes" element={<VibesPage />} />
  //             <Route path="/reachouts" element={<ReachoutsPage />} />
  //             <Route path="/notifications" element={<NotificationsPage />} />
  //             <Route path="/search" element={<SearchPage />} />
  //             <Route path="/settings" element={<SettingsPage />} />
  //             <Route
  //               path="/reels"
  //               element={
  //                 <ReelsPage
  //                   reels={reels}
  //                   setReels={setReels}
  //                   openFullscreenReels={openFullscreenReels}
  //                 />
  //               }
  //             />
  //             <Route path="/calls" element={<CallsPage />} />
  //           </Routes>
  //         </div>
  //       </div>
  //     </div>

  //     <BottomNav currentPage={currentPage} navigate={navigate} />

  //     <ReelsFullscreenOverlay
  //       isFullscreenMode={isFullscreenMode}
  //       closeFullscreenReels={closeFullscreenReels}
  //       currentReelIndex={currentReelIndex}
  //       reels={reels}
  //     />
  //   </div>
  // );
return (
    <div className="App">
      {!hideLayout && (
        <div className={`sidebar-overlay ${isMobileMenuOpen ? 'active' : ''}`} />
      )}

      <div className="app-container">
        {!hideLayout && (
          <Sidebar
            currentPage={location.pathname}
            navigate={navigate}
            isMobileMenuOpen={isMobileMenuOpen}
          />
        )}

        <div className="main-content">
          {!hideLayout && (
            <Topbar toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} navigate={navigate} />
          )}

          <div className="content-area">
            <Routes>
              {/* Public Route */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/questions" element={<WICIKIOnboarding />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <GistsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vibes"
                element={
                  <ProtectedRoute>
                    <VibesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reachouts"
                element={
                  <ProtectedRoute>
                    <ReachoutsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <NotificationsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <ProtectedRoute>
                    <SearchPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reels"
                element={
                  <ProtectedRoute>
                    <ReelsPage
                      reels={reels}
                      setReels={setReels}
                      openFullscreenReels={(i) => {
                        setCurrentReelIndex(i);
                        setIsFullscreenMode(true);
                      }}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/calls"
                element={
                  <ProtectedRoute>
                    <CallsPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>

      {!hideLayout && (
        <>
          <BottomNav currentPage={location.pathname} navigate={navigate} />
          <ReelsFullscreenOverlay
            isFullscreenMode={isFullscreenMode}
            closeFullscreenReels={() => setIsFullscreenMode(false)}
            currentReelIndex={currentReelIndex}
            reels={reels}
          />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
