import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import checkToken from '../../utilities/checkToken';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId, { rejectWithValue }) => {
    try {
      const { token, user } = await checkToken();

      if (userId === undefined) throw new Error('No user ID provided');

      const res = await axios.get(API_URL + `/api/user/${userId}`, {
        headers: { authorization: token },
      });
      const userInfo = res.data;

      if (!userInfo) throw new Error('Failed to retrieve user information');

      return userInfo;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createNewUser = createAsyncThunk(
  'user/createNewUser',
  async (userSetupData, { rejectWithValue }) => {
    try {
      // create user
      let res = await axios.post(API_URL + '/api/user', userSetupData);
      let newUser = res.data;

      if (!newUser) throw new Error('User creation failed');

      // login & store token
      res = await axios.post(API_URL + '/api/auth/login', {
        email: userSetupData.email,
        password: userSetupData.password,
      });
      if (!res.data?.token) throw new Error('Login failed');
      localStorage.setItem('token', res.data.token);

      return newUser;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userUpdateData, { rejectWithValue }) => {
    try {
      const { token, user } = await checkToken();

      // request update
      const res = await axios.put(
        API_URL + `/api/user/${user.id}`,
        userUpdateData,
        {
          headers: { authorization: token },
        }
      );
      const updatedUser = res.data;

      if (!updatedUser.id) throw new Error('Failed to update user');

      return updatedUser;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateLocation = createAsyncThunk(
  'user/updateLocation',
  async (location, { rejectWithValue }) => {
    try {
      const { token, user } = await checkToken();

      const res = await axios.put(
        API_URL + `/api/user/${user.id}/location`,
        location,
        { headers: { authorization: token } }
      );

      const updatedUser = res.data;
      if (!updatedUser) throw new Error('Failed to update user location');

      return updatedUser;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId, { rejectWithValue }) => {
    // here's a problem: we cannot delete where deleted user exists as
    // a buddy in a meeting record
    try {
      const { token, user } = await checkToken();

      const res = await axios.delete(API_URL + `/api/user/${userId}`, {
        headers: { authorization: token },
      });

      if (res.status !== 204) throw new Error('Failed to delete user');

      return {};
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const banUser = createAsyncThunk(
  'user/banUser',
  async (userId, { rejectWithValue }) => {
    try {
      const { token, user } = await checkToken();

      const res = await axios.put(
        API_URL + `/api/user/${userId}`,
        { status: 'banned' },
        { headers: { authorization: token } }
      );

      const updatedUser = res.data;

      if (!updatedUser.id) throw new Error('Failed to update user status');

      return updatedUser;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const removeBan = createAsyncThunk(
  'user/removeBan',
  async (userId, { rejectWithValue }) => {
    try {
      const { token, user } = await checkToken();

      const res = await axios.put(
        API_URL + `/api/user/${userId}`,
        { status: 'inactive' },
        { headers: { authorization: token } }
      );

      const updatedUser = res.data;

      if (!updatedUser.id) throw new Error('Failed to update user status');

      return updatedUser;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    error: '',
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(fetchUser.pending, (state, { payload }) => {
        state.user = {};
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.user = {};
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createNewUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(createNewUser.pending, (state, { payload }) => {
        state.user = {};
        state.isLoading = true;
        state.error = '';
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.user = {};
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(updateUser.pending, (state, { payload }) => {
        state.user = {};
        state.isLoading = true;
        state.error = '';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.user = {};
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateLocation.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(updateLocation.pending, (state, { payload }) => {
        state.user = {};
        state.isLoading = true;
        state.error = '';
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.user = {};
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.user = {};
        state.isLoading = false;
        state.error = '';
      })
      .addCase(deleteUser.pending, (state, { payload }) => {
        state.user = {};
        state.isLoading = true;
        state.error = '';
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.user = {};
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(banUser.fulfilled, (state, { payload }) => {
        state.user = {};
        state.isLoading = false;
        state.error = '';
      })
      .addCase(banUser.pending, (state, { payload }) => {
        state.user = {};
        state.isLoading = true;
        state.error = '';
      })
      .addCase(banUser.rejected, (state, action) => {
        state.user = {};
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(removeBan.fulfilled, (state, { payload }) => {
        state.user = {};
        state.isLoading = false;
        state.error = '';
      })
      .addCase(removeBan.pending, (state, { payload }) => {
        state.user = {};
        state.isLoading = true;
        state.error = '';
      })
      .addCase(removeBan.rejected, (state, action) => {
        state.user = {};
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;
export const {} = userSlice.actions;
export default userSlice.reducer;
