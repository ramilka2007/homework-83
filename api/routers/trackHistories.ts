import {Router} from 'express';
import mongoose from "mongoose";
import TrackHistory from "../models/TrackHistory";
import User from "../models/User";
import Track from "../models/Track";

const trackHistoryRouter = Router();

trackHistoryRouter.post('/', async (req, res, next) => {

    try {
        const headerValue = req.get('Authorization');

        if (!headerValue) {
            return res.status(401).send({error: "Unauthorized"});
        }

        const [_bearer, token] = headerValue.split(' ');


        const user = await User.findOne({token});

        if(!user) {
            return res.status(401).send({error: 'Wrong token'})
        }


        const trackHistoryData = {
            user: user._id,
            track: req.body.track,
            datetime: new Date().toISOString(),
        };

        const trackHistory = new TrackHistory(trackHistoryData);
        await trackHistory.save();

        return res.send(trackHistory);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }

        return next(e);
    }
});

trackHistoryRouter.get('/', async (req, res, next) => {
    try {
        const headerValue = req.get('Authorization');

        if (!headerValue) {
            return res.status(401).send({error: "Header 'Authorization' present"});
        }

        const [_bearer, token] = headerValue.split(' ');

        const user = await User.findOne({token});

        if(!user) {
            return res.status(401).send({error: 'Wrong token'})
        }

        const trackId = req.query.track;
        let track;

        if (trackId) {
            track = await Track.findOne({ _id: trackId});
            if (!track) {
                return res.status(404).send({ error: 'Track not found' });
            }
        }

        let trackHistory;

        if (track) {
            trackHistory = await TrackHistory.find({ user: user._id, track: track._id });
        } else {
            trackHistory = await TrackHistory.find({ user: user._id })
                .populate( {
                    path: 'track',
                    populate: {
                        path: 'album',
                        model: 'Album',
                        populate: {
                            path: 'artist',
                            model: 'Artist',
                        }
                    }
                });
        }

        return res.send(trackHistory);

    } catch (e) {
        next(e);
    }
});

export default trackHistoryRouter