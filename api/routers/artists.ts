import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";

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

artistsRouter.post("/", imagesUpload.single('image'), async (req, res, next) => {
    try {
        const artistData = {
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

export default artistsRouter;