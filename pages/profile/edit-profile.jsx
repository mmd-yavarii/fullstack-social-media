import EditProfile from '@/components/templates/EditProfile';
import Users from '@/models/Users';
import { verifyToken } from '@/utils/auth';
import { connectDb } from '@/utils/connectDb';

export default function EdirProfile({ userInfo }) {
    return <EditProfile userInfo={userInfo} />;
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

        return {
            props: {
                userInfo: JSON.parse(JSON.stringify(user)),
            },
        };
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        };
    }
}
