import React, { useEffect, useState } from 'react';

const Bio = ({ setBio, bio, validBio }) => {
  return (
    <div className="flex relative mb-9 lg:w-9/12 w-10/12 lg:basis-1/2 text-primary-gray self-center  h-full">
      <label className="text-label block text-xs absolute -top-3 left-3 bg-white dark:bg-[#0a0908] px-1">
        Bio
      </label>
      <textarea
        autoFocus={true}
        type="text"
        rows="24"
        className={`w-full px-4 rounded-2xl portrait:lg:h-56 landscape:6xl:h-80 focus:outline-none border dark:text-white resize-none dark:border-white h-24 border-primary-gray text-sm py-2 scrollbar-hide bg-white dark:bg-[#0a0908] ${
          validBio ? '' : 'border-headers'
        }`}
        onChange={(e) => {
          localStorage.setItem('aboutBio', e.target.value);
          setBio(e.target.value);
        }}
        value={bio}
        placeholder={validBio ? '' : 'Please enter bio'}
      />
    </div>
  );
};

export default Bio;
