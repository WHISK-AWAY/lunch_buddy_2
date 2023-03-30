import React, { useEffect } from 'react';

const Bio = ({ setBio, bio }) => {
  return (
    <div className="relative mb-9 w-4/5 lg:w-5/12">
      <label className="text-label block text-xs absolute -top-3 left-3 bg-white px-1">
        Bio
      </label>
      <textarea
        className="w-full px-4 rounded-2xl focus:outline-none border border-primary-gray h-24 py-4"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
      />
    </div>
  );
};

export default Bio;
