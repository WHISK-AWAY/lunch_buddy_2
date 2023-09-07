import React, {useEffect, useState} from 'react'

export default function DarkModeToggler({isDarkMode, setIsDarkMode}) {



  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };


   useEffect(() => {
     if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
       document.documentElement.classList.remove('dark');
     }
   }, [isDarkMode]);

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
