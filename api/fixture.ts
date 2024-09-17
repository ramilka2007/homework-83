import mongoose from 'mongoose';
import config from './config';
import User from './models/User';

const run = async () => {
    await mongoose.connect(config.database);
    const db = mongoose.connection;

    try {
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
        await db.dropCollection('track-history');
    } catch (e) {
        console.log('Skipping drop...');
    }

    const user = new User({
        username: 'user',
        password: '1qaz@WSX',
    });
    user.generateToken();
    await user.save();

    await db.close();
};

run().catch(console.error);