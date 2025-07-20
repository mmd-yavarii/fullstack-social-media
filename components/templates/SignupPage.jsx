import { useEffect, useState } from 'react';

import styles from './login_signin.module.css';

import Link from 'next/link';
import { emailRegex, passwordRegex, usernameRegex } from '@/utils/regexes';

import { PulseLoader } from 'react-spinners';
import { useRouter } from 'next/router';

function SignupPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // vaalidation forms with regex
    const [usernameValidation, setUsernameValidation] = useState(false);
    const [emailValidation, setEmailValidation] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(false);
    useEffect(() => setUsernameValidation(usernameRegex.test(username)), [username]);
    useEffect(() => setEmailValidation(emailRegex.test(email)), [email]);
    useEffect(() => setPasswordValidation(passwordRegex.test(password)), [password]);

    // sign in handler
    async function signInHandler(event) {
        event.preventDefault();
        if (isLoading) return;

        if (password !== rePassword || !usernameValidation || !passwordValidation || !emailValidation) {
            alert('Please fill in inputs carefully');
            return;
        }

        setIsLoading(true);
        const responsse = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
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
                <p>Signup</p>
                <span>Join us and express yourself freely</span>
            </div>

            <form onSubmit={signInHandler}>
                <input
                    type="text"
                    className={usernameValidation ? 'validInp' : 'invalidInp'}
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="text"
                    className={emailValidation ? 'validInp' : 'invalidInp'}
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

                <input
                    type="test"
                    className={password === rePassword ? 'validInp' : 'invalidInp'}
                    placeholder="Enter password again"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                />

                <button type="submit">{isLoading ? <PulseLoader size="0.5rem" color="#fff" /> : 'Sign Up'}</button>

                <Link href="/auth/login"> Already have account</Link>
            </form>
        </div>
    );
}

export default SignupPage;
