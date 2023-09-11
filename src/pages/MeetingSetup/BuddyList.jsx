import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  findBuddies,
  selectSearch,
  fetchUser,
  selectUser,
  selectAuth,
  tryToken,
} from '../../redux/slices';
import { BuddyCard } from '../index';

export default function BuddyList(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const buddiesList = useSelector(selectSearch);
  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();

  const { searchRadius, timeSlot } = location.state;

  useEffect(() => {
    // return to login if no token exists
    if (!window.localStorage.getItem('token')) navigate('/login');

    // populate auth state
    if (!auth.user?.id) {
      dispatch(tryToken());
    }

    if (!searchRadius || !timeSlot) {
      console.warn('searchRadius/timeSlot missing');
    } else {
      dispatch(findBuddies({ searchRadius }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (auth.user?.id && !user.id) dispatch(fetchUser(auth.user.id));
  }, [dispatch, auth]);

  function selectBuddy(buddy) {
    navigate('/match/restaurants', {
      state: { searchRadius, timeSlot, buddy },
    });
  }

  const myTagList = user.tags?.map((tag) => tag.id) || [];

  /**
   * TODO: make sure this set of guards is doing what we intend / sending the correct feedback
   */
  if (!buddiesList || buddiesList?.isLoading || !user || user.isLoading)
    return <h1>Loading...</h1>;
  if (buddiesList.error || user.error || auth.error)
    return (
      <h1>
        An error occurred. Back to <Link to="/">home</Link>
      </h1>
    );

  return (
    <div className="buddies-list-page  bg-white dark:bg-[#0a0908] dark:text-white flex flex-col justify-center items-center lg:flex-row lg:justify-between text-primary-gray   h-[calc(100vh_-_56px)] sm:h-[calc(100dvh_-_80px)] xs:h-[calc(100dvh_-_71px)] portrait:md:h-[calc(100dvh_-_85px)] portrait:lg:h-[calc(100dvh_-_94px)] md:h-[calc(100dvh_-_60px)] xl:h-[calc(100dvh_-_70px)] 5xl:h-[calc(100dvh_-_80px)]   ">
      <div className="buddies-image-container h-full basis-full hidden bg-[url('/assets/bgImg/signInView.jpg')] lg:block bg-cover supports-[background-image:_url('/assets/bgImg/signInView-q30.webp')]:bg-[url('/assets/bgImg/signInView-q30.webp')] xl:bg-[url('/assets/bgImg/buddyList-lq_10.webp')] overflow-hidden"></div>
      <div className="buddies-list-wrapper flex flex-col items-center h-full lg:basis-7/12 gap-3 portrait:md:gap-1  overflow-auto">
        <h1 className="text-headers   md:text-lg pb-5 md:pb-10 md:pt-10 pt-6 text-xl font-semibold portrait:md:pb-4 4xl:text-3xl portrait:md:text-2xl">
          AVAILABLE BUDDIES
        </h1>
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
