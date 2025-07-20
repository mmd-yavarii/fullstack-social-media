import { useEffect, useState } from 'react';

import { PulseLoader } from 'react-spinners';

import styles from './login_signin.module.css';
import Link from 'next/link';
import { passwordRegex, usernameRegex } from '@/utils/regexes';
import { useRouter } from 'next/router';

function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // vaalidation forms with regex
    const [usernameValidation, setUsernameValidation] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(false);
    useEffect(() => setUsernameValidation(usernameRegex.test(username)), [username]);
    useEffect(() => setPasswordValidation(passwordRegex.test(password)), [password]);

    // sign in handler
    async function logInHandler(event) {
        event.preventDefault();
        if (isLoading) return;

        if (!usernameValidation || !passwordValidation) {
            alert('Please fill in inputs carefully');
            return;
        }

        setIsLoading(true);
        const responsse = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await responsse.json();
        alert(result.message);
        if (responsse.ok) router.replace('/');
        setIsLoading(false);
    }

    return (
        <div className={styles.container}>
            <div>
                <p>Login</p>
                <span>Enter your account and enjoy your life</span>
            </div>

            <form onSubmit={logInHandler}>
                <input
                    type="text"
                    className={usernameValidation ? 'validInp' : 'invalidInp'}
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="test"
                    className={passwordValidation ? 'validInp' : 'invalidInp'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type={'submit'}>{isLoading ? <PulseLoader size="0.5rem" color="#fff" /> : 'Login'}</button>

                <Link href="/auth/signup">Create account</Link>
            </form>
        </div>
    );
}

export default LoginPage;
