import React from 'react';
import { Link } from 'react-router-dom';

const DropDownItem = (props) => {
  return (
    <li
      onClick={props.handleClick}
      className="transition-all border-b border-primary-gray w-full text-center h-16 border-collapse hover:bg-label/20 hover:ease-in duration-400 "
      style={{
        transitionDelay: '0.1s',
      }}
    >
      <Link to={props.linkTo}>
        <div className="mt-5">{props.children.toUpperCase()}</div>
      </Link>
    </li>
  );
};

export default DropDownItem;
