    import { useState, useEffect } from "react";
    import "./PostCreation.css"
    const PostCreation = ({ onCreatePost }) => {
            const [showModal, setShowModal] = useState(false);
            const [postContent, setPostContent] = useState('');
            const [postType, setPostType] = useState('text');
            const [mediaUrl, setMediaUrl] = useState('');

            const handleSubmit = () => {
                if (postContent.trim()) {
                    onCreatePost({
                        content: postContent,
                        type: postType,
                        mediaUrl: mediaUrl || null
                    });
                    setPostContent('');
                    setMediaUrl('');
                    setPostType('text');
                    setShowModal(false);
                }
            };

            const getRandomMedia = (type) => {
                if (type === 'image') {
                    return sampleImages[Math.floor(Math.random() * sampleImages.length)];
                } else if (type === 'video') {
                    return sampleVideos[Math.floor(Math.random() * sampleVideos.length)];
                }
                return '';
            };

            return (
                <>
                    <div className="card-postcreation">
                        <div className="card-padding">
                            <div className="post-creation">
                                <div className="avatar">
                                    <ion-icon name="person"></ion-icon>
                                </div>
                                <input 
                                    type="text" 
                                    className="post-input" 
                                    placeholder="What's on your mind?"
                                    onClick={() => setShowModal(true)}
                                    readOnly
                                />
                            </div>
                            <div className="post-actions">
                                <button className="post-action-btn" onClick={() => {
                                    setPostType('image');
                                    setMediaUrl(getRandomMedia('image'));
                                    setShowModal(true);
                                }}>
                                    <ion-icon name="image" style={{ color: 'var(--success-color)' }}></ion-icon>
                                    <span>Photo</span>
                                </button>
                                <button className="post-action-btn" onClick={() => {
                                    setPostType('video');
                                    setMediaUrl(getRandomMedia('video'));
                                    setShowModal(true);
                                }}>
                                    <ion-icon name="videocam" style={{ color: 'var(--accent-red)' }}></ion-icon>
                                    <span>Video</span>
                                </button>
                                <button className="post-action-btn" onClick={() => setShowModal(true)}>
                                    <ion-icon name="happy" style={{ color: 'var(--warning-color)' }}></ion-icon>
                                    <span>Feeling</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {showModal && (
                        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
                            <div className="modal">
                                <div className="modal-header">
                                    <h3 className="modal-title">Create Post</h3>
                                    <button className="modal-close" onClick={() => setShowModal(false)}>
                                        <ion-icon name="close"></ion-icon>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="post-creation">
                                        <div className="avatar">
                                            <ion-icon name="person"></ion-icon>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>Your Name</h4>
                                            <select className="form-select" style={{ width: 'auto', padding: '4px 8px', fontSize: '12px' }}>
                                                <option>Public</option>
                                                <option>Friends</option>
                                                <option>Only me</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group" style={{ marginTop: '16px' }}>
                                        <label className="form-label">Post Type</label>
                                        <select 
                                            className="form-select" 
                                            value={postType}
                                            onChange={(e) => {
                                                setPostType(e.target.value);
                                                if (e.target.value !== 'text') {
                                                    setMediaUrl(getRandomMedia(e.target.value));
                                                } else {
                                                    setMediaUrl('');
                                                }
                                            }}
                                        >
                                            <option value="text">Text Only</option>
                                            <option value="image">With Image</option>
                                            <option value="video">With Video</option>
                                        </select>
                                    </div>

                                    <textarea 
                                        className="form-textarea"
                                        placeholder="What's on your mind?"
                                        value={postContent}
                                        onChange={(e) => setPostContent(e.target.value)}
                                        style={{ height: '120px', fontSize: '16px' }}
                                    />

                                    {postType !== 'text' && (
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
                                                onClick={() => setMediaUrl(getRandomMedia(postType))}
                                                style={{ marginTop: '8px' }}
                                            >
                                                Use Random {postType === 'image' ? 'Image' : 'Video'}
                                            </button>
                                            {mediaUrl && (
                                                <div className="media-preview">
                                                    {postType === 'image' ? (
                                                        <img src={mediaUrl} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                                                    ) : (
                                                        <video src={mediaUrl} controls onError={(e) => e.target.style.display = 'none'} />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <button className="btn-primary" onClick={handleSubmit} style={{ width: '100%', marginTop: '16px', padding: '12px' }}>
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            );
        };
export default PostCreation