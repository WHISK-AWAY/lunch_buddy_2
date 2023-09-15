import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import gsap from 'gsap';

import {
  cancelMeeting,
  updateNotificationStatus,
  selectUnreadNotifications,
} from '../../redux/slices/notificationSlice';
import { selectAuthUser } from '../../redux/slices/authSlice';
import { fetchCurrentMeeting } from '../../redux/slices/meetingSlice';
import { resetMeetingStatus } from '../../redux/slices';

import RejectInvite from '../NotificationCenter/ToastFeedback/RejectInvite';
import FormButton from '../../components/FormButton';
import getWebpUrl from '../../utilities/webpUrl';

const TOAST_POPUP_DELAY = 1000;

const CurrentMeeting = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifications = useSelector(selectUnreadNotifications);

  const currentMeeting = useSelector((state) => state.meetings.currentMeeting);

  const authUser = useSelector(selectAuthUser);

  const topImageRef = useRef(null);

  useEffect(() => {
    // fade bg image in only after it's downloaded

    const bgImg = new Image();
    bgImg.src = '/assets/bgImg/currentMeeting-lq_10.webp';

    if (topImageRef.current !== null) {
      gsap.set(topImageRef.current, { opacity: 0 });

      bgImg.onload = () => {
        gsap.to(topImageRef.current, { opacity: 1, duration: 0.5 });
      };
    }
  }, [topImageRef.current]);

  // useEffect(() => {
  //   // on load, make sure meeting state is cleared
  //   dispatch(resetMeetingStatus());
  // }, []);

  // useEffect(() => {
  //   if (authUser.id) {
  //     // console.log('authUser:', authUser);
  //     dispatch(fetchCurrentMeeting({ userId: authUser.id }));
  //   }
  // }, [authUser.id]);

  function handleCancelButton() {
    // cancel the meeting
    dispatch(
      cancelMeeting({
        userId: authUser.id,
        meetingId: currentMeeting?.id,
      })
    );

    // acknowledge the meeting notification
    const meetingNotification = notifications?.find(
      (notification) => notification.notificationType === 'currentMeeting'
    );

    dispatch(
      updateNotificationStatus({
        userId: authUser.id,
        notificationId: meetingNotification?.id,
        updates: { isAcknowledged: true },
      })
    );

    // user feedback
    setTimeout(() => {
      toast.custom((t) => (
        <RejectInvite buddyFirstName={currentMeeting?.buddy?.firstName} t={t} />
      ));
    }, TOAST_POPUP_DELAY);

    // navigate to home page
    navigate('/');
  }

  function handleChat() {
    navigate(`/meeting/${currentMeeting?.id}/chat`);
  }

  if (!currentMeeting || !currentMeeting.id) {
    return <h1>loading...</h1>;
  }

  const buddy =
    currentMeeting.userId === authUser.id
      ? currentMeeting.buddy
      : currentMeeting.user;

  // const webpUrl = buddy.avatarUrl.split('.').at(0) + '-q1.webp';
  const webpUrl = getWebpUrl(buddy?.avatarUrl);

  return (
    <div className="recap-card  w-screen self-center   justify-between lg:items-center  dark:bg-[#0a0908]  bg-white dark:text-white text-primary-gray    overflow-hidden flex flex-row  landscape:h-[calc(100svh_-_56px)] portrait:h-[calc(100svh_-_56px)] landscape:3xl:h-[calc(100svh_-_64px)]">
      <div
        ref={topImageRef}
        className="recap-image hidden h-screen lg:block lg:h-full lg:basis-1/2 2xl:basis-full bg-[url('/assets/bgImg/currentMeeting.jpg')] supports-[background-image:_url('/assets/bgImg/currentMeeting-lq_10.webp')]:bg-[url('/assets/bgImg/currentMeeting-lq_10.webp')] bg-center bg-cover overflow-hidden"
      ></div>
      <div className="recap-info flex flex-col h-full lg:basis-1/2 gap-12 items-center overflow-auto justify-center basis-full ">
        <div className="recap-header text-headers text-lg landscape:pt-44 landscape:md:pt-0">
          <h1>MEETING DETAILS</h1>
        </div>
        <div className="recap-body flex flex-col items-center gap-1 w-4/5">
          <div className="buddy-avatar-container rounded-full mb-6">
            <picture>
              <source srcSet={webpUrl} type="image/webp" />
              <img
                src={buddy.avatarUrl}
                alt={`${buddy.firstName}'s avatar image`}
                width={1240}
                height={1850}
                className="bg-white object-cover aspect-square h-28 w-28 lg:w-32 lg:h-32 rounded-full z-10 p-1 drop-shadow-md"
              />
            </picture>
          </div>
          <div
            id="meeting-detail-container"
            className="flex flex-col justify-center items-center"
          >
            <h2 className="text-md text-headers pb-4">
              {buddy.fullName.toUpperCase()}
            </h2>
            <p className="text-xs">
              {currentMeeting &&
                new Date(currentMeeting.lunchDate).toLocaleDateString()}
            </p>
            <p className="text-xs">
              {currentMeeting &&
                new Date(currentMeeting?.lunchDate).toLocaleTimeString([], {
                  timeStyle: 'short',
                })}
            </p>
            <p className="text-center font-semibold pt-2">
              <a
                href={currentMeeting?.yelpListing.url}
                target="_blank"
                className="cursor-pointer hover:underline underline-offset-2"
              >
                {currentMeeting?.yelpListing.name.toUpperCase()}
              </a>
            </p>
            <p className="text-xs">
              {currentMeeting &&
                JSON.parse(
                  currentMeeting?.yelpListing.location
                ).display_address?.join(', ')}
            </p>
          </div>
          <div
            id="btn-container"
            className="flex gap-8 justify-between lg:w-3/5 pt-9 text-xs w-11/12 pb-5"
          >
            <FormButton handleSubmit={handleChat}>CHAT</FormButton>
            <FormButton handleSubmit={handleCancelButton}>
              CANCEL MEETING
            </FormButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentMeeting;
