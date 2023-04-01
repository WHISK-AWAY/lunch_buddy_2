import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getMeeting, selectMeetings } from '../../redux/slices';
import { getBusinessInfo } from '../../redux/slices/meetingSlice';
import FormButton from '../../components/FormButton';
import {
  updateNotificationStatus,
  cancelMeeting,
  fetchAllNotifications,
} from '../../redux/slices';
import axios from 'axios';
import AcceptInvite from './ToastFeedback/AcceptInvite';
import RejectInvite from './ToastFeedback/RejectInvite';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function MeetingRequest({ notification }) {
  const dispatch = useDispatch();
  const meetings = useSelector(selectMeetings);

  const token = window.localStorage.getItem('token');

  useEffect(() => {
    dispatch(
      getMeeting({
        meetingId: notification.meeting.id,
        userId: notification.toUser.id,
      })
    );
    if (notification.meeting.yelpBusinessId)
      dispatch(getBusinessInfo(notification.meeting.yelpBusinessId));
  }, [notification]);

  const yelpBusinessId = notification.meeting.yelpBusinessId;
  const yelpBusinessAddress =
    meetings.business[yelpBusinessId]?.location.display_address.join(', ');

  // toast.custom(
  //   (t) => (
  //     <RejectInvite notification={notification} meetings={meetings} t={t} />
  //   ),
  //   { duration: Infinity }
  // );
  const handleAccept = async () => {
    toast.custom((t) => (
      <AcceptInvite notification={notification} meetings={meetings} t={t} />
    ));

    await axios.put(
      API_URL +
        `/api/user/${notification.toUser.id}/meeting/${notification.meeting.id}/confirm`,
      {},
      { headers: { authorization: token } }
    );

    dispatch(
      updateNotificationStatus({
        userId: notification.toUserId,
        notificationId: notification.id,
        updates: { isAcknowledged: true },
      })
    );

    setTimeout(() => {
      dispatch(fetchAllNotifications({ userId: notification.toUser.id }));
    }, 500);
  };

  const handleReject = () => {
    toast.custom((t) => <RejectInvite notification={notification} t={t} />);

    dispatch(
      updateNotificationStatus({
        userId: notification.toUserId,
        notificationId: notification.id,
        updates: { isAcknowledged: true },
      })
    );

    dispatch(
      cancelMeeting({
        userId: notification.toUserId,
        meetingId: notification.meetingId,
      })
    );

    setTimeout(() => {
      dispatch(fetchAllNotifications({ userId: notification.toUser.id }));
    }, 500);
  };

  return (
    <div
      id="meeting-card"
      className="flex w-full h-fit bg-gray-100/90 rounded-2xl drop-shadow-sm my-3 items-center justify-between "
    >
      <div id="img-section" className="px-2 h-28 shrink-0">
        <img
          src={notification.fromUser.avatarUrl}
          alt="user avatar"
          className="object-cover  aspect-square w-20 h-20 rounded-[100%] z-10 bg-white p-1  drop-shadow-lg relative translate-y-[30%] "
        />
      </div>
      <div
        id="notification-details"
        className="flex flex-col self-center text-center text-xs w-full py-2"
      >
        <p className="pb-2">new buddy wants to connect</p>
        <p>{notification.fromUser.fullName.toUpperCase()}</p>
        <p>{new Date(notification.meeting.lunchDate).toLocaleString()}</p>
        <p>
          {notification.meeting?.yelpBusinessId &&
            meetings.business[yelpBusinessId]?.name}
        </p>
        <p>{notification.meeting?.yelpBusinessId && yelpBusinessAddress}</p>
        <div
          id="btn-container"
          className="flex flex-row gap-2 w-fit h-fit self-center text-xs space-5 justify-center items-center"
        >
          <FormButton handleSubmit={handleAccept}>ACCEPT </FormButton>
          <FormButton handleSubmit={handleReject}>REJECT </FormButton>
        </div>
      </div>
    </div>
  );
}
