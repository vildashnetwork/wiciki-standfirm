import { useEffect, useState } from "react";
import "./AddStatusModal.css"
        const AddStatusModal = ({ isOpen, onClose, onAdd }) => {
            const [statusType, setStatusType] = useState('text');
            const [statusText, setStatusText] = useState('');
            const [mediaUrl, setMediaUrl] = useState('');
            const [selectedColor, setSelectedColor] = useState('#e53935');

            const colors = ['#e53935', '#ff6f61', '#43a047', '#1976d2', '#7b1fa2', '#ff7043'];

            const getRandomMedia = (type) => {
                if (type === 'image') {
                    return sampleImages[Math.floor(Math.random() * sampleImages.length)];
                } else if (type === 'video') {
                    return sampleVideos[Math.floor(Math.random() * sampleVideos.length)];
                }
                return '';
            };

            const handleSubmit = () => {
                if (statusText.trim()) {
                    onAdd({
                        type: statusType,
                        content: statusText,
                        mediaUrl: statusType !== 'text' ? mediaUrl : null,
                        backgroundColor: selectedColor
                    });
                    setStatusText('');
                    setMediaUrl('');
                    setStatusType('text');
                    onClose();
                }
            };

            if (!isOpen) return null;

            return (
                <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
                    <div className="modal">
                        <div className="modal-header">
                            <h3 className="modal-title">Add Status</h3>
                            <button className="modal-close" onClick={onClose}>
                                <ion-icon name="close"></ion-icon>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="form-label">Status Type</label>
                                <select 
                                    className="form-select" 
                                    value={statusType}
                                    onChange={(e) => {
                                        setStatusType(e.target.value);
                                        if (e.target.value !== 'text') {
                                            setMediaUrl(getRandomMedia(e.target.value));
                                        } else {
                                            setMediaUrl('');
                                        }
                                    }}
                                >
                                    <option value="text">Text Status</option>
                                    <option value="image">Image Status</option>
                                    <option value="video">Video Status</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Content</label>
                                <textarea 
                                    className="form-textarea"
                                    placeholder="What's happening?"
                                    value={statusText}
                                    onChange={(e) => setStatusText(e.target.value)}
                                />
                            </div>
                            {statusType !== 'text' && (
                                <div className="form-group">
                                    <label className="form-label">Media URL</label>
                                    <input 
                                        type="url" 
                                        className="form-input"
                                        placeholder="Enter image or video URL"
                                        value={mediaUrl}
                                        onChange={(e) => setMediaUrl(e.target.value)}
                                    />
                                    <button 
                                        type="button"
                                        className="btn-secondary"
                                        onClick={() => setMediaUrl(getRandomMedia(statusType))}
                                        style={{ marginTop: '8px' }}
                                    >
                                        Use Random {statusType === 'image' ? 'Image' : 'Video'}
                                    </button>
                                    {mediaUrl && (
                                        <div className="media-preview">
                                            {statusType === 'image' ? (
                                                <img src={mediaUrl} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                                            ) : (
                                                <video src={mediaUrl} controls onError={(e) => e.target.style.display = 'none'} />
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className="form-group">
                                <label className="form-label">Background Color</label>
                                <div className="color-picker">
                                    {colors.map(color => (
                                        <button
                                            key={color}
                                            className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => setSelectedColor(color)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <button className="btn-primary" onClick={handleSubmit} style={{ width: '100%', padding: '12px' }}>
                                Add Status
                            </button>
                        </div>
                    </div>
                </div>
            );
        };
export default AddStatusModal