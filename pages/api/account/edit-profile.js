import Users from '@/models/Users';
import { hashPassword, verifyPassword, verifyToken } from '@/utils/auth';
import { connectDBForAPI } from '@/utils/connectDb';
import { emailRegex, passwordRegex } from '@/utils/regexes';

export default async function handler(req, res) {
    if (req.method !== 'PATCH') return;
    await connectDBForAPI(res);

    // verify foken
    const { token } = req.cookies;
    const verifyedToken = verifyToken(token);
    if (!verifyedToken) return res.status(401).json({ status: 'failed', message: 'unauthorize' });

    try {
        const user = await Users.findById(verifyedToken._id);

        const { bio, fullName, email, currentPassword, newPassword } = req.body;
        const payload = { bio, fullName, email };

        // email validation
        if (!emailRegex.test(email)) return res.status(422).json({ status: 'failed', message: 'email is not valid' });

        // password validation if exists
        if (newPassword && newPassword.length) {
            const hashCurrentPass = await verifyPassword(currentPassword, user.password);
            if (!currentPassword.length || !passwordRegex.test(currentPassword) || !hashCurrentPass) {
                return res.status(422).json({ status: 'failed', message: 'current password is not valid' });
            }
            const hashNewPassword = await hashPassword(newPassword);
            payload['password'] = hashNewPassword;
        }

        // set edits
        await Users.updateOne({ _id: user._id }, { $set: { ...payload } });
        res.status(200).json({ status: 'success', message: 'profile edited successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'failed', message: 'connection error' });
    }
}
