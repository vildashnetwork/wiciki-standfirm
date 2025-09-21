import { useState } from "react";
import "./AddStatusModal.css";

const sampleImages = [
    "https://images.unsplash.com/photo-1579546929662-711aa81148cf",
    "https://images.unsplash.com/photo-1556740758-90de374c12ad",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
];

const sampleVideos = [
    "https://assets.mixkit.co/videos/preview/mixkit-clouds-and-blue-sky-2411-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-a-girl-blowing-a-bubble-gum-at-an-amusement-park-1226-large.mp4",
];

const colors = [
    "#e53935", "#ff6f61", "#43a047", "#1976d2", "#7b1fa2",
    "#ff7043", "#00acc1", "#fdd835", "#5e35b1", "#d81b60"
];

const StatusCreator = () => {
    const [statusType, setStatusType] = useState("text");
    const [statusText, setStatusText] = useState("");
    const [mediaUrl, setMediaUrl] = useState("");
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    const getRandomMedia = (type) => {
        if (type === "image") return sampleImages[Math.floor(Math.random() * sampleImages.length)];
        if (type === "video") return sampleVideos[Math.floor(Math.random() * sampleVideos.length)];
        return "";
    };

    const handleSubmit = () => {
        if (statusText.trim() || statusType !== "text") {
            console.log({
                type: statusType,
                content: statusText,
                mediaUrl: statusType !== "text" ? mediaUrl : null,
                backgroundColor: selectedColor,
            });
            setStatusText("");
            setMediaUrl("");
            setStatusType("text");
            setSelectedColor(colors[0]);
            alert("Status created successfully!");
        } else {
            alert("Please enter some text for your status");
        }
    };

    return (
        <div className="status-creator">
            {/* Form Section */}
            <div className="form-section">
                <div className="form-group">
                    <label>
                        <ion-icon name="options-outline"></ion-icon> Status Type
                    </label>
                    <select
                        value={statusType}
                        onChange={(e) => {
                            const type = e.target.value;
                            setStatusType(type);
                            if (type !== "text") setMediaUrl(getRandomMedia(type));
                            else setMediaUrl("");
                        }}
                    >
                        <option value="text">Text</option>
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>
                        <ion-icon name="create-outline"></ion-icon> Content
                    </label>
                    <textarea
                        placeholder="What's happening?"
                        value={statusText}
                        onChange={(e) => setStatusText(e.target.value)}
                    />
                </div>

                {statusType !== "text" && (
                    <div className="form-group">
                        <label>
                            <ion-icon name="image-outline"></ion-icon> Media URL
                        </label>
                        <input
                            type="url"
                            placeholder={`Enter ${statusType} URL`}
                            value={mediaUrl}
                            onChange={(e) => setMediaUrl(e.target.value)}
                        />
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => setMediaUrl(getRandomMedia(statusType))}
                        >
                            <ion-icon name="shuffle-outline"></ion-icon> Random {statusType === "image" ? "Image" : "Video"}
                        </button>
                    </div>
                )}

                <div className="form-group">
                    <label>
                        <ion-icon name="color-palette-outline"></ion-icon> Background Color
                    </label>
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
                    <ion-icon name="add-circle-outline"></ion-icon> Add Status
                </button>
            </div>

            {/* Preview Section */}
            <div className="preview-section">
                <h4 className="preview-title">
                    <ion-icon name="eye-outline"></ion-icon> Live Preview
                </h4>
                <div className="preview-container">
                    <div className="status-preview" style={{ backgroundColor: selectedColor }}>
                        <div className="status-header">
                            <div className="status-avatar">Y</div>
                            <div className="status-user-info">
                                <div className="status-username">You</div>
                                <div className="status-time">Just now</div>
                            </div>
                        </div>
                        <div className="status-content">
                            {statusType === "text" && (
                                <div className="status-text">
                                    {statusText || "Your status preview will appear here"}
                                </div>
                            )}
                            {statusType === "image" && mediaUrl && (
                                <img src={mediaUrl} className="status-media" alt="Preview" />
                            )}
                            {statusType === "video" && mediaUrl && (
                                <video src={mediaUrl} className="status-media" controls />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusCreator;
