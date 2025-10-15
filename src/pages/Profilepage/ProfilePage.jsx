import { useEffect, useRef, useState } from 'react';
import styles from './ProfilePage.module.css';
import PostCreation from '../Gists/PostCreation/PostCreation';
import MyFeed from './Post/Myfeed';
import axios from 'axios';
import {
  Briefcase,
  MapPin,
  GraduationCap,
  Globe,
  Code2,
  Cpu,
  Database,
  MonitorSmartphone,
  Server,
  Terminal,
  Link as LinkIcon
} from "lucide-react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { ImageUp, X } from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
const Tab = ({ label, active, onClick }) => (
  <button
    className={`${styles.tab} ${active ? styles.tabActive : ''}`}
    onClick={onClick}
  >
    {label}
  </button>
);

const ProfilePage = () => {




  const [userlocation, setUserLocation] = useState(null);

  const getReadableLocation = async (coords) => {
    try {
      if (!coords) return null;

      const [lat, lon] = coords.split(",").map((x) => x.trim());

      const { data } = await axios.get(
        "https://api.bigdatacloud.net/data/reverse-geocode-client",
        {
          params: {
            latitude: lat,
            longitude: lon,
            localityLanguage: "en",
          },
          withCredentials: false, // ✅ prevents CORS issues
        }
      );

      const locationInfo = {
        country: data.countryName || "Unknown",
        region: data.principalSubdivision || "Unknown",
        city: data.city || data.locality || "Unknown",
        postcode: data.postcode || "Unknown",
        fullAddress: `${data.locality || data.city || ""}, ${data.principalSubdivision || ""}, ${data.countryName || ""}`,
      };

      return locationInfo;
    } catch (error) {
      console.error("❌ Error decoding location:", error);
      return null;
    }
  };












  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const token = Cookies.get('token');
  const [user, setuser] = useState([])
  const [loading, setloading] = useState(false)
  const navigat = useNavigate()

  const [usera, setusera] = useState([])
  useEffect(() => {


    const getProfileUser = async () => {
      try {
        setloading(true);
        const res = await axios.get(`https://wicikibackend.onrender.com/decode/me/${decodedName}`);
        if (res.status === 200) {
          setusera(res.data.me);
        } else {
          // toast.error(res.data.message);
          // navigat("/login");
          return
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setloading(false);
      }
    };

    const getUserByToken = async () => {
      try {
        setloading(true);
        const res = await axios.get("https://wicikibackend.onrender.com/decode/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          setuser(res.data.user);
        } else {
          toast.error(res.data.message);
          navigat("/login");
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      } finally {
        setloading(false);
      }
    };

    if (token) {
      getProfileUser();
      getUserByToken();
    }
  }, [token, name]);



  useEffect(() => {
    const fetchLocation = async () => {
      if (user?.personalised?.presentlocation) {
        const locationInfo = await getReadableLocation(user.personalised.presentlocation);
        setUserLocation(locationInfo);
        console.log("📍 User readable location:", locationInfo);
      }
    };

    fetchLocation();
  }, [user?.personalised?.presentlocation]);

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


  const skills = [
    { icon: <Code2 size={18} />, name: "React" },
    { icon: <Cpu size={18} />, name: "Node.js" },
    { icon: <Database size={18} />, name: "MongoDB" },
    { icon: <Server size={18} />, name: "Express" },
    { icon: <Terminal size={18} />, name: "TypeScript" },
    { icon: <MonitorSmartphone size={18} />, name: "Responsive" },
  ];

  const languages = ["English", "French", "Twi"];

  const [banner, setBanner] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (usera) {
      setBanner(usera?.picture || null);
      setAvatar(usera?.picture || null);
    }
  }, [usera]);

  const openModal = (imgSrc) => {
    setModalImage(imgSrc);
    setShowModal(true);
  };

  const triggerFileSelect = (type) => {
    fileInputRef.current.setAttribute("data-type", type);
    fileInputRef.current.click();
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const type = fileInputRef.current.getAttribute("data-type");
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (type === "banner") setBanner(imageUrl);
      if (type === "avatar") setAvatar(imageUrl);
      setShowModal(false);
    }
  };

  const VideoCard = ({ src, title }) => {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(true);

    const togglePlay = () => {
      const video = videoRef.current;
      if (!video) return;

      if (playing) {
        video.pause();
      } else {
        video.play();
      }
      setPlaying(!playing);
    };

    const toggleMute = () => {
      const video = videoRef.current;
      if (!video) return;
      video.muted = !muted;
      setMuted(!muted);
    };

    const goFullscreen = () => {
      const video = videoRef.current;
      if (video.requestFullscreen) video.requestFullscreen();
    };




    return (
      <div className={styles.videoCard}>
        <div className={styles.videoWrapper}>
          <video
            ref={videoRef}
            className={styles.video}
            src={src}
            loop
            playsInline
            muted={muted}
            onClick={togglePlay}
          />
          <div className={styles.overlay}>
            <div className={styles.title}>{title}</div>

            {/* Controls */}
            <div className={styles.controls}>
              <button onClick={togglePlay} className={styles.controlBtn}>
                {playing ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button onClick={toggleMute} className={styles.controlBtn}>
                {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <button onClick={goFullscreen} className={styles.controlBtn}>
                <Maximize2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };





  const renderTabContent = () => {
    switch (activeTab) {
      case "Posts":
        return (
          <div className={styles.plceMent}>

            <div className={styles.leftSidebar} ref={sidebarRef}>
              <div className={styles.aboutCard} style={{ display: usera?.personalised?.profilevisibility ? "block" : "none" }}>
                {/* Header */}
                <div className={styles.headerSection}>
                  <h2 className={styles.titleme}>About  {usera?.name}</h2>
                  <p className={styles.subtitle}>{usera?.personalised?.BIO}</p>
                </div>

                {/* Bio */}
                <div className={styles.bioSection}>
                  <div className={styles.rowItem}>
                    <Briefcase className={styles.icon} />
                    <span><strong>Profession:</strong> {user?.proffession}</span>
                  </div>
                  <div className={styles.rowItem}>
                    <MapPin className={styles.icon} />
                    {userlocation ? (
                      <p><strong>Full Address:</strong> {userlocation.fullAddress}</p>

                    ) : (
                      <p>Loading location...</p>
                    )}
                  </div>
                  <div className={styles.rowItem}>
                    <GraduationCap className={styles.icon} />
                    <span><strong>Education:</strong> {user?.Education}</span>
                  </div>
                  <div className={styles.rowItem}>
                    <Globe className={styles.icon} />
                    <span>
                      <strong>Website:</strong>{" "}
                      <a
                        href={user?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user?.website}
                      </a>
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div className={styles.skillsSection}>
                  <h3>Technical Skills</h3>
                  <div className={styles.skillGrid}>
                    {user?.ProgrammingLanguages?.map((skill, i) => (
                      <div key={i} className={styles.skillBadge}>
                        {/* {skill.icon} */}
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className={styles.statsSection}>
                  <div className={styles.statBox}>
                    <h4>{user?.YearsOfExperience}+</h4>
                    <p>Years of Experience</p>
                  </div>
                  <div className={styles.statBox}>
                    <h4>{user?.ProjectsCompleted}+</h4>
                    <p>Projects Completed</p>
                  </div>
                  <div className={styles.statBox}>
                    <h4>{user?.ProgrammingLanguages?.length}+</h4>

                    <p>Programming Languages</p>
                  </div>
                </div>

                {/* Languages */}
                <div className={styles.languagesSection}>
                  <h3>Languages</h3>
                  <div className={styles.languageList}>
                    {user?.SpokenLanguages?.length > 0 ? (
                      user.SpokenLanguages.map((lang, i) => (
                        <span key={i} className={styles.languageTag}>
                          {lang}
                        </span>
                      ))
                    ) : (
                      <span className={styles.languageTag}>No languages added</span>
                    )}

                  </div>
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
          <div className={styles.aboutCard}>
            {/* Header */}
            <div className={styles.headerSection}>
              <h2 className={styles.titleme}>About {usera?.name}</h2>
              <p className={styles.subtitle}>Building experiences that blend creativity and logic</p>
            </div>

            {/* Bio */}
            <div className={styles.bioSection}>
              <div className={styles.rowItem}>
                <Briefcase className={styles.icon} />
                <span><strong>Profession:</strong> Full-Stack Developer</span>
              </div>
              <div className={styles.rowItem}>
                <MapPin className={styles.icon} />
                <span><strong>Location:</strong> Accra, Ghana</span>
              </div>
              <div className={styles.rowItem}>
                <GraduationCap className={styles.icon} />
                <span><strong>Education:</strong> University of Ghana</span>
              </div>
              <div className={styles.rowItem}>
                <Globe className={styles.icon} />
                <span>
                  <strong>Website:</strong>{" "}
                  <a
                    href={user?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user?.website}
                  </a>
                </span>
              </div>
            </div>

            {/* Skills */}
            <div className={styles.skillsSection}>
              <h3>Technical Skills</h3>
              <div className={styles.skillGrid}>
                {skills.map((skill, i) => (
                  <div key={i} className={styles.skillBadge}>
                    {skill.icon}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className={styles.statsSection}>
              <div className={styles.statBox}>
                <h4>6+</h4>
                <p>Years of Experience</p>
              </div>
              <div className={styles.statBox}>
                <h4>50+</h4>
                <p>Projects Completed</p>
              </div>
              <div className={styles.statBox}>
                <h4>10+</h4>
                <p>Programming Languages</p>
              </div>
            </div>

            {/* Languages */}
            <div className={styles.languagesSection}>
              <h3>Languages</h3>
              <div className={styles.languageList}>
                {languages.map((lang, i) => (
                  <span key={i} className={styles.languageTag}>
                    {lang}
                  </span>
                ))}
              </div>
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
          <div className={styles.vcard}>
            <div className={styles.vcardHeader}>Videos</div>
            <div className={styles.vcardBody}>
              <div className={styles.videosGrid}>
                {["Dev Showcase", "UI Animation", "Project Preview"].map((title, i) => (
                  <VideoCard
                    key={i}
                    title={title}
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

  // return (
  //   <div id="profile" className={styles.page}>
  //     {/* Cover */}
  //     <section
  //       className={styles.cover}
  //       style={{
  //         background: `
  //           linear-gradient(
  //             to top,
  //             rgba(197, 27, 24, 0.8) 0%,
  //             rgba(197, 27, 24, 0) 40%,
  //             rgba(13, 13, 13, 0.0) 80%
  //           ),
  //           url('/image.png') center/100% 100% no-repeat
  //         `,
  //       }}
  //     />

  //     {/* Avatar + Name */}
  //     <div className={styles.avatarRow}>
  //       <div className={styles.avatarWrap}>
  //         <div className={styles.avatar}>AK</div>
  //         <div className={styles.statusDot} />
  //       </div>

  //       <div className={styles.nameArea}>
  //         <div className={styles.personName}>Akosua Kwarteng</div>
  //         <div className={styles.metaRow}>
  //           <span className={styles.metaChip}>Full-Stack Developer</span>
  //           <span className={styles.metaChip}>React</span>
  //           <span className={styles.metaChip}>Node.js</span>
  //           <span className={styles.metaChip}>AI/ML</span>
  //           <span className={styles.metaChip}>2.4K reachers</span>
  //         </div>
  //         <span style={{ marginTop: 16 }} className={styles.metaChip}>
  //           Website: <ion-icon name="link-outline"></ion-icon>{" "}
  //           <a
  //             href="https://mywebsite.onwiciki.com"
  //             target="_blank"
  //             rel="noopener noreferrer"
  //             style={{ textDecoration: "none", color: "#eba0a7ff" }}
  //           >
  //             https://mywebsite.onwiciki.com
  //           </a>
  //         </span>
  //       </div>

  //       <div className={styles.headerActions}>
  //         <button className={styles.iconBtn} title="More">⋯</button>
  //       </div>
  //     </div>

  //     {/* Tabs */}
  //     <nav className={styles.tabsBar}>
  //       <div className={styles.tabsInner}>
  //         {["Posts", "About", "Friends", "Photos", "Videos"].map(tab => (
  //           <Tab
  //             key={tab}
  //             label={tab}
  //             active={activeTab === tab}
  //             onClick={() => setActiveTab(tab)}
  //           />
  //         ))}
  //       </div>
  //     </nav>

  //     {/* Body */}
  //     <main className={styles.bodyWrap}>
  //       <section className={styles.rightCol}>{renderTabContent()}</section>
  //     </main>
  //   </div>
  // );



  return (
    <div id="profile" className={styles.page}>
      {/* File Upload (hidden) */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileInput}
      />

      {/* Banner */}
      <section
        className={loading ? styles.profileshimmermecover : styles.cover}
        onClick={() =>
          loading || !usera?.picture ? "" :
            openModal(banner)
        }
        style={{
          background: loading ?
            `linear-gradient(110deg, rgba(255, 255, 255, 0.04) 20%,
               rgba(255, 255, 255, 0.12) 50%,
      rgba(49, 31, 31, 0.04) 80%)`:
            `
            linear-gradient(
              to top,
              rgba(197, 27, 24, 0.8) 0%,
              rgba(197, 27, 24, 0) 40%,
              rgba(13, 13, 13, 0.0) 80%
            ),
            url(${usera?.picture}) center/100% 100% no-repeat
          `,
        }}
      >
        <div className={styles.coverOverlay}></div>
      </section>

      {/* Avatar + Details */}
      <div className={styles.avatarRow}>
        <div className={styles.avatarWrap}
          onClick={() => {
            loading || !usera?.picture ? "" :
              openModal(avatar);

          }}
        >
          <img src={usera?.picture}
            className={loading ?
              styles.profileshimmerme :
              styles.avatarImg
            } />
          <div className={styles.statusDot}></div>
        </div>

        <div className={styles.nameArea}>
          <div className={styles.personName}>{usera?.name}</div>
          <div className={styles.metaRow}>
            {usera?.personalised?.Interest.map((item, idx) => {
              return <span key={idx} className={styles.metaChip}>{item}</span>;

            })

            }
            <span className={styles.metaChip}>2.4K reachers</span>
          </div>
          <span className={styles.metaChip}>
            Website
            <LinkIcon size={14} />
            <a
              href={user?.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#eba0a7ff", textDecoration: "none" }}
            >
              {user?.website}
            </a>
          </span>
        </div>

        <div className={styles.headerActions}>
          <button className={styles.iconBtn}>⋯</button>
        </div>
      </div>

      {/* Tabs */}
      <nav className={styles.tabsBar}>
        <div className={styles.tabsInner}>
          {["Posts", "About", "Friends", "Photos", "Videos"].map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Body */}
      <main className={styles.bodyWrap}>
        <section className={styles.rightCol}>{renderTabContent()}</section>
      </main>

      {/* Modal */}
      {
        showModal && (
          <div
            className={`${styles.modalOverlay} ${fullscreen ? styles.fullscreen : ""
              }`}

          >
            <div className={styles.modalContent}>
              <button
                className={styles.closeBtn}
                onClick={() => setShowModal(false)}
              >
                <X size={22} />
              </button>

              <div className={styles.modalImageWrapper}>
                <img
                  src={modalImage}
                  alt="Preview"
                  className={`${styles.modalImage} ${fullscreen ? styles.modalFull : ""
                    }`}
                />
              </div>

              <button
                className={`${styles.navBtn} ${styles.leftBtn}`}
                onClick={() => setFullscreen(!fullscreen)}
              >
                <Maximize2 className={styles.navIcon} />
              </button>
              <button
                className={styles.closeBtn}
                onClick={() => setShowModal(false)}
              >
                <X size={22} />
              </button>
              <button
                className={`${styles.navBtn} ${styles.rightBtn}`}
                onClick={() =>
                  triggerFileSelect(modalImage === banner ? "banner" : "avatar")
                }
              >
                <ImageUp className={styles.navIcon} />
              </button>
            </div>
          </div>
        )
      }
    </div >
  );

};

export default ProfilePage;
