import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {TrackForm} from "../../types";

export const getTracksByAlbumId = createAsyncThunk(
  'tracks/get-by-album-id',
  async (albumId: string) => {
    const response = await axiosApi.get(`tracks?album=${albumId}`);
    return response.data ?? [];
  },
);

export const addTrack = createAsyncThunk('tracks/add-track', async (newTrack: TrackForm) => {
    await axiosApi.post(`/tracks`, newTrack)
});

export const trackPublish = createAsyncThunk('tracks/publish-track', async (id: string) => {
    await axiosApi.patch(`/tracks/${id}/togglePublished`)
})

export const deleteTrack = createAsyncThunk('tracks/delete-tracks', async (id: string) => {
    await axiosApi.delete(`/tracks/${id}`);
});