import ProfilePage from '@/components/templates/ProfilePage';
import Posts from '@/models/Posts';
import Users from '@/models/Users';
import { verifyToken } from '@/utils/auth';

export default function Profile({ userInfo, userPosts }) {
    return <ProfilePage userInfo={userInfo} userPosts={userPosts} />;
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
        const user = await Users.findById(verifyedToken._id);
        const posts = await Posts.find({ author: user._id });

        return {
            props: {
                userInfo: JSON.parse(JSON.stringify(user)),
                userPosts: JSON.parse(JSON.stringify(posts)),
            },
        };
    } catch {
        return {
            notFound: true,
        };
    }
}
