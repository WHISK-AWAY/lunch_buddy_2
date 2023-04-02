import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import FormButton from '../../../components/FormButton';
import xIcon from '../../../assets/icons/x-icon.svg';

export default function AcceptInvite({ notification, meetings, t }) {
  const navigate = useNavigate();
  const yelpBusinessId = notification.meeting.yelpBusinessId;

  return (
    <div
      id="meeting-card"
      className="flex lg:w-1/4 w-4/5 sm:w-2/5 lg:h-fit text-xs text-primary-gray bg-gray-100/90 rounded-2xl shadow-md items-center justify-between sticky top-16 mt-14"
    >
      <div
        id="notification-details"
        className="flex flex-col self-center text-center text-xs lg:text-[.9rem] w-full py-2"
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
          className="flex flex-row w-fit  self-center text-xs justify-center items-center pt-3"
        >
          {notification.meetingId && (
            <FormButton
              handleSubmit={() => {
                toast.dismiss(t.id);
                navigate(`/meeting/${notification.meetingId}/chat`);
              }}
            >
              SAY HI
            </FormButton>
          )}
          <div
            id="x-icon"
            className="absolute w-5 right-3 top-3"
            onClick={() => toast.dismiss(t.id)}
          >
            <img src={xIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}
