import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import sendIcon from '../assets/icons/send.svg';
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
  const today = new Date();
  const dayOfMonth = today.getUTCDate();
  const monthToday = today.getMonth();
  const yearToday = today.getUTCFullYear();
  //   const curDate = new Date();
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
    <div className="flex overflow-hidden h-[calc(100vh_-_48px)] orange-linear-bg">
      <img
        src="src/assets/bgImg/chatView.jpg"
        alt="Two People eating a bowl of food with chopsticks!"
        className="w-1/2 hidden lg:block"
      />
      <div className="flex flex-col h-[calc(100vh_-_48px)] lg:w-1/2 ">
        <div className="">
          <h2 className="text-center font-tenor pt-4">Buddy</h2>
          <h2 className="text-center text-gray-500">
            {monthToday}-{dayOfMonth}-{yearToday}
          </h2>
        </div>
        <div className=" grow m-1 p-5 overflow-scroll h-3/5 w-fit   ">
          {!meeting.messages ? (
            <div>No Messages</div>
          ) : (
            <div>
              {meeting?.messages?.map((message) => {
                return (
                  <div key={message.id} className="flex">
                    {message.senderId === 1 && (
                      <img
                        className="self-center mr-3 w-10 h-10 rounded-full"
                        src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                      ></img>
                    )}
                    <p
                      className={` py-2 px-4  min-w-[60px] text-center my-2  break-words font-poppins  font-light  text-sm ${
                        message.senderId === 8
                          ? 'bg-sender-message ml-auto text-white rounded-l-full rounded-tr-full  '
                          : 'bg-buddy-message rounded-r-full rounded-tl-full '
                      }`}
                    >
                      {message.message}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <form
          id="form"
          className="w-11/12  self-center mb-2 flex gap-3 bg-transparent"
        >
          <textarea
            type="text"
            className=" border border-black w-full rounded-2xl h-16 py-2 px-6"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className=" hover:bg-orange-100 px-3 rounded-lg transition-all ease-in-out"
            onClick={onMessageSubmit}
          >
            <img src={sendIcon} alt="send icon" className="w-6" />
          </button>
        </form>
      </div>
    </div>
  );
}
