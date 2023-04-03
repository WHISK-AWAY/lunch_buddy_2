import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  updateNotificationStatus,
  fetchAllNotifications,
} from '../../redux/slices';
import FormButton from '../../components/FormButton';
import xIcon from '../../assets/icons/x-icon.svg';

export default function NewMessageReceived({ notification }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function acknowledgeAndGoToMessages() {
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

    dispatch(
      fetchAllNotifications({
        userId: notification.toUserId,
      })
    );
  }

  return (
    <div
      id="meeting-card"
      className="flex w-full h-fit bg-gray-100/90 rounded-2xl drop-shadow-sm my-3 items-center justify-between py-3"
    >
      <div
        id="x-icon"
        className="absolute w-5 right-3 top-3"
        onClick={acknowledge}
      >
        <img src={xIcon} />
      </div>
      <div id="img-section" className="flex px-2 shrink-0 self-center pl-5">
        <img
          src={notification.fromUser.avatarUrl}
          alt="user avatar"
          className="object-cover aspect-square w-16 h-16 lg:w-20 lg:h-20 rounded-[100%] z-10 bg-white p-1  drop-shadow-lg relative"
        />
      </div>
      <div
        id="notification-details"
        className="flex flex-col self-center text-center text-sm w-full py-3 px-3"
      >
        <p className="pb-6">
          {' '}
          New message from {notification.fromUser.firstName}
        </p>
        <p></p>
        <div
          id="btn-container"
          className="flex flex-row gap-5 w-3/5 h-5 self-center text-xs space-5 items-center"
        >
          <FormButton handleSubmit={() => acknowledgeAndGoToMessages()}>
            REPLY
          </FormButton>
        </div>
      </div>
    </div>
  );
}
