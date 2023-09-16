import React from 'react';
import { Link } from 'react-router-dom';

const DropDownItem = (props) => {
  return (
    <li
      onClick={props.handleClick}
      className="transition-all w-full text-center font-thin h-fit landscape:py-2 max-w-screen overflow-x-hidden"
      style={{
        transitionDelay: '0.1s',
      }}
    >
      <Link
        to={props.linkTo}
        className="block align-middle portrait:py-1 portrait:md:py-3 portrait:lg:py-4 landscape:xl:py-2"
      >
        <div className="hover:scale-[1.02] flex items-center justify-center gap-4 hover:before:content-['•'] hover:after:content-['•'] before:text-2xl after:text-2xl before:font-roboto after:font-roboto hover:ease-in-out duration-300 text-2xl md:mt-0 short:mt-0 landscape:xl:text-[3.1rem] text-center landscape:short:text-[2rem] portrait:text-4xl short:text-xl portrait:md:text-5xl portrait:lg:text-6xl">
          {props.children.toUpperCase()}
        </div>
      </Link>
    </li>
  );
};

export default DropDownItem;
