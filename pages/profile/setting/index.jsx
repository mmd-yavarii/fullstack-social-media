import ProfileSettingPage from '@/components/templates/ProfileSettingPage';
import Users from '@/models/Users';
import { verifyToken } from '@/utils/auth';

export default function Settings({ userInfo }) {
    return <ProfileSettingPage userInfo={userInfo} />;
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
            props: {},
        };
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        };
    }
}
