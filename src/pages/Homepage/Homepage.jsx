import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

import { selectAuth } from '../../redux/slices';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// import { tryToken } from '../../redux/slices';
const Homepage = () => {
  const auth = useSelector(selectAuth);

  const topImageRef = useRef(null);

  // AOS.init({
  //   duration: 2000,
  //   offset: 0,
  // });

  // useEffect(() => {
  //   // fade bg image in only after it's downloaded

  //   const bgImg = new Image();
  //   bgImg.src = '/assets/bgImg/connect-q30.webp';

  //   gsap.set(topImageRef.current, { opacity: 0 });

  //   bgImg.onload = () => {
  //     gsap.to(topImageRef.current, { opacity: 1, duration: 0.5 });
  //   };
  // }, []);

  return (
    <section className="homepage-wrapper w-[100svw] h-full dark:text-white text-[#0a0908] dark:bg-[#0a0908] bg-white ">
      <div className="hero-container flex h-[100svh] w-full justify-center align-center custom-clip-path  ">
        <div
          className="bg-cover bg-right  portrait:h-[calc(100svh_-_50px)]  bg-no-repeat
      bg-[url('/assets/bgImg/homepage4.jpg')] portrait:bg-[url('/assets/bgImg/homepage4p.jpg')]  basis-[70%]  h-full portrait:lg:hidden portrait:basis-full portrait:bg-center "
        ></div>

        {/**
    <video
    src="/assets/bgImg/homepage6.mp4"
    autoPlay={true}
    loop={true}
    muted={true}
    className=" bg-cover h-[900px]"
    />
  */}

        <div className="hero-text text-6xl basis-[30%] uppercase font-bold w-fit   portrait:basis-0  portrait:text-[4.8rem] ">
          <span className="absolute top-[25%] portrait:top-20 right-[5%] portrait:right-[47%] portrait:sm:right-[38%]  portrait:w-[30vw] opacity-80 landscape:2xl:text-[6rem] landscape:2xl:top-[20%] landscape:5xl:text-[8rem] landscape:8xl:text-[10rem]">
            lunch buddy
          </span>

          <div className="lowercase font-light text-[.8rem] absolute  top-[37%] right-[14%] landscape:xl:text-[1rem] portrait:text-[1.2rem] portrait:tracking-widest portrait:top-[30%] landscape:2xl:text-[1.2rem]">
            <p>expand your network,</p>
            <p>one bite at the time</p>
          </div>

          <div className="font-regular landscape:xl:text-[1rem] text-[.8rem] top-[45%] right-[15%] border-2 rounded-sm border-primary-gray py-3 px-6  absolute portrait:text-[1rem] portrait:right-[23%] portrait:top-[39%] portrait:tracking-widest landscape:2xl:text-[1.2rem] landscape:2xl:right-[16%]">
            <Link to="/signin">sign in </Link>
          </div>
        </div>
      </div>

      <div className="h-full relative bg-pink-200 overflow-hidden">
        <div className="dark:bg-zinc-900/80 bg-zinc-200 h-[99vh] connect-section flex justify-between relative items-center ">
          <div className="pt-28 pl-16 text-[4rem] font-bold uppercase opacity-80 landscape:2xl:text-[6rem] landscape:2xl:top-[20%] landscape:5xl:text-[8rem] landscape:8xl:text-[10rem]">
            connect
            <p className="lowercase font-light text-[.9rem] w-64">
              meet new people based on shared hobbies, professionsal interests
              and favourite cuisines
            </p>
          </div>
        </div>

        <div className="h-full bg-contain w-[60%] bg-[url('/assets/bgImg/homepage1.jpg')] bg-no-repeat absolute top-16 -right-36"></div>

        <div className="h-[400px] bg-orange-300 "></div>

        <div>hello world</div>
        <div className="dark:bg-zinc-900/60 bg-zinc-200 trio-section h-[400px]"></div>
      </div>
    </section>
  );
};

export default Homepage;
