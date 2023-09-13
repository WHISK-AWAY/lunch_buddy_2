import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const VITE_API_URL = import.meta.env.VITE_API_URL;

const initialSearchState = {
  searchResults: [],
  restaurants: [],
  error: '',
  isLoading: false,
  mapsKey: '',
};

export const findBuddies = createAsyncThunk(
  'search/findBuddies',
  async (searchParams, { rejectWithValue, getState }) => {
    try {
      // const { token, user } = await checkToken();
      const { token, user } = getState().auth;

      // If user isn't active, make them active
      // I think we need to make sure to update location prior to calling search...
      // ... not easy to do from here before search call gets executed
      if (user.status === 'inactive') {
        await axios.put(
          VITE_API_URL + `/api/user/${user.id}`,
          { status: 'active' },
          { headers: { authorization: token } }
        );
      }

      // default search radius to 5 mi
      const radius = searchParams?.searchRadius || 5;

      const res = await axios.get(VITE_API_URL + '/api/search', {
        headers: { authorization: token },
        params: { radius },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const findRestaurants = createAsyncThunk(
  'search/findRestaurants',
  async (searchParams, { rejectWithValue, getState }) => {
    try {
      // const { token, user } = await checkToken();
      const { token, user } = getState().auth;
      const { buddy, searchRadius } = searchParams;

      if (!buddy || !searchRadius) throw new Error('Missing search parameters');

      // figure out overlap of user & buddy tags
      const currentState = getState();

      // pull cuisine tags from buddy
      const buddyCuisineTags = buddy.tags
        .filter((tag) => tag.category.categoryName === 'cuisine')
        .map((tag) => tag.yelpAlias);

      // pull cuisine tags from user
      const userCuisineTags = currentState.user.user.tags
        .filter((tag) => tag.category.categoryName === 'cuisine')
        .map((tag) => tag.yelpAlias);

      let overlappingCuisineTags = userCuisineTags.filter((tag) =>
        buddyCuisineTags.includes(tag)
      );

      // if we don't have any common food interests, just use our own for search
      if (!overlappingCuisineTags.length) {
        overlappingCuisineTags = userCuisineTags;
      }

      // package up search parameters for Yelp API
      const params = {};
      params.latitude = user.lastLat;
      params.longitude = user.lastLong;
      params.radius = searchRadius;
      params.open_now = true;
      params.categories = overlappingCuisineTags;

      // we send the request to our own backend -- cannot reach Yelp from frontend
      const res = await axios.get(VITE_API_URL + '/api/search/restaurants', {
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

export const fetchMapKey = createAsyncThunk(
  'search/fetchMapKey',
  async (_, { rejectWithValue }) => {
    // request google maps api key from backend
    try {
      const token = window.localStorage.getItem('token');

      if (!token) throw new Error('No token found in local storage.');

      const { data } = await axios.get(VITE_API_URL + '/api/search/mapKey', {
        headers: { Authorization: token },
      });

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: initialSearchState,
  reducers: {
    resetSearchState: (state) => {
      state.searchResults = [];
      state.restaurants = [];
      state.error = '';
      state.isLoading = false;
    },
    resetRestaurants: (state) => {
      state.restaurants = [];
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
        state.error = action.payload.response?.data;
        state.isLoading = false;
      })

      // fetch Maps API key
      .addCase(fetchMapKey.fulfilled, (state, { payload }) => {
        state.mapsKey = payload.MAPS_API_KEY;
        state.error = '';
        state.isLoading = false;
      })
      .addCase(fetchMapKey.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMapKey.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.mapsKey = '';
      });
  },
});

export const selectSearch = (state) => state.search;
export const selectRestaurants = (state) => state.search.restaurants;
export const { resetSearchState, resetRestaurants } = searchSlice.actions;
export default searchSlice.reducer;
