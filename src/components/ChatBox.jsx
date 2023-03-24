import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import {
  getActiveMeeting,
  addMessageActiveMeeting,
} from '../redux/slices/meetingSlice';

const socket = io.connect('http://localhost:5000');

export default function ChatBox() {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState('');
  //   const [meeting, setMeeting] = useState('');
  // currently the room is hard coded but I'd like it to be a mixture of the meeting id user id and buddy id or something of that sor
  const meeting = useSelector((state) => state.meetings.meeting);
  //   setMeeting(meetingState);

  useEffect(() => {
    // if (meeting.messages === undefined) {
    const asyncStart = async () => {
      const token = localStorage.getItem('token');
      const disMeeting = await dispatch(getActiveMeeting(token));
      socket.emit('joinRoom', disMeeting.payload.id);
    };
    asyncStart();
    // }
  }, []);

  useEffect(() => {
    // REMOVE .OFF WHEN DEPLOYING OR ELSE WILL NEVER SEND MSG
    socket.off('recieve-message').on('recieve-message', (d) => {
      const asyncEvent = async () => {
        const token = localStorage.getItem('token');
        setTimeout(() => {
          dispatch(getActiveMeeting(token));
        }, 500);
      };
      asyncEvent();
    });
  }, [socket]);

  const onMessageSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === '') return;
    else {
      const token = localStorage.getItem('token');
      dispatch(addMessageActiveMeeting({ token, newMessage }));
      socket.emit('message-event', meeting.id);
      setNewMessage('');
    }
  };
  return (
    <div className="block">
      <div className="border-8 border-black m-5 p-5" id="chatbox">
        {!meeting.messages ? (
          <div>No Messages</div>
        ) : (
          <div>
            {meeting?.messages?.map((message) => {
              return (
                <div key={message.id}>
                  {message.senderId}: {message.message}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <form id="form">
        <label>message</label>
        <input
          type="text"
          className="border border-black"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="p-10" onClick={onMessageSubmit}>
          Send
        </button>
      </form>
    </div>
  );
}
