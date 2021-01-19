// These are constants that are shared between the client and server

export const names = {
  nameChange: "nameChange",
  buttonPress: "buttonPress",
  userId: "userId",
  usersList: "usersList",
}

export interface Player { 
  userId: string;
  userName: string;
}

export interface NewConnectionHi {
  userId: string;
  userName: string;
  gameId: string;
}

export interface GameState {
  users: string[];
  speakerA: string;
  speakerB: string;
}
