import React, { useState } from 'react';
import plus from '../../assets/icons/plus-white.svg';

export default function RestaurantCard({ restaurant, chooseRestaurant }) {
  return (
    <div
      key={restaurant.id}
      className="restaurant-card flex flex-row gap-8 bg-light-gray rounded-xl shadow-md p-4"
    >
      <div className="image-wrapper shrink-0 relative">
        <img
          className="bg-white object-cover aspect-square w-32 h-32 rounded-[100%] z-10 p-1 relative self-end drop-shadow-md"
          src={restaurant.image_url}
          alt=""
        />
        <button
          onClick={(e) => chooseRestaurant(e, restaurant)}
          className="button-round rounded-full w-12 aspect-square absolute -top-4 -left-4 flex justify-center items-center"
        >
          <img src={plus} className="w-8 aspect-square" />
        </button>
      </div>
      <div className="info-wrapper">
        <a href={restaurant.url} target="_blank" alt="">
          <h2 className="text-headers font-semibold text-lg">
            {restaurant.name}
          </h2>
        </a>
        <p>{restaurant.location?.display_address?.join(' ')}</p>
        <p>Rating: {restaurant.rating}</p>
        <p>Reviews: {restaurant.review_count.toLocaleString()}</p>
      </div>
    </div>
  );
}
