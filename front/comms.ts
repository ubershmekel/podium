// This file is about communicating from the client to the server

import { io } from 'socket.io-client';
import type { Game } from '../server/game';
import { getOrGenerateUserId } from './data';
import { names, GameState, NewConnectionHi, socketPort } from './socket-constants';

const socket = io(':' + socketPort);

export function sendHi(hi: NewConnectionHi) {
  socket.emit(names.userId, hi);
}

export function sendButtonPressed(info: string) {
  socket.emit(names.buttonPress, info);
}

export function sendMyNameIs(name: string) {
  socket.emit(names.nameChange, name);
}

export function on(eventName: string, callback: Function) {
  return socket.on(eventName, callback);
}

export function onConnect(callback: Function) {
  return socket.on('connect', callback);
}

