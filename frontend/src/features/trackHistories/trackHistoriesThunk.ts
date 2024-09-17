import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi';

export const postTrackToHistoryById = createAsyncThunk(
    'track-history/post',
    async (id: string, {getState}) => {
        let token = getState().users?.user.token
        if (token) {
           return  await axiosApi.post(`track-history`,{track: id}, {headers: {'Authorization': token}} );
        }
    });

export const getTrackToHistory = createAsyncThunk(
    'track-history/get',
    async (_arg, {getState}) => {
        let token = getState().users?.user?.token ;
        if (token) {
            const {data: track} = await axiosApi.get(`track-history`, {headers: {'Authorization': token}} );
            return track ?? [];
        }
    });