import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const token = window.localStorage.getItem('token');

export const fetchAllNotifications = createAsyncThunk(
  'notification/fetchAll',
  async (userId, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.get(
        API_URL + `/api/user/${userId}/notifications`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateNotificationStatus = createAsyncThunk(
  'notification/updateStatus',
  async ({ userId, notificationId }, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.put(
        API_URL + `/api/user/${userId}/notifications/${notificationId}`,
        { userId, notificationId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  notifications: [],
  notification: {},
  isLoading: false,
  error: '',
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all notifications
      .addCase(fetchAllNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(fetchAllNotifications.pending, (state, action) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchAllNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.response.data;
      })

      // Update notification status
      .addCase(updateNotificationStatus.fulfilled, (state, action) => {
        state.notification = action.payload;

        // reassign notification in array of notifications to show the updated notif
        const allNotifications = state.notifications;
        const indexOfUpdatedNotification = allNotifications.findIndex(
          (notification) => notification.id === action.payload.id
        );
        allNotifications[indexOfUpdatedNotification] = action.payload;

        state.error = '';
        state.isLoading = false;
      })
      .addCase(updateNotificationStatus.pending, (state, action) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(updateNotificationStatus.rejected, (state, action) => {
        state.error = action.payload.response.data;
        state.isLoading = false;
      });
  },
});

export const selectUnreadNotifications = (state) => {
  return state.notifications.notifications;
};

export const {} = notificationSlice.actions;

export default notificationSlice.reducer;
