import React, { useEffect } from 'react';
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
import plus from '../../assets/icons/plus-white.svg';

const MAX_BUDDY_TAGS = 3;

export default function BuddyList(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const buddiesList = useSelector(selectSearch);
  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();

  const { searchRadius, timeSlot } = location.state;

  useEffect(() => {
    if (!auth.user?.id) {
      dispatch(tryToken());
    }

    if (!searchRadius || !timeSlot) {
      console.warn('uh oh');
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

  if (!buddiesList || buddiesList?.isLoading || !user.id || user.isLoading)
    return <h1>Loading...</h1>;
  if (buddiesList.searchResults.length === 0) return <h1>No friends :(</h1>;

  return (
    <div className="buddies-list-page flex flex-col items-center gap-10 md:gap-8 pt-8 text-primary-gray">
      <h1 className="text-headers font-fredericka text-3xl pb-10 pt-20">
        AVAILABLE BUDDIES
      </h1>
      {buddiesList.searchResults?.map((buddy) => {
        return (
          <div
            key={buddy.id}
            className="buddy_card relative w-4/5 md:w-3/5 flex flex-col md:flex-row justify-between shrink items-center gap-6 p-4 bg-light-gray shadow-md rounded-xl"
          >
            <div className="buddy_avatar shrink-0 grow-0 justify-center items-center md:self-start relative top-2">
              <img
                className="bg-white object-cover aspect-square w-32 h-32 rounded-[100%] z-10 p-1 relative self-end drop-shadow-md"
                src={buddy.avatarUrl}
              />
              <button
                className="select_buddy button-round rounded-full w-16 aspect-square absolute -top-7 -right-3 md:-left-6 flex justify-center items-center"
                onClick={() => selectBuddy(buddy)}
              >
                <img src={plus} className="w-10 h-10" />
              </button>
            </div>
            <div className="buddy-info flex flex-col gap-4 shrink grow-0 basis-4/5">
              <div className="buddy_name text-headers font-semibold self-center text-lg">
                {buddy.fullName.toUpperCase()}
              </div>
              <div className="buddy-location self-center text-sm">{`${buddy.city}, ${buddy.state}`}</div>
              <div className="buddy_bio w-full">{buddy.aboutMe}</div>
              <div className="buddy_tags_container flex flex-wrap flex-row gap-3 justify-center items-center">
                {/* Filter buddy tags for those overlapping our own, 
                up to a limit set by MAX_BUDDY_TAGS constant.
                
                Should we instead list them all & hide the extras (> 1 row) under
                an expandy-thingy?
                */}
                {buddy.tags
                  .filter((tag) => myTagList.includes(tag.id))
                  .map((tag) => {
                    return (
                      <div
                        key={tag.id}
                        className="buddy_tag rounded-full text-sm px-3 py-1 bg-white border border-primary-gray"
                      >
                        {tag.tagName}
                      </div>
                    );
                  })
                  .slice(0, MAX_BUDDY_TAGS)}
              </div>
            </div>
          </div>
        );
      })}
      <Link to="/match/restaurants">To Restaurant Suggestion Page</Link>
    </div>
  );
}
