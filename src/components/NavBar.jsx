import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import bellIcon from '../assets/icons/notification.svg';
import DropdownMenu from './DropdownMenu';
import { selectAuthUser, tryToken } from '../redux/slices/authSlice';
import { fetchUser, updateUser } from '../redux/slices/userSlice';
import navbarIcon from '../assets/icons/navbar-icon.svg';
import xIcon from '../assets/icons/x-icon.svg';
import NotificationBody from '../pages/NotificationCenter/NotificationBody';
import {
  fetchAllNotifications,
  selectUnreadNotifications,
} from '../redux/slices/notificationSlice';
import getLocation from '../utilities/geo';

const NOTIFICATION_UPDATE_INTERVAL = 60000;
const TOAST_DURATION = 10000;

const NavBar = () => {
  const [expandMenu, setExpandMenu] = useState(false);
  const [showNotificationBody, setShowNotificationBody] = useState(false);
  const [triggerClose, setTriggerClose] = useState(false);
  const [locationTriggered, setLocationTriggered] = useState(false);
  const dispatch = useDispatch();

  const authUser = useSelector(selectAuthUser);
  const userState = useSelector((state) => state.user.user);
  const notifications = useSelector(selectUnreadNotifications);

  // THIS VARIABLE WILL HIDE OR SHOW THE DOT INDICATING NOTIFICATIONS
  const hasNotifications = notifications?.length > 0;

  // Turns off scroll when showing menu
  document.body.style.overflow = expandMenu ? 'hidden' : 'auto';

  const notifController = new AbortController();
  const dropdownController = new AbortController();
  const root = document.querySelector('#root');
  const notificationContainer = document.querySelector(
    '#notification-container'
  );

  const handleNotificationClick = (event) => {
    event.preventDefault();
    if (showNotificationBody) setTriggerClose(true);
    else {
      setShowNotificationBody(true);
      setTriggerClose(false);
    }
  };

  useEffect(() => {
    if (expandMenu) {
      root.addEventListener('click', closeDropdown, {
        signal: dropdownController.signal,
      });
    } else {
      dropdownController.abort();
    }
  }, [expandMenu]);

  useEffect(() => {
    if (userState.status === 'active' && !locationTriggered) {
      getLocation(dispatch);
      setLocationTriggered(true);
    }
  }, [userState, locationTriggered]);

  function closeNotificationBody() {
    setTriggerClose(true);
    notifController.abort();
  }

  function closeDropdown() {
    setExpandMenu(false);
    dropdownController.abort();
  }

  useEffect(() => {
    // if close is triggered while notifs are showing, trigger notif center collapse
    if (showNotificationBody && triggerClose) {
      setShowNotificationBody(false);
    }

    if (triggerClose) {
      setTriggerClose(false);
      // notifController.abort();
    }
  }, [showNotificationBody, triggerClose]);

  useEffect(() => {
    if (showNotificationBody) {
      root.addEventListener(
        'click',
        (e) => {
          if (
            !e.target.matches('#notification-container *') &&
            !e.target.matches('#bell-button>*')
          ) {
            closeNotificationBody();
          }
        },
        { signal: notifController.signal }
      );
    } else {
      notifController.abort();
    }
  }, [showNotificationBody]);

  document.body.style.overflow = showNotificationBody ? 'hidden' : 'auto';

  function handleToggleStatus() {
    let newStatus;
    if (userState.status === 'active') {
      newStatus = 'inactive';
      setLocationTriggered(false);
    } else if (userState.status === 'inactive') {
      newStatus = 'active';
    } else {
      alert('Sorry, currently your status is' + userState.status);
    }
    dispatch(updateUser({ status: newStatus }));
  }

  useEffect(() => {
    dispatch(tryToken());
  }, []);

  useEffect(() => {
    async function runDispatch() {
      if (authUser.firstName) {
        await dispatch(fetchUser(authUser.id));
        await dispatch(fetchAllNotifications({ userId: authUser.id }));
      }
    }
    runDispatch();
    setInterval(() => {
      runDispatch();
    }, NOTIFICATION_UPDATE_INTERVAL);
  }, [authUser]);

  return (
    <>
      <header className="sticky top-0 z-40 text-primary-gray h-[10dvh] border-b border-primary-gray w-[100vw] bg-[#0a0908] px-6 3xl:px-10 6xl:px-20">
        <nav className="flex  justify-between w-full h-full">
          <button className=" flex justify-center  items-center  ">
            <img
              className="w-7 xl:w-10 lg:w-8 5xl:w-10 6xl:w-14 portrait:xs:w-9 portrait:md:w-10"
              src={expandMenu ? xIcon : navbarIcon}
              alt="Three lined menu icon button"
              onClick={() => setExpandMenu((prev) => !prev)}
            />
          </button>
          <ul className="flex items-center justify-center align-center h-full gap-8 text-center">
            {/* BUTTONS THAT SHOW ONLY WHEN SIGNED IN */}
            {authUser?.firstName ? (
              <>
                <li className="hidden md:block">
                  <Link
                    to="/account"
                    className="text-[1.6vw] 2xl:text-[1.3vw] 3xl:text-[1.1vw] 4xl:w-[1vw] 5xl:text-[.9vw]"
                  >
                    HI, {authUser.firstName.toUpperCase()}
                  </Link>
                </li>

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
                      hasNotifications &&
                      `after:content-[''] after:absolute after:top-1 after:right-1 after:text-red-400 after:bg-headers after:rounded-full after:w-2 after:h-2`
                    }
                    onClick={handleNotificationClick}
                  >
                    <img
                      className="w-7 xl:w-10 lg:w-8 5xl:w-8 6xl:w-10 h-full"
                      src={showNotificationBody ? bellIcon : bellIcon}
                      alt="Notification bell icon"
                    />
                  </button>
                </li>
              </>
            ) : (
              //  WHEN NOT SIGNED IN SHOW BELOW
              <>
                <Link to="/" className='text-white'>
                  <h1 className="text-[2vw] ">
                    LUNCH
                    <span className="font-clicker text-[1.5vw] font-thin ">
                      buddy
                    </span>
                  </h1>
                </Link>
              </>
            )}
          </ul>
        </nav>

        <div className="notification-body">
          <NotificationBody
            showNotificationBody={showNotificationBody}
            setShowNotificationBody={setShowNotificationBody}
            setTriggerClose={setTriggerClose}
          />
        </div>
      </header>
      {/* DROPDOWN MENU, HIDDEN UNTIL CLICKED */}
      <DropdownMenu expandMenu={expandMenu} setExpandMenu={setExpandMenu} />
    </>
  );
};

export default NavBar;
