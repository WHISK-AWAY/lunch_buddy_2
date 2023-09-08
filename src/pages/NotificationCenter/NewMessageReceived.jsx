import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  updateNotificationStatus,
  fetchAllNotifications,
} from '../../redux/slices';
import NotificationButton from '../../components/NotificationButton';
import xIcon from '../../assets/icons/x-icon.svg';
import xIconWhite from '../../assets/icons/x-icon-white.svg';

export default function NewMessageReceived({ notification, isDarkMode, setIsDarkMode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [xMenuIcon, setXMenuIcon] = useState(xIconWhite);

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


  useEffect(() => {
    if (isDarkMode) {
      setXMenuIcon(xIconWhite);
    } else {
      setXMenuIcon(xIcon);
    }
  }, [isDarkMode]);

  return (
    <div
      id="meeting-card"
      className="flex w-full h-fit bg-white dark:bg-[#0a0908] dark:text-white rounded-sm drop-shadow-sm my-3 items-center justify-between py-3"
    >
      <div
        id="x-icon"
        className="absolute w-5 right-3 top-3 cursor-pointer"
        onClick={acknowledge}
      >
        <img src={xMenuIcon} />
      </div>
      <div id="img-section" className="flex  shrink-0 self-center pl-4">
        <img
          src={notification.fromUser.avatarUrl}
          alt="user avatar"
          className="object-cover aspect-square w-16 h-16 lg:w-20 lg:h-20 rounded-[100%] z-10 bg-white p-1  drop-shadow-lg relative"
        />
      </div>
      <div
        id="notification-details"
        className="flex flex-col 2xl:text-sm self-center text-center text-xs w-full py-3 pr-5 sm:text-sm portrait:lg:text-lg md:text-xs"
      >
        <p className="pb-6 pt-4">
          {' '}
          New message from {notification.fromUser.firstName}
        </p>
        <p></p>
        <div
          id="btn-container"
          className="flex flex-row gap-5 w-3/5 h-5 self-center text-xs space-5 items-center"
        >
          <NotificationButton handleSubmit={() => acknowledgeAndGoToMessages()}>
            <span className='md:text-[1vw] 4xl:text-xs'>REPLY</span>
          </NotificationButton>
        </div>
      </div>
    </div>
  );
}
