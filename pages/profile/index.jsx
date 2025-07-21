import ProfilePage from '@/components/templates/ProfilePage';
import Posts from '@/models/Posts';
import Users from '@/models/Users';
import { verifyToken } from '@/utils/auth';

export default function Profile({ userInfo, uerPosts }) {
    return <ProfilePage userInfo={userInfo} uerPosts={uerPosts} />;
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

        // if user is not that user who requested
        if (user._id.toString() !== verifyedToken._id.toString()) {
            return {
                redirect: {
                    destination: '/auth/login',
                    permanent: false,
                },
            };
        }

        return {
            props: {
                userInfo: JSON.parse(JSON.stringify(user)),
                uerPosts: JSON.parse(JSON.stringify(posts)),
            },
        };
    } catch {
        return {
            notFound: true,
        };
    }
}
