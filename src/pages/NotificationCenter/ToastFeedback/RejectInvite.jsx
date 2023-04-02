import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import FormButton from '../../../components/FormButton';
import xIcon from '../../../assets/icons/x-icon.svg';

export default function RejectInvite({ notification, t }) {
  const navigate = useNavigate();
  return (
    <div
      id="meeting-card"
      className="flex lg:w-1/4 w-4/5 sm:w-2/5 lg:h-fit h-fit text-xs text-primary-gray bg-gray-100/90 rounded-2xl drop-shadow-sm my-3 items-center shadow-md justify-between sticky mt-14"
    >
      <div
        id="notification-details"
        className="flex flex-col self-center text-center lg:text-[.9rem] text-xs w-full py-2"
      >
        <p className="pb-2">OH NO!</p>
        <p className="pb-2 text-xs lg:text-[.9rem]">
          We'll break it to {notification.fromUser.firstName} gently...
        </p>
        <div
          id="btn-container"
          className="flex flex-col h-fit  w-fit self-center text-xs space-5 justify-center items-center pt-3"
        >
          <FormButton handleSubmit={() => navigate('/match')}>
            FIND A BUDDY
          </FormButton>
          <div
            id="x-icon"
            className="absolute top-3 w-5 right-3"
            onClick={() => toast.dismiss(t.id)}
          >
            <img src={xIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}
