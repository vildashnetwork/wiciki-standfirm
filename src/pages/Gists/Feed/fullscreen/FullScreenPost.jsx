





// FullScreenPost.jsx
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./FullScreenPost.css";

// Base posts API
const API_BASE = "https://wiciki-media-backend.onrender.com/api/posts";
// Fallback avatar image (replace with your asset path)
const FALLBACK_AVATAR = "/default-avatar.png";

const normalizeComment = (c) => {
    // Normalize comment shape to:
    // { id, message, userName, userAvatar, createdAt, likesCount, likedByMe, raw }
    const id = c._id || c.id || String(Math.random());
    const message = c.message ?? c.text ?? "";
    let userName = "Unknown";
    let userAvatar = FALLBACK_AVATAR;

    if (typeof c.user === "string") {
        userName = c.user;
    } else if (c.user?.name) {
        userName = c.user.name;
        if (c.user.picture) userAvatar = c.user.picture;
    } else if (c.userName) {
        userName = c.userName;
        if (c.userAvatar) userAvatar = c.userAvatar;
    } else if (c.user?.id && c.user?.name) {
        userName = c.user.name;
        if (c.user.picture) userAvatar = c.user.picture;
    }

    const createdAt = c.createdAt ?? c.timestamp ?? Date.now();
    const likesCount = Array.isArray(c.likes) ? c.likes.length : c.likesCount ?? 0;
    const likedByMe = !!c.likedByMe || !!c.liked;

    return { id, message, userName, userAvatar, createdAt, likesCount, likedByMe, raw: c };
};

const FullScreenPost = ({ posts = [], onLike: parentOnLike, onComment: parentOnComment }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [likeAnimating, setLikeAnimating] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [uploadingComment, setUploadingComment] = useState(false);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showOptions, setShowOptions] = useState(false);

    const videoRef = useRef(null);
    const optionsRef = useRef(null);

    // Fetch post by id from backend
    const fetchPost = async () => {
        setLoading(true);
        try {
            const token = Cookies.get("token");
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const resp = await axios.get(`${API_BASE}/${id}`, { headers, timeout: 15000 });

            const p = resp?.data?.post ?? resp?.data;
            if (!p) {
                // fallback to local posts prop if provided
                const local = posts.find((x) => String(x.id) === String(id));
                if (local) {
                    setPost(local);
                    setIsLiked(!!local.liked);
                } else {
                    setPost(null);
                }
                return;
            }

            // Normalize comments
            const comments = Array.isArray(p.comments) ? p.comments.map(normalizeComment) : [];

            // Likes
            const likesCount = Array.isArray(p.likes) ? p.likes.length : p.likesCount ?? 0;
            const likedByMe = !!p.likedByMe || !!p.liked;

            // media selection
            const mediaUrl =
                p.contentType === "image" ? p.image || p.media || null :
                    p.contentType === "video" ? p.video || null :
                        p.media?.length ? p.media : null;

            const mediaArray = Array.isArray(mediaUrl) ? mediaUrl : mediaUrl ? [mediaUrl] : null;

            setPost({
                id: p._id || p.id,
                user: p.user,
                name: p.user?.name || "Unknown",
                username: (p.user?.name || "").replace(/\s+/g, "_"),
                avatar: p.user?.picture || FALLBACK_AVATAR,
                content: p.text || p.content || "",
                timestamp: p.createdAt ? new Date(p.createdAt).getTime() : Date.now(),
                type: p.contentType || "text",
                mediaUrl: mediaArray ?? null,
                image: p.image || "",
                video: p.video || "",
                likes: likesCount,
                liked: likedByMe,
                comments,
                raw: p
            });

            setIsLiked(!!likedByMe);
        } catch (err) {
            console.error("Fetch post error:", err);
            // fallback to local post if available
            const local = posts.find((x) => String(x.id) === String(id));
            if (local) {
                setPost(local);
                setIsLiked(!!local.liked);
            } else {
                setPost(null);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();

        // disable body scroll while open
        document.body.classList.add("whale-fullscreen-open");

        // close options when clicking outside
        const handleClickOutside = (ev) => {
            if (optionsRef.current && !optionsRef.current.contains(ev.target)) setShowOptions(false);
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.body.classList.remove("whale-fullscreen-open");
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

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

    // Toggle like for the post
    const handleLike = async () => {
        if (!post) return;
        setLikeAnimating(true);
        setTimeout(() => setLikeAnimating(false), 700);

        // optimistic UI update
        setPost((prev) =>
            prev ? { ...prev, liked: !prev.liked, likes: !prev.liked ? (prev.likes || 0) + 1 : Math.max(0, (prev.likes || 0) - 1) } : prev
        );
        setIsLiked((s) => !s);

        try {
            const token = Cookies.get("token");
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const resp = await axios.post(`${API_BASE}/${post.id}/like`, {}, { headers });
            if (resp?.data) {
                const liked = resp.data.liked ?? resp.data.likedByMe ?? resp.data.liked === true;
                const likesCount = typeof resp.data.likesCount === "number" ? resp.data.likesCount : resp.data.likes ?? null;
                setPost((prev) => (prev ? { ...prev, liked: !!liked, likes: likesCount ?? prev.likes } : prev));
            }
            if (parentOnLike) parentOnLike(post.id);
        } catch (err) {
            console.error("Like toggle error:", err);
            // rollback by refetching
            await fetchPost();
            alert("Failed to like/unlike post.");
        }
    };

    // Submit a comment
    const handleCommentSubmit = async () => {
        if (!commentText.trim() || !post) return;
        setUploadingComment(true);

        // optimistic comment
        const optimistic = {
            id: `temp-${Date.now()}`,
            message: commentText,
            userName: "You",
            userAvatar: FALLBACK_AVATAR,
            createdAt: Date.now(),
            likesCount: 0,
            likedByMe: false
        };
        setPost((prev) => (prev ? { ...prev, comments: [...(prev.comments || []), optimistic] } : prev));
        setCommentText("");

        try {
            const token = Cookies.get("token");
            if (!token) throw new Error("Not logged in");
            const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
            const resp = await axios.post(`${API_BASE}/${post.id}/comment`, { message: optimistic.message }, { headers });
            if (resp?.data?.comment) {
                const created = normalizeComment(resp.data.comment);
                setPost((prev) =>
                    prev ? { ...prev, comments: [...(prev.comments || []).filter((c) => !String(c.id).startsWith("temp-")), created] } : prev
                );
            } else {
                // fallback to refetching
                await fetchPost();
            }
            if (parentOnComment) parentOnComment(post.id, optimistic.message);
        } catch (err) {
            console.error("Create comment error:", err);
            setPost((prev) => (prev ? { ...prev, comments: prev.comments.filter((c) => !String(c.id).startsWith("temp-")) } : prev));
            alert("Failed to post comment: " + (err.response?.data?.error || err.message));
        } finally {
            setUploadingComment(false);
        }
    };

    // Toggle like for a specific comment
    const toggleCommentLike = async (commentId) => {
        if (!post) return;

        // optimistic update
        setPost((prev) =>
            prev
                ? {
                    ...prev,
                    comments: prev.comments.map((c) =>
                        c.id === commentId ? { ...c, likedByMe: !c.likedByMe, likesCount: !c.likedByMe ? (c.likesCount || 0) + 1 : Math.max(0, (c.likesCount || 0) - 1) } : c
                    )
                }
                : prev
        );

        try {
            const token = Cookies.get("token");
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const resp = await axios.post(`${API_BASE}/${post.id}/comments/${commentId}/like`, {}, { headers });
            if (resp?.data) {
                const updatedCount = typeof resp.data.likesCount === "number" ? resp.data.likesCount : undefined;
                const liked = resp.data.liked ?? resp.data.likedByMe;
                setPost((prev) =>
                    prev
                        ? { ...prev, comments: prev.comments.map((c) => (c.id === commentId ? { ...c, likedByMe: !!liked, likesCount: updatedCount ?? c.likesCount } : c)) }
                        : prev
                );
            }
        } catch (err) {
            console.error("Toggle comment like error:", err);
            // fallback: refetch the post to rollback
            await fetchPost();
            alert("Failed to toggle comment like.");
        }
    };

    // media navigation and video controls
    const handleNextImage = () => setCurrentImageIndex((i) => (post && Array.isArray(post.mediaUrl) ? (i === post.mediaUrl.length - 1 ? 0 : i + 1) : 0));
    const handlePrevImage = () => setCurrentImageIndex((i) => (post && Array.isArray(post.mediaUrl) ? (i === 0 ? post.mediaUrl.length - 1 : i - 1) : 0));
    const togglePlayPause = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };
    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        setCurrentTime(videoRef.current.currentTime || 0);
        setDuration(videoRef.current.duration || 0);
    };
    const handleSeek = (e) => {
        if (!videoRef.current) return;
        const progressBar = e.currentTarget;
        const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
        const newTime = (clickPosition / progressBar.offsetWidth) * videoRef.current.duration;
        videoRef.current.currentTime = newTime;
    };
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) videoRef.current.volume = newVolume;
    };

    if (loading) {
        return (
            <div className="whale-container">
                <div className="cheetah-loading">
                    <div className="cheetah-loader" />
                    <p>Loading post...</p>
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
                    <button className="parrot-btn" onClick={() => navigate(-1)}>Return to Feed</button>
                </div>
            </div>
        );
    }

    const mediaUrl = Array.isArray(post.mediaUrl) ? post.mediaUrl[currentImageIndex] : post.mediaUrl;

    return (
        <div className="whale-container">
            <div className="octopus-overlay" onClick={() => navigate(-1)} />

            <div className="chameleon-container">
                <div className="chameleon-background">
                    {post.type === "image" ? (
                        <img src={mediaUrl} alt="Post content" />
                    ) : post.type === "video" ? (
                        <video ref={videoRef} src={mediaUrl || post.video} loop onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleTimeUpdate} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
                    ) : (
                        <div className="owl-placeholder">
                            <div className="owl-icon" />
                            <p>Text Post</p>
                        </div>
                    )}
                </div>

                <div className="chameleon-overlay">
                    <div className="tiger-controls">
                        <button className="panda-close" onClick={() => navigate(-1)}>✕</button>

                        <div className="eagle-controls">
                            <button className="fox-options" onClick={() => setShowOptions((s) => !s)}>•••</button>
                            {showOptions && (
                                <div className="fox-menu" ref={optionsRef}>
                                    <button onClick={() => { alert("Download"); setShowOptions(false); }}>Download</button>
                                    <button onClick={() => { alert("Share"); setShowOptions(false); }}>Share</button>
                                    <button onClick={() => { alert("Report"); setShowOptions(false); }}>Report</button>
                                </div>
                            )}
                        </div>

                        <div className="zebra-controls">
                            {post.type === "image" && Array.isArray(post.mediaUrl) && post.mediaUrl.length > 1 && (
                                <>
                                    <button className="zebra-btn" onClick={handlePrevImage}>‹</button>
                                    <button className="zebra-btn" onClick={handleNextImage}>›</button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="lion-controls">{post.type === "video" && <button className="dolphin-play" onClick={togglePlayPause}>{isPlaying ? "▮▮" : "▶"}</button>}</div>

                    <div className="bear-controls">
                        {post.type === "video" && (
                            <>
                                <div className="turtle-progress" onClick={handleSeek}>
                                    <div className="turtle-bar" style={{ width: `${(currentTime / Math.max(1, duration)) * 100}%` }}>
                                        <div className="turtle-handle" />
                                    </div>
                                </div>

                                <div className="penguin-buttons">
                                    <div className="penguin-left">
                                        <button className="penguin-btn" onClick={togglePlayPause}>{isPlaying ? "▮▮" : "▶"}</button>
                                        <span className="owl-time">{Math.floor(currentTime)} / {Math.floor(duration)}</span>
                                    </div>

                                    <div className="penguin-right">
                                        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
                                        <button className="penguin-btn" onClick={() => { if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => { }); else document.exitFullscreen?.(); }}>⤢</button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="gorilla-section">
                    <div className="peacock-profile">
                        <div className="peacock-info">
                            <div
                                className="parrot-avatar large"
                                style={{

                                    backgroundImage: `url(${post.avatar})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center"
                                }}
                            ></div>

                            <div className="peacock-details">
                                <h3>{post.name}</h3>
                                <p>@{post.username}</p>
                            </div>
                        </div>

                        <div className="swan-content">
                            <p>{post.content}</p>
                            <div className="swan-meta">
                                <span className="swan-time">{formatTime(post.timestamp)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="gorilla-controls">
                        <button className="monkey-comments" onClick={() => setShowComments(true)}>💬</button>
                        <div className="giraffe-counter">{(currentImageIndex + 1)} / {(post.mediaUrl?.length || 1)}</div>
                    </div>
                </div>
            </div>

            <div className="action-bar">
                <button className={`like-btn ${post.liked ? "liked" : ""}`} onClick={handleLike}>
                    {post.liked ? "❤️" : "🤍"} {post.likes || 0}
                </button>
                <button onClick={() => setShowComments((s) => !s)}>Comments ({post.comments?.length || 0})</button>
                <button onClick={() => { navigator.clipboard?.writeText(window.location.href); alert("Link copied"); }}>Share</button>
            </div>

            {showComments && (
                <div className="kangaroo-modal">
                    <div className="kangaroo-header">
                        <h3>Comments ({post.comments?.length || 0})</h3>
                        <button className="kangaroo-close" onClick={() => setShowComments(false)}>✕</button>
                    </div>

                    <div className="kangaroo-content">
                        {post.comments?.length > 0 ? (
                            <div className="kangaroo-list">
                                {post.comments.map((c) => (
                                    <div key={c.id} className="kangaroo-comment">
                                        <div className="kangaroo-avatar">
                                            {/* <img src={c.userAvatar || FALLBACK_AVATAR} alt={c.userName} /> */}
                                        </div>
                                        <div className="kangaroo-comment-content">
                                            <div className="kangaroo-comment-header">
                                                <span className="kangaroo-author">{c.userName}</span>
                                                <span className="kangaroo-time">{formatTime(c.createdAt)}</span>
                                            </div>
                                            <div className="kangaroo-text">{c.message}</div>
                                            <div className="kangaroo-actions">
                                                <button onClick={() => toggleCommentLike(c.id)}>{c.likedByMe ? "❤️" : "🤍"} {c.likesCount || 0}</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="kangaroo-no-comments">No comments yet</p>
                        )}
                    </div>

                    <div className="kangaroo-input">
                        <input type="text" placeholder="Write a comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()} />
                        <button className="parrot-btn" onClick={handleCommentSubmit} disabled={uploadingComment}>{uploadingComment ? "Posting..." : "Post"}</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FullScreenPost;
