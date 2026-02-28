<script lang="ts">
	import { CheckCircle2 } from '@lucide/svelte';

	const { grindSizes, grindSize, recommendedGrind, isLocked, onGrindChange } = $props<{
		grindSizes: readonly (
			| 'extra-fine'
			| 'fine'
			| 'medium-fine'
			| 'medium'
			| 'medium-coarse'
			| 'coarse'
		)[];
		grindSize: 'extra-fine' | 'fine' | 'medium-fine' | 'medium' | 'medium-coarse' | 'coarse';
		recommendedGrind: string;
		isLocked: boolean;
		onGrindChange: (
			grind: 'extra-fine' | 'fine' | 'medium-fine' | 'medium' | 'medium-coarse' | 'coarse'
		) => void;
	}>();

	const grindLabels: Record<string, string> = {
		'extra-fine': 'Extra Fine',
		fine: 'Fine',
		'medium-fine': 'Medium-Fine',
		medium: 'Medium',
		'medium-coarse': 'Medium-Coarse',
		coarse: 'Coarse'
	};

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
	<div class="grid grid-cols-3 gap-2">
		{#each grindSizes as grind (grind)}
			<button
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
				{grindLabels[grind]}
			</button>
		{/each}
	</div>
	{#if !isLocked && recommendedGrind}
		<p class="mt-2 text-xs text-stone-500 italic">
			Recommended: {grindLabels[recommendedGrind]}
		</p>
	{/if}
</fieldset>
