import OtherUsersPage from '@/components/templates/OtherUsersPage';
import Posts from '@/models/Posts';
import Users from '@/models/Users';
import { verifyToken } from '@/utils/auth';

export default function UserPage({ userInfo, usersPosts, followerId }) {
    return <OtherUsersPage userInfo={userInfo} usersPosts={usersPosts} followerId={followerId} />;
}

// get user info
export async function getServerSideProps(context) {
    const { username } = context.params;
    const { token } = context.req.cookies;
    const verifyedToken = verifyToken(token);

    try {
        const userInfo = await Users.findOne({ username });
        const usersPosts = await Posts.find({ author: userInfo._id });
        const followerId = await Users.findOne({ _id: verifyedToken._id }, { _id: 1 });

        if (verifyedToken._id == userInfo._id) {
            return {
                notFound: true,
            };
        }
        return {
            props: {
                userInfo: JSON.parse(JSON.stringify(userInfo)),
                usersPosts: JSON.parse(JSON.stringify(usersPosts)),
                followerId: JSON.parse(JSON.stringify(followerId._id)),
            },
        };
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        };
    }
}
