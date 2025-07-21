import PostCard from './PostCard';

function PostList({ posts }) {
    return (
        <div>
            {posts.map((i) => (
                <PostCard key={i._id} {...i} />
            ))}
        </div>
    );
}

export default PostList;
