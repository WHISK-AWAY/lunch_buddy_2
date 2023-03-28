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
    <div className="flex md:w-screen w-full flex-col scroll-smooth gap-20 text-primary-gray  md:py-16 md:gap-56 h-fit overflow-hidden">
      <div
        id="connect-section"
        className="flex md:flex-row flex-col md:w-full md:h-screen md:pl-20 pr-6 py-6 sm:p-6"
      >
        <div
          id="bg-img-container"
          className=" bg-[url('/assets/bgImg/connect.jpg')] self-right md:h-screen md:w-full md:bg-cover bg-cover h-[60svh] bg-no-repeat md:self-start sm:bg-right "
          data-aos="fade-up"
          data-aos-delay="400"
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
          className="md:w-1/2 bg-[url('/assets/bgImg/explore.jpg')] h-[70svh] md:h-screen bg-no-repeat bg-cover bg-left self-end w-full pl-6 md:self-end"
          data-aos="fade-down"
          data-aos-delay="300"
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
            data-aos-delay="700"
            data-aos-duration="2000"
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
            data-aos-delay="700"
          >
            EXPAND
          </h1>

          <span
            className="w-11/12 md:self-center md:text-center md:text-sm text-xs sm:text-center self-end text-right"
            data-aos="zoom-in-left"
            data-aos-delay="300"
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
          className="md:w-1/2 bg-[url('/assets/bgImg/join.jpg')] md:h-screen bg-no-repeat bg-right w-full bg-cover self-end h-[60svh]"
          data-aos="fade-left"
          data-aos-delay="100"
          duration="300"
        ></div>
        <div
          id="join-text-section"
          className="flex flex-col justify-center items-center pr-3 md:w-1/2"
        >
          <h1
            id="join-header"
            className="w-fit md:self-center  flex flex-col  md:text-3xl text-xl text-start pb-1"
            data-aos="fade-down"
            data-aos-delay="600"
          >
            JOIN
          </h1>

          <span
            className="w-4/5 md:self-center flex flex-col items-center justify-center md:w-11/12 sm:self-center sm:w-11/12 text-xs pb-5"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            LUNCHbuddy and never eat lunch alone
          </span>
          <Link
            to={'/register'}
            className="border-2 self-center border-orange-400 rounded-3xl px-10 py-1 text-xs md:text-sm "
            data-aos="fade-in"
            data-aos-delay="900"
            duration="400"
          >
            sign up
          </Link>
        </div>
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
