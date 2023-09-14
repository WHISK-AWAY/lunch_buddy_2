import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
// import { Loader } from '@googlemaps/js-api-loader';
import { Wrapper } from '@googlemaps/react-wrapper';
import MapComponent from '../../components/MapComponent';
import { RestaurantCard } from '../index';
import {
  selectSearch,
  selectUser,
  selectAuth,
  selectRestaurants,
} from '../../redux/slices';

export default function RestaurantSuggestions() {
  const navigate = useNavigate();

  const location = useLocation();

  const search = useSelector(selectSearch);
  const mapsKey = useSelector((state) => state.search.mapsKey);
  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);
  const restaurants = useSelector(selectRestaurants);

  const { timeSlot, buddy } = location.state;

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
      className="w-screen  flex  justify-start items-center  landscape:lg:flex-row landscape:lg:justify-around landscape:lg:items-start landscape:h-[calc(100svh_-_56px)] portrait:h-[calc(100svh_-_56px)] landscape:3xl:h-[calc(100svh_-_64px)] overflow-hidden "
    >
      {/**desktop map container */}
      <div
        id="lg-map-container"
        className=" hidden h-[100svh] landscape:lg:block landscape:lg:basis-1/2 landscape:2xl:basis-full p-8 "
      >
        {mapsKey && (
          <Wrapper apiKey={mapsKey}>
            <MapComponent center={center} zoom={14} points={restaurants} />
          </Wrapper>
        )}
      </div>

      <div
        id="restaurant-results-wrapper"
        className="flex  w-full landscape:lg:basis-1/2 px-[5%] portrait:gap-6 gap-16 pt-8  h-full landscape:overflow-y-auto justify-center portrait:flex-col portrait:w-full landscape:gap-2 landscape:px-1"
      >
        {/**mobile map */}
        <div
          id="sm-map-wrapper"
          className="landscape:lg:hidden sticky top-0  h-[40svh] w-full landscape:h-[80svh] landscape:w-fit "
        >
          {mapsKey && (
            <Wrapper apiKey={mapsKey}>
              <MapComponent center={center} zoom={15} points={restaurants} />
            </Wrapper>
          )}
        </div>

        {/**restaurant container */}
        <div className="rest-card-wrapper flex flex-col gap-5  landscape:lg:min-w-[400px]  portrait:w-full portrait:self-center sticky  portrait:overflow-y-auto items-center landscape:xl:max-w-[20vw] ">
          <h1 className="text-xl text-headers font-semibold text-center portrait:text-[1rem] portrait:md:text-[1.3rem]">
            RESTAURANT SUGGESTIONS
          </h1>

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
