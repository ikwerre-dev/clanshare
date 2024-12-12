import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
}));

const connectedUsers = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('generateCode', (code) => {
    connectedUsers[code] = connectedUsers[code] || [];
    connectedUsers[code].push(socket.id);
    io.emit('connectedUsers', connectedUsers[code].length);
  });

  socket.on('joinCode', (code) => {
    connectedUsers[code] = connectedUsers[code] || [];
    connectedUsers[code].push(socket.id);
    io.emit('connectedUsers', connectedUsers[code].length);
  });

  socket.on('sendFile', (fileData) => {
    socket.broadcast.emit('receiveFile', fileData);
  });

  socket.on('disconnect', () => {
    for (let code in connectedUsers) {
      const index = connectedUsers[code].indexOf(socket.id);
      if (index !== -1) {
        connectedUsers[code].splice(index, 1);
        io.emit('connectedUsers', connectedUsers[code].length);
        break;
      }
    }
    console.log('User disconnected:', socket.id);
  });
});

server.listen(2026, () => {
  console.log('Server is running on port 2026');
});
