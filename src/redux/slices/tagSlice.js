import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const tagSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: [],
    tag: {},
  },
  reducers: {
    testTags: (state) => {
      state.tag = { test: 'tag' };
    },
  },
  extraReducers: (builder) => {},
});

export const selectTags = (state) => state.tags;
export const { testTags } = tagSlice.actions;
export default tagSlice.reducer;
