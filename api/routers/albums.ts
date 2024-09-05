import express from "express";
import {imagesUpload} from "../multer";
import Album from "../models/Album";
import mongoose from "mongoose";

const albumsReducer = express.Router();

albumsReducer.post("/", imagesUpload.single('image'), async (req, res, next) => {
    try {
        const albumData = {
            title: req.body.title,
            artist: req.body.artist,
            image: req.file ? req.file.filename : null,
            release: req.body.release,
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

albumsReducer.get('/', async (req, res, next) => {
    try {
        const artistId = req.query.artist;
        let albums;

        if (artistId) {
            albums =  await Album.find({artist: artistId}).populate('artist');
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
})

export default albumsReducer;