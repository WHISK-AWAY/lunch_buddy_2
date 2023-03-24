import React, { useEffect } from 'react';

const Bio = ({ setBio , bio}) => {
  return (
    <div className="relative mb-4 w-4/5">
      <label className="text-red-400 font-semibold block text-sm sm:text-base absolute -top-3 left-3 bg-white px-1">
        Bio
      </label>
      <textarea
        className="w-full px-4 rounded-2xl focus:outline-none border border-slate-700 h-24 py-4"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
      />
    </div>
  );
};

export default Bio;
