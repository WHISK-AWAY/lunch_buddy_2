import React, { useEffect, useState } from 'react';

const Bio = ({ setBio, bio, validBio }) => {
  return (
    <div className="flex relative mb-9 lg:w-9/12 w-10/12 lg:basis-1/2 text-primary-gray self-center  h-[calc(100vh_-_65px)]">
      <label className="text-label block text-xs absolute -top-3 left-3 bg-white px-1">
        Bio
      </label>
      <textarea
        type="text"
        rows="24"
        className={`w-full px-4 rounded-2xl focus:outline-none border resize-none h-24 border-primary-gray text-sm py-2 scrollbar-hide ${
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
