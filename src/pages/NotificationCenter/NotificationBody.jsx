import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUnreadNotifications, selectMeetings } from '../../redux/slices';

import MeetingRequest from './MeetingRequest';
import RatingRequest from './RatingRequest';
import MeetingRejected from './MeetingRejected';
import NewMessageReceived from './NewMessageReceived';
import CurrentMeeting from './CurrentMeeting';
import MeetingCancelled from './MeetingCancelled';

import gsap from 'gsap';

const NotificationBody = ({
  isDarkMode,
  setIsDarkMode,
  menuMode,
  closeMenu,
}) => {
  const wrapperRef = useRef(null);
  const screenRef = useRef(null);
  const previousModeRef = useRef(null);

  const notifications = useSelector(selectUnreadNotifications);
  const meetings = useSelector(selectMeetings);

  useEffect(() => {
    if (menuMode === 'notifications' && notifications.length === 0) closeMenu();
  }, [notifications]);

  useEffect(() => {
    if (menuMode === 'notifications') {
      previousModeRef.current = 'notifications';
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({});

        tl.set(screenRef.current, { display: 'block' })
          .to(wrapperRef.current, {
            x: '0%',
            duration: 0.25,
            ease: 'power1.in',
          })
          .to(
            screenRef.current,
            {
              backdropFilter: 'blur(8px)',
              duration: 0.25,
            },
            '<'
          );
      });
      return () => ctx.revert();
    } else {
      if (
        previousModeRef.current === 'notifications' &&
        notifications.length > 0
      ) {
        const ctx = gsap.context(() => {
          const tl = gsap.timeline();

          tl.from(wrapperRef.current, {
            x: '0%',
            ease: 'power1.in',
            duration: 0.25,
          })
            .from(
              screenRef.current,
              {
                backdropFilter: 'blur(8px)',
                display: 'block',
                duration: 0.25,
              },
              '<'
            )
            .set(screenRef.current, { display: 'none' });
        });

        previousModeRef.current = null;

        return () => ctx.revert();
      }
    }
  }, [menuMode, wrapperRef.current]);

  return (
    <>
      <div
        ref={screenRef}
        className="fixed bottom-0 h-screen w-screen backdrop-blur-0 bg-transparent z-20"
        style={{ display: 'none' }}
      ></div>
      <div
        id="notification-container"
        ref={wrapperRef}
        className="fixed translate-x-full opacity-95 right-0 w-fit z-50"
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
                        closeMenu={closeMenu}
                      />
                    )}
                    {notification.notificationType === 'ratingRequested' && (
                      <RatingRequest
                        notification={notification}
                        closeMenu={closeMenu}
                      />
                    )}
                    {notification.notificationType === 'inviteRejected' && (
                      <MeetingRejected
                        notification={notification}
                        closeMenu={closeMenu}
                      />
                    )}
                    {notification.notificationType === 'meetingCancelled' && (
                      <MeetingCancelled
                        notification={notification}
                        closeMenu={closeMenu}
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
                        notification={notification}
                        closeMenu={closeMenu}
                      />
                    )}
                    {notification.notificationType === 'currentMeeting' && (
                      <CurrentMeeting
                        notification={notification}
                        meetings={meetings}
                        closeMenu={closeMenu}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationBody;
