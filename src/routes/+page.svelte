<script lang="ts">
	import { onMount } from 'svelte';
	import HeaderBar from '$lib/components/HeaderBar.svelte';
	import ModeInput from '$lib/components/ModeInput.svelte';
	import RoastSelector from '$lib/components/RoastSelector.svelte';
	import QualitySelector from '$lib/components/QualitySelector.svelte';
	import BrewGuide from '$lib/components/BrewGuide.svelte';
	import ResultFooter from '$lib/components/ResultFooter.svelte';

	const logic = {
		light: {
			spoonWeight: 9,
			high: {
				ratio: 17,
				temp: '100°C / 212°F',
				grind: 'Medium-Fine',
				desc: 'High ratio to highlight delicate floral and acidic notes.'
			},
			low: {
				ratio: 16,
				temp: '96°C / 205°F',
				grind: 'Medium',
				desc: 'Slightly tighter ratio to add body and mask potential under-development.'
			}
		},
		medium: {
			spoonWeight: 8,
			high: {
				ratio: 16,
				temp: '93°C / 200°F',
				grind: 'Medium',
				desc: 'The Golden Cup standard. Balanced sweetness and acidity.'
			},
			low: {
				ratio: 15,
				temp: '90°C / 195°F',
				grind: 'Medium',
				desc: 'Stronger brew to emphasize chocolatey notes over clarity.'
			}
		},
		dark: {
			spoonWeight: 7,
			high: {
				ratio: 15,
				temp: '85°C / 185°F',
				grind: 'Coarse',
				desc: 'Rich and heavy body. Lower temp prevents bitterness.'
			},
			low: {
				ratio: 14,
				temp: '80°C / 176°F',
				grind: 'Coarse',
				desc: 'Very strong. Punchy. Ideal for adding milk or sugar.'
			}
		}
	} as const;

	const roastLevels = ['light', 'medium', 'dark'] as const;
	const qualityLevels = ['high', 'low'] as const;
	const storageKey = 'coffee-ratio-state';

	type State = {
		mode: 'beans' | 'water';
		amount: number;
		roast: 'light' | 'medium' | 'dark';
		quality: 'high' | 'low';
	};

	const initialState = {
		mode: 'beans' as const,
		amount: 20,
		roast: 'light' as const,
		quality: 'high' as const
	};

	let state = $state(initialState);

	let hydrated = $state(false);

	const currentLogic = $derived(logic[state.roast][state.quality]);
	const spoonWeight = $derived(logic[state.roast].spoonWeight);
	const ratio = $derived(currentLogic.ratio);
	const roastDesc = $derived(
		state.roast === 'light'
			? 'Light roasts are dense; harder to extract.'
			: state.roast === 'medium'
				? 'Medium roasts are balanced and soluble.'
				: 'Dark roasts extract very easily; prone to bitterness.'
	);
	const isBeansMode = $derived(state.mode === 'beans');
	const inputLabel = $derived(isBeansMode ? 'Beans Weight' : 'Water Volume');
	const inputHint = $derived(
		isBeansMode ? 'Enter amount of beans you have' : 'Enter amount of coffee you want'
	);
	const unitLabel = $derived(isBeansMode ? 'g' : 'ml');
	const resultLabel = $derived(isBeansMode ? 'Water Needed' : 'Beans Needed');
	const resultUnit = $derived(isBeansMode ? 'ml' : 'g');
	const inputSpoonVal = $derived(`~ ${(state.amount / spoonWeight).toFixed(1)} heaping tbsp`);
	const resultSpoonVal = $derived.by(() => {
		const beans = state.amount / ratio;
		return `~ ${(beans / spoonWeight).toFixed(1)} heaping tbsp`;
	});
	const resultValue = $derived.by(() => {
		if (state.mode === 'beans') {
			return Math.round(state.amount * ratio).toString();
		}
		const beans = state.amount / ratio;
		return beans < 100 ? beans.toFixed(1) : Math.round(beans).toString();
	});

	const resetApp = () => {
		Object.assign(state, initialState);
	};

	const handleModeChange = (mode: State['mode']) => {
		state.mode = mode;
	};

	const handleAmountChange = (amount: number) => {
		state.amount = amount;
	};

	const handleRoastChange = (roast: State['roast']) => {
		state.roast = roast;
	};

	const handleQualityChange = (quality: State['quality']) => {
		state.quality = quality;
	};

	onMount(() => {
		const saved = localStorage.getItem(storageKey);
		if (saved) {
			try {
				const parsed = JSON.parse(saved) as Partial<State>;
				if (parsed.mode) state.mode = parsed.mode;
				if (typeof parsed.amount === 'number') state.amount = parsed.amount;
				if (parsed.roast) state.roast = parsed.roast;
				if (parsed.quality) state.quality = parsed.quality;
			} catch {
				localStorage.removeItem(storageKey);
			}
		}
		hydrated = true;
	});

	$effect(() => {
		if (!hydrated) return;
		localStorage.setItem(storageKey, JSON.stringify(state));
	});
</script>

<div
	class="flex min-h-screen flex-col bg-stone-50 font-sans text-stone-800 selection:bg-coffee-200"
>
	<HeaderBar onReset={resetApp} />

	<main class="mx-auto w-full max-w-md flex-grow space-y-8 px-5 py-6 pb-32">
		<ModeInput
			mode={state.mode}
			amount={state.amount}
			{inputLabel}
			{inputHint}
			{unitLabel}
			{inputSpoonVal}
			onModeChange={handleModeChange}
			onAmountChange={handleAmountChange}
		/>

		<section class="space-y-6">
			<RoastSelector
				{roastLevels}
				roast={state.roast}
				{roastDesc}
				onRoastChange={handleRoastChange}
			/>

			<QualitySelector
				{qualityLevels}
				quality={state.quality}
				desc={currentLogic.desc}
				onQualityChange={handleQualityChange}
			/>
		</section>

		<BrewGuide temp={currentLogic.temp} grind={currentLogic.grind} {ratio} />
	</main>

	<ResultFooter
		mode={state.mode}
		{ratio}
		{resultLabel}
		{resultValue}
		{resultUnit}
		{resultSpoonVal}
	/>
</div>
