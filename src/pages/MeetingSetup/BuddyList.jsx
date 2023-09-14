import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import {
  selectSearch,
  selectUser,
  selectAuth,
  findRestaurants,
} from '../../redux/slices';
import { BuddyCard } from '../index';

export default function BuddyList({ state }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const buddiesList = useSelector(selectSearch);
  const restaurantsLoading = useSelector((state) => state.search.isLoading);
  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);

  const wrapperRef = useRef(null);
  const topImageRef = useRef(null);

  const [readyToProceed, setReadyToProceed] = useState(false);
  const [buddy, setBuddy] = useState(null);

  const { searchRadius, timeSlot } = state;

  useEffect(() => {
    // return to login if no token exists
    // otherwise, pull potential matches
    if (!auth.user?.id) {
      console.warn('missing login information - returning to login screen');
      navigate('/login');
    } else if (!searchRadius || !timeSlot) {
      console.warn(
        'missing meeting setup information - returning to home screen'
      );
      navigate('/');
    }
  }, [searchRadius, timeSlot, auth.user?.id]);

  useEffect(() => {
    // fade bg image in only after it's downloaded
    const bgImg = new Image();
    bgImg.src =
      window.innerWidth < 1280
        ? '/assets/bgImg/signInView-q30.webp'
        : '/assets/bgImg/buddyList-lq_10.webp';

    gsap.set(topImageRef.current, { opacity: 0 });

    bgImg.onload = () => {
      gsap.to(topImageRef.current, { opacity: 1, duration: 0.5 });
    };
  }, []);

  useEffect(() => {
    if (readyToProceed && !restaurantsLoading) {
      navigate('/match/restaurants', {
        state: { timeSlot, buddy },
      });
    }
  }, [readyToProceed, restaurantsLoading, timeSlot, buddy]);

  function selectBuddy(buddy) {
    dispatch(findRestaurants({ searchRadius, buddy }));
    setReadyToProceed(true);
    setBuddy(buddy);

    gsap.to(wrapperRef.current, { opacity: 0 });
  }

  const myTagList = user.tags?.map((tag) => tag.id) || [];

  /**
   * TODO: make sure this set of guards is doing what we intend / sending the correct feedback
   */
  // if (!buddiesList || buddiesList?.isLoading || !user || user.isLoading)
  //   return <h1>Loading...</h1>;
  if (buddiesList.error || user.error || auth.error)
    return (
      <h1>
        An error occurred. Back to <Link to="/">home</Link>
      </h1>
    );

  return (
    <div
      ref={wrapperRef}
      className="buddies-list-page  bg-white dark:bg-dark dark:text-white flex flex-col justify-center items-center lg:flex-row lg:justify-between text-primary-gray   landscape:h-[calc(100svh_-_56px)] portrait:h-[calc(100svh_-_56px)] landscape:3xl:h-[calc(100svh_-_64px)] "
    >
      <div
        ref={topImageRef}
        className="buddies-image-container h-full basis-full hidden bg-[url('/assets/bgImg/signInView.jpg')] lg:block bg-cover supports-[background-image:_url('/assets/bgImg/signInView-q30.webp')]:bg-[url('/assets/bgImg/signInView-q30.webp')] xl:bg-[url('/assets/bgImg/buddyList-lq_10.webp')] overflow-hidden"
      ></div>
      <div className="buddies-list-wrapper flex flex-col items-center h-full lg:basis-7/12 gap-1 portrait:md:gap-1  overflow-auto">
        <h1 className="text-headers   md:text-lg   md:pt-10 pt-6 text-xl font-semibold  4xl:text-3xl portrait:md:text-2xl">
          AVAILABLE BUDDIES
        </h1>
        <p className="pb-5 md:pb-10 text-sm portrait:md:pb-4 ">
          *highlighted tags are those you share in common
        </p>
        {buddiesList.searchResults.length > 0 ? (
          buddiesList.searchResults?.map((buddy) => {
            return (
              <BuddyCard
                key={buddy.id}
                buddy={buddy}
                myTagList={myTagList}
                selectBuddy={selectBuddy}
              />
            );
          })
        ) : (
          <div>
            <p>We're sorry...</p>
            <p>
              It looks like there's no one in your area looking for lunch just
              now. Please try back later!
            </p>
            <p>
              <Link to="/" className="text-headers">
                BACK HOME
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
