import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/slices';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FormButton from '../../components/FormButton';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { tryToken } from '../../redux/slices';
const Homepage = () => {
  const dispatch = useDispatch();

  const auth = useSelector(selectAuth);
  AOS.init({
    duration: 2000,
    offset: 0,
  });


  //*try token check to stay signed in if token stored in the local storage on page refresh
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(tryToken());
    }
  }, []);

  return (
    <div className="flex md:w-screen w-full flex-col scroll-smooth gap-20 text-primary-gray pb-16 md:py-16 md:gap-56 h-fit overflow-hidden sm:gap-28 sm:py-16 py-20 bg-white dark:bg-[#0a0908] ">
      <div
        id="connect-section"
        className="flex md:flex-row flex-col md:w-full md:h-screen md:pl-20 pr-6 py-6 sm:p-6"
      >
        <div
          id="bg-img-container"
          alt="two women holding coffee smiling at each other"
          className=" bg-[url('/assets/bgImg/connect.jpg')] self-right md:h-screen md:w-full md:bg-cover bg-cover h-[60svh] bg-no-repeat md:self-start sm:bg-right "
          data-aos="fade-up"
          data-aos-delay="400"
          duration="1000"
          // data-aos-anchor-placement="center-center"
        ></div>
        <div
          id="connect-text-section"
          className="flex flex-col md:w-full justify-center"
        >
          <h1
            id="connect-header"
            className=" w-fit flex flex-col self-end  sm:self-center md:items-center md:justify-center text-justify self-right md:text-3xl text-xl py-4"
            data-aos="fade-down"
            data-aos-delay="700"
          >
            CONNECT
          </h1>
          <span
            className="w-4/5  self-end text-justify text-xs leading-4 md:text-sm md:w-4/5 md:self-center md:text-center sm:w-11/12"
            data-aos="fade-in"
            data-aos-delay="1300"
            duration="500"
          >
            explore seamless way to connect with like-minded people in your
            area, build meaningful relationships
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
          className="md:w-1/2 bg-[url('/assets/bgImg/explore.jpg')] h-[70svh] md:h-screen bg-no-repeat bg-cover bg-left self-end w-full pl-6 md:self-end"
          data-aos="fade-right"
          data-aos-delay="300"
          data-aos-duration="1500"
        ></div>
        <div
          id="explore-text-section"
          className="flex flex-col justify-center md:w-1/2"
        >
          <h1
            id="explore-header"
            className="w-fit self-start sm:self-center md:text-3xl text-xl py-4"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            EXPLORE
          </h1>
          <span
            className="w-4/5 self-start md:self-center leading-4 md:text-sm sm:w-11/12 justify-center md:text-center sm:self-center text-xs text-justify pb-3 md:w-4/5"
            data-aos="zoom-in"
            data-aos-delay="400"
            data-aos-duration="2500"
          >
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
          className="bg-[url('/assets/bgImg/expand.jpg')] h-[65svh] md:h-screen md:w-full bg-no-repeat bg-cover self-right sm:bg-right "
          data-aos="zoom-in-right"
          data-aos-delay="300"
        ></div>

        <div
          id="expand-text-section"
          className="flex flex-col w-full md:justify-center md:self-center self-end"
        >
          <h1
            id="expand-header"
            className="w-fit self-end flex flex-col sm:self-center justify-start md:text-3xl text-xl align-top md:self-center md:justify-center md:items-center py-1"
            data-aos="zoom-in"
            data-aos-delay="500"
            data-aos-duration="2000"
          >
            EXPAND
          </h1>

          <span
            className="w-11/12 md:self-center md:text-center md:text-sm text-xs sm:text-center self-end text-right"
            data-aos="zoom-in-left"
            data-aos-delay="300"
            data-aos-duration="2000"
          >
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
          className="md:w-1/2 bg-[url('/assets/bgImg/join.jpg')] md:h-screen bg-no-repeat bg-right w-full bg-cover self-end h-[60svh]"
          data-aos="fade-left"
          data-aos-delay="300"
          data-aos-duration="1500"
        ></div>
        <div
          id="join-text-section"
          className="flex flex-col justify-center items-center pr-3 md:w-1/2"
        >
          <h1
            id="join-header"
            className="w-fit md:self-center  flex flex-col  md:text-3xl text-xl text-start pb-1"
            data-aos="fade-down"
            data-aos-delay="400"
          >
            JOIN
          </h1>

          <span
            className="w-4/5 md:self-center flex flex-col items-center justify-center md:w-11/12 sm:self-center sm:w-11/12 text-xs pb-5"
            data-aos="fade-up"
            data-aos-delay="200"
            // data-aos-duration="1000"
          >
            LUNCHbuddy and never eat lunch alone
          </span>
          <Link
            to={auth.user?.id ? '/match' : '/register'}
            className="border-2 self-center border-orange-400 rounded-3xl px-10 py-1 text-xs md:text-sm "
            data-aos="fade-in"
            data-aos-delay="1200"
            data-aos-duration="2900"
          >
            {auth.user?.id ? 'find buddy' : 'sign up'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
