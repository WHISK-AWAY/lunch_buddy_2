import { configureStore } from '@reduxjs/toolkit';
import {
  authSlice,
  meetingSlice,
  messagesSlice,
  searchSlice,
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
    search: searchSlice,
  },
});

export default store;
