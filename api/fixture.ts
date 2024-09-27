import mongoose from 'mongoose';
import config from './config';
import User from './models/User';

const run = async () => {
    await mongoose.connect(config.database);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
        await db.dropCollection('track-history');
    } catch (e) {
        console.log('Skipping drop...');
    }

    await User.create({
        username: 'user@shop.local',
        password: '1qaz@WSX',
        role: 'user',
        token: crypto.randomUUID(),
    }, {
        username: 'admin@shop.local',
        password: '1@345qWert',
        role: 'admin',
        token: crypto.randomUUID(),
    });

    await db.close();
};

run().catch(console.error);