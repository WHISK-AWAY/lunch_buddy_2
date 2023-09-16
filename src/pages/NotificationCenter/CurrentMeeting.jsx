import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import RejectInvite from './ToastFeedback/RejectInvite';
import {
  updateNotificationStatus,
  fetchAllNotifications,
  cancelMeeting,
} from '../../redux/slices';
import xIcon from '../../assets/icons/x-icon.svg';
import xIconWhite from '../../assets/icons/x-icon-white.svg';
import NotificationButton from '../../components/NotificationButton';
import { selectDarkMode } from '../../redux/slices/darkModeSlice';
// delay between cancel button & feedback note popup (ms)
const TOAST_POPUP_DELAY = 1000;

export default function CurrentMeeting({ notification, meetings, closeMenu }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [triggerCancel, setTriggerCancel] = useState(false);
  const [minimize, setMinimize] = useState(false);
  const darkMode = useSelector(selectDarkMode);

  const [xMenuIcon, setXMenuIcon] = useState(xIconWhite);

  const yelpBusinessId = notification.meeting.yelpBusinessId;
  const yelpBusinessAddress =
    meetings.business[yelpBusinessId]?.location.display_address.join(', ');

  useEffect(() => {
    if (triggerCancel) {
      // setTriggerClose(true);
      acknowledge();
      closeMenu();
      dispatch(
        cancelMeeting({
          userId: notification.toUserId,
          meetingId: notification.meetingId,
        })
      );
      setTimeout(() => {
        toast.custom((t) => (
          <RejectInvite
            buddyFirstName={notification.fromUser?.firstName}
            t={t}
          />
        ));
      }, TOAST_POPUP_DELAY);
      navigate('/');
    }
  }, [triggerCancel]);

  function goToMessages() {
    // setTriggerClose(true);
    navigate(`/meeting/${notification.meetingId}/chat`);
    closeMenu();
  }

  useEffect(() => {
    if (darkMode) {
      setXMenuIcon(xIconWhite);
    } else {
      setXMenuIcon(xIcon);
    }
  }, [darkMode]);

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
        className="group-[.is-minimized]:scale-0 group-[.is-minimized]:hidden scale-100 flex w-full h-fit bg-white dark:bg-[#0a0908] dark:text-white rounded-sm drop-shadow-sm my-3 items-center justify-between pb-3"
      >
        <div
          id="notification-details"
          className="flex flex-col self-center text-center text-xs sm:text-sm md:text-xs w-full py-2 px-5 pb-2 portrait:lg:text-lg 2xl:text-sm"
        >
          <p className="pb-2 lg:pt-7 pt-8">
            You've got a confirmed lunch buddy!
          </p>
          <p className="text-headers text-xs portrait:lg:text-lg 2xl:text-sm">
            {notification.fromUser.fullName.toUpperCase()}
          </p>
          <p className="text-xs portrait:lg:text-base md:text-[1.1vw] xl:text-xs">
            {new Date(notification.meeting.lunchDate).toLocaleDateString()}
          </p>
          <p className="text-xs portrait:lg:text-base md:text-[1.1vw] xl:text-xs">
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
            className="flex flex-col md:flex-row  md:gap-3 lg:gap-7 gap-2 lg:w-full w-fit md:w-full h-fit self-center text-xs space-5 justify-center items-center pt-3 "
          >
            <NotificationButton handleSubmit={goToMessages}>
              <span className="md:text-[1vw] 4xl:text-xs">
                MESSAGE {notification.fromUser.firstName.toUpperCase()}
              </span>
            </NotificationButton>
            <NotificationButton
              handleSubmit={() => {
                setTriggerCancel(true);
              }}
            >
              <span className="md:text-[1vw] 4xl:text-xs"> CANCEL MEETING</span>
            </NotificationButton>
            <div
              id="x-icon"
              className="absolute w-5  right-3 top-3 cursor-pointer"
              onClick={() => {
                setMinimize(true);
              }}
            >
              <img src={xMenuIcon} alt="close this notification" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
