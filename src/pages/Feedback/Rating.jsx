import React, { useState } from 'react';

const Rating = ({ starRating, setStarRating, noRating }) => {
  return (
    <div className=" border rounded-lg flex flex-col justify-center text-primary-gray dark:text-white items-center border-primary-gray w-11/12 mx-auto gap-y-6 px-4 py-8 lg:w-4/5 2xl:w-3/5 5xl:w-2/5">
      <h2 className="text-headers text-lg md:text-sm">WE CARE ABOUT YOUR FEEDBACK</h2>
      <p className='text-sm'>how was it?</p>
      {noRating && (
        <p className="text-primary-gray text-xs">
          please leave a rating of at least one star.
        </p>
      )}
      <div className="flex gap-3">
        {[...Array(5)].map((star, idx) => (
          <button key={idx}>
            <span
              onClick={() => setStarRating(idx + 1)}
              className={`text-3xl ${
                idx < starRating ? 'text-headers' : 'text-primary-gray'
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
