import React, { useEffect, useState } from 'react';
import chevronRight from '../../assets/icons/chevron-right.svg';
import plus from '../../assets/icons/plus.svg';
import minusWhite from '../../assets/icons/minus-white.svg';

const TagSelect = ({ setter, tags = [], category, minTags, setMinTags }) => {
  const [tagExpand, setTagExpand] = useState(true);

  function handleTagClick(idx, setter) {
    const tempTags = [...tags];
    let tagToChange = tempTags[idx];
    tagToChange.clicked = !tagToChange.clicked;
    const minTagsCopy = { ...minTags[category] };
    setMinTags((prev) => ({
      ...prev,
      [category]: {
        minimum: minTagsCopy.minimum,
        show: minTagsCopy.show,
        numClicked: tagToChange.clicked
          ? minTagsCopy.numClicked++
          : minTagsCopy.numClicked--,
      },
    }));

    setter(tempTags);
    localStorage.setItem(category, JSON.stringify(tags));
  }
  // shadow-[0_35px_40px_-25px_rgba(0,0,0,0.2)]
  return (
    <div className="sm:px-8 pl-4 pt-6">
      <div className="text-headers mr-auto">
        <h2 className="ml-2">
          {category.toUpperCase()}{' '}
          {minTags[category]?.show && (
            <span className="text-gray-400 ml-2">
              Select at least {minTags[category]?.minimum}
            </span>
          )}
        </h2>
      </div>

      <div
        className={`${
          tagExpand ? '' : 'group tag-expand'
        } flex gap-x-1 my-4 pt-3 rounded-lg pb-3 px-1 pr-5`}
      >
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
        <div className="transition-all duration-1000 ease-in-out group-[.tag-expand]:max-h-[1000px] w-full flex flex-wrap gap-x-5 gap-y-2 max-h-16  overflow-hidden">
          {tags?.map((tag, idx) => {
            return (
              <button
                key={idx}
                className={`border transition duration-500 border-primary-gray rounded-full px-4 h-7 flex grow gap-4 items-center hover:bg-primary-gray/20 text-xs ${
                  tag.clicked ? 'button text-white  border-white ' : ''
                }`}
                onClick={() => handleTagClick(idx, setter)}
              >
                <p className="grow text-xs flex-col items-center capitalize">
                  {tag.tagName}
                </p>
                <img
                  className="w-5"
                  src={tag.clicked ? minusWhite : plus}
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
