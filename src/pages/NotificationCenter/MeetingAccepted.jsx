import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { updateNotificationStatus } from '../../redux/slices';
import FormButton from '../../components/FormButton';

export default function MeetingAccepted({ notification }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function acknowledgeAndMessage() {
    acknowledge();
    navigate(`/meeting/${notification.meetingId}/chat`);
  }

  function acknowledge() {
    dispatch(
      updateNotificationStatus({
        userId: notification.toUserId,
        notificationId: notification.id,
        updates: { isAcknowledged: true },
      })
    );
  }

  return (
    <div
      id="meeting-card"
      className="flex w-full h-fit bg-gray-100/90 rounded-2xl drop-shadow-sm my-3 items-center justify-between "
    >
      <div
        id="notification-details"
        className="flex flex-col self-center text-center text-xs w-full py-2"
      >
        <p className="pb-2">
          great news! {notification.fromUser.firstName} is looking forward to
          meeting up with you at{' '}
          {new Date(notification.meeting.lunchDate).toLocaleTimeString(
            'en-US',
            {
              timeStyle: 'short',
            }
          )}
          !
        </p>
        <div
          id="btn-container"
          className="flex flex-row gap-2 w-fit h-fit self-center text-xs space-5 justify-center items-center"
        >
          <FormButton handleSubmit={acknowledgeAndMessage}>
            MESSAGE {notification.fromUser.firstName}
          </FormButton>
          <FormButton handleSubmit={acknowledge}>DISMISS</FormButton>
        </div>
      </div>
    </div>
  );
}
