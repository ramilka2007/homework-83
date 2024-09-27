import express from "express";
import {imagesUpload} from "../multer";
import Album from "../models/Album";
import mongoose from "mongoose";
import permit from "../middleware/permit";
import auth, {RequestWithUser} from "../middleware/auth";
import Track from "../models/Track";

const albumsReducer = express.Router();

albumsReducer.get('/', async (req, res, next) => {
    try {
        const artistId = req.query.artist;
        let albums;

        if (artistId) {
            albums =  await Album.find({artist: artistId}).populate('artist').sort({release: -1});
        } else {
            albums = await Album.find().populate('artist', 'name');
        }

        return res.send(albums);
    } catch (error) {
        return next(error);
    }
});

albumsReducer.get('/:id', async (req, res, next) => {
    try {
        const album = await Album.findById(req.params.id);

        if (album === null) {
            return res.status(404).send({ error: 'Product not found' });
        }

        return res.send(album);
    } catch (error) {
        return next(error);
    }
});

albumsReducer.post("/", auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
    try {
        const albumData = {
            user: req.user?._id,
            title: req.body.title,
            artist: req.body.artist,
            image: req.file ? req.file.filename : null,
            release: parseFloat(req.body.release),
        }

        const album = new Album(albumData);
        await album.save();
        return res.send(album);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

albumsReducer.delete("/:id", auth, permit('admin'), async (req: RequestWithUser, res, next) => {
    try {
        if (!req.params.id) {
            res.status(400).send({"error": "Id items params must be in url"});
        }

        const album = await Album.findById(req.params.id);

        if (album) {
            await Album.findByIdAndDelete(req.params.id);
            await Track.findByIdAndDelete({album: req.params.id})
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

export default albumsReducer;