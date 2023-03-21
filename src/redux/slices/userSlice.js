import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const createNewUser = createAsyncThunk(
  'user/createNewUser',
  async (userSetupData, { rejectWithValue }) => {
    try {
      // create user
      let res = await axios.post(API_URL + '/api/user', userSetupData);
      let newUser = res.data;

      // login & store token
      res = await axios.post(API_URL + '/api/auth/login', {
        email: userSetupData.email,
        password: userSetupData.password,
      });
      localStorage.setItem('token', res.data.token);

      return newUser;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    status: '',
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.status = 'singleUserSuccess';
        state.error = '';
      })
      .addCase(createNewUser.pending, (state, { payload }) => {
        state.user = {};
        state.status = 'singleUserPending';
        state.error = '';
      })
      .addCase(createNewUser.rejected, (state, { payload }) => {
        state.user = {};
        state.status = 'singleUserFailed';
        state.error = payload;
      });
  },
});

export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;
export const {} = userSlice.actions;
export default userSlice.reducer;
