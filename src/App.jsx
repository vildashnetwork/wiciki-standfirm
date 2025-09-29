// src/App.js
import React, { useEffect, useState } from 'react';
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
import PostCreatePage from './pages/Gists/PostCreation/Add';
import AddStatusModal from './pages/Gists/AddStatusModal/AddStatusModal';
import FullScreenPost from './pages/Gists/Feed/fullscreen/FullScreenPost';

function AppContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);

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

  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = location.pathname === '/' ? 'gists' : location.pathname.substring(1);
  const hideLayout = location.pathname === "/login" || location.pathname === "/questions";

  const handleCreatePost = (post) => {
    console.log('New post created:', post);
    // Here you can add logic to update state or send post to backend
    navigate(-1); // Go back after creating post
  };
  // Your posts state and handlers
  const [posts, setPosts] = useState([]);

  const handleLike = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          }
          : post
      )
    );
  };

  const handleComment = (postId, text) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
            ...post,
            comments: [...post.comments, { text, timestamp: Date.now() }]
          }
          : post
      )
    );
  };
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    function checkPath() {
      // Check if the current path is "/settings"
      if (window.location.pathname === "/settings") {
        setShowSettings(true);
      } else {
        setShowSettings(false);
      }
    }

    checkPath();
  }, []);
  return (
    <div className="App">
      {!hideLayout && <div className={`sidebar-overlay ${isMobileMenuOpen ? 'active' : ''}`} />}

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
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/questions" element={<WICIKIOnboarding />} />

              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute><GistsPage onLike={handleLike} onComment={handleComment} /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/vibes" element={<ProtectedRoute><VibesPage /></ProtectedRoute>} />
              <Route path="/reachouts" element={<ProtectedRoute><ReachoutsPage /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
              <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><SettingsPage
                isOpen={showSettings}
                onClose={() => setShowSettings(false)} /></ProtectedRoute>} />
              <Route path="/reels" element={<ProtectedRoute>
                <ReelsPage reels={reels} setReels={setReels} openFullscreenReels={(i) => { setCurrentReelIndex(i); setIsFullscreenMode(true); }} />
              </ProtectedRoute>} />
              <Route path="/calls" element={<ProtectedRoute><CallsPage /></ProtectedRoute>} />

              {/* Post Creation */}
              <Route path="/post-create" element={
                <ProtectedRoute>
                  <PostCreatePage onCreatePost={handleCreatePost} />
                </ProtectedRoute>
              } />
              <Route path="/story-create" element={
                <ProtectedRoute>
                  <AddStatusModal />
                </ProtectedRoute>
              } />
              <Route path="/post/:id"

                element={
                  <ProtectedRoute>
                    <FullScreenPost posts={posts} onLike={handleLike} onComment={handleComment} />
                  </ProtectedRoute>
                } />

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
