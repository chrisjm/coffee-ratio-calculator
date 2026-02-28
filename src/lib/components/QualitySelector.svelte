<script lang="ts">
	import { Award, Coffee } from '@lucide/svelte';

	const { qualityLevels, quality, desc, onQualityChange } = $props<{
		qualityLevels: readonly ('high' | 'low')[];
		quality: 'high' | 'low';
		desc: string;
		onQualityChange: (quality: 'high' | 'low') => void;
	}>();
</script>

<fieldset class="border-0 p-0">
	<legend class="mb-3 block text-xs font-bold tracking-wider text-stone-400 uppercase">
		Coffee Quality
	</legend>
	<div class="flex gap-3">
		{#each qualityLevels as level (level)}
			<button
				class={`quality-btn flex flex-1 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-600 shadow-sm transition-all ${
					quality === level ? 'active' : ''
				}`}
				onclick={() => onQualityChange(level)}
			>
				{#if level === 'high'}
					<Award class="h-4 w-4" />
					<span>Specialty</span>
				{:else}
					<Coffee class="h-4 w-4" />
					<span>Commodity</span>
				{/if}
			</button>
		{/each}
	</div>
	<p class="mt-2 text-xs text-stone-500 italic">{desc}</p>
</fieldset>
