import { createSlice } from '@reduxjs/toolkit';
import { Album } from '../../types';
import { getAlbumsByArtist, getAlbumsById } from './albumThunk';

interface albumsState {
  albums: Album[];
  unpublishedAlbums: Album[];
  album: Album | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: albumsState = {
  albums: [],
  unpublishedAlbums: [],
  album: null,
  isLoading: false,
  isError: false,
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAlbumsByArtist.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.albums = [];
        state.album = null;
      })
      .addCase(getAlbumsByArtist.fulfilled, (state, { payload: albums }) => {
        state.albums = albums.filter((album) => album.isPublished === true);
        state.unpublishedAlbums = albums.filter(
          (album) => album.isPublished === false,
        );
      })
      .addCase(getAlbumsByArtist.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
        state.albums = [];
      });

    builder
      .addCase(getAlbumsById.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.album = null;
      })
      .addCase(getAlbumsById.fulfilled, (state, { payload: album }) => {
        state.album = album;
      })
      .addCase(getAlbumsById.rejected, (state) => {
        state.isError = true;
        state.album = null;
      });
  },
  selectors: {
    selectAlbums: (state) => state.albums,
    selectAlbum: (state) => state.album,
    selectUnpublishedAlbums: (state) => state.unpublishedAlbums,
    selectIsLoadingAlbum: (state) => state.isLoading,
  },
});

export const albumsReducer = albumsSlice.reducer;

export const {
  selectAlbums,
  selectIsLoadingAlbum,
  selectUnpublishedAlbums,
  selectAlbum,
} = albumsSlice.selectors;
