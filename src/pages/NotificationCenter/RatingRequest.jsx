import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMeetings,
  updateMeeting,
  fetchAllNotifications,
  addRating,
  upholdRating,
  getMeeting,
} from '../../redux/slices';
import FormButton from '../../components/FormButton';

export default function RatingRequest({ notification }) {
  const dispatch = useDispatch();
  const meetings = useSelector(selectMeetings);
  const navigate = useNavigate();

  const token = window.localStorage.getItem('token');

  useEffect(() => {
    dispatch(
      getMeeting({
        meetingId: notification.meeting.id,
        userId: notification.toUser.id,
      })
    );
  }, [notification]);

  const handleRating = async (evt) => {
    evt.preventDefault();
    // dispatch(
    //   updateNotificationStatus({
    //     userId: notification.toUserId,
    //     notificationId: notification.id,
    //     updates: { isAcknowledged: true },
    //   })
    // );

    navigate(`/meeting/${notification.meetingId}/feedback`);
  };

  // console.log('meetingsss', meetings);
  return (
    <div
      id="rating-request-card"
      className="flex flex-col w-full h-34 bg-gray-100/90 rounded-2xl drop-shadow-sm my-3 items-center justify-between py-5"
    >
      <div id="notification-details">
        <p className="px-4 text-center">
          Tell us about your meeting with{' '}
          <span>{notification.fromUser.firstName}</span>
        </p>
      </div>
      <div
        id="btn-container"
        className="flex flex-row gap-2 w-fit lg:w-2/5 h-fit self-center text-xs space-5 justify-center items-center pt-4"
      >
        <FormButton handleSubmit={handleRating}>LEAVE FEEDBACK</FormButton>
      </div>
    </div>
  );
}
