import Notifs from '@/models/Notifs';
import { verifyToken } from '@/utils/auth';
import { connectDBForAPI } from '@/utils/connectDb';

export default async function handler(req, res) {
    if (req.method !== 'GET') return;
    await connectDBForAPI(res);

    const { token } = req.cookies;
    const verifyedToken = verifyToken(token);
    if (!verifyedToken) return res.status(422).json({ status: 'failed', message: 'کاربر مجازنیست' });

    try {
        await Notifs.updateMany({ receiver: verifyedToken._id }, { $set: { isRead: true } });
        res.status(200).json({ status: 'success', message: '' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'failed', message: 'خطلا در برقراری ارتباط با سرور' });
    }
}
