import React from 'react';
import { Link } from 'react-router-dom';

import NewMessage from './NewMessage';
import MeetingRequest from './MeetingRequest';
import MeetingAccepted from './MeetingAccepted';
import MeetingRejected from './MeetingRejected';
import RatingRequest from './RatingRequest';


export default function NotificationBody() {
  return (
    <div className="flex flex-col">
      <div className="absolute z-40 bg-primary-gray self-end h-96 w-80">
      <ul></ul></div>
    </div>
  );
}



