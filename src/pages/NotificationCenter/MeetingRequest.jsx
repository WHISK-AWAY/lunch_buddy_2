import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getMeeting, selectMeetings } from '../../redux/slices';
import { getBusinessInfo } from '../../redux/slices/meetingSlice';
import {
  updateNotificationStatus,
  cancelMeeting,
  fetchAllNotifications,
} from '../../redux/slices';
import axios from 'axios';
import AcceptInvite from './ToastFeedback/AcceptInvite';
import RejectInvite from './ToastFeedback/RejectInvite';
import NewUserWelcome from './ToastFeedback/NewUserWelcome';
import RatingSubmitted from './ToastFeedback/RatingSubmitted';
import NewMessageReceived from './NewMessageReceived';
import MeetingCancelled from './MeetingCancelled';
import Rating from '../Feedback/Rating';
import ReportSubmitted from './ToastFeedback/ReportSubmitted';

import NotificationButton from '../../components/NotificationButton';
import getWebpUrl from '../../utilities/webpUrl';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const TOAST_POPUP_DELAY = 1000;

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
  //     <ReportSubmitted notification={notification} meetings={meetings} t={t} />
  //   ),
  //   { duration: Infinity }
  // );

  function acknowledge() {
    dispatch(
      updateNotificationStatus({
        userId: notification.toUserId,
        notificationId: notification.id,
        updates: { isAcknowledged: true },
      })
    );

    dispatch(
      fetchAllNotifications({
        userId: notification.toUserId,
      })
    );
  }

  const handleAccept = async () => {
    acknowledge();

    setTimeout(() => {
      toast.custom((t) => (
        <AcceptInvite notification={notification} meetings={meetings} t={t} />
      ));
    }, TOAST_POPUP_DELAY);

    await axios.put(
      API_URL +
        `/api/user/${notification.toUser.id}/meeting/${notification.meeting.id}/confirm`,
      {},
      { headers: { authorization: token } }
    );

    // dispatch(
    //   updateNotificationStatus({
    //     userId: notification.toUserId,
    //     notificationId: notification.id,
    //     updates: { isAcknowledged: true },
    //   })
    // );

    setTimeout(() => {
      dispatch(fetchAllNotifications({ userId: notification.toUser.id }));
    }, 500);
  };

  const handleReject = () => {
    acknowledge();
    setTimeout(() => {
      toast.custom((t) => <RejectInvite notification={notification} t={t} />);
    }, TOAST_POPUP_DELAY);

    // dispatch(
    //   updateNotificationStatus({
    //     userId: notification.toUserId,
    //     notificationId: notification.id,
    //     updates: { isAcknowledged: true },
    //   })
    // );

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

  // const webpUrl = notification.fromUser.avatarUrl.split('.').at(0) + '-q1.webp';
  const webpUrl = getWebpUrl(notification?.fromUser?.avatarUrl);

  return (
    <div
      id="meeting-card"
      className="flex w-full h-fit bg-white dark:bg-[#0a0908] dark:text-white rounded-sm drop-shadow-sm my-3 py-3 items-center justify-between px-4"
    >
      <div id="img-section" className="flex  shrink-0 self-center">
        <picture>
          <source srcSet={webpUrl} type="image/webp" />
          <img
            src={notification.fromUser.avatarUrl}
            width={1240}
            height={1850}
            alt={`${notification.fromUser.firstName}'s avatar image`}
            className="object-cover aspect-square w-16 h-16 lg:w-24 lg:h-24 rounded-[100%] z-10 bg-white p-1  drop-shadow-lg relative "
          />
        </picture>
      </div>
      <div
        id="notification-details"
        className="flex flex-col self-center text-center text-xs w-full py-2"
      >
        <p className="pb-2 px-3">New lunch invitation</p>
        <p className="text-headers pb-1 text-sm">
          {notification.fromUser.fullName.toUpperCase()}
        </p>
        <p>{new Date(notification.meeting.lunchDate).toLocaleDateString()}</p>
        <p>
          {new Date(notification.meeting.lunchDate).toLocaleTimeString([], {
            timeStyle: 'short',
          })}
        </p>
        <p>
          {notification.meeting?.yelpBusinessId &&
            meetings.business[yelpBusinessId]?.name}
        </p>
        <p>{notification.meeting?.yelpBusinessId && yelpBusinessAddress}</p>
        <div
          id="btn-container"
          className="flex flex-col sm:flex-row sm:gap-4 sm:w-3/5 lg:flex-row lg:gap-7 gap-2 lg:w-full w-full h-fit self-center text-xs space-5 justify-center items-center lg:pt-3 pt-5 lg:px-5 relative"
        >
          <NotificationButton handleSubmit={handleAccept}>
            ACCEPT{' '}
          </NotificationButton>
          <NotificationButton handleSubmit={handleReject}>
            REJECT{' '}
          </NotificationButton>
        </div>
      </div>
    </div>
  );
}
