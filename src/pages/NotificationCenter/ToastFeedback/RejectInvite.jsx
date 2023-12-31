import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import NotificationButton from '../../../components/NotificationButton';
import xIcon from '../../../assets/icons/x-icon.svg';
import xIconWhite from '../../../assets/icons/x-icon-white.svg';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../../redux/slices/darkModeSlice';

export default function RejectInvite({ buddyFirstName, t }) {
  const navigate = useNavigate();
  const darkModeSelector = useSelector(selectDarkMode);
  const [xMenuIcon, setXMenuIcon] = useState(xIconWhite);

  function findBuddy() {
    toast.remove(t.id);
    navigate('/match');
  }

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
      className="flex  3xl:w-[30vw] md:w-[40vw] 5xl:w-[20vw] w-[80vw] portrait:md:w-[60vw]  h-fit text-xs text-primary-gray bg-neutral-100/90 dark:bg-neutral-800/90 dark:text-white rounded-sm drop-shadow-sm my-3 items-center py-3 shadow-md justify-between sticky  -mr-4  landscape:mt-10 portrait:mt-10 landscape:3xl:mt-12"
    >
      <div
        id="notification-details"
        className="flex flex-col self-center text-center  portrait:lg:text-lg md:text-xs 2xl:text-sm text-xs w-full py-2"
      >
        <p className="pb-2">OH NO!</p>
        <p className="pb-2 text-xs ">
          We'll break it to {buddyFirstName} gently...
        </p>
        <div
          id="btn-container"
          className="flex flex-col h-fit  w-full px-7 self-center text-xs space-5 justify-center items-center pt-3"
        >
          <NotificationButton handleSubmit={findBuddy}>
            FIND A BUDDY
          </NotificationButton>
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
