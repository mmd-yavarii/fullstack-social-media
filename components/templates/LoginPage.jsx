import LoaderBtn from '@/components/elements/LoaderBtn';
import { useState } from 'react';

import styles from './Form.module.css';
import Link from 'next/link';

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { passwordRegex, usernameRegex } from '@/utils/auth';

function LoginPage({ isLoading, submitHandler }) {
    const [isVisablePassword, setIsVisablePassword] = useState(false);

    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    return (
        <div className={styles.container}>
            <div className={styles.label}>
                <p>Login</p>
                <p>Login your account and enjoy sharing your thoughts.</p>
            </div>

            <div className={styles.form}>
                <input
                    type="text"
                    placeholder="username"
                    className={usernameRegex.test(form.username) ? styles.validIn : styles.inValidInp}
                    value={form.username}
                    onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
                />

                <div className={`${styles.passwords} ${passwordRegex.test(form.password) ? styles.validIn : styles.inValidInp}`}>
                    <input
                        type={isVisablePassword ? 'text' : 'password'}
                        placeholder="password"
                        value={form.password}
                        onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                    />
                    <span onClick={() => setIsVisablePassword((prev) => !prev)}>{isVisablePassword ? <FaRegEyeSlash /> : <FaRegEye />}</span>
                </div>

                <LoaderBtn content="Login" onclickHandler={() => submitHandler(form)} isLoading={isLoading} />

                <Link href="/auth/signup">Create have an account</Link>
            </div>
        </div>
    );
}

export default LoginPage;
