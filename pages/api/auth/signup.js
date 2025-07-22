import Users from '@/models/Users';
import { hashPassword } from '@/utils/auth';
import { connectDBForAPI } from '@/utils/connectDb';
import { emailRegex, passwordRegex, usernameRegex } from '@/utils/regexes';
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method !== 'POST') return;
    await connectDBForAPI(res);

    // info validation
    const { username, email, password } = req.body;
    if (!username || !password || !email || !emailRegex.test(email) || !usernameRegex.test(username) || !passwordRegex.test(password)) {
        return res.status(422).json({ status: 'failed', message: 'اطلاعات وارد شده معتبر نیستند' });
    }

    // logged in validation
    const { token } = req.cookies;
    if (token) return res.status(400).json({ status: 'failed', message: 'شما قبلاً وارد شده‌اید' });

    try {
        // existance validation
        const userExistance = await Users.findOne({ email });
        const usernameExistance = await Users.findOne({ username });
        if (userExistance || usernameExistance) return res.status(422).json({ status: 'failed', message: 'حسابی با این اطلاعات از قبل وجود دارد' });

        // sign up
        const hashedPass = await hashPassword(password);
        const userImage = `/profiles/${Math.floor(Math.random() * 8) + 1}.webp`;

        const newUser = await Users.create({ username, email, password: hashedPass, image: userImage });

        // auto sign in
        const token = sign({ email, _id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        const cookie = serialize('token', token, { path: '/', httpOnly: true, maxAge: 60 * 60 * 24 });
        return res.status(201).setHeader('Set-Cookie', cookie).json({ status: 'success', message: 'حساب با موفقیت ساخته شد', token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'failed', message: 'مشکلی در سرور رخ داده است' });
    }
}
