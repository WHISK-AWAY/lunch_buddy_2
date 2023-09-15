import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import NotificationBody from '../pages/NotificationCenter/NotificationBody';
import DropdownMenu from './DropdownMenu';
import DarkModeToggler from './DarkModeToggler';
import navbarIcon from '../assets/icons/navbar-icon.svg';
import navbarIconWhite from '../assets/icons/navbar-icon-white.svg';
import bellIcon from '../assets/icons/notification.svg';
import bellIconWhite from '../assets/icons/notification-white.svg';
import xIcon from '../assets/icons/x-icon.svg';
import xIconWhite from '../assets/icons/x-icon-white.svg';

import {
  fetchAllNotifications,
  selectUnreadNotifications,
} from '../redux/slices/notificationSlice';
import { fetchUser } from '../redux/slices/userSlice';
import { tryToken, selectAuthUser } from '../redux/slices/authSlice';
import { selectDarkMode } from '../redux/slices/darkModeSlice';

import getLocation from '../utilities/geo';
import { fetchMapKey } from '../redux/slices';
import { fetchCurrentMeeting } from '../redux/slices/meetingSlice';

const NOTIFICATION_UPDATE_INTERVAL = 60000;
const TOAST_DURATION = 10000;

const NavBar = () => {
  const dispatch = useDispatch();

  const root = document.querySelector('#root');

  const authUser = useSelector(selectAuthUser);
  const userState = useSelector((state) => state.user.user);
  const notifications = useSelector(selectUnreadNotifications);
  const isDarkMode = useSelector(selectDarkMode);
  const meetingState = useSelector((state) => state.meetings);

  const hasNotifications = notifications?.length > 0;

  const [locationTriggered, setLocationTriggered] = useState(false);
  const [menuMode, setMenuMode] = useState(null); // 'dropdown' | 'notifications' | null
  const [menuIcon, setMenuIcon] = useState(navbarIconWhite);
  const [xMenuIcon, setXMenuIcon] = useState(xIconWhite);
  const [bellMenuIcon, setBellMenuIcon] = useState(bellIconWhite);

  useEffect(() => {
    // set up click-off event listener
    if (menuMode) {
      root.addEventListener('click', clickOff);
    }

    // prevent scrolling while menu is active
    document.body.style.overflow = menuMode ? 'hidden' : 'auto';

    // clean up
    return () => {
      root.removeEventListener('click', clickOff);
      document.body.style.overflow = 'auto';
    };
  }, [menuMode]);

  useEffect(() => {
    // check for token (and then auto-login) upon first load
    if (window.localStorage.getItem('token')) {
      dispatch(tryToken());
    }
  }, []);

  useEffect(() => {
    // once we're logged in, make sure the userState object is populated
    if (authUser.id && !userState.id) {
      dispatch(fetchUser());
    }

    // also go ahead and update location & grab maps key
    if (authUser.id) {
      getLocation(dispatch, authUser.id);
      dispatch(fetchMapKey());
    }
  }, [authUser.id, userState.id]);

  useEffect(() => {
    // periodically check for new notifications
    let timer;

    if (authUser.id) {
      dispatch(fetchAllNotifications({ userId: authUser.id }));

      timer = setInterval(() => {
        dispatch(fetchAllNotifications({ userId: authUser.id }));
      }, NOTIFICATION_UPDATE_INTERVAL);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [authUser.id]);

  useEffect(() => {
    // check for new notifications shortly after creating a meeting
    // pull current meeting so that it's available for currentmeeting view

    let timer;

    if (authUser.id && !meetingState.isLoading && !meetingState.error) {
      dispatch(fetchCurrentMeeting({ userId: authUser.id }));
      timer = setTimeout(() => {
        dispatch(fetchAllNotifications({ userId: authUser.id }));
      }, 5000);
    }

    if (timer) return () => clearTimeout(timer);
  }, [meetingState.meeting?.id, authUser.id]);

  useEffect(() => {
    if (isDarkMode) {
      setMenuIcon(navbarIconWhite);
      setXMenuIcon(xIconWhite);
      setBellMenuIcon(bellIconWhite);
    } else {
      setMenuIcon(navbarIcon);
      setXMenuIcon(xIcon);
      setBellMenuIcon(bellIcon);
    }
  }, [isDarkMode]);

  function closeMenu() {
    setMenuMode(null);
  }

  function clickOff(e) {
    if (
      e.target.matches('#notification-container *') ||
      e.target.matches('#dropdown-container *')
    ) {
      // Ignore clicks on certain targets
      return;
    }
    closeMenu();
  }

  return (
    <>
      <header
        className="sticky top-0 z-40  text-primary-gray 
       w-[100svw] bg-white dark:bg-[#0a0908] px-6 3xl:px-10 6xl:px-20  landscape:h-14 portrait:h-14 landscape:3xl:h-16  border"
      >
        <DarkModeToggler />
        <nav className="flex justify-between w-full h-full">
          <button className="flex justify-center  items-center">
            <img
              className="w-7 xl:w-10 lg:w-8 5xl:w-10 6xl:w-14 portrait:xs:w-9 portrait:md:w-10"
              src={menuMode === 'dropdown' ? xMenuIcon : menuIcon}
              alt={`click to ${
                menuMode === 'dropdown' ? 'close' : 'open'
              } navigation menu`}
              // onClick={() => setExpandMenu((prev) => !prev)}
              onClick={() =>
                setMenuMode((prev) => (prev === 'dropdown' ? null : 'dropdown'))
              }
            />
          </button>
          <ul className="flex items-center justify-center align-center h-full gap-8 text-center">
            {/* BUTTONS THAT SHOW ONLY WHEN SIGNED IN */}
            {authUser?.firstName ? (
              <>
                <li className="hidden md:block">
                  <Link
                    to="/account"
                    className="text-[1.3vw] 2xl:text-[1.1vw] 3xl:text-[1vw] 4xl:w-[.9vw] 5xl:text-[.8vw] 6xl:text-[.5vw] dark:text-white portrait:md:text-base"
                  >
                    HI,{' '}
                    {userState.firstName?.toUpperCase() ||
                      authUser.firstName?.toUpperCase() ||
                      'BUDDY'}
                  </Link>
                </li>

                {/**
                <li className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer ">
                    <input
                      type="checkbox"
                      value={''}
                      className="sr-only peer"
                      checked={userState.status === 'active'}
                      onChange={handleToggleStatus}
                      // onClick={handleToggleStatus}
                    />
                    <div className="w-11 h-6 bg-white border rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-600 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-label peer-checked:border-white peer-checked:after:bg-white"></div>
                    </label>
                    </li>
                  */}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: TOAST_DURATION,
                  }}
                />
                <li className="h-7 relative">
                  <button
                    id="bell-button"
                    className={
                      hasNotifications
                        ? "after:content-[''] after:absolute after:top-1 after:right-1 after:text-red-400 after:bg-headers after:rounded-full after:w-2 after:h-2"
                        : ''
                    }
                    // onClick={handleNotificationClick}
                    disabled={!hasNotifications}
                    onClick={() =>
                      setMenuMode((prev) =>
                        prev === 'notifications' ? null : 'notifications'
                      )
                    }
                  >
                    <img
                      className="w-6 lg:w-6 5xl:w-7 6xl:w-8 h-full"
                      src={bellMenuIcon}
                      alt="Notification bell icon"
                    />
                  </button>
                </li>
              </>
            ) : (
              //  WHEN NOT SIGNED IN SHOW BELOW
              <>
                {/**
            <Link to="/" className="dark:text-white text-primary-gray">
            <h1 className="md:text-[2.4vw] xxs:text-[4.9vw]">
            LUNCH
            <span className="font-clicker md:text-[2vw] font-thin xxs:text-[4.5vw]">
            buddy
            </span>
            </h1>
            </Link>
          */}
              </>
            )}
          </ul>
        </nav>
      </header>
      {/* DROPDOWN MENU, HIDDEN UNTIL CLICKED */}
      <DropdownMenu menuMode={menuMode} closeMenu={closeMenu} />
      <NotificationBody menuMode={menuMode} closeMenu={closeMenu} />
    </>
  );
};

export default NavBar;
