import React, { useEffect } from 'react';

export default function Homepage() {
  // bg-[url('/assets/bg_img/homepage13.jpg')] h-[calc(100vh_-_5rem)] w-screen bg-no-repeat bg-right bg-cover "
  return (
    <div className="flex w-screen flex-col">
      <div
        className=" delay-[300ms] duration-[600ms] taos:translate-x-[-100%] taos:invisible w-1/2  bg-[url('/assets/bgImg/bg1.jpg')] h-screen bg-no-repeat bg-contain self-start bg-left "
        data-taos-offset="400"
      ></div>
      <div
        className="w-1/2  bg-[url('/assets/bgImg/bg5.jpg')] h-screen bg-no-repeat bg-right bg-contain self-end delay-[300ms] duration-[600ms] taos:translate-y-[-100%] taos:invisible"
        data-taos-offset="500"
      ></div>
      <div
        className="w-1/2 bg-[url('/assets/bgImg/bg4.jpg')] h-screen bg-no-repeat bg-contain self-start delay-[300ms] duration-[600ms] taos:translate-x-[100%] taos:invisible"
        data-taos-offset="400"
      ></div>
      <div className="w-1/2 bg-[url('/assets/bgImg/bg6.jpg')] h-screen bg-no-repeat bg-right bg-contain self-end"></div>
    </div>
  );
}
