import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import FormButton from '../../../components/FormButton';
import xIcon from '../../../assets/icons/x-icon.svg';

export default function ReportSubmitted({ notification, t }) {
  const navigate = useNavigate();

  function findBuddy() {
    toast.remove(t.id);
    navigate('/match');
  }

  return (
    <div
      id="meeting-card"
      className="flex lg:w-1/4 w-4/5 sm:w-2/5 lg:h-fit text-xs text-primary-gray bg-gray-100/90 rounded-2xl pt-4 shadow-md items-center py-3 justify-between sticky top-16 mt-14"
    >
      <div
        id="notification-details"
        className="flex flex-col self-center text-center text-xs lg:text-[.9rem] w-full py-2"
      >
        <p className="pb-2">THANK YOU FOR YOUR FEEDBACK</p>
        <p className="">
          We appreciate that you took the time to file this report. Our admins
          will be following up as soon as possible.
        </p>
        <p className="">
          Your feedback helps to make sure others have a good experience. Thank
          you.
        </p>
      </div>
    </div>
  );
}
