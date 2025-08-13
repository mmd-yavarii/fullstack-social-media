import Notifs from '@/models/Notifs';
import Posts from '@/models/Posts';
import { connect_db_in_api, verifyToken } from '@/utils/auth';

export default async function handler(req, res) {
    if (req.method !== 'POST') return;

    // db connection
    const dbConnection = await connect_db_in_api(res);
    if (!dbConnection) return;

    // validation user
    const { token } = req.cookies;
    const verifiedUser = verifyToken(token);
    if (!verifiedUser) return res.status(422).json({ status: 'failed', message: 'user is not valid' });

    // post validation
    const { author, authorUsername, authorImg, content, taggedUsers } = req.body;
    if (!author || !authorUsername || !authorImg || !content) return res.status(422).json({ status: 'failed', message: 'data is not valid' });

    // save new post and send taged users a notif
    await Posts.create({ author, authorUsername, authorImg, content, taggedUsers });

    if (taggedUsers?.length) {
        await Notifs.insertMany(
            taggedUsers.map((i) => ({
                receiver: i,
                sender: verifiedUser._id,
                message: `${verifiedUser.username} tags you on its post`,
            }))
        );
    }

    res.status(201).json({ status: 'success', message: 'post created ssuccessfully' });
}
