import React from 'react';
import { Link } from 'react-router-dom';

const DropDownItem = (props) => {
  return (
    <li
      onClick={props.handleClick}
      className="transition-all w-full text-center font-thin hover:bg-[#f4978e]/20 hover:ease-in-out duration-500 h-fit landscape:py-2"
      style={{
        transitionDelay: '0.1s',
      }}
    >
      <Link
        to={props.linkTo}
        className="  block  align-middle  portrait:py-1 portrait:md:py-3 portrait:lg:py-4 landscape:xl:py-2"
      >
        <div className=" text-2xl md:mt-0 short:mt-0 landscape:xl:text-[3.1rem] landscape:short:text-[2rem]  portrait:text-4xl short:text-xl portrait:md:text-5xl portrait:lg:text-6xl ">
          {props.children.toUpperCase()}
        </div>
      </Link>
    </li>
  );
};

export default DropDownItem;
