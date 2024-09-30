import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectArtists,
  selectIsLoadingArtist, selectUnpublishedArtists,
} from '../../features/artists/artistsSlice';
import Spinner from '../../UI/Spinner/Spinner';
import {
  artistPublish,
  deleteArtist,
  getArtists,
  getUnpublishedArtists
} from '../../features/artists/artistsThunk';
import ArtistCard from '../../components/ArtistCard/ArtistCard';
import {selectUser} from "../../features/users/usersSlice";

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const unpublishedArtists = useAppSelector(selectUnpublishedArtists);
  const loading = useAppSelector(selectIsLoadingArtist);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(getArtists());
    if (user) {
        dispatch(getUnpublishedArtists())
    }
  }, [dispatch]);

  const artistDeleter = async (id: string) => {
    try {
      await dispatch(deleteArtist(id));
      await dispatch(getArtists());
      if (user) {
          await dispatch(getUnpublishedArtists())
      }
    } catch (e) {
      console.log(e);
    }
  }

  const publishArtist = async (id: string) => {
    await dispatch(artistPublish(id))
    await dispatch(getArtists());
    if (user.role === 'admin') {
      await dispatch(getUnpublishedArtists())
    }
  }

  return (
    <div className="container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {artists.length === 0 ? (
            <p>No artists yet</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 justify-content-around mb-5">
              {artists.map((artist) => (
                <ArtistCard key={artist._id} artist={artist} artistDelete={artistDeleter} artistPublish={publishArtist}/>
              ))}
            </div>
          )}
          {unpublishedArtists.length > 0 ? (
              <>
                <h3>Unpublished artists:</h3>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 gap-5">
                  <>
                    {unpublishedArtists.map((artist) => (
                        <ArtistCard key={artist._id} artist={artist} artistDelete={artistDeleter}
                                    artistPublish={publishArtist}/>
                    ))}
                  </>
                </div>
              </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Artists;
