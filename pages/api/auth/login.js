import Users from '@/models/Users';
import { verifyPassword } from '@/utils/auth';
import { connectDBForAPI } from '@/utils/connectDb';
import { passwordRegex, usernameRegex } from '@/utils/regexes';
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method !== 'POST') return;
    await connectDBForAPI(res);

    // info validation
    const { username, password } = req.body;
    if (!username || !password || !usernameRegex.test(username) || !passwordRegex.test(password)) {
        return res.status(422).json({ status: 'failed', message: 'your information is not valid' });
    }

    // logged in validation
    const { token } = req.cookies;
    if (token) return res.status(400).json({ status: 'failed', message: 'you already logged in' });

    try {
        // existance validation
        const user = await Users.findOne({ username });
        if (!user) return res.status(404).json({ status: 'failed', message: 'This account is not exists' });

        // password validation
        const verifyedPassword = await verifyPassword(password, user.password);
        if (!verifyedPassword) return res.status(422).json({ status: 'failed', message: 'username or password is not correct' });

        // login
        const token = sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        const cookie = serialize('token', token, { path: '/', httpOnly: true, maxAge: 60 * 60 * 24 });
        return res.status(201).setHeader('Set-Cookie', cookie).json({ status: 'success', message: 'logged in successfully', token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'failed', message: 'something wrong with server' });
    }
}
