<script lang="ts">
	import { CheckCircle2 } from '@lucide/svelte';
	import type { GrindMode, GrindSize } from '$lib/types';

	const {
		grindSizes,
		grindMode,
		grindSize,
		recommendedGrind,
		isLocked,
		onGrindModeChange,
		onGrindChange
	} = $props<{
		grindSizes: readonly GrindSize[];
		grindMode: GrindMode;
		grindSize: GrindSize;
		recommendedGrind: GrindSize;
		isLocked: boolean;
		onGrindModeChange: (grindMode: GrindMode) => void;
		onGrindChange: (grind: GrindSize) => void;
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

	const isCustom = $derived(grindMode === 'custom');
	const isRecommended = $derived(grindSize === recommendedGrind);
</script>

<fieldset class="border-0 p-0">
	<legend
		class="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-stone-400 uppercase"
	>
		Grind Size
		{#if isRecommended && !isLocked}
			<span class="flex items-center gap-1 font-normal text-green-600 normal-case">
				<CheckCircle2 class="h-3 w-3" />
				<span class="text-[10px]">Recommended</span>
			</span>
		{/if}
		{#if isLocked}
			<span class="text-[10px] font-normal text-amber-600 normal-case"> 🔒 Locked </span>
		{/if}
	</legend>
	<div class="grid grid-cols-2 gap-3">
		<button
			type="button"
			class={`touch-manipulation rounded-xl border px-4 py-3 text-left transition-all ${
				grindMode === 'pre-ground'
					? 'border-coffee-700 bg-coffee-50 text-coffee-800'
					: 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
			}`}
			onclick={() => onGrindModeChange('pre-ground')}
		>
			<div class="text-sm font-semibold">Pre-ground</div>
			<div class="mt-1 text-xs text-stone-500">
				Use the app's recommended grind and ratio for this coffee.
			</div>
		</button>
		<button
			type="button"
			class={`touch-manipulation rounded-xl border px-4 py-3 text-left transition-all ${
				isCustom
					? 'border-coffee-700 bg-coffee-50 text-coffee-800'
					: 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
			}`}
			onclick={() => !isLocked && onGrindModeChange('custom')}
			disabled={isLocked}
		>
			<div class="text-sm font-semibold">Custom Grind</div>
			<div class="mt-1 text-xs text-stone-500">Adjust grind manually and fine tune the ratio.</div>
		</button>
	</div>
	{#if !isLocked && !isCustom && recommendedGrind}
		<p class="mt-3 text-xs text-stone-500 italic">
			Recommended grind: {getGrindLabel(recommendedGrind)}
		</p>
	{/if}
	{#if isCustom}
		<div class="mt-4 grid grid-cols-3 gap-2">
			{#each grindSizes as grind (grind)}
				<button
					type="button"
					class={`grind-btn touch-manipulation rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
						grindSize === grind
							? 'border-coffee-700 bg-coffee-50 text-coffee-800'
							: 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
					} ${isLocked ? 'cursor-not-allowed opacity-50' : 'hover:shadow-sm'} ${
						grind === recommendedGrind && grind !== grindSize ? 'border-green-300 bg-green-50' : ''
					}`}
					onclick={() => !isLocked && onGrindChange(grind)}
					disabled={isLocked}
				>
					{getGrindLabel(grind)}
				</button>
			{/each}
		</div>
		<p class="mt-2 text-xs text-stone-500 italic">
			Recommended baseline: {getGrindLabel(recommendedGrind)}
		</p>
	{/if}
</fieldset>
