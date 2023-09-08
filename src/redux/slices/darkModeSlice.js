import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  isDarkMode: false
}

const darkModeSlice  = createSlice({
  name:'mode',
  initialState,
  reducers: {
    darkModeOn: (state) => {
      state.isDarkMode = true
    },
    darkModeOff: (state) => {
      state.isDarkMode = false
    }
  }
})

export default  darkModeSlice.reducer;
export const selectDarkMode = (state) => state.darkMode.isDarkMode;
export const {darkModeOn, darkModeOff}  = darkModeSlice.actions;