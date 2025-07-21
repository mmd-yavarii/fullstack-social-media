export default async function handler(req, res) {
    console.log(`\n${req.body}\n`);
    res.status(200).json({ name: 'mmd' });
}
