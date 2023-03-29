import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Link } from 'react-router-dom';
import { getMeeting, selectMeetings } from '../../redux/slices';
import {
  getBusinessInfo,
  updateMeeting,
} from '../../redux/slices/meetingSlice';
import FormButton from '../../components/FormButton';
import { updateNotificationStatus } from '../../redux/slices';
import { fetchAllNotifications } from '../../redux/slices';
import axios from 'axios';

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

  console.log('meeting', meetings.business);

  const handleAccept = async () => {
    dispatch(
      updateNotificationStatus({
        userId: notification.toUserId,
        notificationId: notification.id,
        updates: { isAcknowledged: true },
      })
    );

    await axios.put(
      `/api/user/${notification.toUser.id}/meeting/${notification.meeting.id}/confirm`,
      {},
      { headers: { authorization: token } }
    );

    dispatch(fetchAllNotifications({ userId: notification.toUser.id }));
    // console.log('userID', notification.userId);
    // console.log('meeetingID', notification.meetingId);
  };

  const handleReject = () => {};

  // console.log('not', notification);
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
          className="flex flex-row gap-2 w-fit h-fit self-center text-xs space-5"
        >
          <FormButton handleSubmit={handleAccept}>ACCEPT </FormButton>
          <FormButton onClick={handleReject}>REJECT </FormButton>
        </div>
      </div>
    </div>
  );
}

// <button id="accept-btn" className="flex items-end button">
//       ACCEPT
//     </button>
//     <button id="reject-btn" className="flex items-end">
//       REJECT
//     </button>
