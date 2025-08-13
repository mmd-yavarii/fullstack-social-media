import { verify } from 'jsonwebtoken';
import connectDb from './connectDb';
import { compare, hash } from 'bcryptjs';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// regexes
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^[A-Za-z\d!@#$%^&*()]{8,}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;

// verify user token
function verifyToken(token) {
    try {
        return verify(token, process.env.JWT_SECRET);
    } catch {
        return false;
    }
}

// connect db in api
async function connect_db_in_api(res) {
    try {
        await connectDb();
        return true;
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'failed', message: 'connection error' });
        return false;
    }
}

// hash user's password
async function hashPassword(password) {
    const result = await hash(password, 15);
    return result;
}

// hashed password validation
async function hashedPassValid(password, hashed) {
    const result = await compare(password, hashed);
    return result;
}

// cutom hook for redirect invalid uers
export default function useRedirectInvalidUser() {
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

    return loggedInUser;
}

export { verifyToken, emailRegex, passwordRegex, usernameRegex, connect_db_in_api, hashPassword, hashedPassValid };
