import SignupPage from '@/components/templates/SignupPage';
import { verifyToken } from '@/utils/auth';

export default function SignUp() {
    return <SignupPage />;
}

// user validation for access this page
export async function getServerSideProps(context) {
    const { token } = context.req.cookies;

    if (token) {
        const verifiedToken = verifyToken(token);
        if (verifiedToken) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }
    }

    return {
        props: {},
    };
}
