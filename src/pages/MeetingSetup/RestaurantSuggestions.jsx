import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  findRestaurants,
  selectSearch,
  fetchUser,
  selectUser,
  selectAuth,
  tryToken,
} from '../../redux/slices';

export default function RestaurantSuggestions(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const search = useSelector(selectSearch);
  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);

  const { searchRadius, timeSlot, buddy } = location.state;

  console.log(searchRadius);
  console.log('search:', search);

  useEffect(() => {
    dispatch(findRestaurants({ searchRadius }));
  }, [dispatch]);

  return <Link to="/match/confirm">To Meeting Recap Page</Link>;
}
