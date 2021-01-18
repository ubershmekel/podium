
import { io } from 'socket.io-client';

const socket = io(':2999');

socket.on('connect', () => {
  console.log('connected');
});

export function buttonPressed(info: string) {
  socket.emit('button', info);
}
