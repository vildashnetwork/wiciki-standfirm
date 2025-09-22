import { useState, useEffect } from "react";
import "./FeedPost.css"
import { Link } from "react-router-dom";
// Feed Post Component
const FeedPost = ({ post, onLike, onComment }) => {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');

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

    return (
        <div className="cardfeedpost">
            <div className="card-padding">
                <div className="post-header">
                    <div className="avatar">
                        <span>{post.avatar}</span>
                    </div>
                    <div className="post-author">
                        <h3>{post.name}</h3>
                        <div className="post-time">{formatTime(post.timestamp)}</div>
                    </div>
                    <button className="post-menu-btn">
                        <ion-icon name="ellipsis-vertical"></ion-icon>
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