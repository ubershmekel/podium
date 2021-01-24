import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import { names, NewConnectionHi, socketPort } from '../front/socket-constants';
import { Game } from './game';

const app = express();
const httpServer = new http.Server(app);
const io = new socketio.Server(httpServer, {
  cors: {
    origin: 'http://localhost:5000',
  }
});

const activeGames: {[gameId: string]: Game} = {};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

function sendUsersList(game: Game) {
  const playersList = [];
  for(const key in game.players) {
    const player = game.players[key];
    playersList.push({
      userId: player.userId,
      userName: player.userName,
    });
  }
  for(const key in game.players) {
    game.players[key].socket.emit(names.usersList, playersList);
  }
}


io.on('connection', (socket: socketio.Socket) => {
  console.log('a user connected');

  let hi: NewConnectionHi = null;

  socket.on(names.userId, (newHi: NewConnectionHi) => {
    hi = newHi;
    console.log('uid', hi.userId);

    let game: Game = activeGames[hi.gameId];
    if (!game) {
      game = new Game();
      activeGames[hi.gameId] = game;
    }
    const playa = game.players[hi.userId];
    if (!playa) {
      game.players[hi.userId] = {
        userId: hi.userId,
        userName: hi.userName,
        socket: socket,
      };
    }

    socket.on('disconnect', function() {
      console.log("disconnected, removing", hi.userId, hi.userName);
      delete game.players[hi.userId];
      sendUsersList(game);
    });

    sendUsersList(game);
  });

  socket.on(names.buttonPress, (msg) => {
    console.log('button pressed', msg);
    // io.emit('button pressed', msg);
  });

  socket.on(names.nameChange, (newName) => {
    console.log('name changed', newName);
    const game = activeGames[hi.gameId];
    let playa = game.players[hi.userId];
    if (playa) {
      playa.userName = newName;
    } else {
      console.log("ERROR invalid user");
    }
    // io.emit('button pressed', msg);
    // io.emit(names.usersList, players);
    sendUsersList(game);
  });
  
});

httpServer.listen(socketPort, () => {
  console.log(`listening on *:${socketPort}`);
});
