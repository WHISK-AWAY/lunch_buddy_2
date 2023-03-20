import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    user: {},
  },
  reducers: {
    testUser: (state) => {
      state.user = { test: 'user' };
    },
  },
  extraReducers: (builder) => {},
});

export const selectUsers = (state) => state.users;
export const { testUser } = userSlice.actions;
export default userSlice.reducer;
