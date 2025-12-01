// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
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
import { Toaster } from 'react-hot-toast';
import ResetPassword from './pages/ResetPassword/Resetpassword';
import { useAuthStore } from './pages/Vibespage/store/useAuthStore'
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
  const hideLayout = location.pathname === "/login" || location.pathname === "/questions" || location.pathname.includes("/reset");

  const handleCreatePost = (post) => {
    console.log('New post created:', post);
    // Here you can add logic to update state or send post to backend
    navigate(-1);
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
      setShowSettings(window.location.pathname === '/settings');
    }

    // Check initially
    checkPath();

    // Listen for navigation events
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    // Override pushState
    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      checkPath();
    };

    // Override replaceState
    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      checkPath();
    };

    // Listen for popstate (back/forward buttons)
    window.addEventListener('popstate', checkPath);

    // Cleanup
    return () => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', checkPath);
    };
  }, []);





  // function setCookie(name, value, days) {
  //   let expires = "";
  //   if (days) {
  //     const date = new Date();
  //     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  //     expires = "; expires=" + date.toUTCString();
  //   }
  //   document.cookie = `${name}=${value || ""}${expires}; path=/; SameSite=Lax`;
  // }

  // useEffect(() => {
  //   const query = new URLSearchParams(location.search);
  //   const token = query.keys().next().value;

  //   if (token) {
  //     try {
  //       setCookie("token", token, 7);
  //       console.log("✅ Token saved as cookie:", token);


  //       navigate("/questions", { replace: true });
  //     } catch (error) {
  //       console.error("❌ Error setting cookie:", error);
  //     }
  //   } else {
  //     console.warn("⚠️ No token found in URL.");
  //   }
  // }, [location, navigate]);





  // keep your original setCookie function exactly as you requested
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${value || ""}${expires}; path=/; SameSite=Lax`;
  }

  // improved token-extracting effect (replace your old useEffect with this)
  useEffect(() => {
    try {
      const query = new URLSearchParams(location.search);

      // 1) prefer explicit keys
      let token = query.get("token") || query.get("t") || null;

      // JWT regex (simple check for header.payload.signature)
      const jwtRegex = /^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/;

      // 2) if not found, handle case like ?<JWT>  (the token is the raw search string or the param name)
      if (!token && location.search) {
        const raw = location.search.startsWith("?") ? location.search.slice(1) : location.search; // remove leading '?'
        // if it's plain `key` (no '=') and matches JWT format => treat it as token
        if (!raw.includes("=")) {
          const decoded = decodeURIComponent(raw).trim();
          if (jwtRegex.test(decoded)) token = decoded;
        } else {
          // otherwise, check if any **param name** matches a JWT (handles ?<JWT>= or malformed cases)
          for (const [k] of query.entries()) {
            if (jwtRegex.test(k)) { token = k; break; }
          }
        }
      }

      // 3) also check pathname for a pasted token (e.g. /%20auth?eyJ... or /auth/<token>)
      if (!token) {
        const pathMatch = location.pathname.match(/[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+/);
        if (pathMatch) token = pathMatch[0];
      }

      if (token) {
        // use your setCookie function exactly
        setCookie("token", token, 7);
        localStorage.setItem("token", token)
        console.log("✅ Token saved as cookie:", token);

        // navigate to questions (same as original behavior)
        navigate("/questions", { replace: true });
      } else {
        console.warn("⚠️ No token found in URL.");
      }
    } catch (err) {
      console.error("Error processing token from URL:", err);
    }
  }, [location, navigate]);






  return (
    <div className="App">
      <Toaster position="top-right" reverseOrder={false} />
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
              <Route path='/reset' element={<ResetPassword />} />

              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute><GistsPage onLike={handleLike} onComment={handleComment} /></ProtectedRoute>} />
              <Route path="/profile/:name" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/vibes" element={<ProtectedRoute><VibesPage /></ProtectedRoute>} />
              <Route path="/reachouts" element={<ProtectedRoute><ReachoutsPage /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
              <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><SettingsPage
                isOpen={showSettings}
                onClose={() => {
                  navigate("/")
                  setShowSettings(false)
                }} /></ProtectedRoute>} />
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
  
  //truama

  const { authUser, isCheckingAuth, onlineUsers } = useAuthStore();
  console.log(onlineUsers);
  
   const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  //end truama
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
