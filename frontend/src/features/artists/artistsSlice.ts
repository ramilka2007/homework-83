import { createSlice } from '@reduxjs/toolkit';
import { Artist } from '../../types';
import { getArtistById, getArtists } from './artistsThunk';

interface artistsState {
  artists: Artist[];
  unpublishedArtists: Artist[];
  artist: Artist | null;
  isLoading: boolean;
  addLoading: boolean;
  isError: boolean;
}

const initialState: artistsState = {
  artists: [],
  unpublishedArtists: [],
  artist: null,
  isLoading: false,
  addLoading: false,
  isError: false,
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArtists.pending, (state) => {
        state.addLoading = true;
        state.isError = false;
      })
      .addCase(getArtists.fulfilled, (state, { payload: artists }) => {
        state.addLoading = false;
        state.artists = artists.filter((artist) => artist.isPublished === true);
        state.unpublishedArtists = artists.filter(
          (artist) => artist.isPublished === false,
        );
      })
      .addCase(getArtists.rejected, (state) => {
        state.addLoading = false;
        state.isError = true;
      });

    builder
      .addCase(getArtistById.pending, (state) => {
        state.addLoading = true;
        state.isError = false;
      })
      .addCase(getArtistById.fulfilled, (state, { payload: artist }) => {
        state.addLoading = false;
        state.artist = artist;
      })
      .addCase(getArtistById.rejected, (state) => {
        state.addLoading = false;
        state.isError = true;
      });
  },
  selectors: {
    selectArtists: (state) => state.artists,
    selectUnpublishedArtists: (state) => state.unpublishedArtists,
    selectArtist: (state) => state.artist,
    selectIsLoadingArtist: (state) => state.isLoading,
  },
});

export const artistsReducer = artistsSlice.reducer;

export const {
  selectArtists,
  selectArtist,
  selectUnpublishedArtists,
  selectIsLoadingArtist,
} = artistsSlice.selectors;
