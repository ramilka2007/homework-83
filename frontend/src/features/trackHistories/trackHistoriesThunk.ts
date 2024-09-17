import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {TrackHistory} from "../../types";

export const postTrackToHistoryById = createAsyncThunk(
  'tracks-history/post',
  async (id: string, { getState }) => {
    let token = getState().users?.user.token;
    if (token) {
        const track = await axiosApi.post(
            `/track-history`,
            { track: id },
            { headers: { Authorization: `Bearer ${token}` } },
        );
      return track.data
    }
  },
);

export const getTrackToHistory = createAsyncThunk<TrackHistory[]>(
  'tracks-history/get',
  async (_, { getState }) => {
    let token = getState().users?.user?.token;
    if (token) {
      const { data: track } = await axiosApi.get(`/track-history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return track ?? [];
    }
  },
);
