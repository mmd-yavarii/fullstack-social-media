import ProfilePage from '@/components/templates/ProfilePage';
import Posts from '@/models/Posts';
import Users from '@/models/Users';
import { verifyToken } from '@/utils/auth';
import { connectDb } from '@/utils/connectDb';

export default function Profile({ userInfo, userPosts, followers, following }) {
    return <ProfilePage userInfo={userInfo} userPosts={userPosts} followers={followers} following={following} />;
}

// validate user and get it's info
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
        await connectDb();

        const user = await Users.findById(verifyedToken._id);
        const posts = await Posts.find({ author: user._id });
        const followers = await Users.find({ _id: { $in: user.followers } });
        const following = await Users.find({ _id: { $in: user.following } });

        return {
            props: {
                userInfo: JSON.parse(JSON.stringify(user)),
                userPosts: JSON.parse(JSON.stringify(posts)),
                followers: JSON.parse(JSON.stringify(followers)),
                following: JSON.parse(JSON.stringify(following)),
            },
        };
    } catch {
        return {
            notFound: true,
        };
    }
}
