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
    <div className="h-fit absolute -bottom-screen bg-white w-screen opacity-95">
      <ul className="flex flex-col items-center ">
        {!authUser.firstName ? (
          <>
            {/* NAV LINKS WHEN NOT SIGNED IN */}
            <DropDownItem handleClick={handleClick} linkTo="/register">
              SIGN UP
            </DropDownItem>
            <DropDownItem handleClick={handleClick} linkTo="/login">
              LOG IN
            </DropDownItem>
            <DropDownItem handleClick={handleClick} linkTo="/">
              HOME
            </DropDownItem>
          </>
        ) : (
          <>
            {/* NAV LINKS WHEN SIGNED IN */}
            <DropDownItem handleClick={handleClick}>ACCOUNT</DropDownItem>
            <DropDownItem handleClick={handleClick}>NEW MEETING</DropDownItem>
            <DropDownItem handleClick={handleClick}>MESSAGES</DropDownItem>
            <DropDownItem handleClick={handleLogout}>LOG OUT</DropDownItem>
          </>
        )}
      </ul>
    </div>
  );
};

export default DropdownMenu;
