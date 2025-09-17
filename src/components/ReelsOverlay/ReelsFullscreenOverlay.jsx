// components/ReelsFullscreenOverlay.jsx
import React, { useEffect, useRef } from 'react';

const ReelsFullscreenOverlay = ({
  isFullscreenMode,
  closeFullscreenReels,
  currentReelIndex = 0,
  reels = []
}) => {
  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  // Reset and repopulate refs on each render to match reels length
  videoRefs.current = [];

  useEffect(() => {
    if (!isFullscreenMode) return;

    const el = containerRef.current?.children?.[currentReelIndex];
    if (el) el.scrollIntoView({ behavior: 'auto', block: 'center' });

    // Play current video and pause others
    setTimeout(() => {
      videoRefs.current.forEach((v, idx) => {
        if (!v) return;
        v.pause();
        if (idx === currentReelIndex) {
          v.muted = true;
          v.play().catch(() => console.warn('Autoplay blocked'));
        }
      });
    }, 50);

    const handleEscape = (e) => { if (e.key === 'Escape') closeFullscreenReels(); };
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
      videoRefs.current.forEach(v => v?.pause());
    };
  }, [isFullscreenMode, currentReelIndex, closeFullscreenReels]);

  if (!isFullscreenMode) return null;

  const actualReels = Array.isArray(reels) && reels.length > 0 ? reels : [{
    id: 'fallback',
    avatar: 'DEMO',
    username: 'Demo',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Fallback video'
  }];

  return (
    <div id="reelsFullscreenOverlay" className="reels-fullscreen-overlay active">
      <div
        className="fullscreen-close-btn"
        onClick={closeFullscreenReels}
      >
        <ion-icon name="close" />
      </div>

      <div ref={containerRef} className="fullscreen-reels-feed">
        {actualReels.map((reel, idx) => (
          <div key={reel.id} className="fullscreen-reel-item">
            <div className="fullscreen-reel-video-container">
              <video
                ref={el => { videoRefs.current[idx] = el; }}
                className="reel-video"
                src={reel.video}
                muted
                loop
                controls
                playsInline
                // Remove rounded corners in fullscreen so it truly fills
                style={{ borderRadius: 0 }}
              />

              <div className="reel-overlay">
                <div className="reel-avatar">{reel.avatar}</div>
                <div className="reel-username">{reel.username}</div>
                <div className="reel-description">{reel.description}</div>
                <div className="reel-actions">
                  <ion-icon name="heart-outline" />
                  <ion-icon name="chatbubble-outline" />
                  <ion-icon name="share-outline" />
                  <ion-icon name="bookmark-outline" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReelsFullscreenOverlay;
