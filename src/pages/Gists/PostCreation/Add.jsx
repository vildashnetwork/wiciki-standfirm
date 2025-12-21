











import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./modal.css";

const CLOUDINARY_IMAGE_URL = "https://api.cloudinary.com/v1_1/dznitipi9/image/upload";
const CLOUDINARY_VIDEO_URL = "https://api.cloudinary.com/v1_1/dznitipi9/video/upload";
const CLOUDINARY_IMAGE_PRESET = "wiciki-picture";
const CLOUDINARY_VIDEO_PRESET = "wiciki-video";
const PLACEHOLDER_IMAGE = "/upload_area.svg";

const PostCreatePage = ({ onCreatePost }) => {
    const navigate = useNavigate();

    const [postContent, setPostContent] = useState("");
    const [postType, setPostType] = useState("text");
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(PLACEHOLDER_IMAGE);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [visibility, setVisibility] = useState("public");
    const [loading, setLoading] = useState(false);

    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);

    // Handle file selection and preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const uploadToCloudinary = async (file, type = "image") => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", type === "image" ? CLOUDINARY_IMAGE_PRESET : CLOUDINARY_VIDEO_PRESET);

        try {
            const response = await axios.post(
                type === "image" ? CLOUDINARY_IMAGE_URL : CLOUDINARY_VIDEO_URL,
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percentCompleted);
                    },
                    withCredentials: false,
                }
            );
            return response.data.secure_url;
        } catch (err) {
            console.error("Cloudinary upload error:", err);
            alert(`Failed to upload ${type} to Cloudinary`);
            return null;
        }
    };

    const handleSubmit = async () => {
        if (!postContent.trim() && postType === "text") {
            alert("Post content cannot be empty");
            return;
        }

        setLoading(true);

        let mediaUrl = "";
        if ((postType === "image" || postType === "video") && selectedFile) {
            mediaUrl = await uploadToCloudinary(selectedFile, postType);
            if (!mediaUrl) {
                setLoading(false);
                return;
            }
        }

        const postData = {
            text: postContent || "",
            image: postType === "image" ? mediaUrl : "",
            video: postType === "video" ? mediaUrl : "",
            location: "",
            visibility: visibility || "public",
            tags: [],
            story: undefined,
            media: undefined,
            contentType: postType,
        };

        try {
            const token = Cookies.get("token");
            if (!token) {
                alert("You must be logged in");
                setLoading(false);
                return;
            }

            const response = await axios.post(
                "https://wiciki-media-backend-ahiu.onrender.com/api/posts",
                postData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201) {
                if (onCreatePost) onCreatePost(response.data.post);
                navigate("/");
            }
        } catch (err) {
            console.error("Error creating post:", err);
            alert(
                "Error creating post: " + (err.response?.data?.error || err.message || "Unknown error")
            );
        } finally {
            setLoading(false);
            setUploadProgress(0);
        }
    };

    return (
        <div className="post-page">
            <header className="post-header">
                <div className="logo" onClick={() => navigate("/")}>
                    <ion-icon name="arrow-back-outline"></ion-icon>
                </div>
            </header>

            <div className="post-container">
                <div className="post-form">
                    <h2>Create a Post</h2>

                    <div className="form-group">
                        <select value={postType} onChange={(e) => setPostType(e.target.value)}>
                            <option value="text">Text</option>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>

                        <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
                            <option value="public">Public</option>
                            <option value="friends">Friends</option>
                            <option value="private">Private</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <textarea
                            placeholder="What's on your mind?"
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                        />
                    </div>

                    {postType === "image" && (
                        <div className="form-group">
                            <label>Upload Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                ref={imageInputRef}
                                onChange={handleFileChange}
                            />
                            <img
                                src={previewUrl}
                                alt="Upload preview"
                                className="upload-preview"
                                style={{ cursor: "pointer", width: 200, height: 200, objectFit: "cover" }}
                                onClick={() => imageInputRef.current.click()}
                            />
                            {uploadProgress > 0 && <div>Upload Progress: {uploadProgress}%</div>}
                        </div>
                    )}

                    {postType === "video" && (
                        <div className="form-group">
                            <label>Upload Video</label>
                            <input
                                type="file"
                                accept="video/*"
                                style={{ display: "none" }}
                                ref={videoInputRef}
                                onChange={handleFileChange}
                            />
                            {previewUrl && <video src={previewUrl} controls style={{ maxWidth: "100%" }} />}
                            <button
                                type="button"
                                onClick={() => videoInputRef.current.click()}
                                style={{ marginTop: 5 }}
                            >
                                Select Video
                            </button>
                            {uploadProgress > 0 && <div>Upload Progress: {uploadProgress}%</div>}
                        </div>
                    )}

                    <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Posting..." : "Post"}
                    </button>
                </div>

                <div className="post-preview">
                    {postType === "text" && <p>{postContent || "Your post preview..."}</p>}
                    {postType === "image" && previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: "100%" }} />}
                    {postType === "video" && previewUrl && <video src={previewUrl} controls style={{ maxWidth: "100%" }} />}
                </div>
            </div>
        </div>
    );
};

export default PostCreatePage;
