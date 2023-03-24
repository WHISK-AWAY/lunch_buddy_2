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
    console.log(`${buddy.fullName} selected`);

    navigate('/match/restaurants', {
      state: { searchRadius, timeSlot, buddy },
    });
  }

  const myTagList = user.tags?.map((tag) => tag.id) || [];

  if (!buddiesList || buddiesList?.isLoading || !user.id || user.isLoading)
    return <h1>Loading...</h1>;
  if (buddiesList.searchResults.length === 0) return <h1>No friends :(</h1>;

  return (
    <div id="buddies-list-page">
      <ul>
        {buddiesList.searchResults?.map((buddy) => {
          return (
            <div key={buddy.id} className="buddy_card">
              <button
                className="select_buddy"
                onClick={() => selectBuddy(buddy)}
              >
                +
              </button>
              <div className="buddy_avatar">
                <img src={buddy.avatarUrl}></img>
              </div>
              <div className="buddy_name">{buddy.fullName}</div>
              <div className="buddy_bio">{buddy.aboutMe}</div>
              <div className="buddy_tags_container">
                {/* Filter buddy tags for those overlapping our own, 
                up to a limit set by MAX_BUDDY_TAGS constant.
                
                Should we instead list them all & hide the extras (> 1 row) under
                an expandy-thingy?
                */}
                {buddy.tags
                  .filter((tag) => myTagList.includes(tag.id))
                  .map((tag) => {
                    return (
                      <div key={tag.id} className="buddy_tag">
                        {tag.tagName}
                      </div>
                    );
                  })
                  .slice(0, MAX_BUDDY_TAGS)}
              </div>
            </div>
          );
        })}
      </ul>
      <Link to="/match/restaurants">To Restaurant Suggestion Page</Link>
    </div>
  );
}
