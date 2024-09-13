import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi';


export const getArtists = createAsyncThunk(
    'artists/get-all',
    async () => {
        const {data: artists} = await axiosApi.get(`artists` );
        return artists ?? [];
    });

export const getArtistById = createAsyncThunk(
    'artists/get-by-id',
    async (id: string) => {
        const {data: artist} = await axiosApi.get(`artists/${id}` );
        return artist ?? null;
    });