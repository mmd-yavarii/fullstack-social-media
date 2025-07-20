import mongoose from 'mongoose';

// connect to database
export async function connectDb() {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGO_URI);

    console.log('\n✅ mongodb connected\n');
}

// connect to database in api routes
export async function connectDBForAPI(res) {
    try {
        await connectDb();
    } catch (error) {
        console.log(`\n❌ error in db connection : ${error}\n`);
        res.status(500).json({ status: 'failed', message: 'error in connecting to database' });
    }
}
