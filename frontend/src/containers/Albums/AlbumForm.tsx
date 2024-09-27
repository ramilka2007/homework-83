import React, { useEffect, useState } from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import { LoadingButton } from '@mui/lab';
import FileInput from "../../UI/FileInput/FileInput";
import {addAlbum} from "../../features/albums/albumThunk";
import {AlbumForm} from "../../types";
import {getArtists} from "../../features/artists/artistsThunk";
import {selectArtists} from "../../features/artists/artistsSlice";
import {Alert} from "@mui/material";

const AlbumForm = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const [error, setError] = useState(false);
  const [newAlbum, setNewItem] = useState<AlbumForm>({
    artist: '',
    image: null,
    title: '',
    release: ''
  });

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(addAlbum(newAlbum))
  };

  const changeForm = (
      e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
  ) => {
    setNewItem((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;
    console.log(newAlbum.image)

    setNewItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  return artists.length > 0 ? (
      <div className="container">
        {error ? <Alert severity="error">Release - only year; Choose the artist</Alert> : null}
        <form onSubmit={onFormSubmit} className="w-50 mx-auto">
          <h2 className="text-center my-4">Create new item card</h2>
          <div className="mb-3 w-75 mx-auto">
            <label htmlFor="name" className="form-label">
              Title
            </label>
            <input
                type="text"
                name="title"
                id="title"
                required
                className="form-control"
                value={newAlbum.title}
                onChange={changeForm}
            />
          </div>

          <div className="mb-3 w-75 mx-auto">
            <label htmlFor="name" className="form-label">
              Release (only year)
            </label>
            <input
                type="text"
                name="release"
                id="release"
                required
                className="form-control"
                value={newAlbum.release}
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
                  value={newAlbum.artist}
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

          <div className="mb-3 w-75 mx-auto">
            <FileInput
                onChange={fileInputChangeHandler}
                name="image"
                label="Image"
            />
          </div>

          <LoadingButton
              type="submit"
              className="btn btn-primary"
          >
            Create
          </LoadingButton>
        </form>
      </div>
  ) : <Alert severity="error">You should post artists!</Alert>;
};

export default AlbumForm;
