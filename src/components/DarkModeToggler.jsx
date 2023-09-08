import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectDarkMode,
  darkModeOn,
  darkModeOff,
} from '../redux/slices/darkModeSlice';

export default function DarkModeToggler() {
  const dispatch = useDispatch();

  const isDarkMode = useSelector(selectDarkMode);

  useEffect(() => {
    // sync initial redux state with result of <HEAD> script (see index.html)
    if (document.documentElement.classList.contains('dark')) {
      dispatch(darkModeOn());
    } else {
      dispatch(darkModeOff());
    }
  }, []);

  const toggleDarkMode = () => {
    // toggle state on user click
    if (isDarkMode) {
      dispatch(darkModeOff());
      document.documentElement.classList.remove('dark');
      window.localStorage.setItem('color-theme', 'light');
    } else {
      dispatch(darkModeOn());
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('color-theme', 'dark');
    }
  };

  return (
    <label className="flex absolute top-0 right-1/2 items-center cursor-pointer">
      <span className="mr-2 text-gray-600 dark:text-gray-300">dark mode</span>
      <div className="relative">
        <input
          type="checkbox"
          className="hidden"
          onChange={toggleDarkMode}
          checked={isDarkMode}
        />
        <div className=" w-10 h-4 bg-gray-400 rounded-full shadow-inner dark:bg-gray-700"></div>
        <div className=" absolute w-6 h-6 bg-white border-2 border-gray-400 rounded-full shadow inset-y-0 left-0"></div>
      </div>
    </label>
  );
}
