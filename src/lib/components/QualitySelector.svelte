<script lang="ts">
	import { ShoppingBag, Sparkles } from '@lucide/svelte';

	const { qualityLevels, quality, desc, onQualityChange } = $props<{
		qualityLevels: readonly ('high' | 'low')[];
		quality: 'high' | 'low';
		desc: string;
		onQualityChange: (quality: 'high' | 'low') => void;
	}>();
</script>

<fieldset class="border-0 p-0">
	<legend class="mb-3 block text-xs font-bold tracking-wider text-stone-400 uppercase">
		Strength
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
					<Sparkles class="h-4 w-4" />
					<span>Light / Balanced</span>
				{:else}
					<ShoppingBag class="h-4 w-4" />
					<span>Strong</span>
				{/if}
			</button>
		{/each}
	</div>
	<p class="mt-2 text-xs text-stone-500 italic">{desc}</p>
</fieldset>
