import { connect_db_in_api, verifyToken } from '@/utils/auth';

export default async function handler(req, res) {
    if (req.method !== 'GET') return;

    // db connection
    const dbConnection = await connect_db_in_api(res);
    if (!dbConnection) return;

    // validation user's token
    const { token } = req.cookies;
    const verifiedUser = verifyToken(token);

    res.status(200).json({ status: 'success', message: 'verified successfuly', data: verifiedUser });
}
