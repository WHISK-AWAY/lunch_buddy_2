import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotificationState } from '../redux/slices';
import { selectAuthUser, logOut } from '../redux/slices/authSlice';
import DropDownItem from './DropDownItem';
import Homepage from '../pages/Homepage/Homepage';
import { useNavigate } from 'react-router-dom';
import { selectUnreadActiveMeeting } from '../redux/slices/notificationSlice';

const DropdownMenu = ({ expandMenu, setExpandMenu }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector(selectAuthUser);

  const activeMeeting = useSelector(selectUnreadActiveMeeting);

  function handleClick() {
    setExpandMenu(false);
  }

  function handleLogout() {
    setExpandMenu(false);
    dispatch(clearNotificationState());
    dispatch(logOut());
    navigate('/');
  }

  return (
    <div className={expandMenu ? '' : `group hover`}>
      <div
        className={`transform group-[.hover]:scale-y-0 scale-y-100 h-fit overflow:hidden absolute transition-transform duration-[600ms] ease-in-out origin-top-left -bottom-screen bg-white w-screen opacity-95 transition-opacity-0`}
      >
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
              <DropDownItem handleClick={handleClick} linkTo="/">
                HOME
              </DropDownItem>
              <DropDownItem handleClick={handleClick} linkTo="/account">
                ACCOUNT
              </DropDownItem>
              {!activeMeeting ? (
                <DropDownItem handleClick={handleClick} linkTo="/match">
                  NEW MEETING
                </DropDownItem>
              ) : (
                <DropDownItem
                  handleClick={handleClick}
                  linkTo="/meeting/current"
                >
                  CURRENT MEETING
                </DropDownItem>
              )}
              <DropDownItem handleClick={handleClick}>MESSAGES</DropDownItem>
              <DropDownItem handleClick={handleLogout}>LOG OUT</DropDownItem>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
