import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./FeedPost.css";

// Sample user data with actual profile pictures
const sampleUsers = [
    {
        id: 1,
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        username: "@alexj"
    },
    {
        id: 2,
        name: "Sarah Williams",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        username: "@sarahw"
    },
    {
        id: 3,
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        username: "@michaelc"
    }
];

// Sample posts with actual images and videos
const samplePosts = [
    {
        id: 1,
        userId: 1,
        content: "Just finished hiking at Yosemite National Park! The views were absolutely breathtaking. Definitely recommend adding this to your bucket list if you haven't been.",
        mediaUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        type: 'image',
        timestamp: Date.now() - 3600000, // 1 hour ago
        likes: 42,
        comments: [
            {
                userId: 2,
                text: "Wow, these photos are stunning! Which trail did you take?",
                timestamp: Date.now() - 1800000 // 30 mins ago
            },
            {
                userId: 3,
                text: "I was there last month! The mist trail is incredible this time of year.",
                timestamp: Date.now() - 1200000 // 20 mins ago
            }
        ],
        shares: 5
    },
    {
        id: 2,
        userId: 2,
        content: "My new cooking show premieres next week! Here's a little teaser of what you can expect. So excited to share my passion for food with all of you!",
        mediaUrl: "https://player.vimeo.com/video/370756449?h=da64b8c068&title=0&byline=0&portrait=0",
        type: 'video',
        timestamp: Date.now() - 10800000, // 3 hours ago
        likes: 128,
        comments: [
            {
                userId: 1,
                text: "Can't wait to watch! Your recipes are always amazing.",
                timestamp: Date.now() - 3600000 // 1 hour ago
            }
        ],
        shares: 18
    },
    {
        id: 3,
        userId: 3,
        content: "Just launched my new startup after two years of hard work! So grateful to my team for their dedication and perseverance. The future is bright!",
        mediaUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        type: 'image',
        timestamp: Date.now() - 86400000, // 1 day ago
        likes: 256,
        comments: [],
        shares: 32
    }
];

// Feed Post Component
const FeedPost = ({ post, user, onLike, onComment }) => {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [currentLikes, setCurrentLikes] = useState(post.likes);

    const formatTime = (timestamp) => {
        const now = Date.now();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (minutes < 1) return "Just now";
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    const handleLike = () => {
        const newLikedState = !isLiked;
        setIsLiked(newLikedState);
        setCurrentLikes(newLikedState ? currentLikes + 1 : currentLikes - 1);
        onLike(post.id, newLikedState);
    };

    const handleComment = () => {
        if (commentText.trim()) {
            onComment(post.id, commentText);
            setCommentText('');
        }
    };

    // Find the post author
    const postAuthor = sampleUsers.find(u => u.id === post.userId);

    return (
        <div className="cardfeedpost">
            <div className="card-padding">
                <div className="post-header">
                    <div className="avatar">
                        <img src={postAuthor.avatar} alt={postAuthor.name} />
                    </div>
                    <div className="post-author">
                        <h3>{postAuthor.name}</h3>
                        <div className="post-time">{formatTime(post.timestamp)}</div>
                    </div>
                    <button className="post-menu-btn">
                        <ion-icon name="ellipsis-horizontal"></ion-icon>
                    </button>
                </div>
                <div className="post-content">{post.content}</div>
                {post.mediaUrl && (
                    <div className="post-media">
                        {post.type === 'image' ? (
                            <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
                                <img
                                    src={post.mediaUrl}
                                    alt="Post content"
                                    className="post-image"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            </Link>
                        ) : post.type === 'video' ? (
                            <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
                                <div className="video-container">
                                    <iframe
                                        src={post.mediaUrl}
                                        className="post-video"
                                        frameBorder="0"
                                        allow="autoplay; fullscreen; picture-in-picture"
                                        allowFullScreen
                                        title="Post video"
                                    ></iframe>
                                </div>
                            </Link>
                        ) : null}
                    </div>
                )}
                <div className="post-stats">
                    <div className="likes-count">
                        <span className="count-bubble">{currentLikes}</span>
                        <span>Likes</span>
                    </div>
                    <div className="comments-share-count">
                        <span>{post.comments.length} Comments</span>
                        <span>·</span>
                        <span>{post.shares} Shares</span>
                    </div>
                </div>
            </div>
            <div className="post-reactions">
                <button
                    className={`reaction-btn ${isLiked ? 'liked' : ''}`}
                    onClick={handleLike}
                >
                    <ion-icon name={isLiked ? "heart" : "heart-outline"}></ion-icon>
                    <span>Like</span>
                </button>
                <button
                    className="reaction-btn"
                    onClick={() => setShowComments(!showComments)}
                >
                    <ion-icon name="chatbubble-outline"></ion-icon>
                    <span>Comment</span>
                </button>
                <button className="reaction-btn">
                    <ion-icon name="arrow-redo-outline"></ion-icon>
                    <span>Share</span>
                </button>
            </div>
            {showComments && (
                <div className="comments-section">
                    <div className="comments-list">
                        {post.comments.map((comment, index) => {
                            const commentAuthor = sampleUsers.find(u => u.id === comment.userId);
                            return (
                                <div key={index} className="comment">
                                    <div className="comment-avatar">
                                        <img src={commentAuthor.avatar} alt={commentAuthor.name} />
                                    </div>
                                    <div className="comment-content">
                                        <div className="comment-header">
                                            <span className="comment-author">{commentAuthor.name}</span>
                                            <span className="comment-time">{formatTime(comment.timestamp)}</span>
                                        </div>
                                        <p className="comment-text">{comment.text}</p>
                                        <div className="comment-actions">
                                            <button>Like</button>
                                            <button>Reply</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="comment-input-container">
                        <div className="current-user-avatar">
                            <img src={user.avatar} alt={user.name} />
                        </div>
                        <div className="comment-input-wrapper">
                            <input
                                type="text"
                                className="comment-input"
                                placeholder="Write a comment..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                            />
                            <div className="comment-options">
                                <button className="emoji-btn">
                                    <ion-icon name="happy-outline"></ion-icon>
                                </button>
                                <button className="photo-btn">
                                    <ion-icon name="image-outline"></ion-icon>
                                </button>
                            </div>
                        </div>
                        <button
                            className="comment-submit-btn"
                            onClick={handleComment}
                            disabled={!commentText.trim()}
                        >
                            <ion-icon name="arrow-up-circle"></ion-icon>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Feed Component that contains all posts
const Feed = () => {
    const [posts, setPosts] = useState(samplePosts);
    const [currentUser] = useState({
        id: 4,
        name: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        username: "@you"
    });

    const handleLike = (postId, liked) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    likes: liked ? post.likes + 1 : post.likes - 1
                };
            }
            return post;
        }));
    };

    const handleComment = (postId, commentText) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                const newComment = {
                    userId: currentUser.id,
                    text: commentText,
                    timestamp: Date.now()
                };
                return {
                    ...post,
                    comments: [...post.comments, newComment]
                };
            }
            return post;
        }));
    };

    return (
        <div className="feed-container">
            <div className="stories-bar">
                <div className="story create-story">
                    <div className="story-avatar">
                        <img src={currentUser.avatar} alt={currentUser.name} />
                        <div className="add-story">+</div>
                    </div>
                    <span className="story-username">Create Story</span>
                </div>
                {sampleUsers.map(user => (
                    <div key={user.id} className="story">
                        <div className="story-avatar">
                            <img src={user.avatar} alt={user.name} />
                        </div>
                        <span className="story-username">{user.username}</span>
                    </div>
                ))}
            </div>

            <div className="create-post">
                <div className="create-post-header">
                    <div className="current-user-avatar">
                        <img src={currentUser.avatar} alt={currentUser.name} />
                    </div>
                    <button className="create-post-input">What's on your mind?</button>
                </div>
                <div className="create-post-options">
                    <button className="create-post-option">
                        <ion-icon name="videocam" style={{ color: '#F3425F' }}></ion-icon>
                        <span>Live Video</span>
                    </button>
                    <button className="create-post-option">
                        <ion-icon name="image" style={{ color: '#45BD62' }}></ion-icon>
                        <span>Photo/Video</span>
                    </button>
                    <button className="create-post-option">
                        <ion-icon name="happy" style={{ color: '#F7B928' }}></ion-icon>
                        <span>Feeling/Activity</span>
                    </button>
                </div>
            </div>

            <div className="posts-feed">
                {posts.map(post => (
                    <FeedPost
                        key={post.id}
                        post={post}
                        user={currentUser}
                        onLike={handleLike}
                        onComment={handleComment}
                    />
                ))}
            </div>
        </div>
    );
};

export default Feed;