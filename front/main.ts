import App from './App.svelte';
import { parseTopics } from './topics';

import { io } from 'socket.io-client';

const socket = io(':2999');

const app = new App({
	target: document.body,
	props: {
		users: ['joe', 'mo', 'tory', 'amanda', 'tom'],
		topics: parseTopics(),
	}
});

export default app;