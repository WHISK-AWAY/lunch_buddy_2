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

const SEARCH_RADIUS_LIST = [0.5, 1, 3, 5];
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
    if (auth.error) {
      navigate('/login');
    } else if (!auth.user?.id) {
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

  for (let i = 0; i < TIME_SLOTS - 1; i++) {
    timeSlots.push(getNextTime(timeSlots[timeSlots.length - 1]));
  }

  // set timeslots into format:
  // {dateObj: Date(), startTime: '1:30', endTime: '2:30'}
  timeSlots = timeSlots.map((time) => {
    const times = [time, new Date(time.getTime() + 60 * 60 * 1000)];
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

  if (!timeSlot) setTimeSlot(timeSlots[0]);

  function handleSearchSubmit(e) {
    e.preventDefault();

    // hang on to selected time slot -- we'll need it a couple screens from now
    window.localStorage.setItem('meetingTimeslot', JSON.stringify(timeSlot));

    navigate('/match/results', {
      state: { searchRadius, timeSlot },
    });
  }

  return (
    <div
      id="search-params-page"
      className="lg:bg-none w-screen flex flex-row-reverse justify-center items-center h-[calc(100vh_-_75px)] overflow-hidden bg-fixed bg-gradient-to-t from-[#FF8A00]/10 to-[#FFFFFF] text-primary-gray"
    >
      <div className="lg:basis-1/2 flex flex-col justify-center items-center">
        <div id="search-params-container" className="">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col gap-5 mb-5 items-center"
          >
            <div id="radius-group" className="flex flex-col items-center gap-5">
              <label
                className="text-headers text-md py-3"
                htmlFor="search-radius"
              >
                SEARCH RADIUS
              </label>
              <select
                name="radius"
                id="search-radius"
                className="rounded-full px-7 py-2 focus:border-primary-gray active:border-primary-gray text-sm active:ring-primary-gray focus:ring-primary-gray outline-0 form-select focus:bg-white"
                value={searchRadius}
                onChange={(e) => setSearchRadius(e.target.value)}
              >
                {SEARCH_RADIUS_LIST.map((opt) => {
                  return (
                    <option className="text-left" key={opt} value={opt}>
                      {`${opt} MILE${opt > 1 ? 'S' : ''}`}
                    </option>
                  );
                })}
              </select>
            </div>
            <div
              id="time-slot-wrapper"
              className="flex flex-col items-center gap-5"
            >
              <h2 className="text-headers text-md py-4">TIME SLOTS</h2>
              <div
                id="time-slot-group"
                className="flex flex-row flex-wrap justify-center gap-5 pb-3 text-sm"
              >
                {timeSlots.map((timeOption) => {
                  return (
                    <button
                      key={timeOption.dateObj}
                      onClick={(e) => {
                        e.preventDefault();
                        setTimeSlot(timeOption);
                      }}
                      className={`rounded-full px-3 py-1 ${
                        timeOption.startTime === timeSlot?.startTime
                          ? 'button text-white'
                          : 'bg-white border border-primary-gray'
                      }`}
                    >
                      {`${timeOption.startTime} - ${timeOption.endTime}`}
                    </button>
                  );
                })}
              </div>
            </div>
            <button className="button text-white w-3/5 px-5 py-[5px] lg:py-2 rounded-full text-sm">
              FIND BUDDY
            </button>
          </form>
        </div>
      </div>
      <div
        id="bg-img"
        className="bg-cover
          bg-[url('/assets/bgImg/interestFormView.jpg')] basis-1/2 hidden lg:block h-full"
      ></div>
    </div>
  );
}
