import { React } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUnreadNotifications } from '../../redux/slices';

// import NewMessage from './NewMessage';
import MeetingRequest from './MeetingRequest';
// import MeetingAccepted from './MeetingAccepted';
// import MeetingRejected from './MeetingRejected';
// import RatingRequest from './RatingRequest';

const NotificationBody = () => {
  const notifications = useSelector(selectUnreadNotifications);

  // const notificationType = notifications.
  if (!notifications?.length) return <h1>No notifications to render...</h1>;
  // console.log('hey');
  return (
    <div className="flex flex-col">
      <div className="absolute z-40 bg-primary-gray/30 self-end lg:h-[46rem] lg:w-[35rem] rounded-l-md px-3 py-3">
        <ul>
          {notifications?.map((notification) => {
            return (
              <li key={notification.id}>
                {notification.notificationType === 'meetingInvite' && (
                  <MeetingRequest notification={notification} />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default NotificationBody;
