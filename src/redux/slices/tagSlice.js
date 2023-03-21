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
    isLoading: false,
    error: '',
  },
  reducers: {
    testTags: (state) => {
      state.tag = { test: 'tag' };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all tags
      .addCase(fetchAllTags.fulfilled, (state, action) => {
        state.tags = action.payload;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(fetchAllTags.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllTags.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Fetch single tag
      .addCase(fetchSingleTag.fulfilled, (state, action) => {
        state.tag = action.payload;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(fetchSingleTag.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleTag.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Edit a tag
      .addCase(editTag.fulfilled, (state, action) => {
        state.tag = action.payload;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(editTag.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editTag.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Delete a tag
      .addCase(deleteTag.fulfilled, (state, action) => {
        // removes tag from state that was just deleted
        state.tags = state.tags.filter((tag) => tag.id !== action.payload.id);
        state.isLoading = false;
        state.error = '';
      })
      .addCase(deleteTag.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Add a tag
      .addCase(addTag.fulfilled, (state, action) => {
        // removes tag from state that was just deleted
        state.tags.push(action.payload);
        state.isLoading = false;
        state.error = '';
      })
      .addCase(addTag.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addTag.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const selectTags = (state) => state.tags;
export const { testTags } = tagSlice.actions;
export default tagSlice.reducer;
