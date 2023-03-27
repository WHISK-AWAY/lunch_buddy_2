import React, { useState } from 'react';

export default function RestaurantCard({ restaurant }) {
  return (
    <div key={restaurant.id} className="restaurant-card">
      <h2>{restaurant.name}</h2>
      <img src={restaurant.image_url} alt="" />
      <p>Rating: {restaurant.rating}</p>
      <p>Reviews: {restaurant.review_count.toLocaleString()}</p>
      <button
        onClick={(e) => chooseRestaurant(e, restaurant)}
        className="button"
      >
        Select
      </button>
    </div>
  );
}
