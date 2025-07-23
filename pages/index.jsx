import HomePage from '@/components/templates/HomePage';
import Notif from '@/models/Notifs';
import Posts from '@/models/Posts';
import Users from '@/models/Users';
import { verifyToken } from '@/utils/auth';
import { connectDb } from '@/utils/connectDb';

export default function Home({ countNotifs, followingPosts }) {
    return <HomePage countNotifs={countNotifs} followingPosts={followingPosts} />;
}

export async function getServerSideProps(context) {
    const { token } = context.req.cookies;
    const verifyedToken = verifyToken(token);

    if (!verifyToken) {
        return {
            props: {
                countNotifs: 0,
                followingPosts: [],
            },
        };
    }

    try {
        await connectDb();

        const countNotifs = await Notif.countDocuments({ isRead: false, receiver: verifyedToken._id });
        const following = await Users.findOne({ _id: verifyedToken._id }, { _id: 0, following: 1 });
        const followingPosts = await Posts.find({ author: { $in: following.following } });

        return {
            props: {
                countNotifs,
                followingPosts: JSON.parse(JSON.stringify(followingPosts)),
            },
        };
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        };
    }
}
