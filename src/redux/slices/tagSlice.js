import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllTags = createAsyncThunk(
  'getTags',
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/tags', {
        headers: {
          authorization: token,
        },
      });
      return data;
    } catch (error) {
      console.log('Axios error trying to retrieve tags');
      return rejectWithValue(error);
    }
  }
);

export const fetchSingleTag = createAsyncThunk(
  'getTags',
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/tags/${id}`, {
        headers: {
          authorization: token,
        },
      });
      return data;
    } catch (error) {
      console.log('Axios error trying to retrieve tag');
      return rejectWithValue(error);
    }
  }
);

export const editTag = createAsyncThunk(
  'getTags',
  async ({ token, id, updates }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/tags/${id}`, updates, {
        headers: {
          authorization: token,
        },
      });
      return data;
    } catch (error) {
      console.log('Axios error trying to edit tag');
      return rejectWithValue(error);
    }
  }
);

export const deleteTag = createAsyncThunk(
  'getTags',
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/tags/${id}`, {
        headers: {
          authorization: token,
        },
      });
      return data;
    } catch (error) {
      console.log('Axios error trying to delete tag');
      return rejectWithValue(error);
    }
  }
);

export const addTag = createAsyncThunk(
  'getTags',
  async ({ token, newTag }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/tags/${id}`, newTag, {
        headers: {
          authorization: token,
        },
      });
      return data;
    } catch (error) {
      console.log('Axios error trying to add tag');
      return rejectWithValue(error);
    }
  }
);

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
