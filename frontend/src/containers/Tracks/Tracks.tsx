import { useEffect } from 'react';
import { getArtistById } from '../../features/artists/artistsThunk';
import { getTracksByAlbumId } from '../../features/tracks/tracksThunk';
import { getAlbumsById } from '../../features/albums/albumThunk';
import TrackCard from '../../components/TrackCard/TrackCard';
import Spinner from '../../UI/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectAlbum,
  selectIsLoadingAlbum,
} from '../../features/albums/albumSlice';
import {
  selectArtist,
  selectIsLoadingArtist,
} from '../../features/artists/artistsSlice';
import {
  selectIsLoadingTracks,
  selectTracks,
} from '../../features/tracks/tracksSlice';
import { NavLink } from 'react-router-dom';

const Tracks = () => {
  const dispatch = useAppDispatch();
  const params = new URLSearchParams(document.location.search);
  let albumId = params.get('album');
  let artistId = params.get('artist');

  const tracks = useAppSelector(selectTracks);
  const tracksLoading = useAppSelector(selectIsLoadingTracks);

  const artistOfAlbum = useAppSelector(selectArtist);
  const infoOfAlbum = useAppSelector(selectAlbum);
  const albumsLoading = useAppSelector(selectIsLoadingAlbum);
  const artistLoading = useAppSelector(selectIsLoadingArtist);

  useEffect(() => {
    if (albumId && artistId) {
      dispatch(getArtistById(artistId));
      dispatch(getTracksByAlbumId(albumId));
      dispatch(getAlbumsById(albumId));
    }
  }, [dispatch, albumId, artistId]);

  return (
    <div className="container">
      {tracksLoading && artistLoading && albumsLoading ? (
        <Spinner />
      ) : (
        <div className="cursor-card">
          <h1 className="mb-2">
            Artist: {artistOfAlbum ? artistOfAlbum.name : 'Not found'}
          </h1>
          <h3 className="opacity-75 mb-3">
            Album: {infoOfAlbum ? infoOfAlbum.title : 'Not found'}
          </h3>
          <NavLink to="/artists" className="fs-3">
            Go back to artists
          </NavLink>
          <hr />
          {tracks.length === 0 ? (
            <p>No tracks yet</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 justify-content-around">
              {tracks.map((track) => (
                <TrackCard key={track._id + 1} track={track} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tracks;
