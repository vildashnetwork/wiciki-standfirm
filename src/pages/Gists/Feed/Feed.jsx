
import FeedPost from "../FeedPost/FeedPost"
import "./Feed.css"
const Feed = ({ posts, onLoadMore, onLike, onComment }) => {
    return (
        <div>
            {posts.map(post => (
                <FeedPost
                    key={post.id}
                    post={post}
                    onLike={onLike}
                    onComment={onComment}
                />

            ))}
            <div className="load-more-container">
                <button className="load-more-btn" onClick={onLoadMore}>
                    Load More Posts
                </button>
            </div>
        </div>
    );
};
export default Feed