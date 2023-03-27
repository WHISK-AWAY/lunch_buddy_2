import React, { useState } from 'react';

const Rating = () => {
  const [starRating, setStarRating] = useState(0);
  return (
    <div className="font-tenor border rounded-3xl flex flex-col justify-center items-center border-black w-11/12 mx-auto gap-y-6 px-4 py-8">
      <h2 className="text-headers text-lg">WE CARE ABOUT YOUR FEEDBACK</h2>
      <p>How was it?</p>
      <div className="flex gap-3">
        {[...Array(5)].map((star, idx) => (
          <span
            key={idx}
            onClick={() => setStarRating(idx + 1)}
            className={`text-2xl ${
              idx < starRating ? 'text-label' : 'text-[#ccc]'
            }`}
          >
            &#9733;
          </span>
        ))}
      </div>
    </div>
  );
};

export default Rating;
