import React from 'react';
import { Link } from 'react-router-dom';

const DropDownItem = (props) => {
  return (
    <li
      onClick={props.handleClick}
      className="border-b border-black w-full text-center h-16 border-collapse"
    >
      <Link to={props.linkTo}>
        <div className="mt-8">{props.children}</div>
      </Link>
    </li>
  );
};

export default DropDownItem;
