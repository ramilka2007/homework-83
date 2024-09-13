import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectArtists,
  selectIsLoadingArtist,
} from '../../features/artists/artistsSlice';
import Spinner from '../../UI/Spinner/Spinner';
import { getArtists } from '../../features/artists/artistsThunk';
import ArtistCard from '../../components/ArtistCard/ArtistCard';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const loading = useAppSelector(selectIsLoadingArtist);

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  return (
    <div className="container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {artists.length === 0 ? (
            <p>No artists yet</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 justify-content-around">
              {artists.map((artist) => (
                <ArtistCard key={artist._id} artist={artist} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Artists;
