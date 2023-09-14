import React, { useState } from 'react';
import plus from '../../assets/icons/plus-white.svg';

export default function RestaurantCard({ restaurant, chooseRestaurant }) {
  return (
    <div
      key={restaurant.id}
      className="restaurant-card flex flex-row gap-8 bg-primary-gray/20 dark:bg-white/10 rounded-xl shadow-md p-4 dark:text-white text-primary-gray "
    >
      <div className="image-wrapper shrink-0 relative">
        <img
          className="bg-white object-cover aspect-square w-28 h-28 rounded-[100%] z-10 p-1 relative self-end drop-shadow-md cursor-pointer"
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
      <div className="info-wrapper text-center">
        <a href={restaurant.url} target="_blank" alt="">
          <h2 className="text-headers font-semibold text-base cursor-pointer">
            {restaurant.name}
          </h2>
        </a>
        <p className="text-[.8rem]">
          {restaurant.location?.display_address?.join(' ')}
        </p>
        <p className="text-[.8rem]">Rating: {restaurant.rating}</p>
        <p className="text-[.8rem]">
          Reviews: {restaurant.review_count.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
