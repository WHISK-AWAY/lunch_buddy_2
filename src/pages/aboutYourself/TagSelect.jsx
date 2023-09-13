import React, { useEffect, useState } from 'react';
import chevronRight from '../../assets/icons/chevron-right.svg';
import chevronRightWhite from '../../assets/icons/chevron-right-white.svg';
import plus from '../../assets/icons/plus.svg';
import minusWhite from '../../assets/icons/minus-white.svg';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectDarkMode,
  darkModeOff,
  darkModeOn,
} from '../../redux/slices/darkModeSlice';

const TagSelect = ({ setter, tags = [], category, minTags, setMinTags }) => {
  const dispatch = useDispatch();

  const darkModeSelector = useSelector(selectDarkMode);
  const [chevronRightIcon, setChevronRightIcon] = useState(chevronRightWhite);
  const [tagExpand, setTagExpand] = useState(true);

  function handleTagClick(idx, setter) {
    const tempTags = [...tags];

    let tagToChange = tempTags[idx];
    let updatedCount = minTags[category].numClicked;

    tagToChange.clicked = !tagToChange.clicked;

    if (tagToChange.clicked) {
      updatedCount++;
    } else {
      updatedCount--;
    }

    const minTagsCopy = { ...minTags[category] };

    setMinTags((prev) => ({
      ...prev,
      [category]: {
        minimum: minTagsCopy.minimum,
        show: minTagsCopy.show,
        numClicked: updatedCount,
        // numClicked: tagToChange.clicked
        //   ? ++minTagsCopy.numClicked
        //   : --minTagsCopy.numClicked,
      },
    }));

    setter(tempTags);
    localStorage.setItem(category, JSON.stringify(tags));
  }

  useEffect(() => {
    if (!darkModeSelector) {
      dispatch(darkModeOff());
      setChevronRightIcon(chevronRight);
    } else {
      dispatch(darkModeOn());
      setChevronRightIcon(chevronRightWhite);
    }
  }, [darkModeSelector]);

  return (
    <div className="sm:px-8 pl-4 pt-6 portrait:lg:text-[1.4rem]">
      <div className="text-headers mr-auto">
        <h2 className="ml-2">
          {category.toUpperCase()}{' '}
          {minTags[category]?.minimum > 0 && (
            <span
              className={`ml-2 text-sm portrait:lg:text-base ${
                minTags[category].show ? 'text-red-500' : 'text-gray-400'
              }`}
            >
              (choose at least {minTags[category]?.minimum})
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
            src={chevronRightIcon}
            alt="Expand/Retract Arrow"
          />
        </button>
        <div className="transition-all duration-1000 ease-in-out group-[.tag-expand]:max-h-[1000px] w-full flex flex-wrap gap-x-5 gap-y-2 max-h-16  overflow-hidden ">
          {tags?.map((tag, idx) => {
            return (
              <button
                key={idx}
                className={`border  transition duration-500 border-primary-gray  rounded-full px-4 h-7 flex grow gap-4 items-center hover:bg-primary-gray/20 text-xs  ${
                  tag.clicked ? 'button text-white  border-white ' : ''
                }`}
                onClick={() => handleTagClick(idx, setter)}
              >
                <p className="grow text-xs flex-col items-center capitalize portrait:lg:text-lg">
                  {tag.tagName}
                </p>
                <img
                  className="w-5"
                  src={tag.clicked ? minusWhite : plus}
                  alt={`click to ${tag.clicked ? 'deselect' : 'select'}`}
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
