import LoginPage from '@/components/templates/LoginPage';
import { verifyToken } from '@/utils/auth';

export default function Signup() {
    return <LoginPage isLoading={false} submitHandler={(form) => console.log(form)} />;
}

export async function getServerSideProps(context) {
    const { token } = context.req.cookies;
    const verifiedUser = verifyToken(token);

    if (verifiedUser) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}
