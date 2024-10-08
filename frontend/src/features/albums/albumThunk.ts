import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Album, AlbumForm } from '../../types';

export const getAlbumsByArtist = createAsyncThunk(
  'albums/get-by-artist',
  async (artistId: string) => {
    const { data: albums } = await axiosApi.get(`/albums?artist=${artistId}`);
    return albums ?? [];
  },
);

export const getAlbumsById = createAsyncThunk(
  'albums/get-by-id',
  async (albumId: string) => {
    const { data: album } = await axiosApi.get(`/albums/${albumId}`);
    return album ?? null;
  },
);

export const addAlbum = createAsyncThunk<Album, Album>(
  'albums/add-new-album',
  async (newAlbum) => {
    const formData = new FormData();

    const keys = Object.keys(newAlbum) as (keyof AlbumForm)[];
    keys.forEach((key) => {
      const value = newAlbum[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/albums', formData);
  },
);

export const albumPublish = createAsyncThunk(
  'albums/publish-album',
  async (id: string) => {
    await axiosApi.patch(`/albums/${id}/togglePublished`);
  },
);

export const deleteAlbum = createAsyncThunk(
  'albums/delete-albums',
  async (id: string) => {
    await axiosApi.delete(`/albums/${id}`);
  },
);
