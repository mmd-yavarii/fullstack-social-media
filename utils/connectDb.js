import { connect, connections } from 'mongoose';

export default async function connectDb() {
    if (connections[0].readyState) {
        return;
    }
    await connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('\ndb connected successfully ✅\n');
}
