import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ArtistForm } from '../../types';

export const getArtists = createAsyncThunk('artists/get-all', async () => {
  const { data: artists } = await axiosApi.get(`/artists`);
  return artists ?? [];
});

export const getArtistById = createAsyncThunk(
  'artists/get-by-id',
  async (id: string) => {
    const { data: artist } = await axiosApi.get(`/artists/${id}`);
    return artist ?? null;
  },
);

export const addArtist = createAsyncThunk(
  'artists/add-new-artist',
  async (newArtist) => {
    const formData = new FormData();

    const keys = Object.keys(newArtist) as (keyof ArtistForm)[];
    keys.forEach((key) => {
      const value = newArtist[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/artists', formData);
  },
);

export const artistPublish = createAsyncThunk(
  'artists/publish-artist',
  async (id: string) => {
    await axiosApi.patch(`/artists/${id}/togglePublished`);
  },
);

export const deleteArtist = createAsyncThunk(
  'artists/delete-artists',
  async (id: string) => {
    await axiosApi.delete(`/artists/${id}`);
  },
);
