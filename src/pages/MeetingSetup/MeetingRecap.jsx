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
    <div className="recap-card">
      <h2>Time:</h2>
      <p>
        {timeSlot.startTime} - {timeSlot.endTime}
      </p>

      <h2>Buddy:</h2>
      <p>{buddy.fullName}</p>

      <h2>Restaurant:</h2>
      <a href={restaurant.url}>{restaurant.name}</a>

      <button className="button" onClick={(e) => handleMeeting(e)}>
        Letsfkngoooo
      </button>
    </div>
  );
}
