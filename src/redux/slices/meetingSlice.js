import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createMeeting = createAsyncThunk(
  'meeting/createMeeting',
  async ({ token, newMeeting }, { rejectWithValue }) => {
    try {
      const { data } = axios.post('/api/meeting', newMeeting, {
        headers: {
          authorization: token,
        },
      });
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const meetingSlice = createSlice({
  name: 'meetings',
  initialState: {
    meetings: [],
    meeting: {},
    isLoading: false,
    error: '',
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
