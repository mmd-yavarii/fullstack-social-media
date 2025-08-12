import SignupPage from '@/components/templates/SignupPage';
import { verifyToken } from '@/utils/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Signup() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // sign up handler
    async function signupHandler(form) {
        setIsLoading(true);
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        alert(result.message);

        if (response.ok) {
            window.location.replace('/');
        }
        setIsLoading(false);
    }

    return <SignupPage isLoading={isLoading} submitHandler={signupHandler} />;
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
