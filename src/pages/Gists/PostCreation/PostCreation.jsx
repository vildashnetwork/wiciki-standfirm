import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PostCreation.css";

const PostCreation = () => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = (type = "text") => {
        navigate(`/post-create?type=${type}`);
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="premium-post-card">
            <div className="premium-post-header">
                <h3>Create Post</h3>
                <div className="premium-post-close" onClick={() => setIsExpanded(false)}>
                    <ion-icon name="close"></ion-icon>
                </div>
            </div>

            <div className="premium-post-content">
                <div className="premium-user-info">
                    <div className="premium-avatar">
                        <ion-icon name="person"></ion-icon>
                    </div>
                    <div className="premium-user-details">
                        <div className="premium-username">Your Name</div>
                        <div className="premium-privacy">
                            <ion-icon name="earth"></ion-icon>
                            Public
                        </div>
                    </div>
                </div>

                <div className="premium-input-container" onClick={toggleExpand}>
                    <textarea
                        className="premium-post-input"
                        placeholder="What's on your mind?"
                        rows={isExpanded ? 4 : 1}
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
                                <button className="premium-option-btn" onClick={() => handleClick("image")}>
                                    <ion-icon name="image"></ion-icon>
                                </button>
                                <button className="premium-option-btn" onClick={() => handleClick("video")}>
                                    <ion-icon name="videocam"></ion-icon>
                                </button>
                                <button className="premium-option-btn" onClick={() => handleClick("text")}>
                                    <ion-icon name="happy"></ion-icon>
                                </button>
                                <button className="premium-option-btn">
                                    <ion-icon name="location"></ion-icon>
                                </button>
                                <button className="premium-option-btn">
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
                    <button
                        className="premium-quick-action"
                        onClick={() => handleClick("image")}
                    >
                        <div className="premium-quick-icon" style={{ backgroundColor: 'rgba(67, 160, 71, 0.2)' }}>
                            <ion-icon name="image" style={{ color: 'var(--success-color)' }}></ion-icon>
                        </div>
                        <span>Photo</span>
                    </button>

                    <button
                        className="premium-quick-action"
                        onClick={() => handleClick("video")}
                    >
                        <div className="premium-quick-icon" style={{ backgroundColor: 'rgba(229, 57, 53, 0.2)' }}>
                            <ion-icon name="videocam" style={{ color: 'var(--accent-red)' }}></ion-icon>
                        </div>
                        <span>Video</span>
                    </button>

                    <button
                        className="premium-quick-action"
                        onClick={() => handleClick("text")}
                    >
                        <div className="premium-quick-icon" style={{ backgroundColor: 'rgba(255, 112, 67, 0.2)' }}>
                            <ion-icon name="happy" style={{ color: 'var(--warning-color)' }}></ion-icon>
                        </div>
                        <span>Feeling</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default PostCreation;