<script lang="ts">
	const { roastLevels, roast, roastDesc, onRoastChange } = $props<{
		roastLevels: readonly ('light' | 'medium' | 'dark')[];
		roast: 'light' | 'medium' | 'dark';
		roastDesc: string;
		onRoastChange: (roast: 'light' | 'medium' | 'dark') => void;
	}>();
</script>

<div>
	<p
		id="roast-level-label"
		class="mb-3 block text-xs font-bold tracking-wider text-stone-400 uppercase"
	>
		Roast Level
	</p>
	<div class="grid grid-cols-3 gap-3" role="group" aria-labelledby="roast-level-label">
		{#each roastLevels as level (level)}
			<button
				class={`roast-btn flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-transparent bg-white p-3 shadow-sm transition-all hover:shadow-md ${
					roast === level ? 'active' : ''
				}`}
				onclick={() => onRoastChange(level)}
			>
				<div
					class={`h-8 w-8 rounded-full shadow-inner ${
						level === 'light'
							? 'bg-[#D4Bba3]'
							: level === 'medium'
								? 'bg-[#8A5E44]'
								: 'bg-[#3E2723]'
					}`}
				></div>
				<span class="text-xs font-bold">
					{level.charAt(0).toUpperCase() + level.slice(1)}
				</span>
			</button>
		{/each}
	</div>
	<p class="mt-2 text-xs text-stone-500 italic">{roastDesc}</p>
</div>
