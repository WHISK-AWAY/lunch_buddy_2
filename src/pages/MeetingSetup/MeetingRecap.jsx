import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createMeeting } from '../../redux/slices';
import FormButton from '../../components/FormButton';

import gsap from 'gsap';

export default function MeetingRecap({ state }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const topImageRef = useRef(null);

  const { buddy, timeSlot, restaurant } = state;

  useEffect(() => {
    // fade bg image in only after it's downloaded

    const bgImg = new Image();
    bgImg.src = '/assets/bgImg/meetingRecap-lq_10.webp';

    gsap.set(topImageRef.current, { opacity: 0 });

    bgImg.onload = () => {
      gsap.to(topImageRef.current, { opacity: 1, duration: 0.5 });
    };
  }, []);

  function handleMeeting(e) {
    e.preventDefault();
    const newMeeting = {
      buddyId: buddy?.id,
      lunchDate: timeSlot?.dateObj,
      yelpBusinessId: restaurant?.id,
    };

    dispatch(createMeeting({ newMeeting }));
    navigate('/');
  }

  const webpUrl = buddy?.avatarUrl.split('.').at(0) + '-q1.webp';

  if (!buddy) return <h1 className="dark:text-white">nobuddy</h1>;

  return (
    <div className="recap-card  w-screen flex flex-col gap-5 items-center   bg-white dark:bg-dark lg:flex-row lg:items-center bg-fixed dark:text-white text-primary-gray  landscape:h-[calc(100svh_-_56px)] portrait:h-[calc(100svh_-_56px)] landscape:3xl:h-[calc(100svh_-_64px)] landscape:overflow-y-auto">
      <div
        ref={topImageRef}
        className="recap-image hidden bg-left lg:block lg:h-full lg:basis-full bg-[url('/assets/bgImg/meetingRecap.jpg')] supports-[background-image:_url('/assets/bgImg/meetingRecap-lq_10.webp')]:bg-[url('/assets/bgImg/meetingRecap-lq_10.webp')] portrait:lg:hidden bg-cover "
      ></div>
      <div className="recap-info flex flex-col basis-full h-full  lg:basis-7/12 gap-12 items-center  justify-center portrait:lg:basis-full portrait:md:pb-44 landscape:pt-48 landscape:md:pt-10">
        <div
          className="recap-header text-headers text-xl portrait:lg:text-2xl font-semibold md:text-lg 5xl:text-2xl"
          // data-aos="fade-up"
          // data-aos-delay="400"
          // data-aos-duration="1000"
        >
          <h1>MEETING RECAP</h1>
        </div>
        <div className="recap-body flex flex-col items-center gap-1">
          <div className="buddy-avatar-container rounded-full mb-6">
            <picture>
              <source srcSet={webpUrl} />
              <img
                src={buddy?.avatarUrl}
                width={1240}
                height={1850}
                alt="Your buddy's avatar image"
                className="bg-white object-cover aspect-square h-28 w-28 lg:w-32 lg:h-32 rounded-full z-10 p-1 drop-shadow-md"
              />
            </picture>
          </div>
          <div
            id="meeting-detail-container"
            className="flex flex-col justify-center items-center"
          >
            <h2 className="text-lg text-headers pb-4 portrait:lg:text-xl md:text-base lg:text-sm">
              {buddy?.fullName.toUpperCase()}
            </h2>
            <p className="portrait:lg:text-lg md:text-sm lg:text-xs">
              {timeSlot?.startTime} - {timeSlot?.endTime}
            </p>
            <p className="font-semibold portrait:lg:text-xl lg:text-sm">
              <a href={restaurant?.url} target="_blank">
                {restaurant?.name.toUpperCase()}
              </a>
            </p>
            <p className="portrait:lg:text-lg md:text-sm lg:text-xs">
              {restaurant?.location?.display_address?.join(' ')}
            </p>
          </div>
          <div
            id="btn-container"
            className="recap-button flex flex-col items-center pt-9 text-xs w-full portrait:w-full pb-5"
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
