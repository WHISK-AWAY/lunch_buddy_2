const io = require('socket.io')(5000, {
  cors: {
    origin: '*',
  },
});
io.on('connection', (socket) => {
  socket.on('message-event', (message, room, name) => {
    if (room === '') {
      socket.broadcast.emit('recieve-message', message);
    } else {
      socket.to(room).emit('recieve-message', message);
    }
  });
  socket.on('joinRoom', (room) => {
    socket.join(room);
  });
});
