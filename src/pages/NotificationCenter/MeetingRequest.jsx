import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Link } from 'react-router-dom';
import { getMeeting, selectMeetings } from '../../redux/slices';
import FormButton from '../../components/FormButton';
export default function MeetingRequest({ notification }) {
  const dispatch = useDispatch();

  const meetings = useSelector(selectMeetings);

  useEffect(() => {
    dispatch(
      getMeeting({
        meetingId: notification.meeting.id,
        userId: notification.toUser.id,
      })
    );
  }, []);


  const handleAccept = () => {

  }

  const handleReject = () => {

  }
  console.log('not', notification);
  return (
    <div
      id="meeting-card"
      className="flex flex-col w-full h-fit bg-gray-100/80 rounded-2xl drop-shadow-sm"
    >
      <div id="img-section" className="px-2">
        <img
          src={notification.fromUser.avatarUrl}
          alt="user avatar"
          className="object-cover aspect-square w-20 h-20 rounded-[100%] z-10 bg-white p-1  drop-shadow-lg relative translate-y-[30%] place-self-end"
        />
      </div>
      <div
        id="notification-details"
        className="self-center text-center text-xs"
      >
        <p className="pb-2">new buddy wants to connect</p>
        <p>{notification.fromUser.fullName.toUpperCase()}</p>
        <p>{new Date(notification.meeting.lunchDate).toLocaleString()}</p>
        <p>rest info here</p>
      </div>
      <div
        id="btn-container"
        className="flex flex-row gap-2 w-fit h-fit self-center text-xs space-5"
      >
        <FormButton onClick={handleAccept}>ACCEPT </FormButton>
        <FormButton onClick={handleReject}>REJECT </FormButton>
      </div>
    </div>
  );
}


    // <button id="accept-btn" className="flex items-end button">
    //       ACCEPT
    //     </button>
    //     <button id="reject-btn" className="flex items-end">
    //       REJECT
    //     </button>