import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import tryToken from utilities
import checkToken from '../../utilities/checkToken';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const findBuddies = createAsyncThunk(
  'search/findBuddy',
  async (searchParams, { rejectWithValue }) => {
    try {
      // tryToken()
      // check for own user status -- should be active
      // (maybe set to active if it's not?)
      // check for good search params
      // submit search request
      // return results
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchResults: [],
    error: '',
    isLoading: false,
  },
  extraReducers: {},
});

export const selectSearch = (state) => state.search;
export default searchSlice.reducer;
