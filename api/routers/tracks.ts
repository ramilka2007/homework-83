import express from "express";
import mongoose from "mongoose";
import Track from "../models/Track";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
    try {
        let albumId = req.query.album;
        let tracks;
        if (albumId) {
            tracks =  await Track.find({album: albumId}).populate('album').sort({number: 1});
        }
        return res.send(tracks);
    } catch (error) {
        return next(error);
    }
});

tracksRouter.post("/", auth, async (req: RequestWithUser, res, next) => {
    try {
        const trackData = {
            user: req.user,
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

tracksRouter.patch("/:id/togglePublished", auth, permit('admin'), async (req: RequestWithUser, res, next) => {
    try {

        if (!req.params.id) {
            res.status(400).send({"error": "Id items params must be in url"});
        }

        const track = await Track.findById(req.params.id);

        if (track) {
            if(track.isPublished === true) {
                await Track.findByIdAndUpdate(req.params.id, {isPublished: false})
            } else {
                await Track.findByIdAndUpdate(req.params.id, {isPublished: true})
            }
        }

        return res.send('Item was success updated');
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

tracksRouter.delete("/:id", auth, async (req: RequestWithUser, res, next) => {
    try {
        if (!req.params.id) {
            res.status(400).send({"error": "Id items params must be in url"});
        }

        const track = await Track.findById(req.params.id);

        if (track) {
            await Track.findByIdAndDelete(req.params.id);
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

export default tracksRouter;