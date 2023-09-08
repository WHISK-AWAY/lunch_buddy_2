const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const dotenv = require('dotenv').config();

const WS_PORT = process.env.WS_PORT;
const CORS_ALLOWED_ORIGINS = process.env.CORS_ALLOWED_ORIGINS;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: CORS_ALLOWED_ORIGINS.split('|'),
  },
});

io.on('connection', async (socket) => {
  socket.on('message-event', (room) => {
    if (room === '') {
      return;
    } else {
      socket.to(room).emit('receive-message');
    }
  });
  socket.on('joinRoom', async (room) => {
    console.log('room:', room);
    if (socket.rooms.has(room)) {
      return;
    } else {
      await socket.join(room);
    }
  });
});

server.listen(WS_PORT, () =>
  console.log('socket server listening on', WS_PORT)
);
