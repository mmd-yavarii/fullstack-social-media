import Users from '@/models/Users';
import { verifyToken } from '@/utils/auth';
import { connectDBForAPI } from '@/utils/connectDb';

export default async function handler(req, res) {
    if (req.method !== 'POST') return;
    await connectDBForAPI(res);

    // logged in validation
    const { token } = req.cookies;
    const verifyedToken = verifyToken(token);
    if (!verifyedToken) {
        return res.status(401).json({ status: 'failed', message: 'دسترسی غیرمجاز' });
    }

    try {
        // check is bookmark logic
        const { postId } = req.body;
        const userPosts = await Users.findOne({ _id: verifyedToken._id }, { savedPosts: 1, _id: 0 });
        const result = userPosts.savedPosts.includes(postId);
        return res.status(200).json({ status: 'success', isBookmarked: result });
    } catch (error) {
        console.log(error);
        return res.status(422).json({ status: 'failed', message: 'درخواست معتبر نیست' });
    }
}
