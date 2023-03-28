import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import FormButton from '../../components/FormButton';
import { Link } from 'react-router-dom';

const Homepage = () => {
  // bg-[url('/assets/bg_img/homepage13.jpg')] h-[calc(100vh_-_5rem)] w-screen bg-no-repeat bg-right bg-cover "
  AOS.init({
    duration: 2000,
    offset: 0,
  });
  return (
    <div className="flex md:w-screen w-full flex-col scroll-smooth gap-20 text-primary-gray h-screen  md:py-20">
      <div
        id="connect-section"
        className="flex md:flex-row flex-col md:w-full md:h-screen md:pl-20 pr-6 py-6 sm:p-6"
      >
        <div
          id="bg-img-container"
          className=" bg-[url('/assets/bgImg/connect.jpg')] self-right md:h-screen md:w-full md:bg-cover bg-cover h-[60svh] bg-no-repeat md:self-start sm:bg-right "
          data-aos="zoom-in-right"
          data-aos-delay="300"
          // data-aos-anchor-placement="center-center"
        ></div>
        <div
          id="connect-text-section"
          className="flex flex-col md:w-full justify-center"
        >
          <h1
            id="connect-header"
            className=" w-fit flex flex-col self-end mx-5 sm:self-center md:items-center md:justify-center text-justify self-right md:text-3xl text-xl py-4"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            CONNECT
          </h1>
          <span className="w-3/5 flex flex-col self-center text-justify text-xs leading-4 md:text-sm sm:w-4/5 md:w-4/5 md:text-center">
            explore seamless way to connect with like-minded people in your
            area, build meaningful relationships
          </span>
        </div>
      </div>

      <div
        id="explore-section"
        className="flex flex-row-reverse md:flex-row-reverse md:w-full md:h-screen pl-6 sm:p-6"
      >
        <div
          id="bg-img-container"
          className="w-1/2 md:w-full bg-[url('/assets/bgImg/explore.jpg')] h-screen bg-no-repeat bg-right bg-contain self-end "
          data-aos="fade-down"
          data-aos-delay="300"
        ></div>
        <div id="explore-text-section">
          <h1
            id="explore-header"
            className="w-fit flex flex-col self-start items-center justify-center sm:self-center md:text-3xl text-xl py-4"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            EXPLORE
          </h1>
          <span className="w-3/5 flex flex-col self-center leading-4 md:text-sm sm:w-4/5 justify-center md:text-center text-xs text-justify">
            discover new and exciting dining experiences, embark on a culinary
            journey, explore diverse flavors and cuisines in your area
          </span>
        </div>
      </div>
      <div className="flex flex-row">
        <div
          className="w-1/2 bg-[url('/assets/bgImg/expand.jpg')] h-screen bg-no-repeat bg-contain self-start "
          data-aos="zoom-in-right"
          data-aos-delay="300"
        ></div>
        <h1
          className="w-1/2 flex flex-col items-center justify-center text-3xl"
          data-aos="fade-up"
          data-aos-delay="700"
        >
          EXPAND{' '}
          <span className="flex flex-col items-center justify-center text-sm">
            expand your network for growth and opportunities
          </span>
        </h1>
      </div>
      <div className="flex flex-row-reverse">
        <div
          className="w-1/2 bg-[url('/assets/bgImg/join.jpg')] h-screen bg-no-repeat bg-right bg-contain self-end"
          data-aos="zoom-in-right"
          data-aos-delay="300"
        ></div>
        <h1
          className="w-1/2 flex flex-col items-center justify-center text-3xl "
          data-aos="fade-up"
          data-aos-delay="900"
        >
          JOIN
          <span className="flex flex-col items-center justify-center text-sm pb-10">
            LUNCHbuddy and never eat lunch alone
          </span>
          <Link
            to={'/register'}
            className="border-2 border-orange-500 rounded-3xl px-4 py-1 text-primary-gray text-sm "
          >
            sign up
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Homepage;
// return (
//   <div className="flex w-screen flex-col">
//     <div
//       className="delay-[300ms] duration-[600ms] taos:translate-y-[500px] taos:opacity-0 w-1/2  bg-[url('/assets/bgImg/bg1.jpg')] h-screen bg-no-repeat bg-contain self-start bg-left "
//       data-taos-offset="1000"
//     ></div>
//     <div
//       className="w-1/2  bg-[url('/assets/bgImg/bg5.jpg')] h-screen bg-no-repeat bg-right bg-contain self-end delay-[300ms] duration-[600ms] taos:translate-y-[-100%] taos:invisible"
//       data-taos-offset="500"
//     ></div>
//     <div
//       className="w-1/2 bg-[url('/assets/bgImg/bg4.jpg')] h-screen bg-no-repeat bg-contain self-start delay-[300ms] duration-[600ms] taos:translate-x-[100%] taos:invisible"
//       data-taos-offset="400"
//     ></div>
//     <div className="w-1/2 bg-[url('/assets/bgImg/bg6.jpg')] h-screen bg-no-repeat bg-right bg-contain self-end"></div>
//   </div>
// );
