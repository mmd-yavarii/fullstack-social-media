import Users from '@/models/Users';
import { verifyToken } from '@/utils/auth';
import { connectDBForAPI } from '@/utils/connectDb';

export default async function handler(req, res) {
    if (req.method !== 'POST') return;
    await connectDBForAPI(res);

    const { searchValue } = req.body;
    if (!searchValue || !searchValue.trim().length) return;

    try {
        // logged in validation
        const { token } = req.cookies;
        const verifyedToken = verifyToken(token);

        const users = await Users.find({
            username: { $regex: searchValue, $options: 'i' },
            _id: { $ne: verifyedToken._id },
        }).limit(10);
        res.status(200).json({ status: 'success', message: 'data fetched successfully', data: users });
    } catch (error) {
        console.log(error);
        return res.status(422).json({ status: 'failed', message: 'درخواست معتبر نیست' });
    }
}
