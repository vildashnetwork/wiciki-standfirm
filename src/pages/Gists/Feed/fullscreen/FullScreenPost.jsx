import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./FullScreenPost.css";

const FullScreenPost = ({ posts = [], onLike, onComment }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [likeAnimation, setLikeAnimation] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [showOptions, setShowOptions] = useState(false);

    const videoRef = useRef(null);
    const optionsRef = useRef(null);

    // Premium sample posts with high-quality content
    const samplePosts = [
        {
            id: "1",
            name: "Alexander Laurent",
            username: "alex_laurent",
            avatar: "AL",
            content: "Just arrived at the Monaco Grand Prix. The atmosphere here is absolutely electric! #F1 #MonacoGP #Luxury",
            timestamp: Date.now() - 3600000,
            type: 'image',
            mediaUrl: "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            likes: 427,
            liked: false,
            followers: "12.5K",
            following: "89",
            posts: "342",
            comments: [
                { text: "Incredible shot! What camera are you using?", timestamp: Date.now() - 1800000, user: "Sophia R." },
                { text: "Wish I was there! The cars look amazing.", timestamp: Date.now() - 1200000, user: "James T." }
            ]
        },
        {
            id: "2",
            name: "Elena Vonnegut",
            username: "elena_v",
            avatar: "EV",
            content: "Private viewing of the new contemporary art collection. Some truly groundbreaking pieces from emerging artists.",
            timestamp: Date.now() - 7200000,
            type: 'video',
            mediaUrl: "https://player.vimeo.com/external/370331493.sd.mp4?s=ada720d9fba8c8c3e3a4eda072a3a5b9e5efc3f7&profile_id=139&oauth2_token_id=57447761",
            likes: 289,
            liked: true,
            followers: "8.2K",
            following: "124",
            posts: "167",
            comments: [
                { text: "The lighting in this gallery is perfection!", timestamp: Date.now() - 3600000, user: "Marcus L." }
            ]
        },
        {
            id: "3",
            name: "William Sterling",
            username: "will_sterling",
            avatar: "WS",
            content: "Just closed the biggest deal of my career. Time to celebrate with a 25-year Macallan and reflect on the journey. Hard work truly pays off. #Success #Entrepreneurship",
            timestamp: Date.now() - 86400000,
            type: 'text',
            likes: 531,
            liked: false,
            followers: "24.7K",
            following: "56",
            posts: "489",
            comments: [
                { text: "Congratulations William! Well deserved.", timestamp: Date.now() - 43200000, user: "Olivia P." },
                { text: "Inspiring as always. What's your next move?", timestamp: Date.now() - 32400000, user: "Daniel K." },
                { text: "Cheers to that! Let's connect next week.", timestamp: Date.now() - 21600000, user: "Michael B." }
            ]
        },
        {
            id: "4",
            name: "Isabella Rossi",
            username: "bella_rossi",
            avatar: "IR",
            content: "Yacht week in the Mediterranean. The Amalfi Coast never fails to take my breath away. #LuxuryTravel #Mediterranean",
            timestamp: Date.now() - 172800000,
            type: 'image',
            mediaUrl: [
                "https://images.unsplash.com/photo-1590523541545-3eac926d2d6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1533695378090-da1a7be09f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1193&q=80"
            ],
            likes: 892,
            liked: true,
            followers: "18.3K",
            following: "203",
            posts: "276",
            comments: [
                { text: "Absolutely stunning! Which yacht are you on?", timestamp: Date.now() - 86400000, user: "Thomas R." },
                { text: "The water color is incredible!", timestamp: Date.now() - 75600000, user: "Charlotte L." },
                { text: "Living the dream! Enjoy every moment.", timestamp: Date.now() - 64800000, user: "Gabriella M." }
            ]
        }
    ];

    useEffect(() => {
        // Use sample posts if none provided
        const postsToUse = posts.length > 0 ? posts : samplePosts;

        // Find the post by ID
        const foundPost = postsToUse.find(p => p.id === id);
        if (foundPost) {
            setPost(foundPost);
            setIsLiked(foundPost.liked);
        }
        setLoading(false);

        // Disable body scroll
        document.body.classList.add('whale-fullscreen-open');

        // Close options when clicking outside
        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.body.classList.remove('whale-fullscreen-open');
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [id, posts]);

    const formatTime = (timestamp) => {
        const now = Date.now();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    const formatMediaTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleComment = () => {
        if (commentText.trim()) {
            if (onComment) {
                onComment(post.id, commentText);
            } else {
                // Fallback if no onComment prop provided
                const newComment = {
                    text: commentText,
                    timestamp: Date.now(),
                    user: "You"
                };
                setPost(prev => ({
                    ...prev,
                    comments: [...prev.comments, newComment]
                }));
            }
            setCommentText('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Escape') {
            navigate(-1);
        }
    };

    useEffect(() => {
        // Add event listener for ESC key
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const handleNextImage = () => {
        if (post.mediaUrl && Array.isArray(post.mediaUrl)) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === post.mediaUrl.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    const handlePrevImage = () => {
        if (post.mediaUrl && Array.isArray(post.mediaUrl)) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? post.mediaUrl.length - 1 : prevIndex - 1
            );
        }
    };

    const handleLike = () => {
        setLikeAnimation(true);
        setTimeout(() => setLikeAnimation(false), 700);

        if (onLike) {
            onLike(post.id);
        } else {
            // Fallback if no onLike prop provided
            setPost(prev => ({
                ...prev,
                liked: !prev.liked,
                likes: prev.liked ? prev.likes - 1 : prev.likes + 1
            }));
        }
        setIsLiked(!isLiked);
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
            setDuration(videoRef.current.duration || 0);
        }
    };

    const handleSeek = (e) => {
        if (videoRef.current) {
            const progressBar = e.currentTarget;
            const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
            const newTime = (clickPosition / progressBar.offsetWidth) * videoRef.current.duration;
            videoRef.current.currentTime = newTime;
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    const handleDownload = () => {
        // Simulate download functionality
        alert('Downloading media...');
        setShowOptions(false);
    };

    const handleReport = () => {
        // Simulate report functionality
        alert('Reporting post...');
        setShowOptions(false);
    };

    const handleShare = () => {
        // Simulate share functionality
        alert('Sharing post...');
        setShowOptions(false);
    };

    if (loading) {
        return (
            <div className="whale-container">
                <div className="cheetah-loading">
                    <div className="cheetah-loader"></div>
                    <p>Loading premium content...</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="whale-container">
                <div className="rhino-error">
                    <h2>Content Unavailable</h2>
                    <p>The post you're looking for cannot be displayed.</p>
                    <button className="parrot-btn" onClick={() => navigate(-1)}>
                        Return to Feed
                    </button>
                </div>
            </div>
        );
    }

    const mediaUrl = Array.isArray(post.mediaUrl)
        ? post.mediaUrl[currentImageIndex]
        : post.mediaUrl;

    return (
        <div className="whale-container">
            <div className="octopus-overlay" onClick={() => navigate(-1)}></div>

            <div className="chameleon-container">
                <div className="chameleon-background">
                    {post.type === 'image' ? (
                        <img src={mediaUrl} alt="Post content" />
                    ) : post.type === 'video' ? (
                        <video
                            ref={videoRef}
                            src={mediaUrl}
                            loop
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleTimeUpdate}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        />
                    ) : (
                        <div className="owl-placeholder">
                            <div className="owl-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p>Text Post</p>
                        </div>
                    )}
                </div>

                <div className="chameleon-overlay">
                    <div className="tiger-controls">
                        <button className="panda-close" onClick={() => navigate(-1)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <div className="eagle-controls">
                            <button className="fox-options" onClick={() => setShowOptions(!showOptions)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            {showOptions && (
                                <div className="fox-menu" ref={optionsRef}>
                                    <button onClick={handleDownload}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 16V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V16M16 12L12 16M12 16L8 12M12 16V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Download
                                    </button>
                                    <button onClick={handleShare}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12M16 6L12 2M12 2L8 6M12 2V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Share
                                    </button>
                                    <button onClick={handleReport}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 9V14M12 17V17.01M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Report
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="zebra-controls">
                            {post.type === 'image' && Array.isArray(post.mediaUrl) && post.mediaUrl.length > 1 && (
                                <>
                                    <button className="zebra-btn" onClick={handlePrevImage}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <button className="zebra-btn" onClick={handleNextImage}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="lion-controls">
                        {post.type === 'video' && (
                            <button className="dolphin-play" onClick={togglePlayPause}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {isPlaying ? (
                                        <>
                                            <rect x="6" y="4" width="4" height="16" fill="currentColor" />
                                            <rect x="14" y="4" width="4" height="16" fill="currentColor" />
                                        </>
                                    ) : (
                                        <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                                    )}
                                </svg>
                            </button>
                        )}
                    </div>

                    <div className="bear-controls">
                        {post.type === 'video' && (
                            <>
                                <div className="turtle-progress" onClick={handleSeek}>
                                    <div
                                        className="turtle-bar"
                                        style={{ width: `${(currentTime / duration) * 100}%` }}
                                    >
                                        <div className="turtle-handle"></div>
                                    </div>
                                </div>
                                <div className="penguin-buttons">
                                    <div className="penguin-left">
                                        <button className="penguin-btn" onClick={togglePlayPause}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                {isPlaying ? (
                                                    <>
                                                        <rect x="6" y="4" width="4" height="16" fill="currentColor" />
                                                        <rect x="14" y="4" width="4" height="16" fill="currentColor" />
                                                    </>
                                                ) : (
                                                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                                                )}
                                            </svg>
                                        </button>
                                        <span className="owl-time">
                                            {formatMediaTime(currentTime)} / {formatMediaTime(duration)}
                                        </span>
                                    </div>
                                    <div className="penguin-right">
                                        <div className="elephant-volume">
                                            <button className="penguin-btn">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    {volume === 0 ? (
                                                        <path d="M13 5L7 9H3V15H7L13 19V5Z" fill="currentColor" />
                                                    ) : (
                                                        <path d="M3 9V15H7L12 20V4L7 9H3Z" fill="currentColor" />
                                                    )}
                                                </svg>
                                            </button>
                                            <input
                                                type="range"
                                                className="elephant-slider"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                value={volume}
                                                onChange={handleVolumeChange}
                                            />
                                        </div>
                                        <button className="penguin-btn" onClick={toggleFullscreen}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 3H5C4.44772 3 4 3.44772 4 4V7M4 17V20C4 20.5523 4.44772 21 5 21H8M20 17V20C20 20.5523 19.5523 21 19 21H16M16 3H19C19.5523 3 20 3.44772 20 4V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="gorilla-section">
                    <div className="peacock-profile">
                        <div className="peacock-info">
                            <div className="parrot-avatar large">
                                <span>{post.avatar}</span>
                            </div>
                            <div className="peacock-details">
                                <h3>{post.name}</h3>
                                <p>@{post.username}</p>
                                <div className="peacock-stats">
                                    <div className="peacock-stat">
                                        <span className="peacock-count">{post.posts}</span>
                                        <span className="peacock-label">Posts</span>
                                    </div>
                                    <div className="peacock-stat">
                                        <span className="peacock-count">{post.followers}</span>
                                        <span className="peacock-label">Followers</span>
                                    </div>
                                    <div className="peacock-stat">
                                        <span className="peacock-count">{post.following}</span>
                                        <span className="peacock-label">Following</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swan-content">
                            <p>{post.content}</p>
                            <div className="swan-meta">
                                <span className="swan-time">{formatTime(post.timestamp)}</span>
                                <span className="swan-location">Monte Carlo, Monaco</span>
                            </div>
                        </div>
                    </div>

                    <div className="gorilla-controls">
                        <button className="monkey-comments" onClick={() => setShowComments(true)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {post.type === 'image' && Array.isArray(post.mediaUrl) && post.mediaUrl.length > 1 && (
                            <div className="giraffe-counter">
                                {currentImageIndex + 1} / {post.mediaUrl.length}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showComments && (
                <div className="kangaroo-modal">
                    <div className="kangaroo-header">
                        <h3>Comments ({post.comments?.length || 0})</h3>
                        <button className="kangaroo-close" onClick={() => setShowComments(false)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="kangaroo-content">
                        {post.comments?.length > 0 ? (
                            <div className="kangaroo-list">
                                {post.comments.map((comment, index) => (
                                    <div key={index} className="kangaroo-comment">
                                        <div className="kangaroo-avatar">
                                            <span>{comment.user.charAt(0)}</span>
                                        </div>
                                        <div className="kangaroo-comment-content">
                                            <div className="kangaroo-comment-header">
                                                <span className="kangaroo-author">{comment.user}</span>
                                                <span className="kangaroo-time">{formatTime(comment.timestamp)}</span>
                                            </div>
                                            <div className="kangaroo-text">{comment.text}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="kangaroo-no-comments">No comments yet</p>
                        )}
                    </div>
                    <div className="kangaroo-input">
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                        />
                        <button className="parrot-btn" onClick={handleComment}>
                            Post
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FullScreenPost;