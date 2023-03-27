import React, { useState } from 'react';
import chevronRight from '../../assets/icons/chevron-right.svg';
import plus from '../../assets/icons/plus-white.svg';

const MAX_BUDDY_TAGS_SHOWING = 3;

export default function BuddyCard(props) {
  const [tagExpand, setTagExpand] = useState(false);

  const { buddy, myTagList, selectBuddy } = props;

  return (
    <div className="buddy_card relative w-4/5 md:w-3/5 flex flex-col md:flex-row justify-between shrink items-center gap-6 p-4 bg-light-gray shadow-md rounded-xl">
      <div className="buddy_avatar shrink-0 grow-0 justify-center items-center md:self-start relative top-2">
        <img
          className="bg-white object-cover aspect-square w-32 h-32 rounded-[100%] z-10 p-1 relative self-end drop-shadow-md"
          src={buddy.avatarUrl}
        />
        <button
          className="select_buddy button-round rounded-full w-16 aspect-square absolute -top-7 -right-3 md:-left-6 flex justify-center items-center"
          onClick={() => selectBuddy(buddy)}
        >
          <img src={plus} className="w-10 h-10" />
        </button>
      </div>
      <div className="buddy-info flex flex-col gap-4 shrink grow-0 basis-4/5">
        <div className="buddy_name text-headers font-semibold self-center text-lg">
          {buddy.fullName.toUpperCase()}
        </div>
        <div className="buddy-location self-center text-sm">{`${buddy.city}, ${buddy.state}`}</div>
        <div className="buddy_bio w-full">{buddy.aboutMe}</div>
        <div className="buddy_tags_container flex flex-wrap flex-row gap-3 justify-center items-center">
          {/* Filter buddy tags for those overlapping our own, 
        up to a limit set by MAX_BUDDY_TAGS constant.
        
        Should we instead list them all & hide the extras (> 1 row) under
        an expandy-thingy?
        */}
          {buddy.tags
            .filter((tag) => myTagList.includes(tag.id))
            .map((tag) => {
              return (
                <div
                  key={tag.id}
                  className="buddy_tag rounded-full text-sm px-3 py-1 bg-white border border-primary-gray"
                >
                  {tag.tagName}
                </div>
              );
            })
            .slice(0, MAX_BUDDY_TAGS_SHOWING)}
        </div>
        <div className="tag-expand-button">
          {' '}
          <button
            className="self-start"
            onClick={() => setTagExpand((currentVal) => !currentVal)}
          >
            <img
              className={`w-6 transition-all ${tagExpand ? '' : 'rotate-90'}`}
              // src={tagExpand ? chevronRight : chevronDown}
              src={chevronRight}
              alt="Expand/Retract Arrow"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
