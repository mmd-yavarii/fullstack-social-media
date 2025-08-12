import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Settings() {
    const [isLoading, setIsLoading] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/auth')
            .then((res) => res.json())
            .then((res) => {
                if (!res?.data) {
                    router.replace('/auth/login');
                } else {
                    setLoggedInUser(res.data);
                }
            })
            .catch(() => router.replace('/auth/login'));
    }, [router]);

    return <div></div>;
}
