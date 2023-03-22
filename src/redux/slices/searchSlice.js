import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import checkToken from '../../utilities/checkToken';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const findBuddies = createAsyncThunk(
  'search/findBuddy',
  async (searchParams, { rejectWithValue }) => {
    try {
      const { token, user } = await checkToken();

      console.log('user:', user);

      // Rejecting for not-active status here...should we automatically
      // set inactive ---> active instead?
      // The really important thing is that the user needs to have a location set...
      if (user.status !== 'active')
        throw new Error('Must set status to active to enable search');

      // default search radius to 5 mi
      const radius = searchParams?.searchRadius || 5;

      const res = await axios.get(API_URL + '/api/search', {
        headers: { authorization: token },
        params: { radius },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
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
  reducers: {
    resetSearchState: (state) => {
      state.searchResults = [];
      state.error = '';
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findBuddies.fulfilled, (state, { payload }) => {
      state.searchResults = payload;
      state.error = '';
      state.isLoading = false;
    });
    builder.addCase(findBuddies.pending, (state, action) => {
      state.searchResults = [];
      state.error = '';
      state.isLoading = true;
    });
    builder.addCase(findBuddies.rejected, (state, action) => {
      state.searchResults = [];
      /**
       * For discussion: setting action.error.message here yields 'Rejected'
       * If we use action.payload.message instead, we get 'Must set status to active to enable search'
       */
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const selectSearch = (state) => state.search;
export const { resetSearchState } = searchSlice.actions;
export default searchSlice.reducer;
