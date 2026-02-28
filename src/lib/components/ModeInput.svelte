<script lang="ts">
	import { Info, Utensils, ArrowRightLeft } from '@lucide/svelte';

	const {
		mode,
		amount,
		inputLabel,
		inputHint,
		unitLabel,
		inputSpoonVal,
		inputConversion,
		onModeChange,
		onAmountChange
	} = $props<{
		mode: 'beans' | 'water';
		amount: number;
		inputLabel: string;
		inputHint: string;
		unitLabel: string;
		inputSpoonVal: string;
		inputConversion: string;
		onModeChange: (mode: 'beans' | 'water') => void;
		onAmountChange: (amount: number) => void;
	}>();
</script>

<section class="space-y-4">
	<div class="flex rounded-lg bg-stone-200 p-1">
		<button
			class={mode === 'beans'
				? 'flex-1 rounded-md bg-white py-2 text-sm font-medium text-stone-900 shadow-sm transition-all'
				: 'flex-1 rounded-md py-2 text-sm font-medium text-stone-500 transition-all hover:text-stone-700'}
			onclick={() => onModeChange('beans')}
		>
			I have Beans
		</button>
		<button
			class={mode === 'water'
				? 'flex-1 rounded-md bg-white py-2 text-sm font-medium text-stone-900 shadow-sm transition-all'
				: 'flex-1 rounded-md py-2 text-sm font-medium text-stone-500 transition-all hover:text-stone-700'}
			onclick={() => onModeChange('water')}
		>
			I want Coffee
		</button>
	</div>

	<div class="group relative">
		<label
			for="amount"
			class="mb-1 block text-xs font-bold tracking-wider text-stone-400 uppercase"
		>
			{inputLabel}
		</label>
		<div class="relative">
			<input
				type="number"
				id="amount"
				value={amount}
				inputmode="decimal"
				oninput={(event) => {
					const next = Number((event.currentTarget as HTMLInputElement).value);
					onAmountChange(Number.isFinite(next) ? next : 0);
				}}
				class="block w-full border-b-2 border-stone-200 bg-transparent py-2 font-serif text-4xl font-bold text-stone-800 placeholder-stone-300 transition-colors focus:border-coffee-600 focus:outline-none"
				placeholder="0"
			/>
			<span
				class="pointer-events-none absolute right-3 bottom-3 text-lg font-medium text-stone-400"
			>
				{unitLabel}
			</span>
		</div>

		<div class="mt-2 flex items-center justify-between gap-2">
			{#if mode === 'beans'}
				<div class="flex items-center gap-2 rounded-lg bg-coffee-50 px-2 py-1 text-coffee-600">
					<Utensils class="h-3 w-3" />
					<span class="font-serif text-xs font-bold">{inputSpoonVal}</span>
				</div>
			{/if}
			<div class="flex items-center gap-1.5 rounded-lg bg-stone-100 px-2 py-1 text-stone-500">
				<ArrowRightLeft class="h-3 w-3" />
				<span class="font-serif text-xs font-bold">{inputConversion}</span>
			</div>
		</div>

		<p
			class="mt-2 flex items-center gap-1 text-xs text-stone-400 opacity-0 transition-opacity group-hover:opacity-100"
		>
			<Info class="h-3 w-3" />
			<span>{inputHint}</span>
		</p>
	</div>
</section>
