<script lang="ts">
	export let title: string;
	export let topics: any[];
	export let answerA: string;
	export let answerB: string;

	export let users: string[];
	export let speakerA: string;
	export let speakerB: string;

	function randomInt(min, maxExcluded) {
		const delta = maxExcluded - min;
		return Math.floor(min + Math.random() * delta);
	}

	function handleNextTopic() {
		console.log("happening");
		const chosenI = randomInt(0, topics.length);
		const chosen = topics[chosenI];
		title = chosen.title;
		answerA = chosen.answerA;
		answerB = chosen.answerB;

		speakerA = users[0];
		speakerB = users[1];
	}

	handleNextTopic();
</script>

<main>
	<h1>Podium</h1>
	<div class="title">{title}</div>
	<!-- <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p> -->

	<div class="answer">
		<p class="speaker">a {speakerA}</p>
		<button class="answer-text">{answerA}</button>
	</div>

	<div class="answer">
		<p class="speaker">b {speakerB}</p>
		<button class="answer-text">{answerB}</button>
	</div>

	<div class="admin">
		<button on:click={handleNextTopic}>Next Topic</button>
	</div>

	<p>users: {users} </p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	.answer {
		border: 1px solid #0f0;
		display: inline-block;
		width: 25%;
	}
</style>