// This is the entry point for the browser client

import App from './App.svelte';
import { parseTopics } from './topics';

const app = new App({
	target: document.body,
	props: {
		users: [],
		topics: parseTopics(),
	}
});

export default app;