import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

export default function ChatBox() {
  const [messageBox, setMessageBox] = useState('');
  // only in a state for testing purposes
  const [roomVal, setRoomVal] = useState('12345');
  // currently the room is hard coded but I'd like it to be a mixture of the meeting id user id and buddy id or something of that sort

  const addnewLine = (message) => {
    const div = document.createElement('div');
    div.textContent = message;
    document.getElementById('chatbox').appendChild(div);
  };
  useEffect(() => {
    // JOIN PROPER ROOM ON LOADUP WILL BE DONE WITH SLICE/AXIOS CALL TO GET PROPER MEETING DATA
    socket.emit('joinRoom', roomVal);
  }, []);

  useEffect(() => {
    // REMOVE .OFF WHEN DEPLOYING OR ELSE WILL NEVER SEND MSG
    socket.off('recieve-message').on('recieve-message', (message) => {
      addnewLine(message);
    });
  }, [socket]);

  const onMessageSubmit = (e) => {
    e.preventDefault();
    if (messageBox === 'join') return;
    else {
      socket.emit('message-event', messageBox, roomVal, 'bob');
      addnewLine(messageBox);
      setMessageBox('');
    }
  };
  return (
    <div className="block">
      <div className="border-8 border-black m-5 p-5" id="chatbox"></div>
      <form id="form">
        <label>message</label>
        <input
          type="text"
          className="border border-black"
          value={messageBox}
          onChange={(e) => setMessageBox(e.target.value)}
        />
        <button type="submit" className="p-10" onClick={onMessageSubmit}>
          Send
        </button>
        <label htmlFor="">room</label>
        <input
          className="border border-black"
          value={roomVal}
          onChange={(e) => setRoomVal(e.target.value)}
        />
        <button type="submit">join</button>
      </form>
    </div>
  );
}
