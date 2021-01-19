import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import { names, NewConnectionHi } from '../front/socket-constants';
import { Game } from './game';

const app = express();
const httpServer = new http.Server(app);
const io = new socketio.Server(httpServer, {
  cors: {
    origin: 'http://localhost:5000',
  }
});

const activeGames: {[gameId: string]: Game} = {};
const uidToSocket = {};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

function findPlayer(game: Game, userId: string) {
  for (let i = 0; i < game.players.length; i++) {
    if (game.players[i].userId === userId) {
      return game.players[i];
    }
  }
  return null;
}

io.on('connection', (socket) => {
  console.log('a user connected');
  let hi: NewConnectionHi = null;

  socket.on(names.userId, (newHi: NewConnectionHi) => {
    hi = newHi;
    console.log('uid', hi.userId);
    uidToSocket[hi.userId] = socket;
    let game: Game = activeGames[hi.gameId];
    if (!game) {
      game = new Game();
      activeGames[hi.gameId] = game;
    }
    const playa = findPlayer(game, hi.userId);
    if (!playa) {
      game.players.push({
        userId: hi.userId,
        userName: hi.userName,
      });
    }
    socket.emit(names.usersList, game.players);
  });

  socket.on(names.buttonPress, (msg) => {
    console.log('button pressed', msg);
    // io.emit('button pressed', msg);
  });

  socket.on(names.nameChange, (newName) => {
    console.log('name changed', newName);
    const players = activeGames[hi.gameId].players;
    let playa = findPlayer(activeGames[hi.gameId], hi.userId);
    if (playa) {
      playa.userName = newName;
    } else {
      console.log("ERROR invalid user");
    }
    // io.emit('button pressed', msg);
    io.emit(names.usersList, players);
  });
  
});



const port = 2999;
httpServer.listen(2999, () => {
  console.log(`listening on *:${port}`);
});
