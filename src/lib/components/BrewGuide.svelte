<script lang="ts">
	import { Thermometer, Clock, Minus, Plus, RotateCcw } from '@lucide/svelte';
	import type { GrindMode, GrindSize } from '$lib/types';

	const {
		temp,
		grindMode,
		grind,
		brewTime,
		ratio,
		baseRatio,
		recommendedGrind,
		isEspresso,
		ratioOffset,
		onRatioOffsetChange
	} = $props<{
		temp: string;
		grindMode: GrindMode;
		grind: GrindSize;
		brewTime: string;
		ratio: number;
		baseRatio?: number;
		recommendedGrind?: GrindSize;
		isEspresso: boolean;
		ratioOffset: number;
		onRatioOffsetChange: (offset: number) => void;
	}>();

	const getGrindLabel = (grind: GrindSize) => {
		switch (grind) {
			case 'extra-fine':
				return 'Extra Fine';
			case 'fine':
				return 'Fine';
			case 'medium-fine':
				return 'Medium-Fine';
			case 'medium':
				return 'Medium';
			case 'medium-coarse':
				return 'Medium-Coarse';
			case 'coarse':
				return 'Coarse';
		}
	};

	const ratioStep = $derived(isEspresso ? 0.1 : 0.5);

	const displayGrind = $derived(getGrindLabel(grind));
	const isGrindAdjusted = $derived(
		grindMode === 'custom' &&
			baseRatio !== undefined &&
			recommendedGrind !== undefined &&
			grind !== recommendedGrind &&
			Math.abs(ratio - baseRatio - ratioOffset) > 0.01
	);
	const hasManualOffset = $derived(Math.abs(ratioOffset) > 0.01);
	const grindChange = $derived(isGrindAdjusted ? ratio - baseRatio - ratioOffset : 0);
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
			<div class="flex items-center gap-1.5">
				<button
					type="button"
					class="touch-manipulation flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 transition-colors hover:border-stone-300 hover:text-stone-900 active:bg-stone-100"
					onclick={() => onRatioOffsetChange(ratioOffset - ratioStep)}
					aria-label="Decrease ratio"
				>
					<Minus class="h-3.5 w-3.5" />
				</button>
				<span class="rounded bg-coffee-50 px-2 py-1 text-sm font-bold text-coffee-600">
					1:{ratio.toFixed(1)}
				</span>
				<button
					type="button"
					class="touch-manipulation flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 transition-colors hover:border-stone-300 hover:text-stone-900 active:bg-stone-100"
					onclick={() => onRatioOffsetChange(ratioOffset + ratioStep)}
					aria-label="Increase ratio"
				>
					<Plus class="h-3.5 w-3.5" />
				</button>
				{#if hasManualOffset}
					<button
						type="button"
						class="touch-manipulation flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-stone-400 transition-colors hover:text-stone-600"
						onclick={() => onRatioOffsetChange(0)}
						aria-label="Reset ratio to recommended"
					>
						<RotateCcw class="h-3 w-3" />
					</button>
				{/if}
			</div>
		</div>
		{#if isGrindAdjusted || hasManualOffset}
			<div class="flex flex-wrap gap-2">
				{#if isGrindAdjusted}
					<span class="text-xs text-stone-400">
						{grindChange > 0 ? '+' : ''}{grindChange.toFixed(1)} for grind
					</span>
				{/if}
				{#if hasManualOffset}
					<span class="text-xs text-stone-400">
						{ratioOffset > 0 ? '+' : ''}{ratioOffset.toFixed(1)} manual
					</span>
				{/if}
			</div>
		{/if}
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
