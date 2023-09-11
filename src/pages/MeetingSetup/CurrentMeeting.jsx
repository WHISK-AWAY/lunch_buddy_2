import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

const TOAST_POPUP_DELAY = 1000;

const CurrentMeeting = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifications = useSelector(selectUnreadNotifications);

  const currentMeeting = useSelector((state) => state.meetings.currentMeeting);

  const authUser = useSelector(selectAuthUser);

  useEffect(() => {
    // on load, make sure meeting state is cleared
    dispatch(resetMeetingStatus());
  }, []);

  useEffect(() => {
    if (authUser?.id) {
      // console.log('authUser:', authUser);
      dispatch(fetchCurrentMeeting({ userId: authUser.id }));
    }
  }, [authUser]);

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

  // ? performance question: should this be inside a useEffect with a cleanup step?
  AOS.init({
    duration: 2000,
    offset: 0,
  });

  return (
    <div className="recap-card  w-screen self-center   justify-between lg:items-center  dark:bg-[#0a0908]  bg-white dark:text-white text-primary-gray  h-[calc(100vh_-_56px)] sm:h-[calc(100dvh_-_80px)] xs:h-[calc(100dvh_-_71px)] portrait:md:h-[calc(100dvh_-_85px)] portrait:lg:h-[calc(100dvh_-_94px)] md:h-[calc(100dvh_-_60px)] xl:h-[calc(100dvh_-_70px)] 5xl:h-[calc(100dvh_-_80px)]   overflow-hidden flex flex-row">
      <div
        className="recap-image hidden h-screen lg:block lg:h-full lg:basis-1/2 2xl:basis-full bg-[url('/assets/bgImg/test22-lq_10.webp')] bg-center bg-cover overflow-hidden"
        // data-aos="fade-right"
        // data-aos-delay="800"
        // data-aos-duration="1500"
      ></div>
      <div className="recap-info flex flex-col h-full lg:basis-1/2 gap-12 items-center overflow-auto justify-center basis-full">
        <div
          className="recap-header text-headers text-lg "
          // data-aos="fade-up"
          // data-aos-delay="400"
          // data-aos-duration="1000"
        >
          <h1>MEETING DETAILS</h1>
        </div>
        <div className="recap-body flex flex-col items-center gap-1 w-4/5">
          <div
            className="buddy-avatar-container rounded-full mb-6"
            // data-aos="zoom-in"
            // data-aos-delay="800"
            // data-aos-duration="1800"
          >
            <img
              src={currentMeeting?.buddy?.avatarUrl}
              alt="Your buddy's avatar image"
              className="bg-white object-cover aspect-square h-28 w-28 lg:w-32 lg:h-32 rounded-full z-10 p-1 drop-shadow-md"
            />
          </div>
          <div
            id="meeting-detail-container"
            className="flex flex-col justify-center items-center"
            // data-aos="fade-down"
            // data-aos-delay="800"
            // data-aos-duration="2000"
          >
            <h2 className="text-md text-headers pb-4">
              {currentMeeting.buddy.fullName.toUpperCase()}
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
            // data-aos="fade-in"
            // data-aos-delay="800"
            // data-aos-duration="3000"
          >
            <FormButton handleSubmit={handleChat}>CHAT</FormButton>
            <FormButton handleSubmit={handleCancelButton}>CANCEL</FormButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentMeeting;
