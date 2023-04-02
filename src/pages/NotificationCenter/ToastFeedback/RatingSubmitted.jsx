import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import FormButton from '../../../components/FormButton';
import xIcon from '../../../assets/icons/x-icon.svg';

export default function RatingSubmitted({ notification, t }) {
  const navigate = useNavigate();

  function findBuddy() {
    toast.remove(t.id);
    navigate('/match');
  }

  return (
    <div
      id="meeting-card"
      className="flex lg:w-1/4 w-4/5 sm:w-2/5 lg:h-fit text-xs text-primary-gray bg-gray-100/90 rounded-2xl shadow-md items-center justify-between sticky top-16 mt-14"
    >
      <div
        id="notification-details"
        className="flex flex-col self-center text-center text-xs lg:text-[.9rem] w-full py-2"
      >
        <p className="pb-2">THANK YOU!</p>
        <p className="">Your feedback helps others find great buddies!</p>

        <div
          id="btn-container"
          className="flex flex-col h-fit  w-fit self-center text-xs space-5 justify-center items-center pt-3"
        >
          <FormButton handleSubmit={findBuddy}>FIND YOUR NEXT BUDDY</FormButton>
          <div
            id="x-icon"
            className="absolute top-3 w-5 right-3"
            onClick={() => toast.remove(t.id)}
          >
            <img src={xIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}
