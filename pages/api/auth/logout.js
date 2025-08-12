import { connect_db_in_api } from '@/utils/auth';
import { serialize } from 'cookie';

export default async function handler(req, res) {
    if (req.method !== 'GET') return;

    // db connection
    const dbConnection = await connect_db_in_api(res);
    if (!dbConnection) return;

    const cookie = serialize('token', '', { maxAge: 0, path: '/', httpOnly: true });
    res.status(200).setHeader('Set-Cookie', cookie).json({ status: 'success', message: 'logged out successfully' });
}
