import express from 'express';
import http from 'http';
import socketio from 'socket.io';

const app = express();
const httpServer = new http.Server(app);
const io = new socketio.Server(httpServer, {
  cors: {
    origin: 'http://localhost:5000',
  }
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

const port = 2999;
httpServer.listen(2999, () => {
  console.log(`listening on *:${port}`);
});
