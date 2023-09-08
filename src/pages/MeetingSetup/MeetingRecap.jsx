import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  createMeeting,
  selectMeetings,
  resetMeetingStatus,
} from '../../redux/slices';
import FormButton from '../../components/FormButton';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

  AOS.init({
    duration: 2000,
    offset: 0,
  });

  return (
    <div className="recap-card  w-screen flex flex-col gap-12 items-center   bg-white dark:bg-[#0a0908]  lg:flex-row lg:items-center bg-fixed dark:text-white text-primary-gray overflow-hidden h-[calc(100vh_-_56px)] sm:h-[calc(100dvh_-_80px)] xs:h-[calc(100dvh_-_71px)] portrait:md:h-[calc(100dvh_-_85px)] portrait:lg:h-[calc(100dvh_-_94px)] md:h-[calc(100dvh_-_60px)] xl:h-[calc(100dvh_-_70px)] 5xl:h-[calc(100dvh_-_80px)] ">
      <div
        className="recap-image hidden bg-left lg:block lg:h-full lg:basis-1/2 bg-[url('/assets/bgImg/meetingConfView-q30.webp')] portrait:lg:hidden bg-cover overflow-hidden"
        // data-aos="fade-right"
        // data-aos-delay="800"
        // data-aos-duration="1500"
      ></div>
      <div className="recap-info flex flex-col basis-full h-full  lg:basis-1/2 gap-12 items-center overflow-auto justify-center portrait:lg:basis-full portrait:md:pb-44">
        <div
          className="recap-header text-headers text-xl portrait:lg:text-2xl font-semibold md:text-lg 5xl:text-2xl"
          // data-aos="fade-up"
          // data-aos-delay="400"
          // data-aos-duration="1000"
        >
          <h1>MEETING RECAP</h1>
        </div>
        <div className="recap-body flex flex-col items-center gap-1">
          <div
            className="buddy-avatar-container rounded-full mb-6"
            // data-aos="zoom-in"
            // data-aos-delay="800"
            // data-aos-duration="1800"
          >
            <img
              src={buddy.avatarUrl}
              alt="Your buddy's avatar image"
              className="bg-white object-cover aspect-square h-28 w-28 lg:w-32 lg:h-32 rounded-full z-10 p-1 drop-shadow-md"
            />
          </div>
          <div
            id="meeting-detail-container"
            className="flex flex-col justify-center items-center"
            // data-aos="fade-down"
            // data-aos-delay="800"
            // data-aos-duration="2000"
          >
            <h2 className="text-lg text-headers pb-4 portrait:lg:text-xl md:text-base lg:text-sm">
              {buddy.fullName.toUpperCase()}
            </h2>
            <p className="portrait:lg:text-lg md:text-sm lg:text-xs">
              {timeSlot.startTime} - {timeSlot.endTime}
            </p>
            <p className="font-semibold portrait:lg:text-xl lg:text-sm">
              <a href={restaurant.url} target="_blank">
                {restaurant.name.toUpperCase()}
              </a>
            </p>
            <p className="portrait:lg:text-lg md:text-sm lg:text-xs">
              {restaurant.location?.display_address?.join(' ')}
            </p>
          </div>
          <div
            id="btn-container"
            className="recap-button flex flex-col items-center pt-9 text-xs w-full portrait:w-full"
            // data-aos="fade-in"
            // data-aos-delay="800"
            // data-aos-duration="3000"
          >
            <FormButton handleSubmit={(e) => handleMeeting(e)}>
              <span className="sm:text-lg md:text-sm">INVITE BUDDY</span>
            </FormButton>
          </div>
        </div>
      </div>
    </div>
  );
}
