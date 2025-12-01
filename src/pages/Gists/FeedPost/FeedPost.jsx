// import { useState, useEffect, useRef } from "react";
// import "./FeedPost.css"
// import { Link } from "react-router-dom";


// const FeedPost = ({ post, onLike, onComment }) => {
//     const [showComments, setShowComments] = useState(false);
//     const [commentText, setCommentText] = useState('');
//     const [showOptions, setShowOptions] = useState(false);
//     const optionsRef = useRef(null);

//     const formatTime = (timestamp) => {
//         const now = Date.now();
//         const diff = now - timestamp;
//         const minutes = Math.floor(diff / (1000 * 60));
//         const hours = Math.floor(diff / (1000 * 60 * 60));
//         const days = Math.floor(diff / (1000 * 60 * 60 * 24));

//         if (minutes < 60) return `${minutes}m ago`;
//         if (hours < 24) return `${hours}h ago`;
//         return `${days}d ago`;
//     };

//     const handleComment = () => {
//         if (commentText.trim()) {
//             onComment(post.id, commentText);
//             setCommentText('');
//         }
//     };

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (optionsRef.current && !optionsRef.current.contains(event.target)) {
//                 setShowOptions(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     const handleDownload = () => {
//         // Simulate download functionality
//         alert('Downloading media...');
//         setShowOptions(false);
//     };

//     const handleReport = () => {
//         // Simulate report functionality
//         alert('Reporting post...');
//         setShowOptions(false);
//     };

//     const handleShare = () => {
//         // Simulate share functionality
//         alert('Sharing post...');
//         setShowOptions(false);
//     };

//     return (
//         <div className="cardfeedpost">
//             <div className="card-padding">
//                 <div className="post-header">
//                     <div className="avatar">
//                         <img src={`${post.avatar}`} alt={post.name} />
//                     </div>
//                     <div className="post-author">
//                         <h3>{post.name}</h3>
//                         <div className="post-time">{formatTime(post.timestamp)}</div>
//                     </div>

//                     {/* Options Menu Container */}
//                     <div className="post-menu-container" ref={optionsRef}>
//                         <button className="post-menu-btn" onClick={() => setShowOptions(!showOptions)}>
//                             <ion-icon name="ellipsis-vertical"></ion-icon>
//                         </button>

//                         {/* Options Dropdown Menu */}
//                         {showOptions && (
//                             <div className="post-options-menu">
//                                 <button className="option-item" onClick={handleReport}>
//                                     <ion-icon name="flag-outline"></ion-icon>
//                                     Report Post
//                                 </button>
//                                 <button className="option-item" onClick={handleShare}>
//                                     <ion-icon name="share-outline"></ion-icon>
//                                     Share
//                                 </button>
//                                 {post.mediaUrl && (
//                                     <button className="option-item" onClick={handleDownload}>
//                                         <ion-icon name="download-outline"></ion-icon>
//                                         Download
//                                     </button>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 <div className="post-content">{post.content}</div>
//                 {post.mediaUrl && (
//                     <div className="post-media">
//                         {post.type === 'image' ? (
//                             <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
//                                 <img
//                                     src={post.mediaUrl}
//                                     alt="Post content"
//                                     className="post-image"
//                                     onError={(e) => e.target.style.display = 'none'}
//                                 />
//                             </Link>
//                         ) : post.type === 'video' ? (
//                             <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
//                                 <video
//                                     src={post.mediaUrl}
//                                     className="post-video"
//                                     controls
//                                     onError={(e) => e.target.style.display = 'none'}
//                                 />
//                             </Link>
//                         ) : null}
//                     </div>
//                 )}
//             </div>
//             <div className="post-reactions">
//                 <button
//                     className={`reaction-btn ${post.liked ? 'liked' : ''}`}
//                     onClick={() => onLike(post.id)}
//                 >
//                     <ion-icon name={post.liked ? "heart" : "heart-outline"}></ion-icon>
//                     <span>{post.liked ? 'Liked' : 'Like'} ({post.likes || 0})</span>
//                 </button>
//                 <button
//                     className="reaction-btn"
//                     onClick={() => setShowComments(!showComments)}
//                 >
//                     <ion-icon name="chatbubble-outline"></ion-icon>
//                     <span>Comment ({post.comments?.length || 0})</span>
//                 </button>
//                 <button className="reaction-btn">
//                     <ion-icon name="share-outline"></ion-icon>
//                     <span>Share</span>
//                 </button>
//             </div>
//             {showComments && (
//                 <div className="comments-section">
//                     <div className="comments-here">
//                         {post.comments?.map((comment, index) => (
//                             <div key={index} style={{ marginBottom: '12px', padding: '8px', backgroundColor: 'var(--secondary-bg)', borderRadius: '8px' }}>
//                                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
//                                     <div className="avatar" style={{ width: '24px', height: '24px' }}>
//                                         <span style={{ fontSize: '12px' }} className="avatar"><img src={`${post.avatar}`} alt={post.name} /></span>
//                                     </div>
//                                     <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>You</span>
//                                     <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{formatTime(comment.timestamp)}</span>
//                                 </div>
//                                 <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginLeft: '32px' }}>{comment.text}</p>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="comment-input-container">
//                         <>
//                             <div className="avatar" style={{ width: '32px', height: '32px' }}>
//                                 <span style={{ fontSize: '12px' }} className="avatar"><img src={`${post.avatar}`} alt={post.name} /></span>
//                             </div>
//                             <textarea
//                                 type="text"
//                                 className="comment-input"
//                                 placeholder="Write a comment..."
//                                 value={commentText}
//                                 cols={7}
//                                 onChange={(e) => setCommentText(e.target.value)}
//                                 onKeyPress={(e) => e.key === 'Enter' && handleComment()}
//                             />
//                         </>
//                     </div>
//                     <div className="withy">
//                         <button
//                             className="btn-primary1"
//                             onClick={handleComment}
//                             style={{ padding: '8px 12px' }}
//                         >
//                             Post
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FeedPost;



















import { useState, useEffect, useRef } from "react";
import "./FeedPost.css"
import { Link } from "react-router-dom";

const FeedPost = ({ post, onLike, onComment, onLikeComment }) => {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const optionsRef = useRef(null);

    const formatTime = (timestampOrIso) => {
        const ts = typeof timestampOrIso === "string" ? new Date(timestampOrIso).getTime() : Number(timestampOrIso);
        const now = Date.now();
        const diff = now - ts;
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    const handleComment = () => {
        if (commentText.trim()) {
            onComment(post.id, commentText.trim());
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
        alert('Downloading media...');
        setShowOptions(false);
    };

    const handleReport = () => {
        alert('Reporting post...');
        setShowOptions(false);
    };

    const handleShare = () => {
        alert('Sharing post...');
        setShowOptions(false);
    };

    return (
        <div className="cardfeedpost">
            <div className="card-padding">
                <div className="post-header">
                    <div className="avatar">
                        <img src={post.avatar || "/default-avatar.png"} alt={post.name} />
                    </div>
                    <div className="post-author">
                        <h3>{post.name}</h3>
                        <div className="post-time">{formatTime(post.timestamp)}</div>
                    </div>

                    <div className="post-menu-container" ref={optionsRef}>
                        <button className="post-menu-btn" onClick={() => setShowOptions(!showOptions)}>
                            <ion-icon name="ellipsis-vertical"></ion-icon>
                        </button>

                        {showOptions && (
                            <div className="post-options-menu">
                                <button className="option-item" onClick={handleReport}>
                                    <ion-icon name="flag-outline"></ion-icon>
                                    Report Post
                                </button>
                                <button className="option-item" onClick={handleShare}>
                                    <ion-icon name="share-outline"></ion-icon>
                                    Share
                                </button>
                                {post.mediaUrl && (
                                    <button className="option-item" onClick={handleDownload}>
                                        <ion-icon name="download-outline"></ion-icon>
                                        Download
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="post-content">{post.content.slice(0, 30)}</div>

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
                    <div className="comments-here">
                        {post.comments?.map((comment) => {
                            // backend comment shape: { _id, user: { id, name, picture }, message, createdAt, likes: [...] }
                            const commenterName = comment.user?.name || "Unknown";
                            const commenterAvatar = comment.user?.picture || post.avatar || "/default-avatar.png";
                            const commentMsg = comment.message || comment.text || "";
                            const commentTime = comment.createdAt || comment.timestamp || Date.now();

                            return (
                                <div key={String(comment._id || comment.id || Math.random())} style={{ marginBottom: '12px', padding: '8px', backgroundColor: 'var(--secondary-bg)', borderRadius: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                        <div className="avatar" style={{ width: '24px', height: '24px' }}>
                                            <img src={commenterAvatar} alt={commenterName} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                                        </div>
                                        <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>{commenterName}</span>
                                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{formatTime(commentTime)}</span>

                                        {/* comment like button */}
                                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <button
                                                className="reaction-btn"
                                                onClick={() => onLikeComment && onLikeComment(post.id, comment._id)}
                                                title="Like comment"
                                            >
                                                <ion-icon name="heart-outline"></ion-icon>
                                            </button>
                                            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{(comment.likes && comment.likes.length) || 0}</span>
                                        </div>
                                    </div>

                                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginLeft: '32px' }}>{commentMsg}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="comment-input-container">
                        <>
                            <div className="avatar" style={{ width: '32px', height: '32px' }}>
                                <img src={post.avatar || "/default-avatar.png"} alt={post.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                            </div>
                            <textarea
                                type="text"
                                className="comment-input"
                                placeholder="Write a comment..."
                                value={commentText}
                                cols={7}
                                onChange={(e) => setCommentText(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleComment();
                                    }
                                }}
                            />
                        </>
                    </div>

                    <div className="withy">
                        <button
                            className="btn-primary1"
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

export default FeedPost;
