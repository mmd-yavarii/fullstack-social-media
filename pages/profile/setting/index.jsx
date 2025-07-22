import ProfileSettingPage from '@/components/templates/ProfileSettingPage';
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

    return {
        props: {},
    };
}
