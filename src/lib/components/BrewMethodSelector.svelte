<script lang="ts">
	import { Coffee, Cylinder, Circle, Zap, AlertCircle, Flame } from '@lucide/svelte';

	type BrewMethod =
		| 'pour-over'
		| 'french-press'
		| 'aeropress'
		| 'espresso'
		| 'preground-espresso'
		| 'cowboy';

	const { brewMethods, brewMethod, aeropressMode, onBrewMethodChange, onAeropressModeChange } =
		$props<{
			brewMethods: readonly BrewMethod[];
			brewMethod: BrewMethod;
			aeropressMode: 'immersion' | 'espresso';
			onBrewMethodChange: (method: BrewMethod) => void;
			onAeropressModeChange: (mode: 'immersion' | 'espresso') => void;
		}>();

	const methodConfig: Record<BrewMethod, { label: string; icon: typeof Coffee }> = {
		'pour-over': { label: 'Pour-Over', icon: Coffee },
		'french-press': { label: 'French Press', icon: Cylinder },
		aeropress: { label: 'AeroPress', icon: Circle },
		espresso: { label: 'Espresso', icon: Zap },
		'preground-espresso': { label: 'Pre-Ground Espresso', icon: AlertCircle },
		cowboy: { label: 'Cowboy/Camping', icon: Flame }
	};
</script>

<fieldset class="border-0 p-0">
	<legend class="mb-3 block text-xs font-bold tracking-wider text-stone-400 uppercase">
		Brew Method
	</legend>
	<div class="grid grid-cols-3 gap-3">
		{#each brewMethods as method (method)}
			{@const config = methodConfig[method as BrewMethod]}
			{@const IconComponent = config.icon}
			<button
				class={`brew-method-btn flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-transparent bg-white p-3 shadow-sm transition-all hover:shadow-md ${
					brewMethod === method ? 'active' : ''
				}`}
				onclick={() => onBrewMethodChange(method)}
			>
				<IconComponent class="h-5 w-5" />
				<span class="text-center text-xs leading-tight font-bold">
					{config.label}
				</span>
			</button>
		{/each}
	</div>

	{#if brewMethod === 'aeropress'}
		<div class="mt-4 flex gap-2">
			<button
				class={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
					aeropressMode === 'immersion'
						? 'border-coffee-700 bg-coffee-700 text-white'
						: 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
				}`}
				onclick={() => onAeropressModeChange('immersion')}
			>
				Immersion
			</button>
			<button
				class={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
					aeropressMode === 'espresso'
						? 'border-coffee-700 bg-coffee-700 text-white'
						: 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
				}`}
				onclick={() => onAeropressModeChange('espresso')}
			>
				Espresso-Style
			</button>
		</div>
	{/if}
</fieldset>
