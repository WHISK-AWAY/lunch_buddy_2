import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
// import { Loader } from '@googlemaps/js-api-loader';
import { Wrapper } from '@googlemaps/react-wrapper';
import MapComponent from '../../components/MapComponent';
import {
  findRestaurants,
  selectSearch,
  fetchUser,
  selectUser,
  selectAuth,
  tryToken,
  selectRestaurants,
} from '../../redux/slices';

const MAPS_API_KEY = import.meta.env.VITE_MAPS_API_KEY;

export default function RestaurantSuggestions(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const search = useSelector(selectSearch);
  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);
  const restaurants = useSelector(selectRestaurants);

  const { searchRadius, timeSlot, buddy } = location.state;

  // for dev: store restaurant results in local storage to reduce # of calls to yelp
  // let restResults = JSON.parse(
  //   window.localStorage.getItem('restaurantResults')
  // );

  useEffect(() => {
    if (user.id && !restaurants.length)
      dispatch(findRestaurants({ searchRadius, buddy }));
  }, [dispatch, user]);

  if (!restaurants) return <h1>No restaurants found :(</h1>;

  // for dev: store restaurant results in local storage to reduce # of calls to yelp
  window.localStorage.setItem(
    'restaurantResults',
    JSON.stringify(search.search?.restaurants)
  );

  const center = { lat: +user.lastLat, lng: +user.lastLong };
  // console.log('restaurants:', restaurants);

  return (
    <div id="restaurant-results-page">
      <h1>Restaurant Results</h1>
      <Wrapper apiKey={MAPS_API_KEY}>
        <MapComponent center={center} zoom={14} points={restaurants} />
      </Wrapper>
      {restaurants.businesses?.slice(0, 15).map((restaurant) => {
        return (
          <div key={restaurant.id} className="restaurant-card">
            <h2>{restaurant.name}</h2>
            <img src={restaurant.image_url} alt="" />
            <p>Rating: {restaurant.rating}</p>
            <p>Reviews: {restaurant.review_count.toLocaleString()}</p>
          </div>
        );
      })}
      <Link to="/match/confirm">To Meeting Recap Page</Link>
    </div>
  );
}
