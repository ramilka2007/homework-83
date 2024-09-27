import React from 'react';
import { Track } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';
import { postTrackToHistoryById } from '../../features/trackHistories/tracksHistoryThunk';

interface Props {
  track: Track;
}

const TrackCard: React.FC<Props> = ({ track }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const clickHandler = async (id: string) => {
    if (user) {
      try {
        await dispatch(postTrackToHistoryById(id));
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="col mb-2" onClick={() => clickHandler(track._id)}>
      <div className="d-flex align-items-center border border-black mb-2 rounded-4 text-black text-decoration-none p-3">
        <div className="text-start">
          <h5>
            #{track.number} - {track.title}
          </h5>
          <p className="opacity-75 text-end mb-0">Duration: {track.duration}</p>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
