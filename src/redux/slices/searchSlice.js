import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import checkToken from '../../utilities/checkToken';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const findBuddies = createAsyncThunk(
  'search/findBuddies',
  async (searchParams, { rejectWithValue }) => {
    try {
      const { token, user } = await checkToken();

      // If user isn't active, make them active
      // I think we need to make sure to update location prior to calling search...
      // ... not easy to do from here before search call gets executed
      if (user.status === 'inactive') {
        await axios.put(
          API_URL + `/api/user/${user.id}`,
          { status: 'active' },
          { headers: { authorization: token } }
        );
      }

      // default search radius to 5 mi
      const radius = searchParams?.searchRadius || 5;

      const res = await axios.get(API_URL + '/api/search', {
        headers: { authorization: token },
        params: { radius },
      });
      console.log('response from buddy search', res);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const findRestaurants = createAsyncThunk(
  'search/findRestaurants',
  async (searchParams, { rejectWithValue }) => {
    try {
      const { token, user } = await checkToken();

      const params = {};
      params.latitude = user.lastLat;
      params.longitude = user.lastLong;
      params.radius = searchParams.searchRadius;
      params.open_now = true;

      const res = await axios.get(API_URL + '/api/search/restaurants', {
        params,
        headers: {
          authorization: token,
        },
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
    restaurants: [],
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
  // fetch buddy search results
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
    builder
      .addCase(findBuddies.rejected, (state, action) => {
        state.searchResults = [];
        state.error = action.payload.response.data;
        state.isLoading = false;
      })

      // fetch buddy search results
      .addCase(findRestaurants.fulfilled, (state, { payload }) => {
        state.restaurants = payload;
        state.error = '';
        state.isLoading = false;
      })
      .addCase(findRestaurants.pending, (state, action) => {
        state.restaurants = [];
        state.error = '';
        state.isLoading = true;
      })
      .addCase(findRestaurants.rejected, (state, action) => {
        state.restaurants = [];
        state.error = action.payload.response.data;
        state.isLoading = false;
      });
  },
});

export const selectSearch = (state) => state.search;
export const { resetSearchState } = searchSlice.actions;
export default searchSlice.reducer;
