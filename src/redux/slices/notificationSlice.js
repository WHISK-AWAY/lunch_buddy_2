import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

const initialNotificationState = {
  notifications: [],
  notification: {},
  isLoading: false,
  error: '',
};

export const fetchAllNotifications = createAsyncThunk(
  'notification/fetchAll',
  async ({ userId }, { rejectWithValue, getState }) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.get(
        VITE_API_URL + `/api/user/${userId}/notifications`,
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
  async (
    { userId, notificationId, updates },
    { rejectWithValue, getState }
  ) => {
    try {
      const token = window.localStorage.getItem('token');

      const { data } = await axios.put(
        VITE_API_URL + `/api/user/${userId}/notifications/${notificationId}`,
        updates,
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

// While this is a user route, it will trigger a notification so it should be called from this slice
export const cancelMeeting = createAsyncThunk(
  'notification/cancelMeeting',
  async ({ userId, meetingId }, { rejectWithValue, getState }) => {
    try {
      const token = window.localStorage.getItem('token');

      const { data } = await axios.put(
        VITE_API_URL + `/api/user/${userId}/meeting/${meetingId}/cancel`,
        { isClosed: true, meetingStatus: 'closed' },
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

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: initialNotificationState,
  reducers: {
    clearNotificationState: (state) => {
      return {
        notifications: [],
        notification: {},
        isLoading: false,
        error: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all notifications
      .addCase(fetchAllNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload.filter((notification) => {
          return true;
          // notification.notificationType !== 'ratingRequested' ||
          // new Date(notification.meeting.lunchDate) < Date.now()
        });
        state.isLoading = false;
        state.error = '';
      })
      .addCase(fetchAllNotifications.pending, (state, action) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchAllNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.response?.data;
      })

      // Update notification status
      .addCase(updateNotificationStatus.fulfilled, (state, action) => {
        state.notification = action.payload;

        // reassign notification in array of notifications to show the updated notif
        const allNotifications = state.notifications;
        // const indexOfUpdatedNotification = allNotifications.findIndex(
        //   (notification) => notification.id === action.payload.id
        // );
        // allNotifications[indexOfUpdatedNotification] = action.payload;

        state.notifications = allNotifications.filter((notification) => {
          return notification.id !== action.payload.id;
        });
        state.error = '';
        state.isLoading = false;
      })
      .addCase(updateNotificationStatus.pending, (state, action) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(updateNotificationStatus.rejected, (state, action) => {
        state.error = action.payload?.response?.data;
        state.isLoading = false;
      })

      // Cancel meeting notification
      .addCase(cancelMeeting.fulfilled, (state, action) => {
        const allNotifications = state.notifications;
        state.notifications = allNotifications.filter((notification) => {
          return notification.id !== action.payload.id;
        });
        state.error = '';
        state.isLoading = false;
      })
      .addCase(cancelMeeting.pending, (state, action) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(cancelMeeting.rejected, (state, action) => {
        state.error = action.payload.response.data;
        state.isLoading = false;
      });
  },
});

export const selectUnreadNotifications = (state) => {
  return state.notifications.notifications;
};

export const selectUnreadActiveMeeting = (state) => {
  const allNotifications = state.notifications.notifications;
  return allNotifications.find((notification) => {
    return (
      notification.notificationType === 'currentMeeting' &&
      !notification.isAcknowledged
    );
  });
};

export const { clearNotificationState } = notificationSlice.actions;

export default notificationSlice.reducer;
