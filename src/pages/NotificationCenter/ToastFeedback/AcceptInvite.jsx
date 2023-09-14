import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import xIcon from '../../../assets/icons/x-icon.svg';
import xIconWhite from '../../../assets/icons/x-icon-white.svg';
import { useSelector } from 'react-redux';
import NotificationButton from '../../../components/NotificationButton';
import { selectDarkMode } from '../../../redux/slices/darkModeSlice';

export default function AcceptInvite({ notification, meetings, t }) {
  const navigate = useNavigate();
  const darkModeSelector = useSelector(selectDarkMode);
  const [xMenuIcon, setXMenuIcon] = useState(xIconWhite);
  const yelpBusinessId = notification.meeting.yelpBusinessId;

  useEffect(() => {
    if (!darkModeSelector) {
      setXMenuIcon(xIcon);
    } else {
      setXMenuIcon(xIconWhite);
    }
  }, [darkModeSelector]);

  return (
    <div
      id="meeting-card"
      className="flex  text-xs py-3 text-primary-gray 3xl:w-[30vw] md:w-[40vw] 5xl:w-[20vw] w-[80vw] portrait:md:w-[60vw] bg-neutral-100/90 dark:bg-neutral-800/90 dark:text-white  rounded-sm shadow-md items-center justify-between sticky  landscape:mt-10 portrait:mt-10 landscape:3xl:mt-12 -mr-4"
    >
      <div
        id="notification-details"
        className="flex flex-col self-center text-center  portrait:lg:text-lg md:text-xs 2xl:text-sm text-xs w-full py-2"
      >
        <p className="pb-2">HOORAY!</p>
        <p className="">
          We'll let {notification.fromUser.firstName} know you're in!
        </p>

        {notification.meeting?.yelpBusinessId && (
          <p>
            Meanwhile, check out{' '}
            <a
              target="_blank"
              href={meetings.business[yelpBusinessId]?.url}
              className="text-headers"
            >
              {meetings.business[yelpBusinessId]?.name}
            </a>
            !
          </p>
        )}
        <div
          id="btn-container"
          className="flex flex-row w-full px-7 self-center text-xs justify-center items-center pt-3"
        >
          {notification.meetingId && (
            <NotificationButton
              handleSubmit={() => {
                toast.remove(t.id);
                navigate(`/meeting/${notification.meetingId}/chat`);
              }}
            >
              SAY HI TO {notification.fromUser.firstName.toUpperCase()}
            </NotificationButton>
          )}
          <div
            id="x-icon"
            className="absolute w-5 right-3 top-3 cursor-pointer"
            onClick={() => toast.remove(t.id)}
          >
            <img src={xMenuIcon} alt="close this notification" />
          </div>
        </div>
      </div>
    </div>
  );
}
