import useRedirectInvalidUser from '@/utils/auth';
import Link from 'next/link';

import { useState } from 'react';

export default function Settings() {
    const [isLoading, setIsLoading] = useState(false);

    // redirect invalid users
    const isUserLoggedIn = useRedirectInvalidUser();

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

    if (!isUserLoggedIn) return <p className="loaderText">Loading...</p>;

    return (
        <div className="settingPage">
            <Link href="/settings/edit-profile">Edit Informations</Link>
            <Link href="/settings">Submitting a request for a blue verification</Link>

            <button onClick={logoutHandler}>{isLoading ? 'Loading...' : 'Logout'}</button>
        </div>
    );
}
