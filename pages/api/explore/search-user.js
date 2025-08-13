import Users from '@/models/Users';
import { connect_db_in_api } from '@/utils/auth';

export default async function handler(req, res) {
    if (req.method !== 'POST') return;

    // db connection
    const dbConnection = await connect_db_in_api(res);
    if (!dbConnection) return;

    // find username
    const { username } = req.body;
    if (!username) return res.status(400).json({ status: 'failed', message: 'Username is required', data: [] });

    const users = await Users.find({
        username: { $regex: new RegExp(username, 'i') },
    }).limit(5);

    res.status(200).json({ status: 'success', message: '', data: users });
}
