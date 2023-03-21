import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * requestLogin accepts an object { email, password } which is used to
 * log the user in.
 *
 * The returned token is placed in localStorage as well as the slice.
 */
export const requestLogin = createAsyncThunk(
  'auth/requestLogin',
  async (credentials, { rejectWithValue }) => {
    try {
      const { email, password } = credentials;
      let { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * tryToken takes no parameters, but it does pull token from localStorage
 * Once verified, the user info and token are placed in slice
 */
export const tryToken = createAsyncThunk(
  'attemptTokenLogin',
  async (placeholder, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) return {};

      const { data } = await axios.get(`/api/auth`, {
        headers: {
          authorization: token,
        },
      });

      return { data, token };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    user: {},
    status: '',
    error: '',
  },
  reducers: {
    resetStatus: (state) => {
      state.status = '';
      state.error = '';
    },
    logOut: (state) => {
      localStorage.removeItem('token');
      state.token = '';
      state.user = {};
      state.status = '';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestLogin.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.user = {};
        state.status = 'loginSuccessful';
        state.error = '';
      })
      .addCase(requestLogin.pending, (state, { payload }) => {
        state.token = '';
        state.user = {};
        state.status = 'pendingLogin';
        state.error = '';
      })
      .addCase(requestLogin.rejected, (state, { payload }) => {
        state.token = '';
        state.user = {};
        state.status = 'loginFailed';
        state.error = payload;
      })
      .addCase(tryToken.fulfilled, (state, { payload }) => {
        state.user = payload.data || {};
        state.status = 'loginSuccessful';
        state.error = '';
        state.token = payload.token;
      })
      .addCase(tryToken.pending, (state, { payload }) => {
        state.status = 'pendingLogin';
        state.error = '';
      })
      .addCase(tryToken.rejected, (state, { payload }) => {
        state.status = 'loginFailed';
        state.error = payload.message;
      });
  },
});

export const { testAuth } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
