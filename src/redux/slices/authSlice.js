import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const VITE_API_URL = import.meta.env.VITE_API_URL;

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
      let { data } = await axios.post(VITE_API_URL + '/api/auth/login', {
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
      return rejectWithValue(err);
    }
  }
);

export const successfulLogin = createAsyncThunk(
  'auth/successfulLogin',
  async (_, { getState }) => {
    return getState().auth;
  }
);

/**
 * tryToken takes no parameters, but it does pull token from localStorage
 * Once verified, the user info and token are placed in slice
 */
export const tryToken = createAsyncThunk(
  'tryToken',
  async (_, { rejectWithValue }) => {
    const NO_TOKEN = 'No token found in localStorage';
    const VALIDATION_FAILED = 'Token validation failed';

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error(NO_TOKEN);
      }

      const { data } = await axios.get(VITE_API_URL + '/api/auth', {
        headers: {
          authorization: token,
        },
      });

      if (!data) throw new Error(VALIDATION_FAILED);

      return { data, token };
    } catch (err) {
      if ([NO_TOKEN, VALIDATION_FAILED].includes(err?.message))
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
    resetAuthStatus: (state) => {
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

      /** requestLogin */
      .addCase(requestLogin.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.user = {};
        state.isLoading = false;
        state.error = '';
      })
      .addCase(requestLogin.pending, (state) => {
        state.token = '';
        state.user = {};
        state.isLoading = true;
        state.error = '';
      })
      .addCase(requestLogin.rejected, (state, action) => {
        state.token = '';
        state.user = {};
        state.isLoading = false;
        state.error = action.payload.response.data;
      })

      /** tryToken */
      .addCase(tryToken.fulfilled, (state, action) => {
        const payload = action?.payload;
        console.log(action);
        state.user = payload.data;
        state.isLoading = false;
        state.error = '';
        state.token = payload.token;
      })
      .addCase(tryToken.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(tryToken.rejected, (state, action) => {
        window.localStorage.removeItem('token');
        state.token = '';
        state.user = {};
        state.isLoading = false;
        state.error = action.payload;
      })

      // async check to make sure a user successfully logs in before redirecting
      .addCase(successfulLogin.fulfilled, (_, action) => {
        return action.payload;
      });
  },
});

export const { resetAuthStatus, logOut } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => {
  return { isLoading: state.auth.isLoading, error: state.auth.error };
};
export default authSlice.reducer;
