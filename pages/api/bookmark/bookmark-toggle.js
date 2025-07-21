import Users from '@/models/Users';
import { verifyToken } from '@/utils/auth';
import { connectDBForAPI } from '@/utils/connectDb';

export default async function handler(req, res) {
    if (req.method !== 'POST') return;
    await connectDBForAPI(res);

    // logged in validation
    const { token } = req.cookies;
    const verifyedToken = verifyToken(token);
    if (!verifyedToken) return res.status(422).json({ status: 'failed', message: 'request is not valid' });

    try {
        // validation youser to access for logout
        const user = await Users.findOne({ _id: verifyedToken._id }, { email: 1 });
        if (!user) return res.status(422).json({ status: 'failed', message: 'user not found' });

        if (user._id.toString() !== verifyedToken._id.toString()) return res.status(422).json({ status: 'failed', message: 'request is not valid' });

        // bookmark logic
        const { isBookmark, postId } = req.body;
        if (isBookmark == false) {
            await Users.updateOne({ _id: verifyedToken._id }, { $push: { savedPosts: postId } });
            return res.status(200).json({ status: 'success', message: 'Post bookmarked', user });
        } else {
            await Users.updateOne({ _id: verifyedToken._id }, { $pull: { savedPosts: postId, user } });
            return res.status(200).json({ status: 'success', message: 'Post removed from bookmarks' });
        }
    } catch (error) {
        console.log(error);
        return res.status(422).json({ status: 'failed', message: 'request is not valid' });
    }
}
