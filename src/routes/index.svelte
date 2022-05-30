<!-- <script context="module" lang="ts">
	export const prerender = true;
</script> -->
<script lang="ts">
	import SmileMeterSmiley from '$lib/smileys/SmileMeterSmiley.svelte';
	import { onDestroy, onMount } from 'svelte';

	// https://github.com/zeldaret/oot/blob/8f1fd58f22518857a1131582af0d41adfde2dad9/src/code/z_lib.c#L435
	function Math_ApproachF(pValue: number, target: number, fraction: number, step: number) {
		if (pValue != target) {
			let stepSize = (target - pValue) * fraction;

			if (stepSize > step) {
				stepSize = step;
			} else if (stepSize < -step) {
				stepSize = -step;
			}

			pValue += stepSize;
		}
		return pValue;
	}

	let num = 50;
	let target = 50;

	let timerCancel: undefined | ReturnType<typeof setInterval>;

	onMount(() => {
		timerCancel = setInterval(() => {
			num = Math_ApproachF(num, target, 0.2, 5);
		}, 1000 / 20);
	});

	onDestroy(() => clearInterval(timerCancel));

	function onKeydown(evnt: KeyboardEvent) {
		switch (evnt.key) {
			case '0':
				target = 0;
				break;
			case '1':
				target = 25;
				break;
			case '2':
				target = 50;
				break;
			case '3':
				target = 100;
				break;
		}
	}
</script>

<svelte:head>
	<title>Wamoji</title>
	<meta name="description" content="Wamoji demo app" />
</svelte:head>

<svelte:window on:keydown={onKeydown} />

<section>
	<!-- <input type="range" bind:value={target}> -->
	<SmileMeterSmiley num={num / 100} />
</section>

<style>
</style>
