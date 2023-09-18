import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { selectAuth } from '../../redux/slices';

// import { tryToken } from '../../redux/slices';
gsap.registerPlugin(ScrollTrigger);
const Homepage = () => {
  const auth = useSelector(selectAuth);

  const topImageRef = useRef(null);

  // useEffect(() => {
  // fade bg image in only after it's downloaded

  //   const bgImg = new Image();
  //   bgImg.src = '/assets/bgImg/connect-q30.webp';

  //   gsap.set(topImageRef.current, { opacity: 0 });

  //   bgImg.onload = () => {
  //     gsap.to(topImageRef.current, { opacity: 1, duration: 0.5 });
  //   };
  // }, []);
      // const loop = horizontalLoop('.test-block', {
      //   repeat: -1,
      //   paused: false,
      //   speed: 3,
      // });


  useLayoutEffect(() => {
    const cxt = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to('.test-block', {
        xPercent: -20,
        ease: 'linear',
        duration: 5,
        repeat: -1,
      });

      // tl.from('.connect-article', {
      //   scrollTrigger: {
      //     pin: true,
      //     scrub: 10,
      //   }
      // })



      gsap.from('.connect-text', {
        opacity: 0,
        duration: 3,
        ease: 'slow',
        yPercent: -290,
        scrollTrigger: {
          start: 'top 40%',
          end: 'center bottom',
          trigger: '.connect-article',
          scrub: 2,
          // pin: true,
          // markers: true
        },
      });

      gsap.from('.connect-text-subhead', {
        opacity: 0,
        duration: 1,
        yPercent: 80,
        scrollTrigger: {
          start: 'top center',
          end: 'bottom bottom',
          trigger: '.connect-article',
          scrub: 5,
          // markers: true
        },
      });

      tl.from('.connect-img', {
        opacity: 0,
        duration: 4,
        ease: 'slow',
        xPercent: 40,
        scrollTrigger: {
          start: 'top center',
          end: 'center bottom',
          trigger: '.connect-article',
          scrub: 4,
          // markers: true
        },
      }).from('.trio-img', {
        opacity: 0,
        duration: 4,
        ease: 'sine.inOut',
        stagger: 1.3,
        yPercent: 5,
        scrollTrigger: {
          start: 'top 80%',
          end: 'bottom bottom',
          trigger: '.trio-container',
          scrub: 3,
          // markers: true,
        },
      }).from('.trio-article', {
        opacity: 0,
        duration: 2,
        yPercent: -50,
        ease: 'expo.out',
        stagger: .1,
        scrollTrigger: {
          trigger: '.trio-img',
          start: 'top 50%',
          end: 'center center',
          scrub: 2,
          // markers: true,
        }
      })

      tl.from('.vid-section', {
        opacity: 0,
        duration: 2,
        ease: 'slow',
        // scale: 2,
        // x: '200%',
        width: '200%',
        scrollTrigger: {
          start: 'top bottom',
          end: 'bottom bottom',
          trigger: '.vid-section',
          scrub: 8,
          // markers: true,
        },
      });
      // }).from(
      // '.join-text',
      // {
      //   // delay: 1.6,
      //   opacity: 0,
      //   duration: 1,
      //   ease: 'slow',
      //   scrollTrigger: {
      //     start: 'top bottom',
      //     // end: 'bottom bottom',
      //     trigger: '.vid-section',
      //     scrub: 5,
      //     markers: true,
      //   },
      // }, '<'
      // );

      const tl2 = gsap.timeline();

      tl2.from(
        '.join-text',
        {
           delay: 1.6,
          opacity: 0,
          duration: 1,
          ease: 'slow',
          scrollTrigger: {
            start: 'center 90%',
            end: 'bottom 90%',
            trigger: '.trio-article',
            // pin: true,
             scrub: 5,
             markers: true,
          },
        },
        '<'
      );
    });

    return () => {
      cxt.revert();
    };
  }, []);

  return (
    <section className="homepage-wrapper w-[100svw] h-full dark:text-white text-[#0a0908] dark:bg-[#0a0908] bg-white overflow-hidden portrait:overflow-hidden">
      <div className="hero-container flex h-[100svh] w-full justify-center align-center custom-clip-path ">
        <div
          className="bg-cover bg-right  portrait:h-[calc(100svh_-_50px)]  bg-no-repeat
      landscape:bg-[url('/assets/bgImg/homepage4-mds.webp')] landscape:3xl:bg-[url('/assets/bgImg/homepage-3xl(1).webp')]  portrait:bg-[url('/assets/bgImg/homepage-xxs.webp')]  basis-[70%]  h-full  portrait:basis-full portrait:bg-center portrait:shrink-0 w-full"
        ></div>

        {/**hero header */}
        <div className="hero-article  basis-[30%] flex flex-col justify-center gap-20 portrait:xs:gap-28 items-center h-[75svh]  px-6 text-center landscape:2xl:px-8 landscape:4xl:px-16 landscape:6xl:px-44  portrait:px-0 portrait:basis-0  portrait:absolute portrait:w-36  portrait:h-[35svh] portrait:xs:h-[45svh]  portrait:top-60 right-1/2 portrait:translate-x-[62%] portrait:xs:top-64">
          {/**
        <span className="absolute top-[20%] portrait:top-20 portrait:xs:top-40  right-[5%]  portrait:whitespace-pre-line portrait:right-1/2 portrait:translate-x-[50%] portrait:max-w-[50svw] opacity-80 landscape:2xl:text-[6rem] landscape:2xl:top-[20%] landscape:5xl:text-[8rem] landscape:6xl:text-[10rem] portrait:md:-left-44 portrait:md:whitespace-nowrap portrait:md:-mt-6 portrait:lg:text-[7rem]  mix-blend-difference hidden">
        lunch buddy
        </span>
      */}

          {/**hero subheader */}
          <div className="w-full font-light text-[.5rem] landscape:lg:text-[.7rem] landscape:xl:text-[.9rem] landscape:5xl:text-[1rem] landscape:6xl:text-[1.1rem] portrait:w-[50vw]  portrait:md:pt-10 portrait:lg:pt-72">
            {/**landscape text */}
            <p className="portrait:mt-5 portrait:sm:mt-1 portrait:hidden">
              Take a chance to expand your social circle with Lunch Buddy.
              Whether you are new to a city, seeking new perspectives, or just
              looking for a delightful conversation over lunch, Lunch Buddy
              provides the perfect avenue to foster new friendships and enrich
              your dining experience. Embrace the opportunity to meet someone
              new and turn an ordinary lunch break into a delightful and
              socially fulfilling experience.
            </p>

            {/**portrait text */}
            <p className="landscape:hidden portrait:block  text-[1rem] portrait:text-[1.1rem] portrait:sm:text-[1.4rem] portrait:lg:text-[2rem]">
              expand your network,
            </p>
            <p className="landscape:hidden portrait:block text-[1rem] portrait:text-[1.1rem] portrait:sm:text-[1.4rem] portrait:lg:text-[2rem] portrait:lg:pb-36">
              one bite at a time
            </p>
          </div>

          {/**CTA hero section */}
          <div className="relative w-full  font-regular tracking-widest landscape:xl:text-[1rem] text-[.7rem]  rounded-sm     landscape:2xl:text-[1.2rem] landscape:6xl:text-[1.4rem]  cursor-pointer leading-none  portrait:sm:text-[1.1rem]  portrait:lg:text-[2rem] portrait:text-[.8rem] ">
            {auth.token !== '' ? (
              <Link
                to="/register"
                className="group absolute top-0 right-1/2 translate-x-1/2  rounded-sm border dark:portrait:bg-white/10 dark:border-zinc-700 border-primary-gray dark:portrait:border-white portrait:border-2 portrait:bg-primary-gray/20  py-2 px-4 landscape:2xl:px-5 whitespace-nowrap dark:text-white text-[#0a0908] portrait:right-16  portrait:py-3 portrait:px-10 portrait:sm:mt-16 portrait:md:mt-20"
              >
                <span className="absolute left-0 top-0 mb-0 flex h-0 w-full -translate-y-0 transform dark:bg-zinc-100 bg-primary-gray transition-all duration-700 ease-out group-hover:h-full"></span>
                <span className="relative  group-hover:text-white dark:group-hover:text-dark uppercase ">
                  find a buddy
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="group absolute top-0 right-1/2 translate-x-1/2  rounded-sm border dark:border-zinc-700 border-primary-gray px-5  py-2  dark:text-white text-primary-gray whitespace-nowrap portrait:text-[.9rem] portrait:px-10 portrait:-translate-x-10 portrait:sm:text-[1.1rem] portrait:sm:-translate-x-20 portrait:md:text-[1.6rem] portrait:lg:text-[2rem]  portrait:md:-translate-x-56 portrait:lg:-translate-x-[30rem] "
              >
                <span className="absolute left-0 top-0 mb-0 flex h-0 w-full -translate-y-0 transform dark:bg-zinc-100 bg-primary-gray transition-all duration-700 ease-out group-hover:h-full"></span>
                <span className="relative  group-hover:text-white dark:group-hover:text-dark ">
                  sign in
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>

      <section className="max-w-[120%] overflow-hidden -translate-y-1 text-[1rem]  portrait:hidden bg-primary-gray/50 py-4">
        <div className="test-block block whitespace-nowrap ">
          <span className=" inline-block p-2">Hello&nbsp;World</span>
          <span className=" inline-block p-2">Hello&nbsp;Hell</span>
          <span className=" inline-block p-2">Hello&nbsp;Hell</span>
          <span className=" inline-block p-2">Hello&nbsp;World</span>
          <span className=" inline-block p-2">Hello&nbsp;World</span>
          <span className=" inline-block p-2">Hello&nbsp;World</span>
          <span className=" inline-block p-2">Hello&nbsp;Hell</span>
          <span className=" inline-block p-2">Hello&nbsp;World</span>
          <span className=" inline-block p-2">Hello&nbsp;Hell</span>
          <span className=" inline-block p-2">Hello&nbsp;Hell</span>
          <span className=" inline-block p-2">Hello&nbsp;World</span>
          <span className=" inline-block p-2">Hello&nbsp;World</span>
          <span className=" inline-block p-2">Hello&nbsp;Hell</span>
          <span className=" inline-block p-2">Hello&nbsp;World</span>
          <span className=" inline-block p-2">Hello&nbsp;Hell</span>
          <span className=" inline-block p-2">Hello&nbsp;Hell</span>
          <span className=" inline-block p-2">Hello&nbsp;World</span>
          <span className=" inline-block p-2">Hello&nbsp;Hell</span>
          <span className=" inline-block p-2">Hello&nbsp;World</span>
          <span className=" inline-block p-2">Hello&nbsp;World</span>
          <span className=" inline-block p-2">Hello&nbsp;Hell</span>
          <span className=" inline-block p-2">Hello&nbsp;World</span>
          <span className=" inline-block p-2">Hello&nbsp;Hell</span>
          <span className=" inline-block p-2">Hello&nbsp;Hell</span>
          <span className=" inline-block p-2">Hello&nbsp;World</span>
        </div>
      </section>

      {/**connect section */}
      <div className="connect-article h-full relative overflow-hidden w-screen -translate-y-10 portrait:-translate-y-56 portrait:overflow-hidden">
        <div className="dark:bg-zinc-900/80 bg-zinc-200 min-h-[90vh] connect-section flex justify-between relative  ">
          <div className="pt-28  pl-16 landscape:4xl:pl-44 landscape:6xl:pl-96 landscape:lg:pt-[20%] landscape:3xl:pt-[15%] text-[3.7rem] font-bold uppercase opacity-80 landscape:xl:text-[4.7rem] landscape:2xl:text-[6rem] landscape:2xl:top-[20%] landscape:5xl:text-[8rem] landscape:6xl:text-[10rem] portrait:pt-32 portrait:xs:pt-48 portrait:sm:mt-10 portrait:md:translate-x-[100%]">
            <p className="connect-text ">connect</p>
            <p className="connect-text-subhead lowercase font-light text-[.8rem] w-64 portrait:pt-[230px] portrait:sm:pt-[250px] portrait:md:pt-[430px] portrait:translate-x-16 portrait:text-[.7rem] portrait:xs:text-[.9rem] portrait:md:text-[1rem] pl-3">
              meet new people based on shared hobbies, professionsal interests
              and favourite cuisines
            </p>
          </div>
        </div>

        {/**connect section img */}
        <div className="connect-img h-[90vh]  max-h-[550px] landscape:4xl:max-h-[700px] landscape:5xl:max-h-[750px] top-1/2 -translate-y-[35%] landscape:2xl:-translate-y-[50%] landscape:lg:-translate-y-[40%]   landscape:6xl:max-h-[75vh] bg-contain w-[60%] bg-[url('/assets/bgImg/homepage1-q30.webp')] bg-no-repeat absolute -right-28 landscape:4xl:-right-72 landscape:5xl:-right-[650px]  landscape:6xl:-right-[580px] portrait:w-[100%]  portrait:bg-cover portrait:right-0 portrait:h-[200px] portrait:md:h-[420px]"></div>
      </div>

      {/**trio section */}
      <div className="trio-container h-[400px] pb-36 portrait:pb-0 w-[100svw] landscape:2xl:h-[500px]  landscape:4xl:h-[550px] landscape:5xl:h-[700px] landscape:6xl:h-[900px] landscape:max-h-[900px] flex portrait:flex-col items-center portrait:-translate-y-36 portrait:h-full pt-10">
        <div className="flex portrait:flex-col justify-around items-baseline    w-full portrait:gap-16">
          <div className=" flex flex-col justify-start text-center items-center w-fit  gap-2">
            <img
              src="/assets/bgImg/homepage2-q30.webp"
              alt=""
              className="trio-img w-[90%]  h-full aspect-auto bg-cover bg-no-repeat z-10"
            />

            <article className="trio-article w-[80%] landscape:xl:w-[70%]">
              <h2 className="font-medium pt-2 text-[1rem] landscape:3xl:text-[1.2rem] landscape:5xl:text-[1.5rem] portrait:md:text-[1.3rem]">
                KEEP IT CONVENIENT
              </h2>
              <p className="text-[.8rem] font-light text-center landscape:3xl:text-[1rem] landscape:5xl:text-[1.2rem] portrait:text-[.9rem] portrait:md:text-[1rem] z-0">
                No haggling over when & where: meet interesting new people,
                wherever you happen to be - on your schedule!
              </p>
            </article>
          </div>

          <div className=" flex flex-col justify-start text-center items-center w-fit gap-2">
            <img
              src="/assets/bgImg/homepage5-q30.webp"
              alt=""
              className="trio-img w-[90%]  h-full bg-cover bg-no-repeat aspect-auto z-10"
            />

            <article className="trio-article w-[80%] landscape:xl:w-[70%] ">
              <h2 className="font-medium pt-2 text-[1rem] landscape:3xl:text-[1.2rem] landscape:5xl:text-[1.5rem] portrait:md:text-[1.3rem]">
                MAKE A CONNECTION
              </h2>
              <p className="text-[.8rem] font-light text-center landscape:3xl:text-[1rem] landscape:5xl:text-[1.2rem] portrait:text-[.9rem] portrait:md:text-[1rem] z-0">
                Match with buddies who pursue the same hobbies, share the same
                professional goals, and love the same foods
              </p>
            </article>
          </div>

          <div className=" flex flex-col justify-start text-center items-center w-fit gap-2">
            <img
              src="/assets/bgImg/homepage3-q30.webp"
              alt=""
              className="trio-img w-[90%]  h-full bg-cover bg-no-repeat aspect-auto z-10"
            />

            <article className="trio-article w-[80%] landscape:xl:w-[70%] ">
              <h2 className="font-medium pt-2 text-[1rem] landscape:3xl:text-[1.2rem] landscape:5xl:text-[1.5rem] portrait:md:text-[1.3rem]">
                NEW FAVORITE SPOT
              </h2>
              <p className="text-[.8rem] font-light text-center landscape:3xl:text-[1rem] landscape:5xl:text-[1.2rem] portrait:text-[.9rem] portrait:md:text-[1rem] z-0">
                Restaurant suggestions based on shared preferences between you &
                your new buddy
              </p>
            </article>
          </div>
        </div>
      </div>

      <div className="dark:bg-zinc-900/60 bg-zinc-200 trio-section  w-full overflow-hidden landscape:h-[calc(100svh_-_56px)] portrait:h-[calc(100svh_-_56px)] landscape:3xl:h-[calc(100svh_-_64px)] ">
        <div className="h-full flex justify-end w-full relative ">
          <div className=" object-cover basis-full vid-section scale-100 landscape:md:w-[30vw] h-full overflow-hidden  absolute top-0 left-0 opacity-100 portrait:w-[100svw]">
            <video
              src="/assets/bgImg/friends.mp4"
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline={true}
              defaultMuted={true}
              controls={false}
              className="  object-cover min-h-full w-full portrait:opacity-25"
            />
          </div>

          <div className="join-text opacity-100 flex flex-col  justify-center items-center  basis-1/2  -translate-x-20 ">
            <h2 className=" font-bold text-[5.5rem] text-center leading-none opacity-100 portrait:opacity-100 portrait:md:text-[6rem]">
              JOIN
            </h2>
            <p className="lunch-buddy  pl-28 text-[1rem] pb-4">lunch buddy</p>
            <p className="text-[.8rem] font-light tracking-wide portrait:text-[.9rem] portrait:md:text-[1.2rem]">
              to meet your next favorite lunch buddy today!
            </p>

            {/**CTA buttons container */}
            <div className=" uppercase  text-[.8rem] font-light leading-none relative tracking-widest portrait:md:text-[1rem]">
              {/**create an acc btn */}
              <Link
                to="/register"
                className="group  absolute -bottom-16 -right-5 portrait:-right-10 whitespace-nowrap  rounded-sm border dark:border-zinc-700 border-primary-gray  px-6 py-2   dark:text-white text-primary-gray"
              >
                <span className="absolute left-0 top-0 mb-0 flex h-0 w-full -translate-y-0 transform dark:bg-zinc-100 bg-primary-gray transition-all duration-700 ease-out group-hover:h-full"></span>
                <span className="relative  group-hover:text-white dark:group-hover:text-dark">
                  create an account
                </span>
              </Link>

              {/**sign in btn */}
              <Link
                to="/signin"
                className="group absolute -bottom-16 -right-44 portrait:-right-40 rounded-sm border dark:border-zinc-700 border-primary-gray  px-6 whitespace-nowrap  py-2  dark:text-white text-primary-gray "
              >
                <span className="absolute left-0 top-0 mb-0 flex h-0 w-full -translate-y-0 transform dark:bg-zinc-100 bg-primary-gray transition-all duration-700 ease-out group-hover:h-full"></span>
                <span className="relative  group-hover:text-white dark:group-hover:text-dark">
                  sign in
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
