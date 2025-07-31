import Notifs from '@/models/Notifs';
import Posts from '@/models/Posts';
import { verifyToken } from '@/utils/auth';
import { connectDBForAPI } from '@/utils/connectDb';

export default async function handler(req, res) {
    if (req.method !== 'POST') return;
    await connectDBForAPI(res);

    // logged in validation
    const { token } = req.cookies;
    const verifyedToken = verifyToken(token);
    if (!verifyedToken) return res.status(422).json({ status: 'failed', message: 'درخواست معتبر نیست' });

    const { postId } = req.body;
    try {
        const post = await Posts.findById(postId);
        const isUserLikedPost = post.likes.find((i) => i.toString() == verifyedToken._id.toString());

        if (!isUserLikedPost) {
            await Posts.updateOne({ _id: postId }, { $addToSet: { likes: verifyedToken._id } });
            await Notifs.create({
                sender: verifyedToken._id,
                receiver: post.author,
                type: 'like',
                message: ` پست شما را لایک کرد`,
            });
            res.status(200).json({ status: 'liked', message: 'پست لایک شد' });
        } else {
            await Posts.updateOne({ _id: postId }, { $pull: { likes: verifyedToken._id } });
            res.status(200).json({ status: 'unliked', message: 'لایک پست حذف شد' });
        }
    } catch (error) {
        console.log(error);
        return res.status(422).json({ status: 'failed', message: 'درخواست معتبر نیست' });
    }
}
