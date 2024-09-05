import mongoose, {Schema, Types} from 'mongoose';
import User from "./User";
import Track from "./Track";

const TrackHistorySchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: 'User does not found',
        }
    },

    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const track = await Track.findById(value);
                return Boolean(track);
            },
            message: 'Track does not found',
        }
    },
    datetime: {
        type: Date,
        required: true,
    },

});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

export default TrackHistory;