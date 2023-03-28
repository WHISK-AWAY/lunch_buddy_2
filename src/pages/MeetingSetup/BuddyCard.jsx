import React, { useState } from 'react';
import chevronRight from '../../assets/icons/chevron-right-gray.svg';
import plus from '../../assets/icons/plus-white.svg';

const MAX_BUDDY_TAGS_SHOWING = 3;

export default function BuddyCard(props) {
  const [tagExpand, setTagExpand] = useState(false);

  const { buddy, myTagList, selectBuddy } = props;

  return (
    <div className="buddy_card relative w-4/5 md:w-3/5 lg:w-4/5 3xl:w-9/12 flex flex-col md:flex-row lg:flex-col xl:flex-row justify-between shrink items-center gap-6 p-4 pb-6 bg-light-gray shadow-md rounded-xl">
      <div className="buddy_avatar shrink-0 grow-0 justify-center items-center md:self-start lg:self-center xl:self-start relative top-2">
        <img
          className="bg-white object-cover aspect-square w-32 h-32 rounded-[100%] z-10 p-1 relative self-end drop-shadow-md"
          src={buddy.avatarUrl}
          alt="A buddy's avatar image"
        />
        <button
          className="select_buddy button-round rounded-full w-12 aspect-square absolute -top-4 -right-3 md:-left-4 lg:-right-3 xl:-left-4 flex justify-center items-center"
          onClick={() => selectBuddy(buddy)}
        >
          <img src={plus} className="w-8 aspect-square" />
        </button>
      </div>
      <div className="buddy-info flex flex-col gap-4 shrink grow-0 basis-4/5">
        <div className="buddy-header-wrapper flex flex-col gap-1">
          <div className="buddy_name text-headers font-semibold self-center text-lg">
            <p>{buddy.fullName.toUpperCase()}</p>
          </div>
          <div className="buddy-location self-center text-sm">
            <p>{`${buddy.city}, ${buddy.state}`}</p>
          </div>
        </div>
        <div className="buddy_bio w-full text-center">
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
                // src={tagExpand ? chevronRight : chevronDown}
                src={chevronRight}
                alt="Expand/Retract Arrow"
              />
            </button>
          </div>
          <div
            className={`buddy_tags_container flex flex-row flex-wrap gap-3 justify-around items-center ${
              tagExpand ? 'h-auto' : 'h-8 overflow-hidden'
            }`}
          >
            {buddy.tags
              .filter((tag) => myTagList.includes(tag.id))
              .map((tag) => {
                return (
                  <div
                    key={tag.id}
                    className="buddy_tag grow text-center rounded-full text-sm px-3 py-1 button text-white"
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
                    className="buddy_tag grow text-center rounded-full text-sm px-3 py-1 bg-white border border-primary-gray"
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
