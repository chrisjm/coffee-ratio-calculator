<script lang="ts">
	import { Thermometer, Clock } from '@lucide/svelte';
	import type { GrindSize } from '$lib/types';

	const { temp, grind, brewTime, ratio, baseRatio, recommendedGrind } = $props<{
		temp: string;
		grind: string;
		brewTime: string;
		ratio: number;
		baseRatio?: number;
		recommendedGrind?: GrindSize;
	}>();

	const grindLabels: Record<string, string> = {
		'extra-fine': 'Extra Fine',
		fine: 'Fine',
		'medium-fine': 'Medium-Fine',
		medium: 'Medium',
		'medium-coarse': 'Medium-Coarse',
		coarse: 'Coarse'
	};

	const displayGrind = $derived(grindLabels[grind] || grind);
	const isRatioAdjusted = $derived(
		baseRatio !== undefined &&
			recommendedGrind !== undefined &&
			grind !== recommendedGrind &&
			Math.abs(ratio - baseRatio) > 0.01
	);
	const ratioChange = $derived(isRatioAdjusted ? ratio - (baseRatio || 0) : 0);
</script>

<section class="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm">
	<h3 class="mb-4 flex items-center gap-2 text-sm font-bold text-stone-800">
		<Thermometer class="h-4 w-4 text-coffee-600" />
		Smart Brew Guide
	</h3>
	<div class="space-y-4">
		<div class="flex items-center justify-between border-b border-stone-50 pb-2">
			<span class="text-sm text-stone-500">Water Temp</span>
			<span class="text-sm font-bold text-stone-800">{temp}</span>
		</div>
		<div class="flex items-center justify-between border-b border-stone-50 pb-2">
			<span class="text-sm text-stone-500">Grind Size</span>
			<span class="text-sm font-bold text-stone-800">{displayGrind}</span>
		</div>
		<div class="flex items-center justify-between border-b border-stone-50 pb-2">
			<span class="flex items-center gap-1 text-sm text-stone-500">
				<Clock class="h-3 w-3" />
				Brew Time
			</span>
			<span class="text-sm font-bold text-stone-800">{brewTime}</span>
		</div>
		<div class="flex items-center justify-between">
			<span class="text-sm text-stone-500">Target Ratio</span>
			<div class="flex flex-col items-end gap-1">
				<span class="rounded bg-coffee-50 px-2 py-1 text-sm font-bold text-coffee-600">
					1:{ratio.toFixed(1)}
				</span>
				{#if isRatioAdjusted}
					<span class="text-xs text-stone-400">
						{ratioChange > 0 ? '+' : ''}{ratioChange.toFixed(1)} for grind
					</span>
				{/if}
			</div>
		</div>
	</div>
	<div class="mt-4 border-t border-stone-100 pt-4">
		<a
			href="/faq"
			data-sveltekit-preload-data
			class="flex items-center justify-center gap-1 text-xs text-stone-400 transition-colors hover:text-coffee-700"
		>
			<span>Why these recommendations?</span>
			<span class="text-coffee-600">→</span>
		</a>
	</div>
</section>
