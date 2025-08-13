import Users from '@/models/Users';
import { connect_db_in_api } from '@/utils/auth';

export default async function handler(req, res) {
    if (req.method !== 'POST') return;

    try {
        // db connection
        const dbConnection = await connect_db_in_api(res);
        if (!dbConnection) return;

        const { username, idList } = req.body;
        let users = [];

        if (username) {
            users = await Users.find({
                username: { $regex: new RegExp(username, 'i') },
            }).limit(5);
        } else if (idList && Array.isArray(idList)) {
            users = await Users.find({ _id: { $in: idList } });
        } else {
            return res.status(400).json({ status: 'failed', message: 'No search parameter provided' });
        }

        res.status(200).json({ status: 'success', message: '', data: users });
    } catch (err) {
        console.error('Error in search user API:', err);
        res.status(500).json({ status: 'failed', message: 'Internal server error' });
    }
}
