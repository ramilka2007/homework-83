import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectArtist,
  selectIsLoadingArtist,
} from '../../features/artists/artistsSlice';
import {
  albumPublish,
  deleteAlbum,
  getAlbumsByArtist,
} from '../../features/albums/albumThunk';
import { getArtistById } from '../../features/artists/artistsThunk';
import AlbumCard from '../../components/AlbumCard/AlbumCard';
import Spinner from '../../UI/Spinner/Spinner';
import {
  selectAlbums,
  selectIsLoadingAlbum,
  selectUnpublishedAlbums,
} from '../../features/albums/albumSlice';
import { NavLink } from 'react-router-dom';
import { selectUser } from '../../features/users/usersSlice';

const Albums = () => {
  const dispatch = useAppDispatch();
  const params = new URLSearchParams(document.location.search);
  let artistId = params.get('artist');
  const albums = useAppSelector(selectAlbums);
  const unpublishedAlbums = useAppSelector(selectUnpublishedAlbums);
  const artistOfAlbum = useAppSelector(selectArtist);
  const albumsLoading = useAppSelector(selectIsLoadingAlbum);
  const user = useAppSelector(selectUser);
  const artistLoading = useAppSelector(selectIsLoadingArtist);

  useEffect(() => {
    if (artistId) {
      dispatch(getAlbumsByArtist(artistId));
      dispatch(getArtistById(artistId));
    }
  }, [dispatch]);

  const albumDeleter = async (id: string) => {
    try {
      if (artistId) {
        await dispatch(deleteAlbum(id));
        await dispatch(getAlbumsByArtist(artistId));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const publishAlbum = async (id: string) => {
    try {
      await dispatch(albumPublish(id));
      if (artistId) {
        await dispatch(getAlbumsByArtist(artistId));
        if (user.role === 'admin') {
          await dispatch(getAlbumsByArtist(artistId));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      {albumsLoading && artistLoading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="mb-2">
            Artist: {artistOfAlbum ? artistOfAlbum.name : 'Not found'}
          </h1>
          <NavLink to="/" className="fs-3">
            Go back to artists
          </NavLink>
          <hr />
          {albums.length === 0 ? (
            <p>No albums yet</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-around">
              {albums.map((album) => (
                <AlbumCard
                  key={album._id}
                  album={album}
                  albumDelete={albumDeleter}
                  albumPublish={publishAlbum}
                />
              ))}
            </div>
          )}
          {user ? (
            <h3>
              {user.role === 'admin'
                ? 'Unpublished albums:'
                : 'Your unpublished albums:'}
            </h3>
          ) : null}
          {user ? (
            <>
              {unpublishedAlbums.length > 0 ? (
                <>
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 gap-5">
                    <>
                      {unpublishedAlbums.map((album) => (
                        <>
                          {user._id === album.user || user.role === 'admin' ? (
                            <AlbumCard
                              key={album._id}
                              album={album}
                              albumDelete={albumDeleter}
                              albumPublish={publishAlbum}
                            />
                          ) : null}
                        </>
                      ))}
                    </>
                  </div>
                </>
              ) : null}
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Albums;
