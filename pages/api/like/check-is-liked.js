import Posts from '@/models/Posts';
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
        const { postId } = req.body;
        const post = await Posts.findOne({ _id: postId });

        if (!post) {
            return res.status(404).json({ status: 'failed', message: 'پست یافت نشد' });
        }

        const isLiked = post.likes.some((id) => id.toString() === verifyedToken._id.toString());

        return res.status(200).json({ status: 'success', isLiked });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'failed', message: 'خطا در سرور' });
    }
}
