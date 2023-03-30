import React, { useEffect, useState } from 'react';
import chevronRight from '../../assets/icons/chevron-right.svg';
import plus from '../../assets/icons/plus.svg';
import minus from '../../assets/icons/minus.svg';

const TagSelect = ({ setter, tags = [], category }) => {
  const [tagExpand, setTagExpand] = useState(true);

  function handleTagClick(idx, setter) {
    const tempTags = [...tags];
    let tagToChange = tempTags[idx];
    tagToChange.clicked = !tagToChange.clicked;
    setter(tempTags);
  }

  return (
    <div className="sm:px-8 lg:w-1/4">
      <div className="text-headers mr-auto">
        <h2 className="ml-2">{category.toUpperCase()}</h2>
      </div>
      <div className="flex gap-x-1 my-4">
        <button
          className="self-start"
          onClick={() => setTagExpand((prev) => !prev)}
        >
          <img
            className={`w-5 transition-all ${tagExpand ? '' : 'rotate-90'}`}
            src={chevronRight}
            alt="Expand/Retract Arrow"
          />
        </button>
        <div
          className={`w-full flex flex-wrap gap-x-5 gap-y-2 duration-200 ease-in-out ${
            tagExpand ? 'h-16 lg:h-60 lg:max-h-96 overflow-hidden' : `h-auto`
          }`}
        >
          {tags?.map((tag, idx) => {
            return (
              <button
                key={idx}
                className={`border border-primary-gray rounded-full px-4 h-7 lg:h-auto flex grow gap-4 items-center hover:bg-slate-100 text-sm sm:text-base ${
                  tag.clicked ? 'button text-white transition-all' : ''
                }`}
                onClick={() => handleTagClick(idx, setter)}
              >
                <p className="grow text-xs">{tag.tagName}</p>
                <img
                  className="w-5"
                  src={tag.clicked ? minus : plus}
                  alt="Toggle tag icon"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TagSelect;
