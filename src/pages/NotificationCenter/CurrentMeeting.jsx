import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import RejectInvite from './ToastFeedback/RejectInvite';
import {
  updateNotificationStatus,
  fetchAllNotifications,
} from '../../redux/slices';
import FormButton from '../../components/FormButton';
import xIcon from '../../assets/icons/x-icon.svg';

export default function CurrentMeeting({ notification, meetings }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const yelpBusinessId = notification.meeting.yelpBusinessId;
  const yelpBusinessAddress =
    meetings.business[yelpBusinessId]?.location.display_address.join(', ');

  function goToMessages() {
    navigate(`/meeting/${notification.meetingId}/chat`);
  }

  function cancelMeeting() {
    acknowledge();
    dispatch(
      fetchAllNotifications({
        userId: notification.toUserId,
        meetingId: notification.meetingId,
      })
    );
    toast.custom((t) => <RejectInvite notification={notification} t={t} />);
  }

  function acknowledge() {
    dispatch(
      updateNotificationStatus({
        userId: notification.toUserId,
        notificationId: notification.id,
        updates: { isAcknowledged: true },
      })
    );

    dispatch(fetchAllNotifications());
  }

  return (
    <div
      id="meeting-card"
      className="flex w-full h-fit bg-gray-100/90 rounded-2xl drop-shadow-sm my-3 items-center justify-between pb-3"
    >
      <div
        id="notification-details"
        className="flex flex-col self-center text-center text-base w-full py-2 px-5 pb-2"
      >
        <p className="pb-2 lg:pt-7 pt-8">You've got a confirmed lunch buddy!</p>
        <p className="text-headers text-lg">
          {notification.fromUser.fullName.toUpperCase()}
        </p>
        <p className="text-sm">
          {new Date(notification.meeting.lunchDate).toLocaleDateString()}
        </p>
        <p className="text-sm">
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
          className="flex flex-col md:flex-row md:w-4/5 md:gap-7 lg:gap-7 gap-2 lg:w-full w-fit h-fit self-center text-xs space-5 justify-center items-center pt-3"
        >
          <FormButton handleSubmit={goToMessages}>
            MESSAGE {notification.fromUser.firstName.toUpperCase()}
          </FormButton>
          <FormButton handleSubmit={cancelMeeting}>CANCEL MEETING</FormButton>
          <div
            id="x-icon"
            className="absolute w-6 right-3 top-3"
            onClick={acknowledge}
          >
            <img src={xIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}
