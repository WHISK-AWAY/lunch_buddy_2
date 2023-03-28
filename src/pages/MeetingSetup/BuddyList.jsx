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
  if (buddiesList.searchResults.length === 0) return <h1>No friends :(</h1>;

  return (
    <div className="buddies-list-page flex flex-col justify-center items-center lg:flex-row lg:justify-between text-primary-gray h-[calc(100vh_-_75px)] overflow-hidden">
      <div className="buddies-image-container h-full basis-1/2 hidden lg:block bg-cover bg-[url('/assets/bgImg/buddyListView.jpg')] overflow-hidden"></div>
      <div className="buddies-list-wrapper flex flex-col items-center h-full lg:basis-1/2 gap-10 md:gap-8 py-8 overflow-auto">
        <h1 className="text-headers font-fredericka text-3xl pb-12 md:pb-24 pt-20">
          AVAILABLE BUDDIES
        </h1>
        {buddiesList.searchResults?.map((buddy) => {
          return (
            <BuddyCard
              key={buddy.id}
              buddy={buddy}
              myTagList={myTagList}
              selectBuddy={selectBuddy}
            />
          );
        })}
      </div>
    </div>
  );
}
