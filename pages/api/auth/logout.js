import Users from '@/models/Users';
import { verifyToken } from '@/utils/auth';
import { connectDBForAPI } from '@/utils/connectDb';
import { serialize } from 'cookie';

export default async function handler(req, res) {
    if (req.method !== 'GET') return;
    await connectDBForAPI(res);

    // logged in validation
    const { token } = req.cookies;
    const verifyedToken = verifyToken(token);
    if (!verifyedToken) return res.status(422).json({ status: 'failed', message: 'درخواست معتبر نیست' });

    try {
        // validation youser to access for logout
        const user = await Users.findOne({ _id: verifyedToken._id }, { email: 1 });
        if (!user) return res.status(422).json({ status: 'failed', message: 'کاربر پیدا نشد' });

        if (user._id.toString() !== verifyedToken._id.toString()) return res.status(422).json({ status: 'failed', message: 'درخواست معتبر نیست' });

        // log out logic
        const cookie = serialize('token', '', {
            path: '/',
            httpOnly: true,
            maxAge: 0,
        });
        res.status(200).setHeader('Set-Cookie', cookie).json({ status: 'success', message: 'خروج از حساب با موفقیت انجام شد' });
    } catch (error) {
        console.log(error);
        return res.status(422).json({ status: 'failed', message: 'درخواست معتبر نیست' });
    }
}
