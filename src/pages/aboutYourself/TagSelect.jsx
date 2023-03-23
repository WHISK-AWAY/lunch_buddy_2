import React, { useEffect, useState } from 'react';
import chevronRight from '../../assets/icons/chevron-right.svg';
import plus from '../../assets/icons/plus.svg';
import minus from '../../assets/icons/minus.svg';

const TagSelect = ({ setter, tags = [], height, category }) => {
  const [tagExpand, setTagExpand] = useState(true);

  function handleTagClick(idx, setter) {
    const tempTags = [...tags];
    let tagToChange = tempTags[idx];
    tagToChange.clicked = !tagToChange.clicked;
    setter(tempTags);
  }

  return (
    <>
      <div className="text-red-400 mr-auto">
        <h2 className="ml-2">{category}</h2>
      </div>
      <div className="flex gap-x-1 my-4">
        <button
          className="self-start"
          onClick={() => setTagExpand((prev) => !prev)}
        >
          <img
            className={`w-6 transition-all ${tagExpand ? '' : 'rotate-90'}`}
            // src={tagExpand ? chevronRight : chevronDown}
            src={chevronRight}
            alt="Expand/Retract Arrow"
          />
        </button>
        <div
          className={`w-full flex justify-center flex-wrap gap-x-5 gap-y-2 duration-200 ease-in-out ${
            tagExpand ? 'h-16 overflow-hidden' : ``
          }`}
        >
          {tags?.map((tag, idx) => {
            return (
              <button
                key={idx}
                className={`border border-black rounded-full px-4 h-7 flex justify-between gap-4 items-center hover:bg-slate-100 text-sm sm:text-base ${
                  tag.clicked
                    ? 'bg-gradient-to-r from-orange-300 to-red-400 text-white transition-all'
                    : ''
                }`}
                onClick={() => handleTagClick(idx, setter)}
              >
                <p>{tag.tagName}</p>
                <img
                  className="w-6"
                  src={tag.clicked ? minus : plus}
                  alt="Toggle tag icon"
                />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TagSelect;
