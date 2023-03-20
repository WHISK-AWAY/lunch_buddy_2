import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    auth: {},
  },
  reducers: {
    testAuth: (state) => {
      // delete me
      state.token = 'test';
    },
  },
  extraReducers: (builder) => {},
});

export const { testAuth } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
