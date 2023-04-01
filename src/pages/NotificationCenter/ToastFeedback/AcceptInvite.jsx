import React from 'react';

export default function AcceptInvite({ notification, meetings }) {
  const yelpBusinessId = notification.meeting.yelpBusinessId;

  return (
    <div
      id="meeting-card"
      className="flex w-2/5 h-fit bg-gray-100/90 rounded-2xl drop-shadow-sm my-3 items-center justify-between relative top-[75px]"
    >
      <div id="img-section" className="px-2 h-28 shrink-0">
        <img
          src={notification.fromUser.avatarUrl}
          alt="user avatar"
          className="object-cover  aspect-square w-20 h-20 rounded-[100%] z-10 bg-white p-1  drop-shadow-lg relative translate-y-[30%] "
        />
      </div>
      <div
        id="notification-details"
        className="flex flex-col self-center text-center text-base w-full py-2"
      >
        <p className="pb-2">
          ok! we'll let {notification.fromUser.firstName} know you're in!
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
        {/* <div
        id="btn-container"
        className="flex flex-row gap-2 w-fit h-fit self-center text-xs space-5 justify-center items-center"
      >
        <FormButton handleSubmit={}>HOME</FormButton>
        <FormButton handleSubmit={}>MESSAGE {notification.fromUser.firstName}</FormButton>
      </div> */}
      </div>
    </div>
  );
}
