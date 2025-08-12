import { verify } from 'jsonwebtoken';

function verifyToken(token) {
    try {
        return (verified = verify(token, process.JWT_SECRET));
    } catch {
        return false;
    }
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^[A-Za-z\d!@#$%^&*()]{8,}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;

export { verifyToken, emailRegex, passwordRegex, usernameRegex };
