// src/pages/ReelsPage.jsx
import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ReelsPage = ({ reels = [], setReels, openFullscreenReels }) => {
  const location = useLocation();
  const isActive = location.pathname === '/reels' || location.pathname === '/reels/';

  const videoRefs = useRef([]);

  useEffect(() => {
    if (!isActive) return;

    const options = { root: null, rootMargin: '0px', threshold: 0.7 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        const playPauseBtn = video?.parentElement?.querySelector('.reel-play-pause');

        if (entry.isIntersecting) {
          video.play().catch(() => {});
          if (playPauseBtn) {
            const icon = playPauseBtn.querySelector('ion-icon');
            if (icon) icon.setAttribute('name', 'pause');
            playPauseBtn.classList.remove('show');
          }
        } else {
          video.pause();
          if (playPauseBtn) {
            const icon = playPauseBtn.querySelector('ion-icon');
            if (icon) icon.setAttribute('name', 'play');
            playPauseBtn.classList.add('show');
          }
        }
      });
    }, options);

    videoRefs.current.filter(Boolean).forEach(v => observer.observe(v));

    return () => {
      videoRefs.current.filter(Boolean).forEach(v => observer.unobserve(v));
      observer.disconnect();
    };
  }, [isActive, reels.length]);

  const likeReel = (id) => {
    setReels(prev => prev.map(r => r.id === id ? { ...r, likes: r.isLiked ? r.likes - 1 : r.likes + 1, isLiked: !r.isLiked } : r));
  };

  const bookmarkReel = (id) => setReels(prev => prev.map(r => r.id === id ? { ...r, isBookmarked: !r.isBookmarked } : r));
  const followUser = (id) => setReels(prev => prev.map(r => r.id === id ? { ...r, isFollowing: !r.isFollowing } : r));
  const shareReel = (id) => { setReels(prev => prev.map(r => r.id === id ? { ...r, shares: r.shares + 1 } : r)); alert('Reel shared successfully!'); };

  const togglePlayPause = (video, playPauseBtn) => {
    if (!video) return;
    if (video.paused) {
      video.play();
      if (playPauseBtn) {
        const icon = playPauseBtn.querySelector('ion-icon');
        if (icon) icon.setAttribute('name', 'pause');
        playPauseBtn.classList.remove('show');
      }
    } else {
      video.pause();
      if (playPauseBtn) {
        const icon = playPauseBtn.querySelector('ion-icon');
        if (icon) icon.setAttribute('name', 'play');
        playPauseBtn.classList.add('show');
      }
    }
  };

  const toggleSound = (button) => {
    const video = button?.closest('.reel-video-container')?.querySelector('.reel-video');
    if (!video) return;
    const icon = button.querySelector('ion-icon');
    video.muted = !video.muted;
    if (icon) icon.setAttribute('name', video.muted ? 'volume-mute' : 'volume-high');
  };

  return (
    <div id="reels" className={`page ${isActive ? 'active' : ''}`}>
      <div className="reels-container">
        <div className="reels-feed" id="reelsFeed">
          {reels.length === 0 && <div style={{ padding: 24, color: 'white' }}>No reels available</div>}

          {reels.map((reel, index) => (
            <div key={reel.id} className="reel-item">
              <div
                className="reel-video-container"
                onDoubleClick={() => {
                  console.log('[ReelsPage] container dblclick', index);
                  openFullscreenReels(index);
                }}
              >
                <video
                  ref={el => videoRefs.current[index] = el}
                  className="reel-video"
                  muted
                  loop
                  onClick={(e) => {
                    const playPauseBtn = e.currentTarget.parentElement.querySelector('.reel-play-pause');
                    togglePlayPause(e.currentTarget, playPauseBtn);
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    console.log('[ReelsPage] video dblclick', index);
                    openFullscreenReels(index);
                  }}
                >
                  <source src={reel.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <div className="reel-progress" style={{ width: '0%' }} />
                <div className="reel-play-pause show"><ion-icon name="play" /></div>

                <div className="reel-sound-toggle" onClick={(e) => { e.stopPropagation(); toggleSound(e.currentTarget); }}>
                  <ion-icon name="volume-mute" />
                </div>

                <div className="reel-overlay">
                  <div className="reel-creator">
                    <div className="reel-avatar">{reel.avatar}</div>
                    <div className="reel-username">{reel.username}</div>
                    <button className={`reel-follow-btn ${reel.isFollowing ? 'following' : ''}`} onClick={() => followUser(reel.id)}>
                      {reel.isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>

                  <div className="reel-description">{reel.description}</div>

                  <div className="reel-hashtags">
                    {reel.hashtags.map((tag, i) => <span key={i} className="reel-hashtag">{tag}</span>)}
                  </div>
                </div>

                <div className="reel-actions">
                  <div className="reel-action-btn" onClick={() => likeReel(reel.id)}>
                    <ion-icon name={reel.isLiked ? "heart" : "heart-outline"} style={{ color: reel.isLiked ? '#dc143c' : 'white' }} />
                    <div className="reel-action-count">{reel.likes >= 1000 ? `${(reel.likes/1000).toFixed(1)}K` : reel.likes}</div>
                  </div>

                  <div className="reel-action-btn" onClick={() => alert('Comments feature would open a modal here!')}>
                    <ion-icon name="chatbubble" />
                    <div className="reel-action-count">{reel.comments >= 1000 ? `${(reel.comments/1000).toFixed(1)}K` : reel.comments}</div>
                  </div>

                  <div className="reel-action-btn" onClick={() => shareReel(reel.id)}>
                    <ion-icon name="share" />
                    <div className="reel-action-count">{reel.shares >= 1000 ? `${(reel.shares/1000).toFixed(1)}K` : reel.shares}</div>
                  </div>

                  <div className="reel-action-btn" onClick={() => bookmarkReel(reel.id)}>
                    <ion-icon name={reel.isBookmarked ? "bookmark" : "bookmark-outline"} style={{ color: reel.isBookmarked ? '#dc143c' : 'white' }} />
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default ReelsPage;
