import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import {
  getMeetingMessages,
  addMessage,
  getMeeting,
} from '../redux/slices/meetingSlice';
import paperPlane from '../assets/icons/paper-plane.svg';

const PORT = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3333';

const socket = io.connect(PORT);

export default function ChatBox() {
  // used later for getting proper params
  const { meetingId } = useParams();
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState('');
  const meeting = useSelector((state) => state.meetings.meeting);
  const auth = useSelector((state) => state.auth.user);
  const today = new Date();
  const dayOfMonth = today.getUTCDate();
  const monthToday = today.getMonth();
  const yearToday = today.getUTCFullYear();
  const messageEl = useRef(null);

  const token = localStorage.getItem('token');
  useEffect(() => {
    const asyncStart = async () => {
      const disMeeting = await dispatch(
        getMeetingMessages({
          token: token,
          meetingId,
        })
      );
      socket.emit('joinRoom', disMeeting.payload.id);
    };
    asyncStart();
    setTimeout(() => {
      const scrollAnchor = document.getElementById('scroll-here');
      scrollAnchor?.scrollIntoView();
    }, 500);
  }, []);

  useEffect(() => {
    if (auth.user?.id) {
      dispatch(getMeeting({ meetingId: +meetingId, userId: auth.user?.id }));
    }
  }, [auth]);

  useEffect(() => {
    // REMOVE .OFF WHEN DEPLOYING OR ELSE WILL NEVER SEND MSG
    socket.on('recieve-message', (d) => {
      const asyncEvent = async () => {
        setTimeout(() => {
          dispatch(
            getMeetingMessages({
              token: token,
              meetingId,
            })
          );
        }, 500);
        setTimeout(() => {
          const scrollAnchor = document.getElementById('scroll-here');
          scrollAnchor.scrollIntoView();
        }, 100);
      };
      asyncEvent();
    });
  }, [socket]);

  const onMessageSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === '') return;
    else {
      const message = await dispatch(
        addMessage({
          token,
          meetingId,
          newMessage: newMessage,
        })
      );
      setTimeout(() => {
        dispatch(
          getMeetingMessages({
            token: token,
            meetingId,
          })
        );
      }, 5000);
      if (message?.error?.message) {
        alert('An error has occurred. Please try again later.');
      } else {
        socket.emit('message-event', meeting.id);
        setNewMessage('');
      }
    }
  };

  const buddyName =
    meeting.user?.firstName === auth.firstName
      ? meeting.buddy?.firstName
      : meeting.user?.firstName;

  useEffect(() => {
    if (messageEl.current) {
      messageEl.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  const handleEnterClick = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      onMessageSubmit(e);
    }
  };
  // checks if user is logged in
  if (!auth.id) {
    return (
      <h1>
        Please{' '}
        <Link to="/login" style={{ color: '#0000EE' }}>
          login
        </Link>{' '}
        and find a buddy to use the chat feature
      </h1>
    );
  }
  // checks if user has a buddy
  if (meeting.buddyId === undefined) {
    return (
      <div className=" text-center">
        Please find a buddy to access the chat feature
      </div>
    );
  }

  // h-[calc(100svh_-180px)]

  return (
    <div className="flex overflow-hidden h-[calc(100vh_-_65px)] lg:bg-none orange-linear-bg text-primary-gray w-screen">
      {' '}
      <div
        id="bg-img"
        src="assets/bgImg/chatView.jpg"
        alt="Two people eating a bowl of food with chopsticks"
        className="bg-cover bg-[url('/assets/bgImg/chatView.jpg')] basis-1/2 hidden lg:block h-full"
      ></div>
      <div
        id="chat-container"
        className="flex flex-col w-full lg:basis-1/2 overflow-hidden justify-between h-[calc(100vh_-_65px)] items-center ml-4 lg:ml-0"
      >
        <div id="header" className="basis-1/12 shrink-0 grow-0">
          <h2 className="text-center font-tenor pt-6 text-lg">
            {buddyName.toUpperCase()}
          </h2>
        </div>
        <div
          id="msg-feed"
          className="basis-4/6 lg:bg-[#c4c4c4] lg:bg-opacity-20 lg:rounded-3xl grow overflow-y-auto scroll-smooth w-full lg:w-11/12 lg:pl-4"
        >
          <div
            ref={messageEl}
            className="h-full grow overflow-y-auto scrollbar-hide"
          >
            {!meeting?.messages?.length ? (
              <div className="text-center text-sm pt-4">
                don't be shy! be the first to talk to your buddy
              </div>
            ) : (
              <>
                <div id="msg-list">
                  {meeting.messages.map((message, idx) => {
                    const prevSenderId = meeting.messages[idx + 1]?.senderId;
                    const url =
                      meeting.user?.firstName === auth.firstName
                        ? meeting.buddy.avatarUrl
                        : meeting.user?.avatarUrl;
                    return (
                      <div key={message.id} className="flex py-1">
                        <div className="w-14">
                          {message.senderId !== auth.id &&
                            prevSenderId !== message.senderId && (
                              <img
                                id="user-pic"
                                className="object-cover aspect-square w-14 h-14 lg:w-14 lg:h-14 rounded-[100%] bg-white p-1  drop-shadow-lg self-center mb-3"
                                src={url}
                                alt="buddy profile image"
                              ></img>
                            )}
                        </div>
                        <p
                          className={`py-3 px-10 min-w-[60px] mx-5  break-words font-light focus:outline-none text-xs self-start ${
                            message.senderId === auth.id
                              ? 'bg-label/70 ml-auto text-white rounded-l-full rounded-tr-full  py-1'
                              : 'bg-buddy-message rounded-r-full rounded-tl-full h-fit'
                          }`}
                        >
                          {message.message}
                        </p>
                      </div>
                    );
                  })}
                  <div id="scroll-anchor"></div>
                </div>
                {/* ANCHOR MESSAGE SCROLL TO BOTTOM */}
                <div id="scroll-here"></div>
              </>
            )}
          </div>
        </div>
        <div
          id="form-container"
          className="flex justify-center basis-1/6 w-full px-4 py-4"
        >
          <form
            id="form"
            className="w-11/12  self-center flex gap-3 bg-transparent"
          >
            <textarea
              type="text"
              className=" border border-primary-gray w-full rounded-2xl h-20 py-2 px-6 scrollbar-hide resize-none focus:outline-none text-sm"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleEnterClick}
            />
            <button id="paper-plane" className="flex flex-col self-center">
              {' '}
              <img
                className=" sm:w-6 sm:block xs:hidden -rotate-45"
                src={paperPlane}
                alt="paper plane icon"
                onClick={onMessageSubmit}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
