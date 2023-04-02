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

    toast.custom((t) => (
      <RejectInvite notification={currentMeetingNotification} t={t} />
    ));
    navigate('/match');
  }

  function handleChat() {
    navigate('/meeting/${currentMeetingNotification.meetingId}/chat');
  }
  if (meeting.isLoading) {
    return <h1>loading...</h1>;
  }

  if (!buddy?.id) {
    return <h1>failed to load meeting info...</h1>;
  }

  return (
    <div className="recap-card h-[calc(100vh_-_65px)] w-screen gap-12 items-center orange-linear-bg lg:bg-none lg:flex-row lg:items-center bg-fixed text-primary-gray overflow-hidden flex flex-row">
      <div className="recap-image hidden bg-left lg:block lg:h-full lg:basis-1/2 bg-[url('/assets/bgImg/meetingConfView.jpg')] bg-cover overflow-hidden"></div>
      <div className="recap-info flex flex-col basis-full h-full pt-16 lg:basis-1/2 gap-12 items-center overflow-auto justify-center">
        <div className="recap-header text-headers text-lg font-semibold">
          <h1>MEETING DETAILS</h1>
        </div>
        <div className="recap-body flex flex-col items-center gap-1">
          <div className="buddy-avatar-container rounded-full mb-6">
            <img
              src={buddy.avatarUrl}
              alt="Your buddy's avatar image"
              className="bg-white object-cover aspect-square w-28 h-28 rounded-full z-10 p-1 drop-shadow-md"
            />
          </div>
          <h2 className="text-lg font-semibold text-headers pb-1">
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
          className="flex gap-8 items-center w-4/5 lg:w-2/5 text-xs sm:w-3/5"
        >
          <FormButton handleSubmit={handleChat}>CHAT</FormButton>
          <FormButton handleSubmit={handleCancelButton}>CANCEL</FormButton>
        </div>
      </div>
    </div>
  );
};

export default CurrentMeeting;
