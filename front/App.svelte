<script lang="ts">
	import { sendButtonPressed, sendMyNameIs, on, onConnect, sendHi } from "./comms";
	import { getName, getOrGenerateUserId, saveName } from "./data";
	import { names } from "./socket-constants";
	import type { Player, NewConnectionHi } from "./socket-constants";

	export let username: string = getName();

	export let title: string;
	export let topics: any[];
	export let answerA: string;
	export let answerB: string;

	export let users: Player[];
	export let speakerA: string;
	export let speakerB: string;

	let gameStatePromise: Promise<any> = null;

	$: if (username) {
		console.log('username', username);
		sendMyNameIs(username);
		saveName(username);
	}

	
	function randomInt(min: number, maxExcluded: number) {
		const delta = maxExcluded - min;
		return Math.floor(min + Math.random() * delta);
	}

	function handleNextTopic() {
		sendButtonPressed('next topic');
		console.log("happening");
		const chosenI = randomInt(0, topics.length);
		const chosen = topics[chosenI];
		title = chosen.title;
		answerA = chosen.answerA;
		answerB = chosen.answerB;

		// speakerA = users[0];
		// speakerB = users[1];
	}

	function handleEndRound() {
		sendButtonPressed('end round');
	}

	function main() {
		handleNextTopic();
		
		on(names.usersList, (userList) => {
			console.log("userslist", userList);
			users = userList;
		});

		onConnect(() => {
			const gameId = 'onegame-temp-id';
			console.log('connected');
			const newConnectionHi: NewConnectionHi = {
				userId: getOrGenerateUserId(),
				gameId,
				userName: username,
			};
			sendHi(newConnectionHi);
		});
	}

	main();
</script>

<main>
	<h1>Closing Arguments</h1>
	<input bind:value={username}>

	<div class="title">{title}</div>

	<button class="answer answer-text">{answerA}</button>

	<button class="answer answer-text">{answerB}</button>

	<p class="speaker">a {speakerA}</p>
	vs
	<p class="speaker">b {speakerB}</p>


	<div class="admin">
		<button on:click={handleEndRound}>End Round</button>
		<button on:click={handleNextTopic}>Next Topic</button>
	</div>

	<p>users:
		{#each users as user}
			{user.userName};
		{/each}
	</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #333;
		text-transform: uppercase;
		font-size: 1.5em;
		font-weight: 100;
	}

	.title {
		font-size: 4em;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	.answer {
		/* border-bottom: 2px solid #666; */
		display: inline-block;
		width: 25%;
		/* box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2); */
		margin: 0.5em 0.5em 0.5em 1em;
		padding: 0.5em;
		transition: all 100ms;
		cursor: pointer;
	}

	.answer:hover {
    box-shadow: 0 0 6px rgb(35 173 255);
	}
</style>