import React from 'react';
import { Link } from 'react-router-dom';

const DropDownItem = (props) => {
  return (
    <li
      onClick={props.handleClick}
      className="transition-all w-full text-center font-thin hover:bg-[#f4978e]/20 hover:ease-in-out duration-500 h-fit"
      style={{
        transitionDelay: '0.1s',
      }}
    >
      <Link
        to={props.linkTo}
        className="py-2 base:py-0 block  align-middle grande:py-0 short:py-0 tall portrait:md:py-3 portrait:lg:py-4 "
      >
        <div className=" text-3xl md:mt-0 short:mt-0 tall:py-2 md:py-2  grande:py-0 sm:text-4xl short:text-xl portrait:md:text-5xl portrait:lg:text-6xl">
          {props.children.toUpperCase()}
        </div>
      </Link>
    </li>
  );
};

export default DropDownItem;
