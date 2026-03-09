<script lang="ts">
	import { Utensils, ArrowRightLeft, Droplet, Bean } from '@lucide/svelte';

	const {
		mode,
		ratio,
		footerLabel,
		resultLabel,
		resultValue,
		resultUnit,
		resultSpoonVal,
		resultConversion,
		hotWaterNeededValue,
		hotWaterNeededUnit,
		hotWaterNeededInfo
	} = $props<{
		mode: 'beans' | 'water';
		ratio: number;
		footerLabel: string;
		resultLabel: string;
		resultValue: string;
		resultUnit: string;
		resultSpoonVal: string;
		resultConversion: string;
		hotWaterNeededValue: string;
		hotWaterNeededUnit: string;
		hotWaterNeededInfo: string;
	}>();
</script>

<footer
	class="safe-bottom fixed bottom-0 z-50 w-full rounded-t-3xl bg-stone-900 text-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out"
>
	<div class="mx-auto max-w-md px-6 py-5">
		<div class="mb-1 flex items-end justify-between">
			<span class="text-sm font-medium tracking-wider text-stone-400 uppercase">
				{footerLabel}
			</span>
			<span class="text-xs text-stone-400">Ratio 1:{ratio}</span>
		</div>
		{#if mode === 'water'}
			<div class="grid grid-cols-2 gap-4">
				<div>
					<div
						class="mb-1 flex items-center gap-1 text-[11px] font-medium tracking-wider text-stone-500 uppercase"
					>
						<Bean class="h-3.5 w-3.5" />
						<span>{resultLabel}</span>
					</div>
					<div class="flex items-baseline gap-1">
						<span class="font-serif text-5xl font-bold tracking-tight text-white">
							{resultValue}
						</span>
						<span class="text-xl font-medium text-stone-400">{resultUnit}</span>
					</div>
				</div>
				<div>
					<div
						class="mb-1 flex items-center gap-1 text-[11px] font-medium tracking-wider text-stone-500 uppercase"
					>
						<Droplet class="h-3.5 w-3.5" />
						<span>Hot Water Needed</span>
					</div>
					<div class="flex items-baseline gap-1">
						<span class="font-serif text-5xl font-bold tracking-tight text-white">
							{hotWaterNeededValue}
						</span>
						<span class="text-lg font-medium text-stone-400">{hotWaterNeededUnit}</span>
					</div>
				</div>
			</div>
		{:else}
			<div class="flex items-baseline gap-2">
				<div class="flex items-baseline gap-1">
					<span class="font-serif text-5xl font-bold tracking-tight text-white">
						{resultValue}
					</span>
					<span class="text-xl font-medium text-stone-400">{resultUnit}</span>
				</div>
			</div>
		{/if}

		<div class="mt-2 flex flex-wrap items-center gap-3">
			<div class="flex items-center gap-1.5 text-stone-400">
				<ArrowRightLeft class="h-3 w-3" />
				<span class="text-xs font-bold">{resultConversion}</span>
			</div>
			{#if mode === 'water'}
				<div class="flex items-center gap-1.5 text-stone-400">
					<Droplet class="h-3 w-3" />
					<span class="text-xs italic">{hotWaterNeededInfo}</span>
				</div>
				<div class="flex items-center gap-1.5 text-stone-400">
					<Utensils class="h-3 w-3" />
					<span class="text-xs italic">{resultSpoonVal}</span>
				</div>
			{/if}
		</div>
	</div>
</footer>
