import { createSlice } from '@reduxjs/toolkit';
import { getTracksByAlbumId } from './tracksThunk';
import { Track } from '../../types';

interface tracksState {
  tracks: Track[];
  unpublishedTracks: Track[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: tracksState = {
  tracks: [],
  unpublishedTracks: [],
  isLoading: false,
  isError: false,
};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTracksByAlbumId.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getTracksByAlbumId.fulfilled, (state, { payload: tracks }) => {
        state.tracks = tracks.filter((track) => track.isPublished === true);
        state.unpublishedTracks = tracks.filter(
          (track) => track.isPublished === false,
        );
        state.isLoading = false;
      })
      .addCase(getTracksByAlbumId.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
  selectors: {
    selectTracks: (state) => state.tracks,
    selectUnpublishedTracks: (state) => state.unpublishedTracks,
    selectIsLoadingTracks: (state) => state.isLoading,
  },
});

export const tracksReducer = tracksSlice.reducer;

export const { selectTracks, selectUnpublishedTracks, selectIsLoadingTracks } =
  tracksSlice.selectors;
