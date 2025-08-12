import Users from '@/models/Users';
import { connect_db_in_api, emailRegex, hashPassword, passwordRegex, usernameRegex, verifyToken } from '@/utils/auth';
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method !== 'POST') return;

    // db connection
    const dbConnection = await connect_db_in_api(res);
    if (!dbConnection) return;

    // user logged in verification
    const { token } = req.cookies;
    const verifiedUser = verifyToken(token);
    if (verifiedUser) return res.status(422).json({ status: 'failed', message: 'user already logged in' });

    // info validation
    const { username, password, email } = req.body;
    if (!username || !usernameRegex.test(username) || !email || !emailRegex.test(email) || !password || !passwordRegex.test(password)) {
        return res.status(422).json({ status: 'failed', message: 'information is not valid' });
    }

    // check user existance
    const foundUser = await Users.findOne({
        $or: [{ username: username }, { email: email }],
    });
    if (foundUser) {
        return res.status(422).json({ status: 'failed', message: 'user already exists' });
    }

    // sign up user
    const hashedPassword = await hashPassword(password);
    const imgNumber = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
    const user = await Users.create({ username, email, password: hashedPassword, image: `/profiles/${imgNumber}.webp` });

    // login
    const tokenPayload = {
        _id: user._id,
        username: user.username,
    };
    const newToken = sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '7d' });
    const cookie = serialize('token', newToken, { maxAge: 60 * 60 * 24 * 7, httpOnly: true, path: '/' });

    res.status(201).setHeader('Set-Cookie', cookie).json({ status: 'success', message: 'user created successfully' });
}
