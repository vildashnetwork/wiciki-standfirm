import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./modal.css";

const sampleImages = [
    "https://randomuser.me/api/portraits/women/68.jpg",
    "https://randomuser.me/api/portraits/men/55.jpg",
    "https://randomuser.me/api/portraits/women/45.jpg",
];

const sampleVideos = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/movie.mp4",
];

const PostCreatePage = ({ onCreatePost }) => {
    const navigate = useNavigate();

    const [postContent, setPostContent] = useState("");
    const [postType, setPostType] = useState("text");
    const [mediaUrl, setMediaUrl] = useState("");

    const getRandomMedia = (type) => {
        if (type === "image")
            return sampleImages[Math.floor(Math.random() * sampleImages.length)];
        if (type === "video")
            return sampleVideos[Math.floor(Math.random() * sampleVideos.length)];
        return "";
    };

    useEffect(() => {
        if (postType !== "text") setMediaUrl(getRandomMedia(postType));
    }, [postType]);

    const handleSubmit = () => {
        if (postContent.trim() || postType !== "text") {
            onCreatePost({
                content: postContent,
                type: postType,
                mediaUrl: mediaUrl || null,
            });
            navigate("/home"); // Redirect to home after posting
        }
    };

    return (
        <div className="post-page">
            {/* Header */}
            <header className="post-header">
                <div className="logo"><ion-icon name="arrow-back-outline"></ion-icon></div>

            </header>

            {/* Post Creation Container */}
            <div className="post-container">
                {/* Form Section */}
                <div className="post-form">
                    <h2>Create a Post</h2>

                    <div className="form-group">
                        <label>Post Type</label>
                        <select
                            value={postType}
                            onChange={(e) => {
                                setPostType(e.target.value);
                                if (e.target.value !== "text") setMediaUrl(getRandomMedia(e.target.value));
                                else setMediaUrl("");
                            }}
                        >
                            <option value="text">Text</option>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <textarea
                            placeholder="What's on your mind?"
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                        />
                    </div>

                    {postType !== "text" && (
                        <div className="form-group">
                            <label>Media URL</label>
                            <input
                                type="url"
                                placeholder="Enter media URL"
                                value={mediaUrl}
                                onChange={(e) => setMediaUrl(e.target.value)}
                            />
                            <button
                                className="btn-secondary"
                                onClick={() => setMediaUrl(getRandomMedia(postType))}
                            >
                                Random {postType === "image" ? "Image" : "Video"}
                            </button>

                            {mediaUrl && (
                                <div className="media-preview">
                                    {postType === "image" ? (
                                        <img src={mediaUrl} alt="Preview" />
                                    ) : (
                                        <video src={mediaUrl} controls />
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    <button className="btn-primary" onClick={handleSubmit}>
                        Post
                    </button>
                </div>

                {/* Live Preview Section */}
                <div className="post-preview">
                    {postType === "text" && <p>{postContent || "Your post preview..."}</p>}
                    {postType === "image" && mediaUrl && <img src={mediaUrl} alt="Preview" />}
                    {postType === "video" && mediaUrl && <video src={mediaUrl} controls />}
                </div>
            </div>
        </div>
    );
};

export default PostCreatePage;
