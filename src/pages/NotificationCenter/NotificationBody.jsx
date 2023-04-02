import { React, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { selectUnreadNotifications, selectMeetings } from '../../redux/slices';

import MeetingRequest from './MeetingRequest';
import RatingRequest from './RatingRequest';
import MeetingRejected from './MeetingRejected';
import MeetingAccepted from './MeetingAccepted';
import NewMessageReceived from './NewMessageReceived';
import CurrentMeeting from './CurrentMeeting';
// import RatingRequest from './RatingRequest';

const NotificationBody = ({
  showNotificationBody,
  setShowNotificationBody,
  setTriggerClose,
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
          <div className="z-40 bg-primary-gray/60 self-end h-fit w-[87vw] md:w-[70vw] lg:w-[35rem] rounded-l-3xl px-3 py-3">
            <ul>
              {/* <Toaster /> */}
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
                    {notification.notificationType === 'inviteAccepted' && (
                      <MeetingAccepted
                        notification={notification}
                        setShowNotificationBody={setShowNotificationBody}
                      />
                    )}
                    {notification.notificationType === 'newMessage' && (
                      <NewMessageReceived
                        notification={notification}
                        setShowNotificationBody={setShowNotificationBody}
                      />
                    )}
                    {notification.notificationType === 'currentMeeting' && (
                      <CurrentMeeting
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
