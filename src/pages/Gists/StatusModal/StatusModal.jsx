import { useState, useEffect } from "react";        // Status Modal Component
import "./StatusModal.css"
const StatusModal = ({ isOpen, onClose, stories, currentIndex, onNext, onPrev }) => {
    if (!isOpen || !stories.length) return null;

    const story = stories[currentIndex];

    const formatTime = (timestamp) => {
        const now = Date.now();
        const diff = now - timestamp;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        return `${hours}h ago`;
    };

    return (
        <div className="modal-overlay status-modal-overlay" onClick={onClose}>
            <div className="status-modal" onClick={(e) => e.stopPropagation()}>

                {/* <button className="status-close" onClick={onClose} style={{ cursor: "pointer" }}>
                    <ion-icon name="close"></ion-icon>
                </button> */}
                <div className="status-progress" >
                    {stories.map((_, index) => (
                        <div
                            key={index}
                            className={`progress-bar ${index === currentIndex ? 'active' : ''}`}
                        />
                    ))}
                </div>

                <div className="status-media-container" onDoubleClick={onClose}>
                    {story.type === 'image' && story.mediaUrl ? (
                        <img
                            src={story.mediaUrl}
                            alt="Status"
                            className="status-media"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                    ) : story.type === 'video' && story.mediaUrl ? (
                        <video
                            src={story.mediaUrl}
                            className="status-media"
                            autoPlay
                            muted
                            loop
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                    ) : null}

                    <div
                        className="status-content"
                        style={{
                            background: story.type === 'text' ? `linear-gradient(135deg, ${story.backgroundColor}, ${story.backgroundColor}aa)` : 'transparent',
                            display: story.type === 'text' ? 'flex' : 'none'
                        }}
                    >
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>{story.avatar}</div>
                        <p style={{ fontSize: '18px', fontWeight: '500', color: 'white' }}>{story.content}</p>
                    </div>

                    {(story.type === 'image' || story.type === 'video') && (
                        <div className="status-text-overlay">
                            {story.content}
                        </div>
                    )}
                </div>

                <div className="status-info">
                    <div className="status-name">{story.name}</div>
                    <div className="status-time">{formatTime(story.timestamp)}</div>
                </div>

                <button className="status-nav prev" onClick={onPrev}>
                    <ion-icon name="chevron-back"></ion-icon>
                </button>
                <button className="status-nav next" onClick={onNext}>
                    <ion-icon name="chevron-forward"></ion-icon>
                </button>
            </div>
        </div>
    );
};
export default StatusModal