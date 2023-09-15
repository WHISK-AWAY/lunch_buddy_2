import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

import {
  clearNotificationState,
  resetUserState,
  selectUnreadNotifications,
} from '../redux/slices';
import { selectAuthUser, logOut } from '../redux/slices/authSlice';

import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);
import DropDownItem from './DropDownItem';
import { generateGeoDemo } from '../utilities/geo';

const DropdownMenu = ({ menuMode, closeMenu }) => {
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

  const demoFlag = window.localStorage.getItem('demoMode');

  useEffect(() => {
    // if logged in, check whether user has already triggered demo mode & set variable accordingly
    if (authUser.id) {
      if (!demoFlag || demoFlag === 'false') {
        window.localStorage.setItem('demoMode', 'false');
        setDemoModeAvailable(true);
      }
    }
  }, [authUser.id, demoFlag]);

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
    closeMenu();

    setDemoModeAvailable(false);

    generateGeoDemo(userState, navigate, dispatch);

    // toast.custom((t) => <DemoMode t={t} />, { duration: 6000 });
  }

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
        className={` ${
          !authUser.firstName
            ? 'landscape:lg:h-[40svh] '
            : 'landscape:h-[60svh]'
        } dark:text-white dark:bg-[#0a0908]/60 bg-white/60 -translate-y-full fixed  w-screen opacity-95 z-30 landscape:lg:h-[60svh] landscape:h-[calc(100svh_-_56px)] portrait:h-[100svh] `}
      >
        <ul className="flex flex-col items-center short:py-6  justify-center   overflow-y-auto portrait:h-full landscape:lg:h-full landscape:h-full align-center ">
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
