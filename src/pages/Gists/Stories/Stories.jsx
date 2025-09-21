   
   import "./Stories.css"
   const Stories = ({ stories, onAddStatus, onViewStatus }) => {
            return (
                <div className="card-story">
                    <div className="card-padding">
                        <div className="stories-container">
                            <div className="story-item" onClick={onAddStatus}>
                                <div className="story-card">
                                    <div className="story-avatar">
                                        <ion-icon name="person"></ion-icon>
                                    </div>
                                    <div className="story-add-btn">+</div>
                                </div>
                                <div className="story-name">Add Status</div>
                            </div>
                            {stories.map((story, index) => (
                                <div key={story.id} className="story-item" onClick={() => onViewStatus(index)}>
                                    <div className="story-ring">
                                        <div className="story-content">
                                            {story.type === 'image' && story.mediaUrl ? (
                                                <img 
                                                    src={story.mediaUrl} 
                                                    alt="Story" 
                                                    className="story-media"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                            ) : story.type === 'video' && story.mediaUrl ? (
                                                <video 
                                                    src={story.mediaUrl} 
                                                    className="story-media"
                                                    muted
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                            ) : null}
                                            <div style={{ 
                                                background: `linear-gradient(135deg, ${story.backgroundColor}, ${story.backgroundColor}aa)`,
                                                position: 'absolute',
                                                inset: '0',
                                                display: story.type === 'text' ? 'flex' : 'none',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontSize: '10px',
                                                textAlign: 'center',
                                                padding: '8px'
                                            }}>
                                                {story.content.substring(0, 30)}...
                                            </div>
                                            <div className="story-avatar">
                                                <span>{story.avatar}</span>
                                            </div>
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