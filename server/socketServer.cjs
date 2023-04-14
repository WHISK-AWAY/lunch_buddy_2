const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', async (socket) => {
  socket.on('message-event', (room) => {
    if (room === '') {
      return;
    } else {
      socket.to(room).emit('recieve-message');
    }
  });
  socket.on('joinRoom', async (room) => {
    if (socket.rooms.has(room)) {
      return;
    } else {
      await socket.join(room);
    }
  });
});

server.listen(process.env.SOCKET_BACKEND_PORT || 3333, () =>
  console.log('socket server online')
);
