import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

import { selectAuth } from '../../redux/slices';

// import { tryToken } from '../../redux/slices';
const Homepage = () => {
  const auth = useSelector(selectAuth);

  const topImageRef = useRef(null);

  useEffect(() => {
    // fade bg image in only after it's downloaded

    const bgImg = new Image();
    bgImg.src = '/assets/bgImg/connect-q30.webp';

    gsap.set(topImageRef.current, { opacity: 0 });

    bgImg.onload = () => {
      gsap.to(topImageRef.current, { opacity: 1, duration: 0.5 });
    };
  }, []);

  return (
    <div className="flex md:w-screen w-full flex-col scroll-smooth gap-20 text-primary-gray pb-16 md:py-16 md:gap-56 h-fit overflow-hidden sm:gap-28 sm:py-16 py-20 bg-white dark:bg-[#0a0908] ">
      <div
        id="connect-section"
        className="flex md:flex-row flex-col md:w-full md:h-screen md:pl-20 pr-6 py-6 sm:p-6"
      >
        <div
          ref={topImageRef}
          id="bg-img-container"
          alt="two women holding coffee smiling at each other"
          className="opacity-0 bg-[url('/assets/bgImg/connect.jpg')] supports-[background-image:_url('/assets/bgImg/connect-q30.webp')]:bg-[url('/assets/bgImg/connect-q30.webp')] self-right md:h-screen md:w-full md:bg-cover bg-cover h-[60svh] bg-no-repeat md:self-start sm:bg-right "
        ></div>
        <div
          id="connect-text-section"
          className="flex flex-col md:w-full justify-center"
        >
          <h1
            id="connect-header"
            className=" w-fit flex flex-col self-end  sm:self-center md:items-center md:justify-center text-justify self-right md:text-3xl text-xl py-4"
          >
            CONNECT
          </h1>
          <span className="w-4/5  self-end text-justify text-xs leading-4 md:text-sm md:w-4/5 md:self-center md:text-center sm:w-11/12">
            explore the seamless way to connect with like-minded people in your
            area & build meaningful relationships
          </span>
        </div>
      </div>

      <div
        id="explore-section"
        className="flex md:flex-row-reverse md:w-full md:h-screen pl-6 sm:p-6 flex-col-reverse gap-4 md:pr-20"
      >
        <div
          id="bg-img-container"
          alt="dark plate on the table with toast on the bed of spinach, avocado slices and eggs on top"
          className="md:w-1/2 bg-[url('/assets/bgImg/explore.jpg')] supports-[background-image:_url('/assets/bgImg/explore-q30.webp')]:bg-[url('/assets/bgImg/explore-q30.webp')] h-[70svh] md:h-screen bg-no-repeat bg-cover bg-left self-end w-full pl-6 md:self-end"
        ></div>
        <div
          id="explore-text-section"
          className="flex flex-col justify-center md:w-1/2"
        >
          <h1
            id="explore-header"
            className="w-fit self-start sm:self-center md:text-3xl text-xl py-4"
          >
            EXPLORE
          </h1>
          <span className="w-4/5 self-start md:self-center leading-4 md:text-sm sm:w-11/12 justify-center md:text-center sm:self-center text-xs text-justify pb-3 md:w-4/5">
            discover new and exciting dining experiences, embark on a culinary
            journey, explore diverse flavors and cuisines in your area
          </span>
        </div>
      </div>

      <div
        id="expand-section"
        className="flex md:flex-row flex-col md:w-full md:h-screen md:pl-20 pr-6 py-6 sm:p-6 gap-2"
      >
        <div
          id="bg-img-container"
          alt="two women giggling while sitting at the table in the cafe"
          className="bg-[url('/assets/bgImg/expand.jpg')] supports-[background-image:_url('/assets/bgImg/expand-q30.webp')]:bg-[url('/assets/bgImg/expand-q30.webp')] h-[65svh] md:h-screen md:w-full bg-no-repeat bg-cover self-right sm:bg-right "
        ></div>

        <div
          id="expand-text-section"
          className="flex flex-col w-full md:justify-center md:self-center self-end"
        >
          <h1
            id="expand-header"
            className="w-fit self-end flex flex-col sm:self-center justify-start md:text-3xl text-xl align-top md:self-center md:justify-center md:items-center py-1"
          >
            EXPAND
          </h1>

          <span className="w-11/12 md:self-center md:text-center md:text-sm text-xs sm:text-center self-end text-right">
            expand your network for growth and opportunities
          </span>
        </div>
      </div>

      <div
        id="join-section"
        className="flex md:flex-row-reverse md:w-full md:h-full flex-col pl-6 gap-4 sm:p-6 md:pr-20"
      >
        <div
          id="bg-img-container"
          alt="lady sitting at the table with her feet on the chair with a bowl of pasta, holding her phone in the left hand"
          className="md:w-1/2 bg-[url('/assets/bgImg/join.jpg')] supports-[background-image:_url('/assets/bgImg/join-q30.webp')]:bg-[url('/assets/bgImg/join-q30.webp')] md:h-screen bg-no-repeat bg-right w-full bg-cover self-end h-[60svh]"
        ></div>
        <div
          id="join-text-section"
          className="flex flex-col justify-center items-center pr-3 md:w-1/2"
        >
          <h1
            id="join-header"
            className="w-fit md:self-center  flex flex-col  md:text-3xl text-xl text-start pb-1"
          >
            JOIN
          </h1>

          <span className="w-4/5 md:self-center flex flex-col items-center justify-center md:w-11/12 sm:self-center sm:w-11/12 text-xs pb-5">
            LUNCHbuddy and never eat lunch alone
          </span>
          <Link
            to={auth.user?.id ? '/match' : '/register'}
            className="border-2 self-center border-orange-400 rounded-3xl px-10 py-1 text-xs md:text-sm "
          >
            {auth.user?.id ? 'find buddy' : 'sign up'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
