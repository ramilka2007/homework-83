import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export const getAlbumsByArtist = createAsyncThunk(
  'albums/get-by-artist',
  async (artistId: string) => {
    const { data: albums } = await axiosApi.get(`albums?artist=${artistId}`);
    return albums ?? [];
  },
);

export const getAlbumsById = createAsyncThunk(
  'albums/get-by-id',
  async (albumId: string) => {
    const { data: album } = await axiosApi.get(`albums/${albumId}`);
    return album ?? null;
  },
);
