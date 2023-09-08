import { React, useEffect } from 'react';
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

const NotificationBody = ({
  showNotificationBody,
  setShowNotificationBody,
  setTriggerClose,
  isDarkMode, setIsDarkMode
}) => {
  const notifications = useSelector(selectUnreadNotifications);
  const meetings = useSelector(selectMeetings);

  useEffect(() => {
    if (!notifications?.length && showNotificationBody) {
      setTriggerClose(true);
      // setShowNotificationBody(false);
    }
  }, [notifications, showNotificationBody]);

  return (
    <div
      id="notification-container"
      className={`w-fit ${showNotificationBody ? '' : 'group is-closed'}`}
    >
      {/* -bottom-screen  transition-opacity-0  overflow:hidden*/}
      <div
        className={`transform group-[.is-closed]:scale-0 scale-100 absolute transition-transform duration-[300ms] ease-[cubic-bezier(0.19, 1, 0.22, 1)] origin-top-right opacity-95 right-0 w-fit`}
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
                      <RatingRequest
                        notification={notification}
                        setShowNotificationBody={setShowNotificationBody}
                        setTriggerClose={setTriggerClose}
                      />
                    )}
                    {notification.notificationType === 'inviteRejected' && (
                      <MeetingRejected
                        notification={notification}
                        setShowNotificationBody={setShowNotificationBody}
                      />
                    )}
                    {notification.notificationType === 'meetingCancelled' && (
                      <MeetingCancelled
                        notification={notification}
                        setShowNotificationBody={setShowNotificationBody}
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
                        setShowNotificationBody={setShowNotificationBody}
                      />
                    )}
                    {notification.notificationType === 'currentMeeting' && (
                      <CurrentMeeting
                      isDarkMode={isDarkMode}
                      setIsDarkMode={setIsDarkMode}
                        notification={notification}
                        meetings={meetings}
                        setShowNotificationBody={setShowNotificationBody}
                        setTriggerClose={setTriggerClose}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationBody;
