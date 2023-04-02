import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  createMeeting,
  selectMeetings,
  resetMeetingStatus,
} from '../../redux/slices';

export default function MeetingRecap(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const meetings = useSelector(selectMeetings);

  const location = useLocation();

  useEffect(() => {
    // on load, make sure meeting state is cleared
    dispatch(resetMeetingStatus());
  }, []);

  // kick back out to match screen if we attempt to navigate directly to this page via url bar, etc
  // if (
  //   !location.state ||
  //   !location.state?.buddy ||
  //   !location.state?.lunchDate ||
  //   !location.state?.yelpBusinessId
  // ) {
  //   navigate('/match');
  // }

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
    <div className="recap-card h-[calc(100vh_-_65px)] w-screen flex flex-col gap-12 items-center orange-linear-bg lg:bg-none lg:bg-white lg:flex-row lg:items-center bg-fixed text-primary-gray overflow-hidden">
      <div className="recap-image hidden bg-left lg:block lg:h-full lg:basis-1/2 bg-[url('/assets/bgImg/meetingConfView.jpg')] bg-cover overflow-hidden"></div>
      <div className="recap-info flex flex-col basis-full h-full pt-16 lg:basis-1/2 gap-12 items-center overflow-auto lg:justify-center">
        <div className="recap-header text-headers text-xl font-semibold">
          <h1>MEETING RECAP</h1>
        </div>
        <div className="recap-body flex flex-col items-center gap-1">
          <div className="buddy-avatar-container rounded-full mb-6">
            <img
              src={buddy.avatarUrl}
              alt="Your buddy's avatar image"
              className="bg-white object-cover aspect-square w-32 h-32 rounded-full z-10 p-1 drop-shadow-md"
            />
          </div>
          <h2 className="text-lg font-semibold text-headers">
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
        <div className="recap-button flex flex-col items-center w-4/5">
          <button
            className="px-5 py-2 w-11/12 lg:py-2 rounded-full button text-white text-md"
            onClick={(e) => handleMeeting(e)}
          >
            INVITE BUDDY
          </button>
        </div>
      </div>
    </div>
  );
}
