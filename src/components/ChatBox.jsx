import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import {
  getMeetingMessages,
  addMessage,
  getMeeting,
} from '../redux/slices/meetingSlice';
import paperPlane from '../assets/icons/paper-plane.svg';
import paperPlaneWhite from '../assets/icons/paper-plane-white.svg';
import { selectDarkMode } from '../redux/slices/darkModeSlice';

const VITE_SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

// const socket = io.connect(VITE_SOCKET_URL);

export default function ChatBox() {
  const dispatch = useDispatch();

  const { meetingId } = useParams();

  const [newMessage, setNewMessage] = useState('');
  const meeting = useSelector((state) => state.meetings.meeting);
  const auth = useSelector((state) => state.auth.user);
  const darkModeSelector = useSelector(selectDarkMode);
  const [paperPlaneIcon, setPaperPlaneIcon] = useState(paperPlaneWhite);

  const chatContainer = useRef(null);
  const socket = useRef(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    socket.current = io(VITE_SOCKET_URL);
  }, []);

  useEffect(() => {
    const asyncStart = async () => {
      const disMeeting = await dispatch(
        getMeetingMessages({
          meetingId,
        })
      );

      socket.current.emit('joinRoom', disMeeting.payload.id);
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
    if (socket.current) {
      socket.current.on('receive-message', () => {
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
    }
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
        socket.current.emit('message-event', meeting.id);
        setNewMessage('');
      }
    }
  };

  const buddyName =
    meeting.user?.firstName === auth.firstName
      ? meeting.buddy?.firstName
      : meeting.user?.firstName;

  useEffect(() => {
    // Set up mutation observer to scroll when new messages are appended to dom

    if (!chatContainer.current) return;

    // Configure observer to monitor for addition of child nodes
    const config = { childList: true, subtree: true };

    const observer = new MutationObserver(() => {
      chatContainer.current.scroll({
        top: chatContainer.current.scrollHeight,
        behavior: 'smooth',
      });
    });

    observer.observe(chatContainer.current, config);

    // clean up
    return () => observer.disconnect();
  }, [chatContainer.current]);

  const handleEnterClick = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      onMessageSubmit(e);
    }
  };

  useEffect(() => {
    if (!darkModeSelector) {
      setPaperPlaneIcon(paperPlane);
    } else {
      setPaperPlaneIcon(paperPlaneWhite);
    }
  }, [darkModeSelector]);

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

  return (
    <div className="flex overflow-hidden dark:bg-[#0a0908]  lg:bg-none bg-white dark:text-white text-primary-gray w-screen h-[calc(100vh_-_56px)] sm:h-[calc(100dvh_-_80px)] xs:h-[calc(100dvh_-_71px)] portrait:md:h-[calc(100dvh_-_85px)] portrait:lg:h-[calc(100dvh_-_94px)] md:h-[calc(100dvh_-_60px)] xl:h-[calc(100dvh_-_70px)] 5xl:h-[calc(100dvh_-_80px)] ">
      <div
        id="bg-img"
        alt="Two people eating a bowl of food with chopsticks"
        className="bg-cover bg-[url('/assets/bgImg/chatView-q30.webp')] 2xl:bg-[url('/assets/bgImg/test11-lq_10.webp')] basis-1/2  3xl:basis-full hidden portrait:hidden lg:block h-full"
      ></div>
      <div
        id="chat-container"
        className="flex flex-col w-full lg:basis-1/2 portrait:lg:basis-full overflow-hidden justify-between h-full items-center  lg:ml-0"
      >
        <div
          id="header"
          className="basis-1/12 shrink-0 grow-0 flex justify-center items-center bg-zinc-200 dark:bg-neutral-900 w-full"
        >
          <h2 className="text-center  text-base portrait:lg:text-lg">
            {buddyName.toUpperCase()}
          </h2>
        </div>

        <div
          id="msg-feed"
          className="basis-4/6 xl:w-4/5  pl-4 lg:bg-opacity-20 pt-5 lg:rounded-3xl grow overflow-y-auto w-full lg:w-11/12 lg:pl-4 portrait:md:px-14"
        >
          <div className="h-full grow overflow-y-auto scrollbar-hide ">
            {!meeting?.messages?.length ? (
              <div className="text-center text-sm  pt-4">
                don't be shy! be the first to talk to your buddy
              </div>
            ) : (
              <>
                <div id="msg-list" ref={chatContainer}>
                  {meeting.messages.map((message, idx) => {
                    const prevSenderId = meeting.messages[idx + 1]?.senderId;
                    const url =
                      meeting.user?.firstName === auth.firstName
                        ? meeting.buddy.avatarUrl
                        : meeting.user?.avatarUrl;
                    return (
                      <div key={message.id} className="flex py-1">
                        <div className="w-14 grow-0 shrink-0">
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
                          className={`py-3 px-10 min-w-[60px] mx-5  break-words font-light focus:outline-none text-xs sm:text-sm lg:text-xs portrait:lg:text-base portrait:lg:my-1 self-start ${
                            message.senderId === auth.id
                              ? 'bg-label/70 ml-auto dark:bg-neutral-500/80 text-white rounded-l-full rounded-tr-full  '
                              : 'bg-buddy-message dark:bg-neutral-800/80 rounded-r-full rounded-tl-full h-fit'
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
          className="flex justify-center basis-1/6 w-full  py-4  md:px-5 5xl:px-20 6xl:px-36 lg:pb-10 5xl:pb-20"
        >
          <form
            id="form"
            className="w-full pl-5 justify-center items-center  self-center flex  bg-transparent"
          >
            <textarea
              type="text"
              className=" border border-primary-gray w-full dark:bg-neutral-900 rounded-2xl 4xl:h-40 h-20 py-2 px-6 scrollbar-hide resize-none portrait:lg:text-base portrait:md:h-36 focus:outline-none text-sm lg:text-xs"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleEnterClick}
            />
            <button id="paper-plane" className="flex flex-col self-center pl-5">
              {' '}
              <img
                className=" w-6 md:block portrait:hidden hidden -rotate-45 5xl:w-7 6xl:w-8"
                src={paperPlaneIcon}
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
