import PostList from '@/components/modules/PostList';
import EmptyPage from '@/components/templates/EmptyPage';
import Posts from '@/models/Posts';
import Users from '@/models/Users';
import { verifyToken } from '@/utils/auth';
import { useRouter } from 'next/router';

import { IoMdArrowRoundBack } from 'react-icons/io';

export default function SavedPosts({ bookmaredPosts }) {
    const router = useRouter();

    return (
        <>
            <div className="backBtn">
                <button onClick={() => router.back()}>
                    <IoMdArrowRoundBack size="1.5rem" />
                </button>
            </div>
            {bookmaredPosts.length ? <PostList posts={bookmaredPosts} /> : <EmptyPage />}
        </>
    );
}

export async function getServerSideProps(context) {
    const { token } = context.req.cookies;
    const verifyedToken = verifyToken(token);

    if (!verifyedToken) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };
    }

    try {
        const user = await Users.findById(verifyedToken._id);
        console.log(user);

        // if user is not that user who requested
        if (user._id.toString() !== verifyedToken._id.toString()) {
            return {
                redirect: {
                    destination: '/auth/login',
                    permanent: false,
                },
            };
        }

        const savedIds = user.savedPosts;
        const posts = await Posts.find({
            _id: { $in: savedIds },
        });

        return {
            props: {
                bookmaredPosts: JSON.parse(JSON.stringify(posts)),
            },
        };
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        };
    }
}
