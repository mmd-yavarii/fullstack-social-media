import HomePage from '@/components/templates/HomePage';
import Notif from '@/models/Notifs';
import Posts from '@/models/Posts';
import Users from '@/models/Users';
import { verifyToken } from '@/utils/auth';
import { connectDb } from '@/utils/connectDb';

export default function Home({ countNotifs, followingPosts, user }) {
    return <HomePage countNotifs={countNotifs} followingPosts={followingPosts} user={user} />;
}

export async function getServerSideProps(context) {
    const { token } = context.req.cookies;
    const verifyedToken = verifyToken(token);

    if (!verifyedToken) {
        return {
            props: {
                countNotifs: 0,
                followingPosts: [],
                user: { image: '/profiles/default-profile.jpg' },
            },
        };
    }

    try {
        await connectDb();

        const countNotifs = await Notif.countDocuments({ isRead: false, receiver: verifyedToken._id });
        const user = await Users.findOne({ _id: verifyedToken._id }, { image: 1, following: 1 });
        const followingPosts = await Posts.find({ author: { $in: user.following } });
        // const followingStories =

        return {
            props: {
                countNotifs,
                followingPosts: JSON.parse(JSON.stringify(followingPosts)),
                user: JSON.parse(JSON.stringify(user)),
            },
        };
    } catch (error) {
        console.log(error);
        return {
            props: {},
        };
    }
}
