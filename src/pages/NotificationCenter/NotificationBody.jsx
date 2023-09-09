import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUnreadNotifications, selectMeetings } from '../../redux/slices';

import MeetingRequest from './MeetingRequest';
import RatingRequest from './RatingRequest';
import MeetingRejected from './MeetingRejected';
import MeetingAccepted from './MeetingAccepted';
import NewMessageReceived from './NewMessageReceived';
import CurrentMeeting from './CurrentMeeting';
import MeetingCancelled from './MeetingCancelled';
// import RatingRequest from './RatingRequest';

import gsap from 'gsap';

const NotificationBody = ({
  isDarkMode,
  setIsDarkMode,
  menuMode,
  // notificationBodyIsOpen,
}) => {
  const wrapperRef = useRef(null);
  const tlRef = useRef(null);

  const notifications = useSelector(selectUnreadNotifications);
  const meetings = useSelector(selectMeetings);

  useEffect(() => {
    if (menuMode === 'notifications') {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tlRef.current = tl;

        tl.to(wrapperRef.current, {
          x: '0%',
          duration: 0.5,
        });
      });

      return () => {
        if (tlRef.current) {
          tlRef.current.reverse().then(() => {
            tlRef.current = null;
            ctx.revert();
          });
        } else ctx.revert();
      };
    }
  }, [menuMode, wrapperRef.current]);

  // useEffect(() => {
  //   if (!notifications?.length && showNotificationBody) {
  //     setTriggerClose(true);
  //     // setShowNotificationBody(false);
  //   }
  // }, [notifications, showNotificationBody]);

  return (
    <div
      id="notification-container"
      ref={wrapperRef}
      className="absolute translate-x-full opacity-95 right-0 w-fit z-50"
    >
      <div className="flex flex-col">
        <div className="z-40 bg-primary-gray/20 self-end h-fit 3xl:w-[30vw] md:w-[40vw] 5xl:w-[20vw] xxs:w-[80vw] portrait:md:w-[60vw]  rounded-bl-sm px-3 pl-6 py-3">
          <ul>
            {notifications?.map((notification) => {
              return (
                <li key={notification.id}>
                  {notification.notificationType === 'meetingInvite' && (
                    <MeetingRequest
                      notification={notification}
                      setShowNotificationBody={setShowNotificationBody}
                    />
                  )}
                  {notification.notificationType === 'ratingRequested' && (
                    <RatingRequest notification={notification} />
                  )}
                  {notification.notificationType === 'inviteRejected' && (
                    <MeetingRejected
                      isDarkMode={isDarkMode}
                      setIsDarkMode={setIsDarkMode}
                      notification={notification}
                    />
                  )}
                  {notification.notificationType === 'meetingCancelled' && (
                    <MeetingCancelled
                      isDarkMode={isDarkMode}
                      setIsDarkMode={setIsDarkMode}
                      notification={notification}
                    />
                  )}
                  {/* {notification.notificationType === 'inviteAccepted' && (
                      <MeetingAccepted
                        notification={notification}
                        setShowNotificationBody={setShowNotificationBody}
                      />
                    )} */}
                  {notification.notificationType === 'newMessage' && (
                    <NewMessageReceived
                      isDarkMode={isDarkMode}
                      setIsDarkMode={setIsDarkMode}
                      notification={notification}
                    />
                  )}
                  {notification.notificationType === 'currentMeeting' && (
                    <CurrentMeeting
                      isDarkMode={isDarkMode}
                      setIsDarkMode={setIsDarkMode}
                      notification={notification}
                      meetings={meetings}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotificationBody;
