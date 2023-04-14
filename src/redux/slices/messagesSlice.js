import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    message: {},
  },
  reducers: {
    testMessages: (state) => {
      state.message = { test: 'message' };
    },
  },
  extraReducers: (builder) => {},
});

export const selectMessages = (state) => state.messages;
export const { testMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
