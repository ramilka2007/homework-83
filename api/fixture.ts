import mongoose from 'mongoose';
import config from './config';

const run = async () => {
    await mongoose.connect(config.database);
    const db = mongoose.connection;

    try {
        await db.dropCollection('albums');
    } catch (e) {
        console.log('Skipping drop...');
    }

    await db.close();
};

run().catch(console.error);