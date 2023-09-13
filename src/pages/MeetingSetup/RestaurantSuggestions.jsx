import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Wrapper } from '@googlemaps/react-wrapper';
import MapComponent from '../../components/MapComponent';
import { RestaurantCard } from '../index';
import {
  selectSearch,
  selectUser,
  selectAuth,
  selectRestaurants,
} from '../../redux/slices';

export default function RestaurantSuggestions({ state }) {
  const navigate = useNavigate();

  const search = useSelector(selectSearch);
  const mapsKey = useSelector((state) => state.search.mapsKey);
  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);
  const restaurants = useSelector(selectRestaurants);

  const { timeSlot, buddy } = state;

  useEffect(() => {
    if (!auth.user?.id) navigate('/login');
  }, [auth.user?.id]);

  if (!restaurants) return <h1>No restaurants found :(</h1>;

  // for dev: store restaurant results in local storage to reduce # of calls to yelp
  window.localStorage.setItem(
    'restaurantResults',
    JSON.stringify(search.search?.restaurants)
  );

  function chooseRestaurant(e, restaurant) {
    e.preventDefault();
    localStorage.removeItem('restaurantResults');
    navigate('/match/confirm', { state: { timeSlot, buddy, restaurant } });
  }

  const center = { lat: +user.lastLat, lng: +user.lastLong };

  return (
    <div
      id="restaurant-page"
      className="w-screen h-[calc(100vh_-_75px)] flex flex-col justify-start items-center overflow-hidden lg:flex-row lg:justify-between lg:items-start bg-fixed"
    >
      <div
        id="lg-map-container"
        className="overflow-hidden hidden h-[calc(100vh_-_75px)] lg:block lg:basis-1/2 p-8"
      >
        {mapsKey && (
          <Wrapper apiKey={mapsKey}>
            <MapComponent center={center} zoom={14} points={restaurants} />
          </Wrapper>
        )}
      </div>
      <div
        id="restaurant-results-wrapper"
        className="flex flex-col w-full lg:basis-1/2 px-[5%] justify-start items-center gap-16 pt-16 h-full overflow-auto"
      >
        <h1 className="text-2xl text-headers font-semibold">
          RESTAURANT SUGGESTIONS
        </h1>
        <div id="sm-map-wrapper" className="lg:hidden">
          {mapsKey && (
            <Wrapper apiKey={mapsKey}>
              <MapComponent center={center} zoom={15} points={restaurants} />
            </Wrapper>
          )}
        </div>
        <div className="rest-card-wrapper flex flex-col gap-5">
          {restaurants.businesses?.slice(0, 15).map((restaurant) => {
            return (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                chooseRestaurant={chooseRestaurant}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
