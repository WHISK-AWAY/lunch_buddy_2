import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..


export default function Homepage() {
  // bg-[url('/assets/bg_img/homepage13.jpg')] h-[calc(100vh_-_5rem)] w-screen bg-no-repeat bg-right bg-cover "
  AOS.init({
    duration: 1800,
    offset:0
});
  return (
    <div className="flex w-screen flex-col">
      <div className="flex flex-row">
        <div
          className=" w-1/2  bg-[url('/assets/bgImg/bg1.jpg')] h-screen bg-no-repeat bg-contain self-start bg-left "
          data-aos="fade-down"
          data-aos-delay="300"
        ></div>
        <h1 className="w-1/2 flex flex-col items-center justify-center text-3xl">
          CONNECT
          <span className="flex flex-col items-center justify-center text-sm">
            explore seamless way to connect with like-minded people in your area,
            build meaningful relationships
          </span>
        </h1>
      </div>
      <div className="flex flex-row-reverse">
        <div className="w-1/2  bg-[url('/assets/bgImg/bg5.jpg')] h-screen bg-no-repeat bg-right bg-contain self-end "></div>
        <h1 className="w-1/2 flex flex-col items-center justify-center text-3xl">
          EXPLORE{' '}
          <span className="flex flex-col items-center justify-center text-sm">
            discover new and exciting dining experiences, embark on a culinary
            journey, explore diverse flavors and cuisines in your area
          </span>
        </h1>
      </div>
      <div className="flex flex-row">
        <div className="w-1/2 bg-[url('/assets/bgImg/bg4.jpg')] h-screen bg-no-repeat bg-contain self-start "></div>
        <h1 className="w-1/2 flex flex-col items-center justify-center text-3xl">
          EXPAND{' '}
          <span className="flex flex-col items-center justify-center text-sm">
            expand your network for growth and opportunities
          </span>
        </h1>
      </div>
      <div className="flex flex-row-reverse">
        <div className="w-1/2 bg-[url('/assets/bgImg/bg6.jpg')] h-screen bg-no-repeat bg-right bg-contain self-end"></div>
        <h1 className="w-1/2 flex flex-col items-center justify-center text-3xl ">
          JOIN
          <span className="flex flex-col items-center justify-center text-sm">
            LUNCHbuddy and never eat lunch alone
          </span>
        </h1>
      </div>
    </div>
  );
}



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