import express from "express";
import mongoose from "mongoose";
import Track from "../models/Track";

const tracksReducer = express.Router();

tracksReducer.post("/", async (req, res, next) => {
    try {
        const trackData = {
            album: req.body.album,
            title: req.body.title,
            duration: req.body.duration,
            number: req.body.number,
        }

        const track = new Track(trackData);
        await track.save();
        return res.send(track);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

tracksReducer.get('/', async (req, res, next) => {
    try {
        let albumId = req.query.album;
        let tracks;
        if (albumId) {
            tracks =  await Track.find({album: albumId}).populate('album').sort({number: 1});
        } else {
            tracks = await Track.find();
        }

        return res.send(tracks);
    } catch (error) {
        return next(error);
    }
});

export default tracksReducer;