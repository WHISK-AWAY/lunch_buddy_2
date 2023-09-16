import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { selectAuth } from '../../redux/slices';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// import { tryToken } from '../../redux/slices';
gsap.registerPlugin(ScrollTrigger);
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

  useLayoutEffect(() => {
    const cxt = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to('.test-block', {
        xPercent: -100,
        ease: 'none',
        duration: 2,
        repeat: -1,
      });

      tl.from('.vid-section', {
        opacity: 0,
        duration: 2,
        ease:'slow',
        // scale: 2,
        // x: '200%',
        width: '200%',
        scrollTrigger: {
          start: 'top bottom',
          end: 'center bottom',
          trigger: '.vid-section',
          scrub: 8,
          // markers: true,
        },
      });

      tl.from('.join-text', {
        delay:5,
        opacity: 0,
        duration: 4,
        ease: 'slow',
        scrollTrigger: {
          start: '40% bottom',
          trigger: '.vid-section',
          scrub: 5,
          markers: true
        }
      }, '>2')
    });

    return () => {
      cxt.revert();
    };
  }, []);

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

        <div className="hero-text text-6xl basis-[30%] uppercase font-bold w-fit  portrait:basis-0  portrait:text-[4.8rem] ">
          <span className="absolute top-[25%] portrait:top-20 right-[5%] portrait:right-[47%] portrait:sm:right-[38%]  portrait:w-[30vw] opacity-80 landscape:2xl:text-[6rem] landscape:2xl:top-[20%] landscape:5xl:text-[8rem] landscape:6xl:text-[10rem]">
            lunch buddy
          </span>

          <div className="lowercase font-light text-[.8rem] absolute  top-[37%] right-[14%] landscape:xl:text-[1rem] portrait:text-[1.2rem] portrait:tracking-widest portrait:top-[30%] landscape:2xl:text-[1.2rem]">
            <p>expand your network,</p>
            <p>one bite at the time</p>
          </div>

          <div className="font-regular landscape:xl:text-[1rem] text-[.8rem] top-[45%] right-[15%] border-2 rounded-sm border-primary-gray py-3 px-6  absolute portrait:text-[1rem] portrait:right-[23%] portrait:top-[39%] portrait:tracking-widest landscape:2xl:text-[1.2rem] landscape:2xl:right-[16%] cursor-pointer">
            <Link to="/login">sign in </Link>
          </div>
        </div>
      </div>

      <div className="h-full relative overflow-hidden w-screen -translate-y-10 portrait:-translate-y-56">
        <div className="dark:bg-zinc-900/80 bg-zinc-200 min-h-[90vh] connect-section flex justify-between relative  ">
          <div className="pt-28  pl-16 landscape:4xl:pl-44 landscape:6xl:pl-96 landscape:lg:pt-[20%] landscape:3xl:pt-[15%] text-[3.7rem] font-bold uppercase opacity-80 landscape:xl:text-[4.7rem] landscape:2xl:text-[6rem] landscape:2xl:top-[20%] landscape:5xl:text-[8rem] landscape:6xl:text-[10rem] portrait:pt-32 portrait:xs:pt-48 portrait:sm:mt-10">
            connect
            <p className="lowercase font-light text-[.8rem] w-64 portrait:pt-[35vh] portrait:translate-x-16 portrait:text-[.7rem] portrait:sm:text-[.9rem]">
              meet new people based on shared hobbies, professionsal interests
              and favourite cuisines
            </p>
          </div>
        </div>

        <div className="h-[90vh]  max-h-[550px] landscape:4xl:max-h-[700px] landscape:5xl:max-h-[750px] top-1/2 -translate-y-[35%] landscape:2xl:-translate-y-[50%] landscape:lg:-translate-y-[40%]   landscape:6xl:max-h-[75vh] bg-contain w-[60%] bg-[url('/assets/bgImg/homepage1.jpg')] bg-no-repeat absolute -right-28 landscape:4xl:-right-72 landscape:5xl:-right-[650px]  landscape:6xl:-right-[580px] portrait:w-[100%] portrait:h-[34vh] portrait:bg-cover portrait:right-0 "></div>
      </div>

      <div className="h-[400px]  w-[100svw] landscape:2xl:h-[500px]  landscape:4xl:h-[550px] landscape:5xl:h-[700px] landscape:6xl:h-[900px] max-h-[900px] flex portrait:flex-col items-center portrait:-translate-y-36 ">
        <div className="flex portrait:flex-col justify-around items-baseline    w-full portrait:gap-16">
          <div className=" flex flex-col justify-start text-center items-center w-fit  gap-2">
            <img
              src="/assets/bgImg/homepage2.jpg"
              alt=""
              className="w-[90%]  h-full aspect-auto bg-cover bg-no-repeat "
            />

            <article className="w-[80%] landscape:xl:w-[70%]">
              <h2 className="font-medium pt-2 text-[1rem] landscape:3xl:text-[1.2rem] landscape:5xl:text-[1.5rem]">
                KEEP IT CONVENIENT
              </h2>
              <p className="text-[.8rem] font-light text-center landscape:3xl:text-[1rem] landscape:5xl:text-[1.2rem]">
                No haggling over when & where: meet interesting new people,
                wherever you happen to be - on your schedule!
              </p>
            </article>
          </div>

          <div className=" flex flex-col justify-start text-center items-center w-fit gap-2">
            <img
              src="/assets/bgImg/homepage5.jpg"
              alt=""
              className="w-[90%]  h-full bg-cover bg-no-repeat aspect-auto"
            />

            <article className="w-[80%] landscape:xl:w-[70%] ">
              <h2 className="font-medium pt-2 text-[1rem] landscape:3xl:text-[1.2rem] landscape:5xl:text-[1.5rem]">
                MAKE A CONNECTION
              </h2>
              <p className="text-[.8rem] font-light text-center landscape:3xl:text-[1rem] landscape:5xl:text-[1.2rem]">
                Match with buddies who pursue the same hobbies, share the same
                professional goals, and love the same foods
              </p>
            </article>
          </div>

          <div className=" flex flex-col justify-start text-center items-center w-fit gap-2">
            <img
              src="/assets/bgImg/homepage3.jpg"
              alt=""
              className="w-[90%]  h-full bg-cover bg-no-repeat aspect-auto"
            />

            <article className="w-[80%] landscape:xl:w-[70%] ">
              <h2 className="font-medium pt-2 text-[1rem] landscape:3xl:text-[1.2rem] landscape:5xl:text-[1.5rem]">
                NEW FAVORITE SPOT
              </h2>
              <p className="text-[.8rem] font-light text-center landscape:3xl:text-[1rem] landscape:5xl:text-[1.2rem]">
                Restaurant suggestions based on shared preferences between you &
                your new buddy
              </p>
            </article>
          </div>
        </div>
      </div>

      {/**
      <section className="max-w-[100%] overflow-hidden">
      <div className="test-block block whitespace-nowrap ">
      <span className="text-[3rem] inline-block p-2">Hello&nbsp;World</span>
      <span className="text-[3rem] inline-block p-2">Hello&nbsp;Hell</span>
      <span className="text-[3rem] inline-block p-2">Hello&nbsp;Hell</span>
      <span className="text-[3rem] inline-block p-2">Hello&nbsp;World</span>
      <span className="text-[3rem] inline-block p-2">Hello&nbsp;World</span>
      <span className="text-[3rem] inline-block p-2">Hello&nbsp;World</span>
      <span className="text-[3rem] inline-block p-2">Hello&nbsp;Hell</span>
          <span className="text-[3rem] inline-block p-2">Hello&nbsp;World</span>
          <span className="text-[3rem] inline-block p-2">Hello&nbsp;Hell</span>
          <span className="text-[3rem] inline-block p-2">Hello&nbsp;Hell</span>
          <span className="text-[3rem] inline-block p-2">Hello&nbsp;World</span>
          </div>
          </section>
        */}

      <div className="dark:bg-zinc-900/60 bg-zinc-200 trio-section  w-full overflow-hidden translate-y-24 landscape:h-[calc(100svh_-_56px)] portrait:h-[calc(100svh_-_56px)] landscape:3xl:h-[calc(100svh_-_64px)] ">
        <div className="h-full flex justify-end w-full relative ">
          <div className=" basis-full vid-section scale-100 w-[30vw] h-full overflow-hidden  absolute top-0 left-0 opacity-100 ">
            <video
              src="/assets/bgImg/friends.mp4"
              autoPlay={true}
              loop={true}
              muted={true}
              className="  object-cover min-h-full"
            />
          </div>

          <div className="flex flex-col  justify-center items-center  basis-1/2 -translate-x-20">
            <h2 className="join-text font-bold text-[5.5rem] text-center leading-none opacity-100">
              JOIN
            </h2>
            <p className="lunch-buddy  pl-28 font-[1rem] pb-9">lunch buddy</p>
            <p className="text-[1.1rem] font-light">
              to meet your next favorite lunch buddy today!
            </p>

            <Link></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
