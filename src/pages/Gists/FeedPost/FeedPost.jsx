import { useState, useEffect, useRef } from "react";
import "./FeedPost.css"
import { Link } from "react-router-dom";
// Feed Post Component
const FeedPost = ({ post, onLike, onComment }) => {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const optionsRef = useRef(null);
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

    const handleComment = () => {
        if (commentText.trim()) {
            onComment(post.id, commentText);
            setCommentText('');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
    const [showOptions, setShowOptions] = useState(false);
    return (
        <div className="cardfeedpost">
            <div className="card-padding">
                <div className="post-header">
                    <div className="avatar">

                        <img src={`${post.avatar}`} alt={post.name} />

                    </div>
                    <div className="post-author">
                        <h3>{post.name}</h3>
                        <div className="post-time">{formatTime(post.timestamp)}</div>
                    </div>
                    <button className="post-menu-btn" onClick={() => setShowOptions(!showOptions)}>
                        <ion-icon name="ellipsis-vertical"></ion-icon>
                    </button>
                </div>


                {showOptions && (
                    <div className="fox-menu1" >
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

                                <video
                                    src={post.mediaUrl}
                                    className="post-video"
                                    controls
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            </Link>
                        ) : null}
                    </div>
                )}
            </div>
            <div className="post-reactions">
                <button
                    className={`reaction-btn ${post.liked ? 'liked' : ''}`}
                    onClick={() => onLike(post.id)}
                >
                    <ion-icon name={post.liked ? "heart" : "heart-outline"}></ion-icon>
                    <span>{post.liked ? 'Liked' : 'Like'} ({post.likes || 0})</span>
                </button>
                <button
                    className="reaction-btn"
                    onClick={() => setShowComments(!showComments)}
                >
                    <ion-icon name="chatbubble-outline"></ion-icon>
                    <span>Comment ({post.comments?.length || 0})</span>
                </button>
                <button className="reaction-btn">
                    <ion-icon name="share-outline"></ion-icon>
                    <span>Share</span>
                </button>
            </div>
            {showComments && (
                <div className="comments-section">
                    {post.comments?.map((comment, index) => (
                        <div key={index} style={{ marginBottom: '12px', padding: '8px', backgroundColor: 'var(--secondary-bg)', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <div className="avatar" style={{ width: '24px', height: '24px' }}>
                                    <span style={{ fontSize: '12px' }}>😊</span>
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>You</span>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{formatTime(comment.timestamp)}</span>
                            </div>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginLeft: '32px' }}>{comment.text}</p>
                        </div>
                    ))}
                    <div className="comment-input-container">
                        <div className="avatar" style={{ width: '32px', height: '32px' }}>
                            <span style={{ fontSize: '14px' }}>😊</span>
                        </div>
                        <input
                            type="text"
                            className="comment-input"
                            placeholder="Write a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                        />
                        <button
                            className="btn-primary"
                            onClick={handleComment}
                            style={{ padding: '8px 12px' }}
                        >
                            Post
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default FeedPost