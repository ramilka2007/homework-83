import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { LoadingButton } from '@mui/lab';
import FileInput from '../../UI/FileInput/FileInput';
import { ArtistForm } from '../../types';
import { addArtist, getArtists } from '../../features/artists/artistsThunk';
import { Grid } from '@mui/material';
import {useNavigate} from "react-router-dom";

const ArtistForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [newArtist, setNewArtist] = useState<ArtistForm>({
    name: '',
    information: '',
    image: null,
  });

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(addArtist(newArtist));
    navigate('/');
  };

  const changeForm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setNewArtist((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;
    console.log(newArtist.image);

    setNewArtist((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <form onSubmit={onFormSubmit} className="w-50 mx-auto">
        <h2 className="text-center my-4">Create new item card</h2>
        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="form-control"
            value={newArtist.name}
            onChange={changeForm}
          />
        </div>

        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="name" className="form-label">
            Information
          </label>
          <textarea
            name="information"
            id="information"
            required
            className="form-control"
            value={newArtist.information}
            onChange={changeForm}
          ></textarea>
        </div>

        <Grid item>
          <FileInput
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <LoadingButton type="submit" className="btn btn-primary">
          Create
        </LoadingButton>
      </form>
    </div>
  );
};

export default ArtistForm;
