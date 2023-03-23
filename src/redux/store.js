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
    search: searchSlice,
    user: userSlice,
  },
});

export default store;
