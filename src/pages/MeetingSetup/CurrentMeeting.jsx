import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  getMeeting,
  selectActiveMeeting,
} from '../../redux/slices/meetingSlice';
import { resetMeetingStatus } from '../../redux/slices';
import {
  cancelMeeting,
  selectUnreadActiveMeeting,
  updateNotificationStatus,
  selectUnreadNotifications,
} from '../../redux/slices/notificationSlice';
import { selectAuthUser } from '../../redux/slices/authSlice';
import RejectInvite from '../NotificationCenter/ToastFeedback/RejectInvite';
import FormButton from '../../components/FormButton';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TOAST_POPUP_DELAY = 1000;

const CurrentMeeting = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const meeting = useSelector((state) => state.meetings);
  const currentMeeting = useSelector(selectActiveMeeting);
  const authUser = useSelector(selectAuthUser);
  const notifications = useSelector(selectUnreadNotifications);

  const [buddy, setBuddy] = useState({});
  const [currentMeetingNotification, setCurrentMeetingNotification] = useState(
    {}
  );

  useEffect(() => {
    // on load, make sure meeting state is cleared
    dispatch(resetMeetingStatus());
  }, []);

  useEffect(() => {
    const thisMeeting = notifications?.filter(
      (notification) => notification.notificationType === 'currentMeeting'
    )[0];
    setCurrentMeetingNotification(thisMeeting);
  }, [notifications]);

  useEffect(() => {
    if (currentMeetingNotification?.id) {
      dispatch(
        getMeeting({
          meetingId: currentMeetingNotification.meetingId,
          userId: currentMeetingNotification.toUserId,
        })
      );

      setBuddy(currentMeetingNotification?.fromUser);
    }
  }, [currentMeetingNotification]);

  function handleCancelButton() {
    dispatch(
      cancelMeeting({
        userId: currentMeetingNotification.toUserId,
        meetingId: currentMeetingNotification.meetingId,
      })
    );
    dispatch(
      updateNotificationStatus({
        userId: currentMeetingNotification.toUserId,
        notificationId: currentMeetingNotification.id,
        updates: { isAcknowledged: true },
      })
    );

    setTimeout(() => {
      toast.custom((t) => (
        <RejectInvite notification={currentMeetingNotification} t={t} />
      ));
    }, TOAST_POPUP_DELAY);
    navigate('/');
  }

  function handleChat() {
    navigate(`/meeting/${currentMeetingNotification.meetingId}/chat`);
  }
  if (meeting.isLoading) {
    return <h1>loading...</h1>;
  }

  if (!buddy?.id) {
    return <h1>failed to load meeting info...</h1>;
  }

  AOS.init({
    duration: 2000,
    offset: 0,
  });

  return (
    <div className="recap-card h-[calc(100vh_-_65px)] w-screen self-center orange-linear-bg lg:bg-none justify-between lg:items-center bg-fixed text-primary-gray overflow-hidden flex flex-row">
      <div
        className="recap-image hidden bg-left lg:block lg:h-full lg:basis-1/2 bg-[url('/assets/bgImg/meetingConfView.jpg')] bg-cover overflow-hidden"
        data-aos="fade-right"
        data-aos-delay="800"
        data-aos-duration="1500"
      ></div>
      <div className="recap-info flex flex-col h-full lg:basis-1/2 gap-12 items-center overflow-auto justify-center basis-full">
        <div
          className="recap-header text-headers text-lg font-semibold"
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-duration="1000"
        >
          <h1>MEETING DETAILS</h1>
        </div>
        <div className="recap-body flex flex-col items-center gap-1 w-4/5">
          <div
            className="buddy-avatar-container rounded-full mb-6"
            data-aos="zoom-in"
            data-aos-delay="800"
            data-aos-duration="1800"
          >
            <img
              src={buddy.avatarUrl}
              alt="Your buddy's avatar image"
              className="bg-white object-cover aspect-square h-28 w-28 lg:w-32 lg:h-32 rounded-full z-10 p-1 drop-shadow-md"
            />
          </div>
          <div
            id="meeting-detail-container"
            className="flex flex-col justify-center items-center"
            data-aos="fade-down"
            data-aos-delay="800"
            data-aos-duration="2000"
          >
            <h2 className="text-md text-headers pb-4">
              {buddy.fullName.toUpperCase()}
            </h2>
            <p>
              {currentMeetingNotification.id &&
                new Date(
                  currentMeetingNotification.meeting.lunchDate
                ).toLocaleDateString()}
            </p>
            <p className="text-base">
              {currentMeetingNotification.id &&
                new Date(
                  currentMeetingNotification.meeting.lunchDate
                ).toLocaleTimeString([], {
                  timeStyle: 'short',
                })}
            </p>
            <p className="font-semibold">
              <a href={currentMeeting?.restaurant?.url} target="_blank">
                {currentMeeting?.restaurant?.name.toUpperCase()}
              </a>
            </p>
            <p>
              {currentMeeting?.restaurant?.location.display_address.join(', ')}
            </p>
          </div>
          <div
            id="btn-container"
            className="flex gap-8 justify-between lg:w-3/5 pt-9 text-xs w-11/12"
            data-aos="fade-in"
            data-aos-delay="800"
            data-aos-duration="3000"
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
