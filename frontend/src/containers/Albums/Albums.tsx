import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectArtist,
  selectIsLoadingArtist,
} from '../../features/artists/artistsSlice';
import { getAlbumsByArtist } from '../../features/albums/albumThunk';
import { getArtistById } from '../../features/artists/artistsThunk';
import AlbumCard from '../../components/AlbumCard/AlbumCard';
import Spinner from '../../UI/Spinner/Spinner';
import {
  selectAlbums,
  selectIsLoadingAlbum,
} from '../../features/albums/albumSlice';
import { NavLink } from 'react-router-dom';

const Albums = () => {
  const dispatch = useAppDispatch();
  const params = new URLSearchParams(document.location.search);
  const albums = useAppSelector(selectAlbums);
  const artistOfAlbum = useAppSelector(selectArtist);
  const albumsLoading = useAppSelector(selectIsLoadingAlbum);
  const artistLoading = useAppSelector(selectIsLoadingArtist);

  useEffect(() => {
    let artistId = params.get('artist');

    if (artistId) {
      dispatch(getAlbumsByArtist(artistId));
      dispatch(getArtistById(artistId));
    }
  }, [dispatch]);

  return (
    <div className="container">
      {albumsLoading && artistLoading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="mb-2">
            Artist: {artistOfAlbum ? artistOfAlbum.name : 'Not found'}
          </h1>
          <NavLink to="/artists" className="fs-3">
            Go back to artists
          </NavLink>
          <hr />
          {albums.length === 0 ? (
            <p>No albums yet</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-around">
              {albums.map((album) => (
                <AlbumCard key={album._id} album={album} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Albums;
