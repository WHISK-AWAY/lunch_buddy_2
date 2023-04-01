import { React } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUnreadNotifications } from '../../redux/slices';

// import NewMessage from './NewMessage';
import MeetingRequest from './MeetingRequest';
import RatingRequest from './RatingRequest';
// import MeetingAccepted from './MeetingAccepted';
// import MeetingRejected from './MeetingRejected';
// import RatingRequest from './RatingRequest';

const NotificationBody = ({
  setPreventClose,
  showNotificationBody,
  setShowNotificationBody,
}) => {
  const notifications = useSelector(selectUnreadNotifications);

  // function handleClick() {
  //   setExpandMenu(false);
  // }

  console.log('body', showNotificationBody);

  if (!notifications?.length) return <h1>No notifications to render...</h1>;

  return (
    <div
      id="nofification-container"
      className={showNotificationBody ? '' : 'group hover'}
    >
      <div
        className={`transform group-[.hover]:scale-0 scale-100 h-fit overflow:hidden absolute transition-transform duration-[300ms] ease-in-out origin-top-right -bottom-screen opacity-95 right-0 transition-opacity-0`}
      >
        <div className="flex flex-col">
          <div className=" z-40 bg-primary-gray/60 self-end h-fit lg:w-[35rem] rounded-l-3xl px-3 py-3 w-3/5">
            <ul>
              {notifications?.map((notification) => {
                return (
                  <li key={notification.id}>
                    {notification.notificationType === 'meetingInvite' && (
                      <MeetingRequest
                        notification={notification}
                        setPreventClose={setPreventClose}
                      />
                    )}
                    {notification.notificationType === 'ratingRequested' && (
                      <RatingRequest
                        notification={notification}
                        setPreventClose={setPreventClose}
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
