import LoginPage from '@/components/templates/LoginPage';
import { verifyToken } from '@/utils/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Signup() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // login handler
    async function loginHandler(form) {
        setIsLoading(true);
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        alert(result.message);

        if (response.ok) {
            router.replace('/');
        }
        setIsLoading(false);
    }

    return <LoginPage isLoading={isLoading} submitHandler={loginHandler} />;
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
