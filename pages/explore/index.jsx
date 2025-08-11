import SearchInp from '@/components/elements/SearchInp';
import PostCard from '@/components/modules/PostCard';
import UserCard from '@/components/modules/UserCard';
import Posts from '@/models/Posts';
import { connectDb } from '@/utils/connectDb';
import { IoMdArrowRoundBack } from 'react-icons/io';

export default function Explore({ posts }) {
    console.log(posts);
    return (
        <>
            <div className="backBtn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ fontWeight: 900 }}>Explore</p>
            </div>

            <SearchInp />

            {/* posts */}
            <div style={{ marginTop: '30px' }}>
                {posts.length ? (
                    posts.map((i) => <PostCard key={i._id} {...i} />)
                ) : (
                    <p style={{ textAlign: 'center', opacity: '0.5', marginTop: '30px' }}>هیچ پستی یافت نشد</p>
                )}
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    await connectDb();

    try {
        const posts = await Posts.find();
        return {
            props: {
                posts: JSON.parse(JSON.stringify(posts)),
            },
        };
    } catch (err) {
        console.log(err);
        return { notFound: true };
    }
}
