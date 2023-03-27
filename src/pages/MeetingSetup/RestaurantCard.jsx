import React, { useState } from 'react';
import plus from '../../assets/icons/plus-white.svg';

export default function RestaurantCard({ restaurant, chooseRestaurant }) {
  return (
    <div key={restaurant.id} className="restaurant-card flex flex-row">
      <div className="image-wrapper relative">
        <img
          className="bg-white object-cover aspect-square w-32 h-32 rounded-[100%] z-10 p-1 relative self-end drop-shadow-md"
          src={restaurant.image_url}
          alt=""
        />
        <button
          onClick={(e) => chooseRestaurant(e, restaurant)}
          className="button-round rounded-full w-12 aspect-square absolute -top-7 -right-3 md:-left-6 flex justify-center items-center"
        >
          <img src={plus} />
        </button>
      </div>
      <div className="info-wrapper">
        <h2>{restaurant.name}</h2>

        <p>Rating: {restaurant.rating}</p>
        <p>Reviews: {restaurant.review_count.toLocaleString()}</p>
      </div>
    </div>
  );
}
