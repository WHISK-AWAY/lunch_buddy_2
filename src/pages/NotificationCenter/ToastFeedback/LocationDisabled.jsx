import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../../redux/slices/darkModeSlice';
import toast from 'react-hot-toast';

import xIcon from '../../../assets/icons/x-icon.svg';
import xIconWhite from '../../../assets/icons/x-icon-white.svg';

export default function LocationDisabled({ t }) {
  const darkModeSelector = useSelector(selectDarkMode);
  const [xMenuIcon, setXMenuIcon] = useState(xIconWhite);

  useEffect(() => {
    if (!darkModeSelector) {
      setXMenuIcon(xIcon);
    } else {
      setXMenuIcon(xIconWhite);
    }
  }, [darkModeSelector]);

  return (
    <div
      id="meeting-card"
      className="flex  text-xs py-3 px-3  text-primary-gray  rounded-sm shadow-md items-center justify-between sticky 3xl:w-[30vw] md:w-[40vw] 5xl:w-[20vw] w-[80vw] portrait:md:w-[60vw] bg-neutral-100/90 dark:bg-neutral-800/90 dark:text-white landscape:mt-10 portrait:mt-10 landscape:3xl:mt-12 -mr-4"
    >
      <div
        id="notification-details"
        className="flex flex-col self-center text-center  portrait:lg:text-lg md:text-xs 2xl:text-sm text-xs w-full py-2"
      >
        <p className="p-4">LOCATION SERVICES DISABLED</p>
        <p className="">
          Unfortunately it looks like your location services are disabled.
          Before you can search for a lunch buddy, you'll need to enable
          location services in your browser and refresh the page to proceed. A
          few helpful links are listed below, but you may need to search for
          device/browser-specific help.
        </p>

        <div
          id="btn-container"
          className="flex portrait:flex-wrap md:flex-wrap lg:flex-nowrap gap-4 h-fit w-full px-7 self-center text-xs space-5 justify-center items-center pt-5"
        >
          <a
            className="ease-in flex justify-center text-center 6xl:py-4 5xl:py-3 duration-300 w-full button 2xl:py-2  px-4 py-[.5rem] text-xs text-white  hover:bg-red-600 active:bg-red-700 transition-all hover:shadow-lg"
            href="https://support.google.com/chrome/answer/142065"
            target="_blank"
          >
            Chrome
          </a>
          <a
            className="ease-in flex justify-center text-center 6xl:py-4 5xl:py-3 duration-300 w-full button 2xl:py-2  px-4 py-[.5rem] text-xs text-white  hover:bg-red-600 active:bg-red-700 transition-all hover:shadow-lg"
            href="https://support.mozilla.org/en-US/kb/does-firefox-share-my-location-websites"
            target="_blank"
          >
            Firefox
          </a>
          <a
            className="ease-in flex justify-center text-center 6xl:py-4 5xl:py-3 duration-300 w-full button 2xl:py-2  px-4 py-[.5rem] text-xs text-white  hover:bg-red-600 active:bg-red-700 transition-all hover:shadow-lg"
            href="https://support.apple.com/en-us/HT207092"
            target="_blank"
          >
            iOS
          </a>
          <a
            className="ease-in flex justify-center text-center 6xl:py-4 5xl:py-3 duration-300 w-full button 2xl:py-2  px-4 py-[.5rem] text-xs text-white  hover:bg-red-600 active:bg-red-700 transition-all hover:shadow-lg"
            href="https://support.google.com/accounts/answer/3467281"
            target="_blank"
          >
            Android
          </a>

          <div
            id="x-icon"
            className="absolute top-3 w-5 right-3 cursor-pointer"
            onClick={() => toast.remove(t.id)}
          >
            <img src={xMenuIcon} alt="close this notification" />
          </div>
        </div>
      </div>
    </div>
  );
}
