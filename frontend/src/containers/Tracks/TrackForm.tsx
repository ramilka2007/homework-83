import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { LoadingButton } from '@mui/lab';
import { getAlbumsByArtist} from '../../features/albums/albumThunk';
import {TrackForm} from '../../types';
import { getArtists } from '../../features/artists/artistsThunk';
import { selectArtists } from '../../features/artists/artistsSlice';
import { Alert } from '@mui/material';
import {useNavigate} from "react-router-dom";
import {selectAlbums} from "../../features/albums/albumSlice";
import {addTrack} from "../../features/tracks/tracksThunk";

const TrackForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const albums = useAppSelector(selectAlbums);
  const [newTrack, setNewItem] = useState<TrackForm>({
    artist: '',
    album: '',
    title: '',
    duration: '',
    number: 0,
  });

  useEffect(() => {
    dispatch(getArtists());

    if(newTrack.artist !== '') {
      dispatch(getAlbumsByArtist(newTrack.artist))
    }
  }, [dispatch, newTrack.artist]);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(addTrack(newTrack));
    navigate('/')
  };

  const changeForm = async (
      e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
  ) => {
    setNewItem((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return artists.length > 0 ? (
      <div className="container">
        <form onSubmit={onFormSubmit} className="w-50 mx-auto">
          <h2 className="text-center my-4">Create new item card</h2>
          <div className="mb-3 w-75 mx-auto">
            <label htmlFor="name" className="form-label">
              Title:
            </label>
            <input
                type="text"
                name="title"
                id="title"
                required
                className="form-control"
                value={newTrack.title}
                onChange={changeForm}
            />
          </div>

          <div className="mb-3 w-75 mx-auto">
            <label htmlFor="name" className="form-label">
              Duration of the track:
            </label>
            <input
                type="text"
                name="duration"
                id="duration"
                required
                className="form-control"
                value={newTrack.duration}
                onChange={changeForm}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category">
              <span>Artists:</span>
              <select
                  className="form-control"
                  name="artist"
                  onChange={changeForm}
                  value={newTrack.artist}
                  required
              >
                <option value={''}>Choose one artist:</option>
                {artists.map((artist) => (
                    <option key={artist._id} value={artist._id}>
                      {artist.name}
                    </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mb-3">
            <label htmlFor="category">
              <span>Albums:</span>
              <select
                  className="form-control"
                  name="album"
                  onChange={changeForm}
                  value={newTrack.album}
                  required
              >
                <option value={''}>Choose one album:</option>
                {albums.map((album) => (
                    <option key={album._id} value={album._id}>
                      {album.title}
                    </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mb-3 w-75 mx-auto">
            <label htmlFor="name" className="form-label">
              Number:
            </label>
            <input
                type="number"
                name="number"
                id="number"
                required
                min={1}
                className="form-control"
                value={newTrack.number}
                onChange={changeForm}
            />
          </div>
          <LoadingButton type="submit" className="btn btn-primary">
            Create
          </LoadingButton>
        </form>
      </div>
  ) : (
      <Alert severity="error">You should post artists!</Alert>
  );
};

export default TrackForm;
