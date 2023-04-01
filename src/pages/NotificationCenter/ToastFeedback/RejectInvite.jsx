import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import FormButton from '../../../components/FormButton';

export default function RejectInvite({ notification, t }) {
  const navigate = useNavigate();
  return (
    <div
      id="meeting-card"
      className="flex w-full h-fit bg-gray-100/90 rounded-2xl drop-shadow-sm my-3 items-center justify-between "
    >
      <div
        id="notification-details"
        className="flex flex-col self-center text-center text-xs w-full py-2"
      >
        <p className="pb-2 text-base">
          too bad -- we'll break it to {notification.fromUser.firstName}{' '}
          gently...
        </p>
        <div
          id="btn-container"
          className="flex flex-row gap-2 w-fit h-fit self-center text-xs space-5 justify-center items-center"
        >
          <FormButton handleSubmit={() => navigate('/')}>HOME</FormButton>
          <FormButton handleSubmit={() => navigate('/match')}>
            FIND A BUDDY
          </FormButton>
          <FormButton handleSubmit={() => toast.dismiss(t.id)}>
            DISMISS
          </FormButton>
        </div>
      </div>
    </div>
  );
}
