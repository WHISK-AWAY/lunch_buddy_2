import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearNotificationState,
  resetUserState,
  selectUnreadNotifications,
} from '../redux/slices';
import { selectAuthUser, logOut } from '../redux/slices/authSlice';
import DropDownItem from './DropDownItem';
import Homepage from '../pages/Homepage/Homepage';
import { useNavigate } from 'react-router-dom';
import { selectUnreadActiveMeeting } from '../redux/slices/notificationSlice';
import getLocation from '../utilities/geo';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const DropdownMenu = ({ expandMenu, setExpandMenu }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector(selectAuthUser);
  const notifications = useSelector(selectUnreadNotifications);
  const userState = useSelector((state) => state.user.user);
  const currentMeetingNotification = notifications?.filter(
    (notification) => notification.notificationType === 'currentMeeting'
  )[0];

  const activeMeeting = useSelector(selectUnreadActiveMeeting);

  function handleClick() {
    setExpandMenu(false);
  }

  function handleLogout() {
    setExpandMenu(false);
    dispatch(clearNotificationState());
    dispatch(resetUserState());
    dispatch(logOut());
    navigate('/');
  }

  async function handleDemoMode() {
    setExpandMenu(false);
    // getLocation(dispatch);

    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude, longitude } = position.coords;
        const center = {
          latitude,
          longitude,
        };
        axios
          .post(
            API_URL + '/api/user/generate/demo',
            {
              center,
              radius: 0.5,
              city: userState.city,
              state: userState.state,
              id: userState.id,
            },
            {
              headers: {
                Authorization: window.localStorage.getItem('token'),
              },
            }
          )
          .then(() => navigate('/match'));
        // console.log(center);
      },
      function (err) {
        console.log('user denied location services permission:', err);
      }
    );

    // setTimeout(async () => {
    //   const center = {
    //     latitude: userState.lastLat,
    //     longitude: userState.lastLong,
    //   };

    //   await axios.post(
    //     API_URL + '/api/user/generate/demo',
    //     {
    //       center,
    //       radius: 1,
    //       city: userState.city,
    //       state: userState.state,
    //       id: userState.id,
    //     },
    //     {
    //       headers: {
    //         Authorization: window.localStorage.getItem('token'),
    //       },
    //     }
    //   );
    //   console.log('userState:', userState);
    //   navigate('/match');
    // }, 5000);
    // set status to active
    // call the demo mode route
    // maybe a demo mode toast?
  }

  //prevent scroll on overflow when the menu is open
  // useEffect(() => {
  //   if (expandMenu) {
  //     document.body.style.overflow = 'hidden';
  //     return () => {
  //       document.body.style.overflow = '';
  //     };
  //   }
  // }, []);
  return (
    <div className={expandMenu ? '' : `group hover`}>
      <div
        className={`transform group-[.hover]:scale-y-0 scale-y-100  overflow:hidden dark:text-white dark:bg-[#0a0908] absolute transition-transform duration-[600ms] ease-in-out origin-top-left -bottom-screen bg-white w-screen opacity-95 transition-opacity-0 z-50 `}
      >
        <ul className="flex flex-col items-center ">
          {!authUser.firstName ? (
            <>
              {/* NAV LINKS WHEN NOT SIGNED IN */}
              <DropDownItem handleClick={handleClick} linkTo="/register">
                SIGN UP
              </DropDownItem>
              <DropDownItem handleClick={handleClick} linkTo="/login">
                LOG IN
              </DropDownItem>
              <DropDownItem handleClick={handleClick} linkTo="/">
                HOME
              </DropDownItem>
            </>
          ) : (
            <>
              {/* NAV LINKS WHEN SIGNED IN */}
              <DropDownItem handleClick={handleClick} linkTo="/">
                HOME
              </DropDownItem>
              <DropDownItem handleClick={handleClick} linkTo="/account">
                ACCOUNT
              </DropDownItem>
              {!currentMeetingNotification?.id ? (
                <DropDownItem handleClick={handleClick} linkTo="/match">
                  NEW MEETING
                </DropDownItem>
              ) : (
                <DropDownItem
                  handleClick={handleClick}
                  linkTo="/meeting/current"
                >
                  CURRENT MEETING
                </DropDownItem>
              )}
              {currentMeetingNotification?.id && (
                <DropDownItem
                  handleClick={handleClick}
                  linkTo={`/meeting/${currentMeetingNotification.meetingId}/chat`}
                >
                  MESSAGES
                </DropDownItem>
              )}
              <DropDownItem handleClick={handleDemoMode}>
                DEMO MODE
              </DropDownItem>
              <DropDownItem handleClick={handleLogout}>LOG OUT</DropDownItem>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
