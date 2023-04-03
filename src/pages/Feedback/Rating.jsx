import React, { useState } from 'react';

const Rating = ({ starRating, setStarRating, noRating }) => {
  return (
    <div className="font-tenor border rounded-3xl flex flex-col justify-center text-primary-gray items-center border-primary-gray w-11/12 mx-auto gap-y-6 px-4 py-8">
      <h2 className="text-headers text-lg">WE CARE ABOUT YOUR FEEDBACK</h2>
      <p>how was it?</p>
      {noRating && (
        <p className="text-headers">
          Please leave a rating of at least one star.
        </p>
      )}
      <div className="flex gap-3">
        {[...Array(5)].map((star, idx) => (
          <button key={idx}>
            <span
              onClick={() => setStarRating(idx + 1)}
              className={`text-3xl ${
                idx < starRating ? 'text-headers' : 'text-[#ccc]'
              }`}
            >
              &#9733;
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Rating;
