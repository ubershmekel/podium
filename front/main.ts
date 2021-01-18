import App from './App.svelte';
import { parseTopics } from './topics';

const app = new App({
	target: document.body,
	props: {
		users: ['joe', 'mo', 'tory', 'amanda', 'tom'],
		topics: parseTopics(),
	}
});

export default app;