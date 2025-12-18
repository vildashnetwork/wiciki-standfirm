import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PostCreation.css";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";

const PostCreation = () => {
    const token = Cookies.get("token");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                setLoading(true);
                const res = await axios.get("https://wiciki-media-backend.onrender.com/decode/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.status === 200) {
                    setUser(res.data.user);
                    // console.log(res.data.user);
                } else {
                    toast.error(res?.data?.message || "Failed to fetch user");
                    // navigate("/login");
                }
            } catch (error) {
                console.error("getUser error:", error);
                // toast.error("Session expired or network error. Please login.");
                // navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, [token, navigate]);

    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = (type = "text") => {
        navigate(`/post-create?type=${type}`);
    };

    const toggleExpand = () => {
        setIsExpanded((s) => !s);
    };

    return (
        <div className="premium-post-card">
            <div className="premium-post-header">
                <h3>Create Post</h3>
                <div className="premium-post-close" onClick={() => setIsExpanded(false)} role="button" aria-label="Close">
                    <ion-icon name="close"></ion-icon>
                </div>
            </div>

            <div className="premium-post-content">
                <div className="premium-user-info">
                    <div
                        className="avatar-wrapper"
                        onClick={() => !user?.name ? "" : navigate(`/profile/${encodeURIComponent(user?.name)}`)}
                        aria-disabled={loading || !user?.name}
                        title="View Profile"
                        role="button"
                        aria-label="View profile"
                    >
                        {loading ? (
                            <div className="profile-shimmer" aria-hidden="true" />
                        ) : user?.picture ? (
                            <img
                                src={user.picture}
                                alt={`${user?.name || "User"} avatar`}
                                className="profile-image"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}
                            />
                        ) : (
                            <div className="avatar-fallback" aria-hidden="true">
                                <ion-icon name="person"></ion-icon>
                            </div>
                        )}
                    </div>

                    <div className="premium-user-details">
                        <div className="premium-username">{user?.name || "Your Name"}</div>
                        <div className="premium-privacy">
                            <ion-icon name="earth"></ion-icon>
                            <span>{user?.personalised?.profilevisibility ? "Public" : "Private"}</span>
                        </div>
                    </div>
                </div>

                <div className="premium-input-container" onClick={toggleExpand} role="button" aria-label="Expand post input">
                    <textarea
                        className="premium-post-input"
                        placeholder="What's on your mind?"
                        rows={isExpanded ? 4 : 1}
                        aria-label="Create a post"
                    ></textarea>
                    {!isExpanded && (
                        <div className="premium-input-overlay">
                            <ion-icon name="create"></ion-icon>
                            <span>Write something...</span>
                        </div>
                    )}
                </div>

                {isExpanded && (
                    <div className="premium-add-to-post">
                        <div className="premium-add-options">
                            <h4>Add to your post</h4>
                            <div className="premium-option-buttons">
                                <button className="premium-option-btn" onClick={() => handleClick("image")} aria-label="Add image">
                                    <ion-icon name="image"></ion-icon>
                                </button>
                                <button className="premium-option-btn" onClick={() => handleClick("video")} aria-label="Add video">
                                    <ion-icon name="videocam"></ion-icon>
                                </button>
                                <button className="premium-option-btn" onClick={() => handleClick("text")} aria-label="Add feeling">
                                    <ion-icon name="happy"></ion-icon>
                                </button>
                                <button className="premium-option-btn" aria-label="Add location">
                                    <ion-icon name="location"></ion-icon>
                                </button>
                                <button className="premium-option-btn" aria-label="Tag people">
                                    <ion-icon name="people"></ion-icon>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="premium-post-footer">
                <button className="premium-post-btn">Post</button>
            </div>

            {!isExpanded && (
                <div className="premium-quick-actions">
                    <button className="premium-quick-action" onClick={() => handleClick("image")}>
                        <div className="premium-quick-icon" style={{ backgroundColor: "rgba(67, 160, 71, 0.2)" }}>
                            <ion-icon name="image" style={{ color: "var(--success-color)" }}></ion-icon>
                        </div>
                        <span>Photo</span>
                    </button>

                    <button className="premium-quick-action" onClick={() => handleClick("video")}>
                        <div className="premium-quick-icon" style={{ backgroundColor: "rgba(229, 57, 53, 0.2)" }}>
                            <ion-icon name="videocam" style={{ color: "var(--accent-red)" }}></ion-icon>
                        </div>
                        <span>Video</span>
                    </button>

                    <button className="premium-quick-action" onClick={() => handleClick("text")}>
                        <div className="premium-quick-icon" style={{ backgroundColor: "rgba(255, 112, 67, 0.2)" }}>
                            <ion-icon name="happy" style={{ color: "var(--warning-color)" }}></ion-icon>
                        </div>
                        <span>Feeling</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default PostCreation;
