import React, { useEffect, useRef } from 'react';
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

import gsap from 'gsap';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const DropdownMenu = ({ menuMode, navHeight, closeMenu }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wrapperRef = useRef(null);
  const tlRef = useRef(null);

  const authUser = useSelector(selectAuthUser);
  const notifications = useSelector(selectUnreadNotifications);
  const userState = useSelector((state) => state.user.user);
  const currentMeetingNotification = notifications?.filter(
    (notification) => notification.notificationType === 'currentMeeting'
  )[0];

  useEffect(() => {
    if (menuMode === 'dropdown') {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tlRef.current = tl;

        tl.to(wrapperRef.current, {
          y: navHeight,
          duration: 0.5,
        });
      });

      return () => {
        if (tlRef.current) {
          tlRef.current.reverse().then(() => {
            tlRef.current = null;
            ctx.revert();
          });
        } else ctx.revert();
      };
    }
  }, [menuMode, wrapperRef.current]);

  const activeMeeting = useSelector(selectUnreadActiveMeeting);

  function handleClick() {
    // setExpandMenu(false);
    closeMenu();
  }

  function handleLogout() {
    // setExpandMenu(false);
    dispatch(clearNotificationState());
    dispatch(resetUserState());
    dispatch(logOut());
    navigate('/');
  }

  async function handleDemoMode() {
    // TODO: move this to its own spot (or into geo module)
    // setExpandMenu(false);
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
    <div
      ref={wrapperRef}
      id="dropdown-container"
      className="overflow:hidden dark:text-white dark:bg-[#0a0908] -translate-y-full absolute top-0 bg-white w-screen opacity-95 z-50"
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
              <DropDownItem handleClick={handleClick} linkTo="/meeting/current">
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
            <DropDownItem handleClick={handleDemoMode}>DEMO MODE</DropDownItem>
            <DropDownItem handleClick={handleLogout}>LOG OUT</DropDownItem>
          </>
        )}
      </ul>
    </div>
  );
};

export default DropdownMenu;
