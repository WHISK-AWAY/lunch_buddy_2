import { configureStore } from '@reduxjs/toolkit';
import {
  authSlice,
  meetingSlice,
  messagesSlice,
  tagSlice,
  userSlice,
} from './slices';

const store = configureStore({
  reducer: {
    auth: authSlice,
    meetings: meetingSlice,
    messages: messagesSlice,
    tags: tagSlice,
    users: userSlice,
  },
});

export default store;
