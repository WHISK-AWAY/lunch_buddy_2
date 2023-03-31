import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  getMeeting,
  selectActiveMeeting,
} from '../../redux/slices/meetingSlice';
import {
  createMeeting,
  selectMeetings,
  resetMeetingStatus,
  fetchUserMeetings,
  fetchUser,
} from '../../redux/slices';
import {
  cancelMeeting,
  fetchAllNotifications,
  selectUnreadActiveMeeting,
  selectUnreadNotifications,
} from '../../redux/slices/notificationSlice';
import { selectAuthUser } from '../../redux/slices/authSlice';

const CurrentMeeting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [buddy, setBuddy] = useState({});

  const currentNotif = useSelector(selectUnreadActiveMeeting);

  const currentMeeting = useSelector(selectActiveMeeting);

  const authUser = useSelector(selectAuthUser);

  useEffect(() => {
    // on load, make sure meeting state is cleared
    dispatch(resetMeetingStatus());
  }, []);

  useEffect(() => {
    dispatch(
      getMeeting({ meetingId: currentNotif?.meetingId, userId: authUser.id })
    );
  }, [currentNotif]);

  useEffect(() => {
    let findUser;
    if (authUser.id) {
      if (authUser.id === currentMeeting?.buddyId) {
        findUser = currentMeeting?.user;
      } else if (authUser.id === currentMeeting?.userId) {
        findUser = currentMeeting.buddy;
      }
      if (currentMeeting) {
        setBuddy(findUser);
      }
    }
  }, [currentMeeting]);

  return (
    <div className="recap-card h-[calc(100vh_-_75px)] w-screen flex flex-col gap-12 items-center orange-linear-bg lg:bg-none lg:bg-white lg:flex-row lg:items-center bg-fixed text-primary-gray overflow-hidden">
      <div className="recap-image hidden bg-left lg:block lg:h-full lg:basis-1/2 bg-[url('/assets/bgImg/meetingConfView.jpg')] bg-cover overflow-hidden"></div>
      <div className="recap-info flex flex-col basis-full h-full pt-16 lg:basis-1/2 gap-12 items-center overflow-auto lg:justify-center">
        <div className="recap-header text-headers text-xl font-semibold">
          <h1>MEETING DETAILS</h1>
        </div>
        <div className="recap-body flex flex-col items-center gap-1">
          <div className="buddy-avatar-container rounded-full mb-6">
            <img
              src={buddy.avatarUrl}
              alt="Your buddy's avatar image"
              className="bg-white object-cover aspect-square w-32 h-32 rounded-full z-10 p-1 drop-shadow-md"
            />
          </div>
          <h2 className="text-lg font-semibold text-headers">
            {buddy.fullName}
          </h2>
          <p>{currentMeeting?.lunchDate?.replace(/^[^T]*/, '').slice(1, -8)}</p>
          <p className="font-semibold">
            <a href={currentMeeting?.restaurant?.url} target="_blank">
              {currentMeeting?.restaurant.name.toUpperCase()}
            </a>
          </p>
          <p>{currentMeeting?.restaurant.location.address1}</p>
        </div>
        <div className="recap-button flex gap-8 items-center w-4/5">
          <button
            className="px-5 py-2 w-11/12 lg:py-2 rounded-full button text-white text-md"
            onClick={(e) => handleMeeting(e)}
          >
            <Link to={`/meeting/${currentMeeting?.id}/chat`}>CHAT</Link>
          </button>
          <button
            className="px-5 py-2 w-11/12 lg:py-2 rounded-full button text-white text-md"
            onClick={() =>
              dispatch(
                cancelMeeting({
                  userId: buddy.id,
                  meetingId: currentMeeting.id,
                })
              )
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentMeeting;
