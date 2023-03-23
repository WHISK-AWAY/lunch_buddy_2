import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUser,
  selectUser,
  selectAuth,
  tryToken,
  updateUser,
} from '../../redux/slices';
import getLocation from '../../utilities/geo';

const SEARCH_RADIUS_LIST = [0.5, 1, 3, 5, 10];
const TIME_SLOTS = 4;

export default function MeetingSetup(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);

  const [timeSlot, setTimeSlot] = useState(null);
  const [searchRadius, setSearchRadius] = useState(1);

  // test for token; back to login if it's not there

  const token = window.localStorage.getItem('token');
  if (!token) navigate('/login');

  useEffect(() => {
    // use token to keep track of logged-in user (id)
    // once that's known we can pull down user data
    if (!auth.user?.id) {
      dispatch(tryToken());
    } else dispatch(fetchUser(auth.user.id));

    // if inactive, flip status & pull location
    if (auth.user?.status === 'inactive') {
      getLocation(dispatch);
      dispatch(updateUser({ status: 'active' }));
    }
  }, [dispatch, auth]);

  // come up with time slots for suggestion
  function getNextTime(startTime, incrementInMinutes = 15) {
    const ms = incrementInMinutes * 60 * 1000;
    return new Date(Math.ceil((startTime.getTime() + 1000) / ms) * ms);
  }

  let timeSlots = [getNextTime(new Date())];

  for (let i = 0; i < TIME_SLOTS; i++) {
    timeSlots.push(getNextTime(timeSlots[timeSlots.length - 1]));
  }

  // set timeslots into format:
  // {dateObj: Date(), startTime: '1:30', endTime: '1:00'}
  timeSlots = timeSlots.map((time) => {
    const times = [time, getNextTime(time, 60)];
    const accum = {};
    accum.dateObj = time;
    accum.startTime = times[0]
      .toLocaleTimeString([], { timeStyle: 'short' })
      .slice(0, -3);
    accum.endTime = times[1]
      .toLocaleTimeString([], { timeStyle: 'short' })
      .slice(0, -3);
    return accum;
  }, {});

  if (!timeSlot) setTimeSlot(timeSlots[0].dateObj);

  // console.log(timeSlots);

  function handleSearchSubmit(e) {
    e.preventDefault();

    // hang on to selected time slot -- we'll need it a couple screens from now
    window.localStorage.setItem('meetingTimeslot', JSON.stringify(timeSlot));
  }

  function handleTimeslot(timeOption) {
    setTimeSlot(timeOption);
  }

  return (
    <div id="search-params-page">
      <div id="search-params-container">
        <form action="/" onSubmit={handleSearchSubmit}>
          <div id="radius-group">
            <label htmlFor="search-radius">SEARCH RADIUS</label>
            <select
              name="radius"
              id="search-radius"
              value={searchRadius}
              onChange={(e) => setSearchRadius(e.target.value)}
            >
              {SEARCH_RADIUS_LIST.map((opt) => {
                return (
                  <option key={opt} value={opt}>
                    {`${opt} MILE${opt > 1 ? 'S' : ''}`}
                  </option>
                );
              })}
            </select>
          </div>
          <div id="time-slot-group">
            {timeSlots.map((timeOption) => {
              return (
                <button
                  key={timeOption.dateObj}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTimeslot(timeOption);
                  }}
                >
                  {`${timeOption.startTime} - ${timeOption.endTime}`}
                </button>
              );
            })}
          </div>
          <button>FIND BUDDY</button>
        </form>
      </div>
      <Link to="/match/results">To Search Results Page</Link>
    </div>
  );
}
