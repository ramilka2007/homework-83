import {createSlice} from '@reduxjs/toolkit';
import {TrackHistory} from '../../types';
import {getTrackToHistory, postTrackToHistoryById} from "./trackHistoriesThunk";

interface tracksHistoryState {
    isLoading: boolean;
    isError: boolean;
    trackHistory: TrackHistory[];
}

const initialState: tracksHistoryState = {
    isLoading: false,
    isError: false,
    trackHistory: [],
};

const TracksHistorySlice = createSlice({
    name: 'track-history',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postTrackToHistoryById.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(postTrackToHistoryById.fulfilled, (state) => {
            state.isLoading = false;
        }).addCase(postTrackToHistoryById.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(getTrackToHistory.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(getTrackToHistory.fulfilled, (state, {payload: track}) => {
            state.trackHistory = track;
            state.isLoading = false;
        }).addCase(getTrackToHistory.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
});


export const TracksHistoryReducer = TracksHistorySlice.reducer;