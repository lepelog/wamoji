<script lang="ts">
	import { EMOJIS } from '$lib/emojis';
	import { interpolate, type InterpolationPoint } from '$lib/interpolate';

	const RANGES: InterpolationPoint[] = [
		{
			start: 0,
			name: 'HEART'
		},
		{
			start: 0.25,
			name: 'SMILE'
		},
		{
			start: 0.5,
			name: 'NEUTRAL'
		},
		{
			start: 1,
			name: 'FROWN'
		}
		// {
		//     start: 1,
		//     name: "ANNOYED",
		// }
	];

	export let num: number;

	let innerWidth = 0;
	let innerHeight = 0;

	$: smileySize = Math.min(innerWidth, innerHeight);

	$: interpolations = interpolate(RANGES, num);

	function getLink(s: string): string {
		return (EMOJIS as any)[s];
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="smile-meter-smile">
	{#each interpolations as interpolation}
		<img
			class="smiley-face"
			alt="emoji"
			src={getLink(interpolation.name)}
			style={`opacity: ${interpolation.intensity}; height: ${smileySize}px; width: ${smileySize}px`}
		/>
	{/each}
</div>

<style>
	.smile-meter-smile {
		position: absolute;
	}

	.smiley-face {
		position: absolute;
	}

	/* .smiley-face {
        width: 100px;
        height: 100px;
    } */
</style>
