import OtheUsersPage from '@/components/templates/OtheUsersPage';
import Posts from '@/models/Posts';
import Users from '@/models/Users';
import { verifyToken } from '@/utils/auth';

export default function UserPage({ userInfo, usersPosts }) {
    return <OtheUsersPage userInfo={userInfo} usersPosts={usersPosts} />;
}

// get user info
export async function getServerSideProps(context) {
    const { username } = context.params;
    const { token } = context.req.cookies;
    const verifyedToken = verifyToken(token);

    try {
        const userInfo = await Users.findOne({ username });
        const usersPosts = await Posts.find({ author: userInfo._id });

        if (verifyedToken._id == userInfo._id) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                userInfo: JSON.parse(JSON.stringify(userInfo)),
                usersPosts: JSON.parse(JSON.stringify(usersPosts)),
            },
        };
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        };
    }
}
