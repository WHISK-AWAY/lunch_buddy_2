import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  updateNotificationStatus,
  fetchAllNotifications,
} from '../../redux/slices';
import xIcon from '../../assets/icons/x-icon.svg';
import xIconWhite from '../../assets/icons/x-icon-white.svg';
import NotificationButton from '../../components/NotificationButton';
import { selectDarkMode } from '../../redux/slices/darkModeSlice';

export default function MeetingCancelled({ notification, closeMenu }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [xMenuIcon, setXMenuIcon] = useState(xIconWhite);
  const darkMode = useSelector(selectDarkMode);

  function acknowledgeAndFindBuddy() {
    acknowledge();
    closeMenu();
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

  useEffect(() => {
    if (darkMode) {
      setXMenuIcon(xIconWhite);
    } else {
      setXMenuIcon(xIcon);
    }
  }, [darkMode]);

  return (
    <div
      id="meeting-card"
      className="flex w-full h-fit dark:bg-[#0a0908] dark:text-white  rounded-sm bg-white  drop-shadow-sm my-3 items-center justify-between py-4 px-5"
    >
      <div
        id="notification-details"
        className="flex flex-col self-center text-center text-xs w-full sm:text-sm py-2 md:text-xs 2xl:text-sm  portrait:lg:text-lg"
      >
        <p className="pb-2">Bad news...</p>
        <p className="">
          Unfortunately, {notification.fromUser.firstName} had to cancel.
        </p>
        <p className="pb-2">
          No worries, right? Let's go find you{' '}
          <Link
            to="/match"
            className="text-headers"
            onClick={() => closeMenu()}
          >
            another buddy
          </Link>
        </p>
        <div
          id="btn-container"
          className="flex flex-row gap-2 w-full px-7 h-fit self-center text-xs space-5 justify-center items-center pt-3"
        >
          <NotificationButton handleSubmit={acknowledgeAndFindBuddy}>
            FIND BUDDY
          </NotificationButton>
          <div
            id="x-icon"
            className="absolute w-6 right-3 top-3 cursor-pointer"
            onClick={acknowledge}
          >
            <img src={xMenuIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}
