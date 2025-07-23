import Users from '@/models/Users';
import { verifyToken } from '@/utils/auth';
import { connectDBForAPI } from '@/utils/connectDb';

export default async function handler(req, res) {
    if (req.method !== 'POST') return;
    await connectDBForAPI(res);

    const { token } = req.cookies;
    const verifyedToken = verifyToken(token);
    if (!verifyedToken) return res.status(422).json({ status: 'failed', message: 'درخواست نا معتبر است' });

    const { followingId } = req.body;

    try {
        const followerInfo = await Users.findById(verifyedToken._id);
        const followingInfo = await Users.findById(followingId);

        if (!followerInfo || !followingInfo) {
            return res.status(404).json({ status: 'failed', message: 'کاربر پیدا نشد' });
        }

        // follow of unfollow logic
        if (followingInfo.followers.includes(verifyedToken._id)) {
            await Users.updateOne({ _id: verifyedToken._id }, { $pull: { following: followingId } });
            await Users.updateOne({ _id: followingId }, { $pull: { followers: verifyedToken._id } });
            return res.status(200).json({ status: 'success', message: `${followingInfo.username} فالو شد`, followers: followingInfo.followers });
        } else {
            await Users.updateOne({ _id: verifyedToken._id }, { $addToSet: { following: followingId } });
            await Users.updateOne({ _id: followingId }, { $addToSet: { followers: verifyedToken._id } });
            return res.status(200).json({ status: 'success', message: `${followingInfo.username} آنفالو شد`, followers: followingInfo.followers });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'failed', message: 'خطلا در برقراری ارتباط با سرور' });
    }
}
