import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * requestLogin accepts an object { email, password } which is used to
 * log the user in.
 *
 * The returned token is placed in both localStorage and the redux slice.
 */
export const requestLogin = createAsyncThunk(
  'auth/requestLogin',
  async (credentials, { rejectWithValue }) => {
    try {
      const { email, password } = credentials;
      let { data } = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });

      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      } else {
        throw new Error('Failed token creation');
      }
    } catch (err) {
      console.error('error in requestLogin');
      return rejectWithValue(err.message);
    }
  }
);

/**
 * tryToken takes no parameters, but it does pull token from localStorage
 * Once verified, the user info and token are placed in slice
 */
export const tryToken = createAsyncThunk(
  'tryToken',
  async (placeholder, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) throw new Error('no token in localstorage');

      const { data } = await axios.get(`http://localhost:3000/api/auth`, {
        headers: {
          authorization: token,
        },
      });
      if (data) {
        return { data, token };
      } else {
        throw new Error('Failed token validation');
      }
    } catch (err) {
      console.error('error in tryToken');
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    user: {},
    isLoading: false,
    error: '',
  },
  reducers: {
    resetStatus: (state) => {
      state.isLoading = false;
      state.error = '';
    },
    logOut: (state) => {
      localStorage.removeItem('token');
      state.token = '';
      state.user = {};
      state.isLoading = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestLogin.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.user = {};
        state.isLoading = false;
        state.error = '';
      })
      .addCase(requestLogin.pending, (state, { payload }) => {
        state.token = '';
        state.user = {};
        state.isLoading = true;
        state.error = '';
      })
      .addCase(requestLogin.rejected, (state, { payload }) => {
        state.token = '';
        state.user = {};
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(tryToken.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.isLoading = false;
        state.error = '';
        state.token = payload.token;
      })
      .addCase(tryToken.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(tryToken.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.message || 'token failure';
      });
  },
});

export const { testAuth } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export const selectAuthStatus = (state) => {
  return { isLoading: state.auth.isLoading, error: state.auth.error };
};
export default authSlice.reducer;
