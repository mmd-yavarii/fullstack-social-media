import Posts from '@/models/Posts';
import { verifyToken } from '@/utils/auth';
import { connectDBForAPI } from '@/utils/connectDb';

export default async function handler(req, res) {
    if (req.method !== 'POST') return;
    await connectDBForAPI(req);

    // verify user's token
    const { token } = req.cookies;
    const verifyedToken = verifyToken(token);
    if (!verifyedToken) return res.status(401).json({ status: 'failef', message: 'شما دسترسی لازم را ندارید' });

    const { postId } = req.body;
    try {
        const thePost = await Posts.findById(postId);

        // verify user is post's owner
        if (thePost.author.toString() != verifyedToken._id.toString()) {
            return res.status(401).json({ status: 'failef', message: 'شما دسترسی لازم را ندارید' });
        }

        // delete post
        await Posts.deleteOne({ _id: postId });
        return res.status(200).json({ status: 'success', message: 'پست با موفقیت حذف شد' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'failef', message: 'خطا در اتصال به سرور' });
    }
}
