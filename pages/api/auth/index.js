import { connectDBForAPI } from '@/utils/connectDb';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ status: 'failed', message: 'Method not allowed' });
    }

    await connectDBForAPI(res);

    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ status: 'failed', message: 'Unauthorized - no token provided' });
    }
    return res.status(200).json({ status: 'success', message: 'Authorized' });
}
