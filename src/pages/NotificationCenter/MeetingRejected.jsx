import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  updateNotificationStatus,
  fetchAllNotifications,
} from '../../redux/slices';
import FormButton from '../../components/FormButton';
import xIcon from '../../assets/icons/x-icon.svg';

export default function MeetingRejected({ notification }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function acknowledgeAndFindBuddy() {
    acknowledge();
    navigate('/match');
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
      className="flex w-full h-fit bg-white rounded-sm drop-shadow-sm my-3 items-center justify-between py-3 px-3"
    >
      <div
        id="notification-details"
        className="flex flex-col self-center text-center text-base w-full py-2"
      >
        <p className="pb-2">OH NO!</p>
        <p className="pb-2">
          Turns out {notification.fromUser.firstName} isn't available.
        </p>
        <p className="pb-2">
          Let's go find you{' '}
          <Link to="/match" className="text-headers">
            another buddy
          </Link>
        </p>
        <div
          id="btn-container"
          className="flex flex-row gap-2 w-3/5 px-7 h-fit self-center text-xs space-5 justify-center items-center pt-5"
        >
          <FormButton handleSubmit={acknowledgeAndFindBuddy}>
            FIND BUDDY
          </FormButton>
          <div
            id="x-icon"
            className="absolute w-6 right-3 top-3 cursor-pointer"
            onClick={acknowledge}
          >
            <img src={xIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}
