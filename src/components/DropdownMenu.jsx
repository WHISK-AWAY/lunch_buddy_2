import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser, logOut } from '../redux/slices/authSlice';
import DropDownItem from './DropDownItem';

const DropdownMenu = ({ expandMenu, setExpandMenu }) => {
  const dispatch = useDispatch();
  const authUser = useSelector(selectAuthUser);

  function handleClick() {
    setExpandMenu(false);
  }

  function handleLogout() {
    setExpandMenu(false);
    dispatch(logOut());
  }

  return (
    <div className="h-screen absolute -bottom-screen bg-white w-screen opacity-95">
      <h2 className="text-red-400 ml-7 mt-2 text-lg">Hello, Name</h2>
      <ul className="flex flex-col items-center">
        <DropDownItem handleClick={handleClick}>Account</DropDownItem>
        <DropDownItem handleClick={handleClick}>New Meeting</DropDownItem>
        <DropDownItem handleClick={handleClick}>Messages</DropDownItem>
        {!authUser.firstName ? (
          <>
            <DropDownItem handleClick={handleClick} linkTo="/register">
              Sign Up
            </DropDownItem>
            <DropDownItem handleClick={handleClick} linkTo="/login">
              Login
            </DropDownItem>
          </>
        ) : (
          <DropDownItem handleClick={handleLogout}>Logout</DropDownItem>
        )}
      </ul>
    </div>
  );
};

export default DropdownMenu;
