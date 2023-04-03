import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import RejectInvite from './ToastFeedback/RejectInvite';
import {
  updateNotificationStatus,
  fetchAllNotifications,
  cancelMeeting,
} from '../../redux/slices';
import FormButton from '../../components/FormButton';
import xIcon from '../../assets/icons/x-icon.svg';

// delay between cancel button & feedback note popup (ms)
const TOAST_POPUP_DELAY = 1000;

export default function CurrentMeeting({
  notification,
  meetings,
  setTriggerClose,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [triggerCancel, setTriggerCancel] = useState(false);
  const [minimize, setMinimize] = useState(false);

  const yelpBusinessId = notification.meeting.yelpBusinessId;
  const yelpBusinessAddress =
    meetings.business[yelpBusinessId]?.location.display_address.join(', ');

  useEffect(() => {
    if (triggerCancel) {
      setTriggerClose(true);
      acknowledge();
      dispatch(
        cancelMeeting({
          userId: notification.toUserId,
          meetingId: notification.meetingId,
        })
      );
      setTimeout(() => {
        toast.custom((t) => <RejectInvite notification={notification} t={t} />);
      }, TOAST_POPUP_DELAY);
      navigate('/');
    }
  }, [triggerCancel]);

  function goToMessages() {
    setTriggerClose(true);
    navigate(`/meeting/${notification.meetingId}/chat`);
  }

  // function cancelMeeting() {}

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
    <div className={`minimize-wrapper ${minimize && 'group is-minimized'}`}>
      <div
        id="meeting-card"
        className="group-[.is-minimized]:scale-0 group-[.is-minimized]:hidden scale-100 flex w-full h-fit bg-gray-100/90 rounded-2xl drop-shadow-sm my-3 items-center justify-between pb-3"
      >
        <div
          id="notification-details"
          className="flex flex-col self-center text-center text-base w-full py-2 px-5 pb-2"
        >
          <p className="pb-2 lg:pt-7 pt-8">
            You've got a confirmed lunch buddy!
          </p>
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
            <FormButton handleSubmit={() => setTriggerCancel(true)}>
              CANCEL MEETING
            </FormButton>
            <div
              id="x-icon"
              className="absolute w-6 right-3 top-3"
              onClick={() => setMinimize(true)}
            >
              <img src={xIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
