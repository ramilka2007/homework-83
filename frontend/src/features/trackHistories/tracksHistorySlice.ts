import { createSlice } from '@reduxjs/toolkit';
import { TrackHistory } from '../../types';
import {
  getTrackToHistory,
  postTrackToHistoryById,
} from './tracksHistoryThunk';

interface tracksHistoryState {
  trackHistory: TrackHistory[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: tracksHistoryState = {
  trackHistory: [],
  isLoading: false,
  isError: false,
};

const tracksHistorySlice = createSlice({
  name: 'tracks-history',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      postTrackToHistoryById.pending,
      (state: tracksHistoryState) => {
        state.isLoading = true;
        state.isError = false;
      },
    );
    builder.addCase(
      postTrackToHistoryById.fulfilled,
      (state: tracksHistoryState) => {
        state.isLoading = false;
      },
    );
    builder.addCase(
      postTrackToHistoryById.rejected,
      (state: tracksHistoryState) => {
        state.isLoading = false;
        state.isError = true;
      },
    );
    builder.addCase(getTrackToHistory.pending, (state: tracksHistoryState) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(
      getTrackToHistory.fulfilled,
      (state: tracksHistoryState, { payload: tracks }) => {
        state.trackHistory = tracks;
        state.isLoading = false;
      },
    );
    builder.addCase(getTrackToHistory.rejected, (state: tracksHistoryState) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const tracksHistoryReducer = tracksHistorySlice.reducer;
