
import FeedPostme from "./Post";

const MyFeed = ({ posts, onLoadMore, onLike, onComment }) => {
    return (
        <div>
            {posts.map(post => (
                <FeedPostme
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
export default MyFeed