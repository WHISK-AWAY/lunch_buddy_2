import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearNotificationState,
  resetUserState,
  selectUnreadNotifications,
} from '../redux/slices';
import { selectAuthUser, logOut } from '../redux/slices/authSlice';
import DropDownItem from './DropDownItem';
import { useNavigate } from 'react-router-dom';
import { selectUnreadActiveMeeting } from '../redux/slices/notificationSlice';
import axios from 'axios';

import gsap from 'gsap';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const DropdownMenu = ({ menuMode, navHeight, closeMenu }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wrapperRef = useRef(null);
  const screenRef = useRef(null);
  const previousModeRef = useRef(null);

  const [demoModeAvailable, setDemoModeAvailable] = useState(false);

  const authUser = useSelector(selectAuthUser);
  const notifications = useSelector(selectUnreadNotifications);
  const userState = useSelector((state) => state.user.user);
  const currentMeetingNotification = notifications?.filter(
    (notification) => notification.notificationType === 'currentMeeting'
  )[0];

  useEffect(() => {
    if (menuMode === 'dropdown') {
      previousModeRef.current = 'dropdown';
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({});

        tl.set(screenRef.current, { display: 'block' })
          .to(wrapperRef.current, {
            y: '+=100%',
            duration: 0.25,
            ease: 'power1.in',
          })
          .to(
            screenRef.current,
            {
              backdropFilter: 'blur(8px)',
              duration: 0.25,
            },
            '<'
          );
      });

      return () => ctx.revert();
    } else {
      if (previousModeRef.current === 'dropdown') {
        const ctx = gsap.context(() => {
          const tl = gsap.timeline();

          tl.from(wrapperRef.current, {
            y: '+=100%',
            ease: 'power1.in',
            duration: 0.25,
          })
            .from(
              screenRef.current,
              {
                backdropFilter: 'blur(8px)',
                display: 'block',
                duration: 0.25,
              },
              '<'
            )
            .set(screenRef.current, { display: 'none' });
        });

        previousModeRef.current = null;

        return () => ctx.revert();
      }
    }
  }, [menuMode, wrapperRef.current]);

  useEffect(() => {
    // if logged in, check whether user has already triggered demo mode & set variable accordingly
    if (authUser.id) {
      const demoFlag = window.localStorage.getItem('demoMode');

      if (!demoFlag || demoFlag === 'false') {
        window.localStorage.setItem('demoMode', 'false');
        setDemoModeAvailable(true);
      }
    }
  }, [authUser.id]);

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
          .then(() => {
            window.localStorage.setItem('demoMode', 'true');
            navigate('/match');
          });
        // console.log(center);
      },
      function (err) {
        console.log('error setting up demo mode:', err);
      }
    );
  }

  /**
   * Removed from wrapper class list:
   *
   * top-0
   */

  return (
    <>
      <div
        ref={screenRef}
        className="fixed bottom-0 h-screen w-screen backdrop-blur-0 bg-transparent z-20"
        style={{ display: 'none' }}
      ></div>
      <div
        ref={wrapperRef}
        id="dropdown-container"
        className={`dark:text-white dark:bg-[#0a0908] -translate-y-full overflow-clip fixed bg-white w-screen opacity-95 z-30 -top-${navHeight}`}
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
              {demoModeAvailable && (
                <DropDownItem handleClick={handleDemoMode}>
                  DEMO MODE
                </DropDownItem>
              )}
              <DropDownItem handleClick={handleLogout}>LOG OUT</DropDownItem>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default DropdownMenu;
