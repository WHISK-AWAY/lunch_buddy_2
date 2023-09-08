import { configureStore } from '@reduxjs/toolkit';
import {
  authSlice,
  meetingSlice,
  searchSlice,
  tagSlice,
  userSlice,
  notificationSlice,
  darkModeSlice
} from './slices';

const store = configureStore({
  reducer: {
    auth: authSlice,
    meetings: meetingSlice,
    tags: tagSlice,
    search: searchSlice,
    user: userSlice,
    notifications: notificationSlice,
    darkMode: darkModeSlice
  },
});

export default store;
