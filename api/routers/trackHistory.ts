import { Router } from 'express';
import mongoose from 'mongoose';
import TrackHistory from '../models/TrackHistory';
import Track from '../models/Track';
import auth, { RequestWithUser } from '../middleware/auth';

const trackHistoryRouter = Router();

trackHistoryRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const trackId = req.query.track;
    let track;

    if (trackId) {
      track = await Track.findOne({ _id: trackId });
      if (!track) {
        return res.status(404).send({ error: 'Track not found' });
      }
    }

    let trackHistory;

    if (track) {
      trackHistory = await TrackHistory.find({
        user: req.user?._id,
        track: track._id,
      });
    } else {
      trackHistory = await TrackHistory.find({ user: req.user?._id })
        .populate({
          path: 'track',
          populate: {
            path: 'album',
            model: 'Album',
            populate: {
              path: 'artist',
              model: 'Artist',
            },
          },
        })
        .sort({ datetime: -1 });
    }

    return res.send(trackHistory);
  } catch (e) {
    next(e);
  }
});

trackHistoryRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const trackHistoryData = {
      user: req.user?._id,
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

export default trackHistoryRouter;
