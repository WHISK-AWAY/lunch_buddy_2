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
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="hidden"
          onChange={toggleDarkMode}
          checked={isDarkMode}
        />
        <div className="w-10 h-4 landscape:5xl:h-5 bg-primary-gray rounded-full shadow-inner dark:bg-[#2f2f2f] border dark:border-white">
          <div
            className={`absolute w-5 h-4 landscape:5xl:h-5 landscape:5xl:w-6 bg-white border border-primary-gray dark:border-white rounded-full shadow inset-y-0 left-0 ease duration-500 dark:bg-white/90  ${
              isDarkMode ? 'transform translate-x-full' : ''
            }`}
          ></div>
        </div>
      </div>
    </label>
  );
}
