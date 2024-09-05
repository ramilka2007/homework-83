import express from 'express';
import cors from 'cors';
import config from './config';
import mongoose from 'mongoose';
import artistsReducer from "./routers/artists";
import albumsReducer from "./routers/albums";
import tracksReducer from "./routers/tracks";
import usersRouter from "./routers/users";
import trackHistoryRouter from "./routers/trackHistories";

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/artists', artistsReducer);
app.use('/albums', albumsReducer);
app.use('/tracks', tracksReducer);
app.use('/users', usersRouter);
app.use('/track-history', trackHistoryRouter);

const run = async () => {
    await mongoose.connect(config.database);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);