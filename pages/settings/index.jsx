import Link from 'next/link';
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

    // logout handler
    async function logoutHandler() {
        const confirmation = confirm('Are you sure ?');
        if (!confirmation) return;

        setIsLoading(true);
        const response = await fetch('/api/auth/logout');
        const ressult = await response.json();
        alert(ressult.message);
        if (response.ok) {
            window.location.replace('/');
        }
        setIsLoading(false);
    }

    return (
        <div className="settingPage">
            <Link href="/settings/edit-profile">Edit Informations</Link>
            <button onClick={logoutHandler}>{isLoading ? 'Loading...' : 'Logout'}</button>
        </div>
    );
}
