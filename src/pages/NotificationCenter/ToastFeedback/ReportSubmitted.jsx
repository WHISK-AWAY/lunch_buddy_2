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
      className="flex  text-xs text-primary-gray  rounded-sm pt-4 shadow-md items-center justify-between sticky px-3 py-2 3xl:w-[30vw] md:w-[40vw] 5xl:w-[20vw] w-[80vw] portrait:md:w-[60vw] bg-neutral-100/90 dark:bg-neutral-800/90 dark:text-white landscape:mt-10 portrait:mt-10 landscape:3xl:mt-12 -mr-4"
    >
      <div
        id="notification-details"
        className="flex flex-col self-center text-center  portrait:lg:text-lg md:text-xs 2xl:text-sm text-xs w-full py-2 "
      >
        <p className="pb-4 text-headers">THANK YOU FOR YOUR FEEDBACK</p>
        <p className="text-center">
          We appreciate that you took the time to file this report. Our admins
          will be following up as soon as possible.
        </p>
        <p className="pb-2 text-center">
          Your feedback helps to make sure others have a good experience.
        </p>
        <p>Thank you.</p>
      </div>
    </div>
  );
}
