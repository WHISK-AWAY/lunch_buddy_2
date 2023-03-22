import React from 'react';

const Bio = () => {
  return (
    <div className="relative col-span-full h-44 w-4/5">
      <label className="text-red-400 font-semibold block text-sm sm:text-base absolute -top-3 left-3 bg-white px-1">
        Bio
      </label>
      <textarea
        className="w-full px-4 rounded-2xl focus:outline-none border border-slate-700 py-12"
        onChange={(e) =>
          setFormInputs((prev) => ({ ...prev, password: e.target.value }))
        }
      />
    </div>
  );
};

export default Bio;
