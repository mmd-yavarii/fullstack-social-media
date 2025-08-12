import Users from '@/models/Users';
import { connect_db_in_api, hashedPassValid, passwordRegex, usernameRegex, verifyToken } from '@/utils/auth';
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
    const { username, password } = req.body;
    if (!username || !usernameRegex.test(username) || !password || !passwordRegex.test(password)) {
        return res.status(422).json({ status: 'failed', message: 'information is not valid' });
    }

    // check user existance and password validation
    const user = await Users.findOne({ username });
    if (!user) {
        return res.status(404).json({ status: 'failed', message: 'user with this info is not exists' });
    }
    const passwordValidation = await hashedPassValid(password, user.password);
    if (!passwordValidation) {
        return res.status(422).json({ status: 'failed', message: 'username or password is not valid' });
    }

    // login
    const tokenPayload = {
        _id: user._id,
        username: user.username,
    };
    const newToken = sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '7d' });
    const cookie = serialize('token', newToken, { maxAge: 60 * 60 * 24 * 7, httpOnly: true, path: '/' });

    res.status(200).setHeader('Set-Cookie', cookie).json({ status: 'success', message: 'Logged in successfully' });
}
