import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi';
import {
  GlobalError,
  LoginMutation,
  RegisterMutation,
  User,
  ValidationError,
} from '../../types';

export const register = createAsyncThunk<
  User,
  RegisterMutation,
  { rejectValue: ValidationError }
>('users/register', async (registerMutation, { rejectWithValue }) => {
  try {
    const { data: user } = await axiosApi.post<User>(
      '/users',
      registerMutation,
    );
    return user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const login = createAsyncThunk<
  User,
  LoginMutation,
  { rejectValue: GlobalError }
>('users/login', async (loginMutation, { getState, rejectWithValue }) => {
  const token = getState().users.user.token;
  try {
    const { data: user } = await axiosApi.post<User>(
      '/users/sessions',
      loginMutation,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});
