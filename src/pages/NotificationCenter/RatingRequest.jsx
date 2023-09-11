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
import NotificationButton from '../../components/NotificationButton';

export default function RatingRequest({ notification, closeMenu }) {
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
    closeMenu();
    evt.preventDefault();
    // setTriggerClose(true);
    navigate(`/meeting/${notification.meetingId}/feedback`);
  };

  return (
    <div
      id="rating-request-card"
      className="flex flex-col w-full h-34 bg-white dark:bg-[#0a0908] rounded-sm drop-shadow-sm my-3 items-center dark:text-white justify-between py-5 text-xs sm:text-sm portrait:lg:text-lg md:text-xs 2xl:text-sm"
    >
      <div id="notification-details">
        <p className="px-4 text-center">
          Tell us about your meeting with{' '}
          <span>{notification.fromUser.firstName}</span>
        </p>
      </div>
      <div
        id="btn-container"
        className="flex flex-row gap-2 w-fit lg:w-2/5 h-fit self-center  space-5 justify-center items-center pt-4"
      >
        <NotificationButton handleSubmit={handleRating}>
          <span className="text-xs md:text-[1vw] 4xl:text-xs">
            LEAVE FEEDBACK
          </span>
        </NotificationButton>
      </div>
    </div>
  );
}
