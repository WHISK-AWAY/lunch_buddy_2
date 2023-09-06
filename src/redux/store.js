import { configureStore } from '@reduxjs/toolkit';
import {
  authSlice,
  meetingSlice,
  searchSlice,
  tagSlice,
  userSlice,
  notificationSlice,
} from './slices';

const store = configureStore({
  reducer: {
    auth: authSlice,
    meetings: meetingSlice,
    tags: tagSlice,
    search: searchSlice,
    user: userSlice,
    notifications: notificationSlice,
  },
});

export default store;
