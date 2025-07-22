import { useEffect, useState } from 'react';

import styles from './login_signin.module.css';

import Link from 'next/link';
import { emailRegex, passwordRegex, usernameRegex } from '@/utils/regexes';

import { useRouter } from 'next/router';
import BtnLoader from '../elements/BtnLoader';
import { useAlert } from '../modules/AlertProvider';

function SignupPage() {
    const showAlert = useAlert();
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
            showAlert('failed', 'اینپوت ها را به دقت پر کنید');
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
        showAlert(result.status, result.message);
        if (responsse.ok) router.replace('/profile');
        setIsLoading(false);
    }

    return (
        <div className={styles.container}>
            <div>
                <p>ایجاد حساب کاربری</p>
                <span>به ما بپیوند و از اشتراک‌گذاری ایده‌هات لذت ببر</span>
            </div>

            <form onSubmit={signInHandler}>
                <input
                    type="text"
                    className={usernameValidation ? 'validInp' : 'invalidInp'}
                    placeholder="نام کاربری خود را وارد کنید"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="text"
                    className={emailValidation ? 'validInp' : 'invalidInp'}
                    placeholder="ایمیل خود را وارد کنید"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="test"
                    className={passwordValidation ? 'validInp' : 'invalidInp'}
                    placeholder="کلمه عبور خود را وارد کنید"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <input
                    type="test"
                    className={password === rePassword ? 'validInp' : 'invalidInp'}
                    placeholder="کلمه عبور خود را مجدد وارد کنید"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                />

                <BtnLoader type="submit" isLoading={isLoading} content="ایجاد حساب" />

                <Link href="/auth/login">حساب ایجاد شده دارم</Link>
            </form>
        </div>
    );
}

export default SignupPage;
