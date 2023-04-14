import React from 'react';
import { Link } from 'react-router-dom';

const DropDownItem = (props) => {
  return (
    <li
      onClick={props.handleClick}
      className="transition-all border-b border-primary-gray w-full text-center border-collapse hover:bg-orange-400/20 hover:ease-in-out duration-500 "
      style={{
        transitionDelay: '0.1s',
      }}
    >
      <Link to={props.linkTo} className="pt-2 pb-6 block align-middle">
        <div className="mt-5">{props.children.toUpperCase()}</div>
      </Link>
    </li>
  );
};

export default DropDownItem;
