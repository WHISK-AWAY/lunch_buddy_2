import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const meetingSlice = createSlice({
  name: 'meetings',
  initialState: {
    meetings: [],
    meeting: {},
  },
  reducers: {
    testMeeting: (state) => {
      // delete me
      state.meeting = { test: 'meeting' };
    },
  },
  extraReducers: (builder) => {},
});

export const selectMeetings = (state) => state.meetings;
export const { testMeeting } = meetingSlice.actions;
export default meetingSlice.reducer;
