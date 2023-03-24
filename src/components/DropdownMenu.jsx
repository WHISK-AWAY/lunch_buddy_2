import React from 'react';
import { Link } from 'react-router-dom';
import DropDownItem from './DropDownItem';

const DropdownMenu = ({ expandMenu, setExpandMenu }) => {
  function handleClick() {
    setExpandMenu(false);
  }

  return (
    <div className="h-screen absolute -bottom-screen bg-white w-screen opacity-95">
      <h2 className="text-red-400 ml-7 mt-2 text-lg">Hello, Name</h2>
      <ul className="flex flex-col items-center">
        <DropDownItem handleClick={handleClick}>Account</DropDownItem>
        <DropDownItem handleClick={handleClick}>New Meeting</DropDownItem>
        <DropDownItem handleClick={handleClick}>Messages</DropDownItem>
        <DropDownItem handleClick={handleClick} linkTo="/register">
          Sign Up
        </DropDownItem>
        <DropDownItem handleClick={handleClick} linkTo="/login">
          Login{' '}
        </DropDownItem>
      </ul>
    </div>
  );
};

export default DropdownMenu;
