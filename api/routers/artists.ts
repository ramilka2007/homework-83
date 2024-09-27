import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Album from "../models/Album";
import Track from "../models/Track";

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
    try {
        const artists = await Artist.find();
        return res.send(artists);
    } catch (error) {
        return next(error);
    }
});

artistsRouter.get('/:id', async (req, res, next) => {
    try {
        if (!req.params.id) {
            res.status(400).send({"error": "Id params must be in url"});
        }

        const artist = await Artist.findById(req.params.id);
        return res.send(artist);
    } catch (e) {
        next(e);
    }
});

artistsRouter.post("/", auth, permit('admin'), imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
    try {
        const artistData = {
            user: req.user?._id,
            name: req.body.name,
            image: req.file ? req.file.filename : null,
            information: req.body.information,
        }

        const artist = new Artist(artistData);
        await artist.save();
        return res.send(artist);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

artistsRouter.delete("/:id", auth, permit('admin'), async (req: RequestWithUser, res, next) => {
    try {
        if (!req.params.id) {
            res.status(400).send({"error": "Id items params must be in url"});
        }

        const artist = await Artist.findById(req.params.id);

        if (artist) {
            await Artist.findByIdAndDelete(req.params.id);

            const albums = await Album.find({artist: req.params.id});

            for (const album of albums) {
                const tracks = await Track.find({album: (await album)._id})

                for (const track of tracks) {
                    await Track.findByIdAndDelete((await track)._id)
                }

                await Album.findByIdAndDelete((await album)._id)
            }
            return res.send('Item was success deleted');
        }

        return res.send('Item was not deleted')
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

export default artistsRouter;