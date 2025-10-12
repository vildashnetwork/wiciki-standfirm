import { useEffect, useRef, useState } from 'react';
import styles from './ProfilePage.module.css';
import PostCreation from '../Gists/PostCreation/PostCreation';
import MyFeed from './Post/Myfeed';

const Tab = ({ label, active, onClick }) => (
  <button
    className={`${styles.tab} ${active ? styles.tabActive : ''}`}
    onClick={onClick}
  >
    {label}
  </button>
);

const ProfilePage = () => {
  // LocalStorage utilities
  const storage = {
    get: (key) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
      }
    },
    set: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error writing to localStorage:', error);
      }
    }
  };

  // Sample media URLs
  const sampleImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop'
  ];

  const sampleVideos = [
    'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  ];

  const [activeTab, setActiveTab] = useState("Posts");
  const [posts, setPosts] = useState(() => storage.get('posts') || []);
  const [stories, setStories] = useState(() => storage.get('stories') || []);

  const handleLoadMore = () => {
    const additionalPosts = [
      {
        id: Date.now() + 1,
        name: 'Alex Wilson',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        content: 'Just wrapped up an amazing team meeting! Excited about the new project we\'re starting next week. 🚀',
        timestamp: Date.now() - 8 * 60 * 60 * 1000,
        type: 'image',
        mediaUrl: sampleImages[Math.floor(Math.random() * sampleImages.length)],
        liked: false,
        likes: 3,
        comments: []
      },
      {
        id: Date.now() + 2,
        name: 'Rachel Green',
        avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
        content: 'Beautiful sunset from my balcony tonight. Sometimes you need to pause and appreciate the simple moments. 🌅',
        timestamp: Date.now() - 10 * 60 * 60 * 1000,
        type: 'video',
        mediaUrl: sampleVideos[Math.floor(Math.random() * sampleVideos.length)],
        liked: false,
        likes: 7,
        comments: []
      }
    ];
    setPosts([...posts, ...additionalPosts]);
  };
  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newLiked = !post.liked;
        return {
          ...post,
          liked: newLiked,
          likes: newLiked ? (post.likes || 0) + 1 : Math.max(0, (post.likes || 0) - 1)
        };
      }
      return post;
    }));
  };
  const handleComment = (postId, commentText) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          text: commentText,
          timestamp: Date.now()
        };
        return {
          ...post,
          comments: [...(post.comments || []), newComment]
        };
      }
      return post;
    }));
  };

  // Save to localStorage whenever data changes
  useEffect(() => {
    storage.set('posts', posts);
  }, [posts]);

  useEffect(() => {
    storage.set('stories', stories);
  }, [stories]);

  useEffect(() => {
    // Initialize sample data if empty
    if (posts.length === 0) {
      const samplePosts = [
        {
          id: 1,
          name: 'Sarah Johnson',
          avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
          content: 'Just finished an amazing hike in the mountains! The view was absolutely breathtaking. Nature never fails to inspire me. 🏔️✨',
          timestamp: Date.now() - 2 * 60 * 60 * 1000,
          type: 'image',
          mediaUrl: sampleImages[0],
          liked: false,
          likes: 12,
          comments: []
        },
        {
          id: 2,
          name: 'Mike Chen',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          content: 'Excited to share that I just launched my new project! It\'s been months of hard work, but seeing it come to life is incredibly rewarding. 🚀',
          timestamp: Date.now() - 4 * 60 * 60 * 1000,
          type: 'video',
          mediaUrl: sampleVideos[0],
          liked: false,
          likes: 8,
          comments: []
        },
        {
          id: 3,
          name: 'Emma Davis',
          avatar: 'https://res.cloudinary.com/dbq5gkepx/image/upload/v1756974124/w3tey25aflrc2cl7cpip.jpg',
          content: 'Coffee and coding session this morning ☕️ Working on some exciting new features.',
          timestamp: Date.now() - 6 * 60 * 60 * 1000,
          type: 'text',
          mediaUrl: null,
          liked: false,
          likes: 5,
          comments: []
        }
      ];
      setPosts(samplePosts);
    }

    if (stories.length === 0) {
      const sampleStories = [
        {
          id: 1,
          name: 'Sarah Johnson',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          type: 'image',
          content: 'Amazing sunset! 🌅',
          mediaUrl: sampleImages[1],
          backgroundColor: '#e53935',
          timestamp: Date.now() - 2 * 60 * 60 * 1000
        },
        {
          id: 2,
          name: 'Mike Chen',
          avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
          type: 'video',
          content: 'Just launched my project! 🚀',
          mediaUrl: sampleVideos[1],
          backgroundColor: '#1976d2',
          timestamp: Date.now() - 4 * 60 * 60 * 1000
        },
        {
          id: 3,
          name: 'Emma Davis',
          avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
          type: 'text',
          content: 'Coffee and creativity ☕️',
          mediaUrl: null,
          backgroundColor: '#43a047',
          timestamp: Date.now() - 6 * 60 * 60 * 1000
        }
      ];
      setStories(sampleStories);
    }
  }, []);

  const photosCardRef = useRef(null);
  const sidebarRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [topOffset, setTopOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!photosCardRef.current || !sidebarRef.current) return;

      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      const cardRect = photosCardRef.current.getBoundingClientRect();

      // Adjust this to where you want the card to start sticking
      const triggerPoint = 100;

      // When top of sidebar scrolls above trigger point, stick
      if (sidebarRect.top <= triggerPoint && !isSticky) {
        setIsSticky(true);
        setTopOffset(triggerPoint);
      }

      // When top of sidebar is visible again (scrolling up), unstick
      if (sidebarRect.top > triggerPoint && isSticky) {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSticky]);


  const [selectedIndex, setSelectedIndex] = useState(null);
  const photos = Array.from({ length: 15 }).map(
    (_, i) => `https://picsum.photos/seed/p${i}/1600/1000`
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight")
        setSelectedIndex((i) => (i + 1) % photos.length);
      if (e.key === "ArrowLeft")
        setSelectedIndex((i) => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Posts":
        return (
          <div className={styles.plceMent}>

            <div className={styles.leftSidebar} ref={sidebarRef}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>About</div>
                <div className={styles.cardBody}>
                  <p><strong>Full Name:</strong> Akosua Kwarteng</p>
                  <p><strong>Profession:</strong> Full-Stack Developer</p>
                  <p><strong>Location:</strong> Accra, Ghana</p>
                  <p><strong>Education:</strong> University of Ghana</p>
                </div>
              </div>

              {/* Photos Card */}
              {/* <div
                ref={photosCardRef}
                className={`${styles.card} ${isSticky ? styles.stickyActive : ""}`}
                style={isSticky ? { top: `${topOffset}px` } : {}}
              >
                <div className={styles.cardHeader}>Photos</div>
                <div className={styles.cardBody}>
                  <div className={styles.photosGrid}>
                    {Array.from({ length: 15 }).map((_, i) => (
                      <img
                        key={i}
                        className={styles.photo}
                        src={`https://picsum.photos/seed/p${i}/300/300`}
                        alt="Photo"
                      />
                    ))}
                  </div>
                </div>
              </div> */}
              <>
                {/* Photos Grid Card */}
                <div
                  ref={photosCardRef}
                  className={`${styles.card} ${isSticky ? styles.stickyActive : ""}`}
                  style={isSticky ? { top: `${topOffset}px` } : {}}
                >
                  <div className={styles.cardHeader}>Photos</div>
                  <div className={styles.cardBody}>
                    <div className={styles.photosGrid}>
                      {photos.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`Photo ${i + 1}`}
                          className={styles.photo}
                          onClick={() => setSelectedIndex(i)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal */}
                {selectedIndex !== null && (
                  <div
                    className={styles.modalOverlay}
                    onClick={() => setSelectedIndex(null)}
                  >
                    <div
                      className={styles.modalContent}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Left Button */}
                      <button
                        className={`${styles.navBtn} ${styles.leftBtn}`}
                        onClick={() =>
                          setSelectedIndex(
                            (prev) => (prev - 1 + photos.length) % photos.length
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={styles.navIcon}
                        >
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>

                      {/* Image */}
                      <div className={styles.modalImageWrapper}>
                        <img
                          src={photos[selectedIndex]}
                          alt={`Large view ${selectedIndex + 1}`}
                          className={styles.modalImage}
                        />
                      </div>

                      {/* Right Button */}
                      <button
                        className={`${styles.navBtn} ${styles.rightBtn}`}
                        onClick={() =>
                          setSelectedIndex((prev) => (prev + 1) % photos.length)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={styles.navIcon}
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>

                      {/* Close Button */}
                      <button
                        className={styles.closeBtn}
                        onClick={() => setSelectedIndex(null)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </>
            </div>


            <div className={styles.rightContent}>
              <PostCreation />
              <MyFeed
                posts={posts}
                onLoadMore={handleLoadMore}
                onLike={handleLike}
                onComment={handleComment}
              />
            </div>
          </div>
        );

      case "About":
        return (
          <div className={styles.card}>
            <div className={styles.cardHeader}>About</div>
            <div className={styles.cardBody}>
              <p><strong>Full Name:</strong> Akosua Kwarteng</p>
              <p><strong>Profession:</strong> Full-Stack Developer</p>
              <p><strong>Location:</strong> Accra, Ghana</p>
              <p><strong>Education:</strong> University of Ghana</p>
            </div>
          </div>
        );

      case "Friends":
        return (
          <div className={styles.card}>
            <div className={styles.cardHeader}>Friends</div>
            <div className={styles.cardBody}>
              <div className={styles.friendsGrid}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className={styles.friendCard}>
                    <img
                      className={styles.friendThumb}
                      src={`https://picsum.photos/seed/f${i}/300/300`}
                      alt="Friend"
                    />
                    <div className={styles.friendName}>Friend {i + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Photos":
        return (
          <>
            {/* Photos Grid Card */}
            <div
              ref={photosCardRef}
              className={`${styles.card} ${isSticky ? styles.stickyActive : ""}`}
              style={isSticky ? { top: `${topOffset}px` } : {}}
            >
              <div className={styles.cardHeader}>Photos</div>
              <div className={styles.cardBody}>
                <div className={styles.photosGrid}>
                  {photos.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Photo ${i + 1}`}
                      className={styles.photo}
                      onClick={() => setSelectedIndex(i)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Modal */}
            {selectedIndex !== null && (
              <div
                className={styles.modalOverlay}
                onClick={() => setSelectedIndex(null)}
              >
                <div
                  className={styles.modalContent}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Left Button */}
                  <button
                    className={`${styles.navBtn} ${styles.leftBtn}`}
                    onClick={() =>
                      setSelectedIndex(
                        (prev) => (prev - 1 + photos.length) % photos.length
                      )
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.navIcon}
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>

                  {/* Image */}
                  <div className={styles.modalImageWrapper}>
                    <img
                      src={photos[selectedIndex]}
                      alt={`Large view ${selectedIndex + 1}`}
                      className={styles.modalImage}
                    />
                  </div>

                  {/* Right Button */}
                  <button
                    className={`${styles.navBtn} ${styles.rightBtn}`}
                    onClick={() =>
                      setSelectedIndex((prev) => (prev + 1) % photos.length)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.navIcon}
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>

                  {/* Close Button */}
                  <button
                    className={styles.closeBtn}
                    onClick={() => setSelectedIndex(null)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </>
        );

      case "Videos":
        return (
          <div className={styles.card}>
            <div className={styles.cardHeader}>Videos</div>
            <div className={styles.cardBody}>
              <div className={styles.videosGrid}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <video
                    key={i}
                    className={styles.video}
                    controls
                    src={`https://samplelib.com/lib/preview/mp4/sample-5s.mp4`}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <div className={styles.card}>No content available.</div>;
    }
  };

  return (
    <div id="profile" className={styles.page}>
      {/* Cover */}
      <section
        className={styles.cover}
        style={{
          background: `
            linear-gradient(
              to top,
              rgba(197, 27, 24, 0.8) 0%,
              rgba(197, 27, 24, 0) 40%,
              rgba(13, 13, 13, 0.0) 80%
            ),
            url('/image.png') center/100% 100% no-repeat
          `,
        }}
      />

      {/* Avatar + Name */}
      <div className={styles.avatarRow}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>AK</div>
          <div className={styles.statusDot} />
        </div>

        <div className={styles.nameArea}>
          <div className={styles.personName}>Akosua Kwarteng</div>
          <div className={styles.metaRow}>
            <span className={styles.metaChip}>Full-Stack Developer</span>
            <span className={styles.metaChip}>React</span>
            <span className={styles.metaChip}>Node.js</span>
            <span className={styles.metaChip}>AI/ML</span>
            <span className={styles.metaChip}>2.4K reachers</span>
          </div>
          <span style={{ marginTop: 16 }} className={styles.metaChip}>
            Website: <ion-icon name="link-outline"></ion-icon>{" "}
            <a
              href="https://mywebsite.onwiciki.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#eba0a7ff" }}
            >
              https://mywebsite.onwiciki.com
            </a>
          </span>
        </div>

        <div className={styles.headerActions}>
          <button className={styles.iconBtn} title="More">⋯</button>
        </div>
      </div>

      {/* Tabs */}
      <nav className={styles.tabsBar}>
        <div className={styles.tabsInner}>
          {["Posts", "About", "Friends", "Photos", "Videos"].map(tab => (
            <Tab
              key={tab}
              label={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>
      </nav>

      {/* Body */}
      <main className={styles.bodyWrap}>
        <section className={styles.rightCol}>{renderTabContent()}</section>
      </main>
    </div>
  );
};

export default ProfilePage;
