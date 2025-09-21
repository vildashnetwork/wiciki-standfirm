
import "./Stories.css"
const Stories = ({ stories, onAddStatus, onViewStatus }) => {
    return (
        <div className="card-story">
            {/* Add Status Card */}
            <div className="story-item" onClick={onAddStatus}>
                <div className="story-card square">
                    <div className="story-avatar">
                        <ion-icon name="person"></ion-icon>
                    </div>
                    <div className="story-add-btn">+</div>
                </div>
                <div className="story-name">Add Status</div>
            </div>

            {/* Stories */}
            <div className="stories-container-wrapper">
                <div className="stories-container">
                    {stories.map((story, index) => (
                        <div key={story.id} className="story-item" onClick={() => onViewStatus(index)}>
                            <div className="story-ring square">
                                <div className="story-content square">
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
                                            className="text-story-overlay"
                                            style={{
                                                background: `linear-gradient(135deg, ${story.backgroundColor}, ${story.backgroundColor}aa)`,
                                            }}
                                        >
                                            {story.content.substring(0, 30)}...
                                        </div>
                                    )}

                                    <div className="story-avatar">{story.avatar}</div>
                                </div>
                            </div>
                            <div className="story-name">{story.name.split(' ')[0]}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    );
};
export default Stories