import Posts from '@/models/Posts';
import { verifyToken } from '@/utils/auth';
import { connectDBForAPI } from '@/utils/connectDb';

export default async function handler(req, res) {
    if (req.method !== 'PATCH') return;
    await connectDBForAPI(req);

    // verify user's token
    const { token } = req.cookies;
    const verifyedToken = verifyToken(token);
    if (!verifyedToken) return res.status(401).json({ status: 'failef', message: 'شما دسترسی لازم را ندارید' });

    const { postId, newContent } = req.body;
    try {
        const thePost = await Posts.findById(postId);

        // verify user is post's owner
        if (thePost.author.toString() != verifyedToken._id.toString()) {
            return res.status(401).json({ status: 'failef', message: 'شما دسترسی لازم را ندارید' });
        }

        // edit post
        await Posts.updateOne({ _id: postId }, { $set: { content: newContent } });
        return res.status(200).json({ status: 'success', message: 'تغیرات با موفقیت اعمال شد', newContent });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'failef', message: 'خطا در اتصال به سرور' });
    }
}
