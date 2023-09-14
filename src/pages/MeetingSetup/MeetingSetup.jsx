import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import gsap from 'gsap';

import { selectUser, selectAuth, findBuddies } from '../../redux/slices';
// import getLocation from '../../utilities/geo';
import FormButton from '../../components/FormButton';

const SEARCH_RADIUS_LIST = [0.5, 1, 3, 5];
const TIME_SLOTS = 4;

export default function MeetingSetup(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);
  const { isLoading: searchResultsLoading } = useSelector(
    (state) => state.search
  );

  const wrapperRef = useRef(null);
  const topImageRef = useRef(null);

  const [timeSlot, setTimeSlot] = useState(null);
  const [readyToProceed, setReadyToProceed] = useState(false);
  const [searchRadius, setSearchRadius] = useState(1);

  useEffect(() => {
    // fade bg image in only after it's downloaded

    const bgImg = new Image();
    bgImg.src = '/assets/bgImg/meetingSetup-lq_10.webp';

    gsap.set(topImageRef.current, { opacity: 0 });

    bgImg.onload = () => {
      gsap.to(topImageRef.current, { opacity: 1, duration: 0.5 });
    };
  }, []);

  useEffect(() => {
    // use token to keep track of logged-in user (id)
    // once that's known we can pull down user data
    if (auth.error || !auth.user?.id || !user.id) {
      console.warn('missing authentication information - navigating to login');
      navigate('/login');
    }
  }, [auth.user?.id]);

  useEffect(() => {
    dispatch(findBuddies({ searchRadius }));
  }, [searchRadius]);

  useEffect(() => {
    // move to next step once all the ducks are in a row
    if (readyToProceed && !searchResultsLoading) {
      navigate('/match/results', {
        state: { searchRadius, timeSlot },
      });
    }
  }, [readyToProceed, searchResultsLoading, searchRadius, timeSlot]);

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
    accum.dateObj = time.toISOString();
    accum.startTime = times[0]
      .toLocaleTimeString([], { timeStyle: 'short' })
      .slice(0, -3);
    accum.endTime = times[1].toLocaleTimeString('en-US', {
      timeStyle: 'short',
    });
    return accum;
  }, {});
  if (!timeSlot) setTimeSlot(timeSlots[0]);

  function handleSearchSubmit(e) {
    e.preventDefault();

    // hang on to selected time slot -- we'll need it a couple screens from now
    window.localStorage.setItem('meetingTimeslot', JSON.stringify(timeSlot));

    // indicate that we can move to next step as long as we're not still waiting for data
    setReadyToProceed(true);

    // fade to 0 to visually indicate transition
    gsap.to(wrapperRef.current, {
      opacity: 0,
    });
  }
  return (
    <div
      ref={wrapperRef}
      id="search-params-page"
      className="lg:bg-none w-screen flex flex-row-reverse justify-center  items-center   bg-white dark:bg-[#0a0908] overflow-hidden bg-fixed  text-primary-gray dark:text-white landscape:h-[calc(100svh_-_56px)] portrait:h-[calc(100svh_-_56px)] landscape:3xl:h-[calc(100svh_-_64px)] landscape:overflow-y-auto no-scrollbar"
    >
      <div className="lg:basis-6/12 flex flex-col justify-center items-center h-full ">
        <div id="search-params-container" className="">
          <form className="flex flex-col gap-5 mb-5 items-center landscape:pt-36 pb-7">
            <div id="radius-group" className="flex flex-col items-center gap-2">
              <label
                className="text-headers text-md font-semibold portrait:md:text-[3vw] 5xl:text-xl sm:text-lg md:text-sm pb-2 3xl:text-base"
                htmlFor="search-radius"
              >
                SEARCH RADIUS
              </label>
              <select
                name="radius"
                id="search-radius"
                className="rounded-sm bg-transparent px-7 3xl:text-sm py-2 md:text-xs  focus:border-primary-gray active:border-primary-gray text-sm portrait:md:text-[2vw] portrait:md:px-10 portrait:md:py-4 active:ring-primary-gray focus:ring-primary-gray outline-0 form-select focus:bg-white dark:bg-[#0a0908]"
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
              className="flex flex-col items-center gap-5 w-11/12 sm:pt-10 pt-5"
            >
              <h2 className="text-headers font-semibold 5xl:text-xl text-md portrait:md:text-[3vw] portrait:md:pt-20 md:text-sm sm:text-lg 3xl:text-base">
                TIME SLOTS
              </h2>
              <div
                id="time-slot-group"
                className="flex flex-row flex-wrap justify-center gap-5 pb-3 text-sm 3xl:text-sm md:text-xs 5xl:text-base portrait:md:text-[2.4vw]"
              >
                {timeSlots.map((timeOption) => {
                  return (
                    <button
                      key={timeOption.dateObj}
                      onClick={(e) => {
                        e.preventDefault();
                        setTimeSlot(timeOption);
                      }}
                      className={`border transition duration-500 border-primary-gray  rounded-sm px-3 py-1 portrait:md:p-3  hover:bg-primary-gray/20 ${
                        timeOption.startTime === timeSlot?.startTime
                          ? 'button text-white border-white'
                          : 'bg-white dark:bg-transparent border border-primary-gray'
                      }`}
                    >
                      {`${timeOption.startTime} - ${timeOption.endTime}`}
                    </button>
                  );
                })}
              </div>
            </div>
            <div
              id="btn-container"
              className="w-5/6 xs:w-4/6 sm:w-4/6 lg:w-3/5 pt-5 portrait:lg:w-4/5"
            >
              <FormButton handleSubmit={handleSearchSubmit}>
                <span className="text-[3.3vw]  sm:text-lg 5xl:text-xl portrait:md:text-[2.4vw] portrait:lg:py-2 3xl:text-sm md:text-xs">
                  FIND BUDDY
                </span>
              </FormButton>
            </div>
          </form>
        </div>
      </div>

      <div
        ref={topImageRef}
        id="bg-img"
        className="bg-cover bg-no-repeat 
       bg-[url('/assets/bgImg/meetingSetup.jpg')] supports-[background-image:_url('/assets/bgImg/meetingSetup-lq_10.webp')]:bg-[url('/assets/bgImg/meetingSetup-lq_10.webp')] basis-full hidden lg:block h-full portrait:lg:hidden"
      ></div>
    </div>
  );
}
