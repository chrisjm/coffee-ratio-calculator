<script lang="ts">
	import { Utensils } from '@lucide/svelte';

	const { mode, ratio, resultLabel, resultValue, resultUnit, resultSpoonVal } = $props<{
		mode: 'beans' | 'water';
		ratio: number;
		resultLabel: string;
		resultValue: string;
		resultUnit: string;
		resultSpoonVal: string;
	}>();
</script>

<footer
	class="fixed bottom-0 z-50 w-full rounded-t-3xl bg-stone-900 text-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out"
>
	<div class="mx-auto max-w-md px-6 py-5">
		<div class="mb-1 flex items-end justify-between">
			<span class="text-sm font-medium tracking-wider text-stone-400 uppercase">
				{resultLabel}
			</span>
			<span class="text-xs text-stone-400">Ratio 1:{ratio}</span>
		</div>
		<div class="flex items-baseline gap-2">
			<div class="flex items-baseline gap-1">
				<span class="font-serif text-5xl font-bold tracking-tight text-white">
					{resultValue}
				</span>
				<span class="text-xl font-medium text-stone-400">{resultUnit}</span>
			</div>
		</div>

		{#if mode === 'water'}
			<div class="mt-2 flex items-center gap-2 text-stone-400">
				<Utensils class="h-3 w-3" />
				<span class="text-xs italic">{resultSpoonVal}</span>
			</div>
		{/if}
	</div>
</footer>
