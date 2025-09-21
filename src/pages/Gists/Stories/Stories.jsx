import { useState, useRef, useEffect } from "react";
import "./Stories.css";
import { useNavigate } from "react-router-dom";

const Stories = ({ stories, onViewStatus }) => {
    const [showLeftNav, setShowLeftNav] = useState(false);
    const [showRightNav, setShowRightNav] = useState(true);
    const storiesContainerRef = useRef(null);
    const navigate = useNavigate()
    // Check scroll position to show/hide navigation arrows
    const checkScrollPosition = () => {
        if (storiesContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = storiesContainerRef.current;
            setShowLeftNav(scrollLeft > 0);
            setShowRightNav(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    // Scroll stories left or right
    const scrollStories = (direction) => {
        if (storiesContainerRef.current) {
            const scrollAmount = 300;
            storiesContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const container = storiesContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            window.addEventListener('resize', checkScrollPosition);
            checkScrollPosition(); // Initial check
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScrollPosition);
            }
            window.removeEventListener('resize', checkScrollPosition);
        };
    }, [stories]);

    return (
        <div className="premium-stories-container">
            <div className="premium-story-cards">
                {showLeftNav && (
                    <div className="story-nav prev" onClick={() => scrollStories('left')}>
                        <ion-icon name="chevron-back"></ion-icon>
                    </div>
                )}

                <div className="stories-wrapper">


                    {/* Stories */}
                    <div className="stories-container-wrapper">

                        <div className="stories-container" ref={storiesContainerRef}>
                            {/* Add Status Card */}
                            <div className="add-status-card" onClick={() => navigate("/story-create")}>
                                <div className="add-status-content">
                                    <div className="add-status-icon">
                                        <ion-icon name="add"></ion-icon>
                                    </div>
                                    <div className="add-status-text">Add Status</div>
                                    <div className="add-status-plus">
                                        <ion-icon name="add"></ion-icon>
                                    </div>
                                </div>
                                <div className="story-username">Your Story</div>
                            </div>
                            {stories.map((story, index) => (
                                <div key={story.id} className="story-item" onClick={() => onViewStatus(index)}>
                                    <div className="story-content">
                                        <div className="story-gradient-ring"></div>
                                        <div className="story-media-container">
                                            {story.type === 'image' && story.mediaUrl ? (
                                                <img
                                                    src={story.mediaUrl}
                                                    alt="Story"
                                                    className="story-media"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            ) : story.type === 'video' && story.mediaUrl ? (
                                                <video
                                                    src={story.mediaUrl}
                                                    className="story-media"
                                                    muted
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            ) : null}

                                            {story.type === 'text' && (
                                                <div
                                                    className="text-story"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${story.backgroundColor}, ${story.backgroundColor}aa)`,
                                                    }}
                                                >
                                                    {story.content.substring(0, 30)}...
                                                </div>
                                            )}

                                            <div className="story-avatar">{story.avatar}</div>
                                            <div className="view-count">
                                                <ion-icon name="eye"></ion-icon> {story.views || 0}
                                            </div>
                                        </div>
                                        <div className="story-username">{story.name.split(' ')[0]}</div>
                                        <div className="story-time">{story.time || 'Just now'}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {showRightNav && (
                    <div className="story-nav next" onClick={() => scrollStories('right')}>
                        <ion-icon name="chevron-forward"></ion-icon>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stories;