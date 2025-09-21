import { useEffect, useState } from "react";
import "./AddStatusModal.css";

const sampleImages = [
    "https://randomuser.me/api/portraits/women/68.jpg",
    "https://randomuser.me/api/portraits/men/55.jpg",
    "https://randomuser.me/api/portraits/women/45.jpg",
];

const sampleVideos = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/movie.mp4",
];

const AddStatusModal = ({ isOpen, onClose, onAdd }) => {
    const [statusType, setStatusType] = useState("text");
    const [statusText, setStatusText] = useState("");
    const [mediaUrl, setMediaUrl] = useState("");
    const [selectedColor, setSelectedColor] = useState("#e53935");

    const colors = ["#e53935", "#ff6f61", "#43a047", "#1976d2", "#7b1fa2", "#ff7043"];

    const getRandomMedia = (type) => {
        if (type === "image") return sampleImages[Math.floor(Math.random() * sampleImages.length)];
        if (type === "video") return sampleVideos[Math.floor(Math.random() * sampleVideos.length)];
        return "";
    };

    const handleSubmit = () => {
        if (statusText.trim() || statusType !== "text") {
            onAdd({
                type: statusType,
                content: statusText,
                mediaUrl: statusType !== "text" ? mediaUrl : null,
                backgroundColor: selectedColor,
            });
            setStatusText("");
            setMediaUrl("");
            setStatusType("text");
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-container">
                <div className="modal-content">
                    {/* Form Section */}
                    <div className="modal-form">
                        <div className="modal-header">
                            <h3>Add Status</h3>
                            <button className="modal-close" onClick={onClose}>
                                &times;
                            </button>
                        </div>

                        <div className="form-group">
                            <label>Status Type</label>
                            <select
                                value={statusType}
                                onChange={(e) => {
                                    setStatusType(e.target.value);
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
                            <label>Content</label>
                            <textarea
                                placeholder="What's happening?"
                                value={statusText}
                                onChange={(e) => setStatusText(e.target.value)}
                            />
                        </div>

                        {statusType !== "text" && (
                            <div className="form-group">
                                <label>Media URL</label>
                                <input
                                    type="url"
                                    placeholder={`Enter ${statusType} URL`}
                                    value={mediaUrl}
                                    onChange={(e) => setMediaUrl(e.target.value)}
                                />
                                <button type="button" className="btn-secondary" onClick={() => setMediaUrl(getRandomMedia(statusType))}>
                                    Random {statusType === "image" ? "Image" : "Video"}
                                </button>
                            </div>
                        )}

                        <div className="form-group">
                            <label>Background Color</label>
                            <div className="color-picker">
                                {colors.map((color) => (
                                    <button
                                        key={color}
                                        className={`color-option ${selectedColor === color ? "selected" : ""}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setSelectedColor(color)}
                                    />
                                ))}
                            </div>
                        </div>

                        <button className="btn-primary" onClick={handleSubmit}>
                            Add Status
                        </button>
                    </div>

                    {/* Live Preview Section */}
                    <div className="modal-preview" style={{ backgroundColor: selectedColor }}>
                        {statusType === "text" && <p>{statusText || "Your status preview..."}</p>}
                        {statusType === "image" && mediaUrl && <img src={mediaUrl} alt="Preview" />}
                        {statusType === "video" && mediaUrl && <video src={mediaUrl} controls />}
                        {!statusText && statusType === "text" && <p className="placeholder">Text will appear here...</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStatusModal;
