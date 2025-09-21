import React from "react";
import { useNavigate } from "react-router-dom";
import "./PostCreation.css";

const PostCreation = () => {
    const navigate = useNavigate();

    const handleClick = (type = "text") => {
        navigate(`/post-create?type=${type}`);
    };

    return (
        <div className="card-postcreation">
            <div className="card-padding">
                <div className="post-creation" onClick={() => handleClick()}>
                    <div className="avatar">
                        <ion-icon name="person"></ion-icon>
                    </div>
                    <input
                        type="text"
                        className="post-input"
                        placeholder="What's on your mind?"
                        readOnly
                    />
                </div>

                <div className="post-actions">
                    <button
                        className="post-action-btn"
                        onClick={() => handleClick("image")}
                    >
                        <ion-icon name="image" style={{ color: 'var(--success-color)' }}></ion-icon>
                        <span>Photo</span>
                    </button>

                    <button
                        className="post-action-btn"
                        onClick={() => handleClick("video")}
                    >
                        <ion-icon name="videocam" style={{ color: 'var(--accent-red)' }}></ion-icon>
                        <span>Video</span>
                    </button>

                    <button
                        className="post-action-btn"
                        onClick={() => handleClick("text")}
                    >
                        <ion-icon name="happy" style={{ color: 'var(--warning-color)' }}></ion-icon>
                        <span>Feeling</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostCreation;
