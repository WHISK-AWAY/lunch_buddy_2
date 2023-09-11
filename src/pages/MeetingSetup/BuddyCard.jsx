import React, { useState, useEffect } from 'react';
import chevronRight from '../../assets/icons/chevron-right-gray.svg';
import chevronRightWhite from '../../assets/icons/chevron-right-white.svg';
import plus from '../../assets/icons/plus-white.svg';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../redux/slices/darkModeSlice';

const MAX_BUDDY_TAGS_SHOWING = 3;

export default function BuddyCard(props) {
  const [tagExpand, setTagExpand] = useState(false);
  const darkModeSelector = useSelector(selectDarkMode);

  const { buddy, myTagList, selectBuddy } = props;

  const [chevronIcon, setChevronIcon] = useState(chevronRight);

  useEffect(() => {
    if (!darkModeSelector) {
      setChevronIcon(chevronRight);
    } else {
      setChevronIcon(chevronRightWhite);
    }
  }, [darkModeSelector]);

  const webpUrl = buddy?.avatarUrl.split('.').at(0) + '-q1.webp';

  return (
    <div className="buddy_card font-jost relative xxs:w-[90%] w-4/5 md:w-[90%] lg:w-4/5 3xl:w-9/12 flex flex-col md:flex-row lg:flex-col  justify-between shrink items-center gap-6 p-4 pb-6 bg-primary-gray/20 dark:bg-white/10 shadow-md mb-20 xxs:mb-8 rounded-3xl portrait:md:w-[80%] md:p-10 4xl:p-16 ">
      <div className="buddy_avatar shrink-0 grow-0 justify-center items-center md:self-start lg:self-center  relative top-2">
        <picture>
          <source srcSet={webpUrl} type="image/webp" />
          <img
            className="bg-white object-cover aspect-square w-32 h-32 xxs:w-28 xxs:h-28 rounded-[100%] z-10 p-1 relative self-end "
            src={buddy.avatarUrl}
            width={1240}
            height={1850}
            alt={`${buddy.firstName}'s avatar image`}
          />
        </picture>
        <button
          className="select_buddy button-round rounded-full w-12 xxs:w-10 aspect-square absolute -top-4 -right-3 md:-left-4 lg:-right-3 xl:-left-4 flex justify-center items-center"
          onClick={() => selectBuddy(buddy)}
        >
          <img
            src={plus}
            className="w-8 aspect-square"
            alt="choose this buddy"
          />
        </button>
      </div>
      <div className="buddy-info flex flex-col gap-4 shrink grow-0 basis-4/5">
        <div className="buddy-header-wrapper flex flex-col gap-1">
          <div className="buddy_name text-headers self-center md:text-sm xxs:text-base portrait:md:text-lg 4xl:text-lg ">
            <p>{buddy.fullName.toUpperCase()}</p>
          </div>
          <div className="buddy-location self-center text-xs xxs:text-xs portrait:md:text-sm 4xl:text-base ">
            <p>{`${buddy.city}, ${buddy.state}`}</p>
          </div>
        </div>
        <div className="buddy_bio w-full text-center xxs:text-[3.6vw] portrait:text-base md:text-xs 4xl:text-base md:pb-2 ">
          <p>{buddy.aboutMe}</p>
        </div>

        <div className="taglist-wrapper flex flex-row flex-nowrap justify-start w-full">
          <div className="tag-expand-button self-start shrink-0 pr-5">
            <button
              className="self-start"
              onClick={() => setTagExpand((currentVal) => !currentVal)}
            >
              <img
                className={`w-6 transition-all ${tagExpand ? 'rotate-90' : ''}`}
                src={chevronIcon}
                alt="Expand/Retract Arrow"
              />
            </button>
          </div>
          <div
            className={`buddy_tags_container flex flex-row flex-wrap gap-3 justify-around items-center text-primary-gray w-full  ${
              tagExpand ? 'h-auto' : 'h-8 5xl:h-10 overflow-hidden'
            }`}
          >
            {buddy.tags
              .filter((tag) => myTagList.includes(tag.id))
              .map((tag) => {
                return (
                  <div
                    key={tag.id}
                    className="buddy_tag grow text-center 4xl:text-sm 5xl:text-lg rounded-full text-sm portrait:md:text-sm xxs:text-xs px-3 py-1 button text-white "
                  >
                    <p>{tag.tagName}</p>
                  </div>
                );
              })}
            {buddy.tags
              .filter((tag) => !myTagList.includes(tag.id))
              .map((tag) => {
                return (
                  <div
                    key={tag.id}
                    className="buddy_tag grow text-center 4xl:text-sm rounded-full 5xl:text-lg portrait:md:text-sm text-sm xxs:text-xs px-9 py-1 bg-white border dark:bg-[#0a0908] dark:text-white border-primary-gray "
                  >
                    <p>{tag.tagName}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
