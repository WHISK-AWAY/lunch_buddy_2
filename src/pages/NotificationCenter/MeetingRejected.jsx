import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  updateNotificationStatus,
  fetchAllNotifications,
} from '../../redux/slices';
import NotificationButton from '../../components/NotificationButton';
import xIcon from '../../assets/icons/x-icon.svg';
import xIconWhite from '../../assets/icons/x-icon-white.svg';
import { selectDarkMode } from '../../redux/slices/darkModeSlice';

export default function MeetingRejected({
  notification,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [xMenuIcon, setXMenuIcon] = useState(xIconWhite);
  const darkMode = useSelector(selectDarkMode)

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
      className="flex w-full h-fit bg-white dark:bg-[#0a0908] dark:text-white rounded-sm drop-shadow-sm my-3 items-center justify-between py-3 px-3"
    >
      <div
        id="notification-details"
        className="flex flex-col self-center text-center 2xl:text-sm text-xs portrait:lg:text-lg sm:text-sm w-full md:text-xs py-2"
      >
        <p className="pb-2">OH NO!</p>
        <p className="">
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
          className="flex flex-row gap-2 w-full px-7 h-fit 6xl:w-4/5 self-center text-xs md:text-[1vw] 4xl:text-x space-5 justify-center items-center pt-2"
        >
          <NotificationButton handleSubmit={acknowledgeAndFindBuddy}>
            <span className="md:text-[1vw] portrait:lg:text-lg 4xl:text-xs">
              FIND BUDDY
            </span>
          </NotificationButton>
          <div
            id="x-icon"
            className="absolute w-5 right-3 top-3 cursor-pointer"
            onClick={acknowledge}
          >
            <img src={xMenuIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}
