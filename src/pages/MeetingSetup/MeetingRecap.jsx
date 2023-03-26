import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { createMeeting } from '../../redux/slices';

export default function MeetingRecap(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const { buddy, timeSlot, restaurant } = location.state;

  const newMeeting = {
    buddyId: buddy.id,
    lunchDate: timeSlot.dateObj,
    yelpBusinessId: restaurant.id,
  };

  function handleMeeting() {
    dispatch(createMeeting({ newMeeting }));
    navigate('/');
  }

  return (
    <div className="recap-card orange-linear-bg bg-fixed h-[calc(100vh_-_69px)] pt-16 text-primary-gray flex flex-col gap-12 items-center">
      <div className="recap-header text-headers text-xl font-semibold">
        <h1>MEETING RECAP</h1>
      </div>
      <div className="recap-body flex flex-col items-center">
        <div className="buddy-avatar-container rounded-full mb-6">
          <img
            src={buddy.avatarUrl}
            alt="Your buddy's avatar image"
            className="object-cover w-16 h-16 rounded-full"
          />
        </div>
        <h2 className="text-lg font-semibold">
          {buddy.fullName.toUpperCase()}
        </h2>
        <p>
          {timeSlot.startTime} - {timeSlot.endTime}
        </p>
        <p className="font-semibold">
          <a href={restaurant.url} target="_blank">
            {restaurant.name.toUpperCase()}
          </a>
        </p>
        <p>{restaurant.location?.display_address?.join(' ')}</p>
      </div>
      <div className="recap-button">
        <button
          className="button rounded-full text-white"
          onClick={(e) => handleMeeting(e)}
        >
          Letsfkngoooo
        </button>
      </div>
    </div>
  );
}
