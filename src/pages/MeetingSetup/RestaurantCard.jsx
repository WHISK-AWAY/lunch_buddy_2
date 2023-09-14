import React from 'react';
import plus from '../../assets/icons/plus-white.svg';

export default function RestaurantCard({ restaurant, chooseRestaurant }) {
  return (
    <div
      key={restaurant.id}
      className="restaurant-card flex flex-row justify-between gap-10 bg-primary-gray/20 dark:bg-white/10 rounded-xl shadow-md p-4 dark:text-white text-primary-gray landscape:w-full  w-[90svw] px-10 portrait:px-3 portrait:md:w-[50svw] portrait:lg:w-[50svw] landscape:px-4 landscape:gap-4 portrait:md:justify-center landscape:xl:gap-8"
    >
      <div className="image-wrapper  relative w-24 h-24 landscape:h-16 landscape:xl:w-28  landscape:xl:h-20">
        <img
          className="bg-white object-cover  w-full h-full aspect-square  rounded-[100%] z-10 p-1 relative self-end drop-shadow-md cursor-pointer"
          src={restaurant.image_url}
          alt="restaurant image provided by yelp"
        />
        <button
          onClick={(e) => chooseRestaurant(e, restaurant)}
          className="button-round rounded-full w-10 aspect-square absolute -top-3 -left-3 flex justify-center items-center"
        >
          <img
            src={plus}
            className="w-8 aspect-square"
            alt="choose this restaurant"
          />
        </button>
      </div>
      <div className="info-wrapper text-center self-center  portrait:text-xs w-44 landscape:w-full ">
        <a href={restaurant.url} target="_blank" alt="">
          <h2 className="text-headers font-semibold text-base portrait:text-sm portrait:md:text-[1.1rem] cursor-pointer">
            {restaurant.name}
          </h2>
        </a>
        <p className="text-[.8rem] portrait:md:text-[1rem]">
          {restaurant.location?.display_address?.join(' ')}
        </p>
        <p className="text-[.8rem] portrait:md:text-[1rem]">
          Rating: {restaurant.rating}
        </p>
        <p className="text-[.8rem] portrait:md:text-[1rem]">
          Reviews: {restaurant.review_count.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
