import LoaderBtn from '@/components/elements/LoaderBtn';
import { useState } from 'react';

import styles from './Form.module.css';
import Link from 'next/link';

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { emailRegex, passwordRegex, usernameRegex } from '@/utils/auth';

function SignupPage({ isLoading, submitHandler }) {
    const [isVisablePassword, setIsVisablePassword] = useState(false);
    const [isVisableRePassword, setIsVisableRePassword] = useState(false);

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        rePassword: '',
    });

    return (
        <div className={styles.container}>
            <div className={styles.label}>
                <p>Signup</p>
                <p>If you don’t have an account yet, create one and enjoy sharing your thoughts.</p>
            </div>

            <div className={styles.form}>
                <input
                    type="text"
                    placeholder="username"
                    className={usernameRegex.test(form.username) ? styles.validIn : styles.inValidInp}
                    value={form.username}
                    onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
                />

                <input
                    type="text"
                    placeholder="email"
                    className={emailRegex.test(form.email) ? styles.validIn : styles.inValidInp}
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
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

                <div className={`${styles.passwords} ${form.password == form.rePassword ? styles.validIn : styles.inValidInp}`}>
                    <input
                        type={isVisableRePassword ? 'text' : 'password'}
                        placeholder="re password"
                        value={form.rePassword}
                        onChange={(e) => setForm((prev) => ({ ...prev, rePassword: e.target.value }))}
                    />
                    <span onClick={() => setIsVisableRePassword((prev) => !prev)}>{isVisableRePassword ? <FaRegEyeSlash /> : <FaRegEye />}</span>
                </div>

                <LoaderBtn content="Sign up" onclickHandler={() => submitHandler(form)} isLoading={isLoading} />

                <Link href="/auth/login">I already have an account</Link>
            </div>
        </div>
    );
}

export default SignupPage;
