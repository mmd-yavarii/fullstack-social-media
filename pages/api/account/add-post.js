import Posts from '@/models/Posts';
import Users from '@/models/Users';
import { verifyToken } from '@/utils/auth';
import { connectDBForAPI } from '@/utils/connectDb';

export default async function handler(req, res) {
    if (req.method !== 'POST') return;
    await connectDBForAPI(res);

    // verify foken
    const { token } = req.cookies;
    const verifyedToken = verifyToken(token);
    if (!verifyedToken) return res.status(401).json({ status: 'failed', message: 'شما دسترسی لازم را ندارید' });

    try {
        const user = await Users.findById(verifyedToken._id);

        const { content } = req.body;
        // content validation
        if (!content) return res.status(422).json({ status: 'failed', message: 'محتوای پست الزامی است' });

        // add post
        const payload = {
            content,
            author: user._id,
            authorusername: user.username,
            authorimage: user.image,
        };
        await Posts.create(payload);
        res.status(201).json({ status: 'success', message: 'پست با موفقیت ایجاد شد' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'failed', message: 'خطا در اتصال به سرور' });
    }
}
