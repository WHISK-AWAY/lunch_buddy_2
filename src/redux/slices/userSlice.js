import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const createNewUser = createAsyncThunk(
  'user/createNewUser',
  async (userSetupData, { rejectWithValue }) => {
    try {
      // create user
      let res = await axios.post(API_URL + '/api/user', userSetupData);
      let newUser = res.data;

      if (!newUser) throw new Error('User creation failed');

      // login & store token
      res = await axios.post(API_URL + '/api/auth/login', {
        email: userSetupData.email,
        password: userSetupData.password,
      });
      if (!res.data?.token) throw new Error('Login failed');
      localStorage.setItem('token', res.data.token);

      return newUser;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userUpdateData, { rejectWithValue }) => {
    try {
      console.log('userUpdateData', userUpdateData);
      // pull token from localStorage & use it to poll for user info
      const token = window.localStorage.getItem('token');
      if (!token) throw new Error('No token found in localStorage');

      let res = await axios.get(API_URL + '/api/auth', {
        headers: { authorization: token },
      });
      const user = res.data;

      if (!user) throw new Error('Failed token validation');

      // request update
      res = await axios.put(API_URL + `/api/user/${user.id}`, userUpdateData, {
        headers: { authorization: token },
      });
      const updatedUser = res.data;

      if (!updatedUser.id) throw new Error('Failed to update user');

      return updatedUser;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    error: '',
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(createNewUser.pending, (state, { payload }) => {
        state.user = {};
        state.isLoading = true;
        state.error = '';
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.user = {};
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(updateUser.pending, (state, { payload }) => {
        state.user = {};
        state.isLoading = true;
        state.error = '';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.user = {};
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;
export const {} = userSlice.actions;
export default userSlice.reducer;
