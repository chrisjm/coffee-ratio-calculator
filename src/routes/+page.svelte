<script lang="ts">
	import { onMount } from 'svelte';
	import HeaderBar from '$lib/components/HeaderBar.svelte';
	import ModeInput from '$lib/components/ModeInput.svelte';
	import BrewMethodSelector from '$lib/components/BrewMethodSelector.svelte';
	import RoastSelector from '$lib/components/RoastSelector.svelte';
	import QualitySelector from '$lib/components/QualitySelector.svelte';
	import GrindSizeSelector from '$lib/components/GrindSizeSelector.svelte';
	import BrewGuide from '$lib/components/BrewGuide.svelte';
	import ResultFooter from '$lib/components/ResultFooter.svelte';
	import PageFooter from '$lib/components/PageFooter.svelte';
	import type { State } from '$lib/types';
	import { brewMethods, roastLevels, qualityLevels, grindSizes } from '$lib/brewLogic';
	import {
		getCurrentBrewMethodLogic,
		getSpoonWeight,
		isEspressoMode,
		getRoastDescription,
		getInputLabel,
		getInputHint,
		getUnitLabel,
		getResultLabel,
		getResultUnit,
		getInputSpoonVal,
		getResultSpoonVal,
		getResultValue,
		getInputConversion,
		getResultConversion,
		getWaterVolumeInfo,
		getAdjustedRatio
	} from '$lib/calculations';

	const storageKey = 'coffee-ratio-state';

	const initialState: State = {
		mode: 'beans',
		amount: 20,
		brewMethod: 'pour-over',
		aeropressMode: 'immersion',
		roast: 'medium',
		quality: 'high',
		grindSize: 'medium',
		grindOverride: false
	};

	let appState = $state(initialState);

	let hydrated = $state(false);

	const currentBrewMethodLogic = $derived.by(() => {
		return getCurrentBrewMethodLogic(appState);
	});

	const spoonWeight = $derived.by(() => {
		return getSpoonWeight(appState);
	});

	const baseRatio = $derived(currentBrewMethodLogic.ratio);
	const ratio = $derived(getAdjustedRatio(appState));
	const recommendedGrind = $derived(currentBrewMethodLogic.grind);
	const isGrindLocked = $derived(appState.brewMethod === 'preground-espresso');
	const _isEspressoMode = $derived(isEspressoMode(appState));

	const roastDesc = $derived(getRoastDescription(appState.roast));

	const inputLabel = $derived(getInputLabel(appState, _isEspressoMode));
	const inputHint = $derived(getInputHint(appState, _isEspressoMode));
	const unitLabel = $derived(getUnitLabel(appState, _isEspressoMode));
	const resultLabel = $derived(getResultLabel(appState, _isEspressoMode));
	const resultUnit = $derived(getResultUnit(appState, _isEspressoMode));
	const inputSpoonVal = $derived(getInputSpoonVal(appState, spoonWeight));
	const resultSpoonVal = $derived(getResultSpoonVal(appState, ratio, spoonWeight));
	const resultValue = $derived(getResultValue(appState, ratio, _isEspressoMode));
	const inputConversion = $derived(getInputConversion(appState, _isEspressoMode));
	const resultConversion = $derived(getResultConversion(appState, ratio, _isEspressoMode));
	const waterVolumeInfo = $derived(getWaterVolumeInfo(appState));

	const resetApp = () => {
		appState.mode = initialState.mode;
		appState.amount = initialState.amount;
		appState.brewMethod = initialState.brewMethod;
		appState.aeropressMode = initialState.aeropressMode;
		appState.roast = initialState.roast;
		appState.quality = initialState.quality;
		appState.grindSize = initialState.grindSize;
		appState.grindOverride = false;
	};

	const handleModeChange = (mode: State['mode']) => {
		appState.mode = mode;
	};

	const handleAmountChange = (amount: number) => {
		appState.amount = amount;
	};

	const handleRoastChange = (roast: State['roast']) => {
		appState.roast = roast;
	};

	const handleQualityChange = (quality: State['quality']) => {
		appState.quality = quality;
	};

	const handleBrewMethodChange = (method: State['brewMethod']) => {
		appState.brewMethod = method;
		if (!appState.grindOverride) {
			appState.grindSize = recommendedGrind;
		}
	};

	const handleAeropressModeChange = (mode: State['aeropressMode']) => {
		appState.aeropressMode = mode;
		if (!appState.grindOverride) {
			appState.grindSize = recommendedGrind;
		}
	};

	const handleGrindChange = (grind: State['grindSize']) => {
		appState.grindSize = grind;
		appState.grindOverride = grind !== recommendedGrind;
	};

	onMount(() => {
		const saved = localStorage.getItem(storageKey);
		if (saved) {
			try {
				const parsed = JSON.parse(saved) as Partial<State>;
				if (parsed.mode) appState.mode = parsed.mode;
				if (typeof parsed.amount === 'number') appState.amount = parsed.amount;
				if (parsed.brewMethod) appState.brewMethod = parsed.brewMethod;
				if (parsed.aeropressMode) appState.aeropressMode = parsed.aeropressMode;
				if (parsed.roast) appState.roast = parsed.roast;
				if (parsed.quality) appState.quality = parsed.quality;
				if (parsed.grindSize) appState.grindSize = parsed.grindSize;
				if (typeof parsed.grindOverride === 'boolean')
					appState.grindOverride = parsed.grindOverride;
			} catch {
				localStorage.removeItem(storageKey);
			}
		}
		hydrated = true;
	});

	$effect(() => {
		if (!hydrated) return;
		localStorage.setItem(storageKey, JSON.stringify(appState));
	});
</script>

<svelte:head>
	<title>Coffee Ratio Calculator | Perfect Pour Over & Espresso Ratios</title>
	<meta
		name="description"
		content="Calculate perfect coffee-to-water ratios for pour over, French press, espresso, and more. Get tailored recommendations based on roast level, grind size, and brew method."
	/>
	<link rel="canonical" href="https://coffee.chrisjmears.com/" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://coffee.chrisjmears.com/" />
	<meta
		property="og:title"
		content="Coffee Ratio Calculator | Perfect Pour Over & Espresso Ratios"
	/>
	<meta
		property="og:description"
		content="Calculate perfect coffee-to-water ratios for pour over, French press, espresso, and more. Get tailored recommendations based on roast level, grind size, and brew method."
	/>
	<meta property="og:image" content="https://coffee.chrisjmears.com/og-image.png" />
</svelte:head>

<div
	class="flex min-h-screen flex-col bg-stone-50 font-sans text-stone-800 selection:bg-coffee-200"
>
	<HeaderBar onReset={resetApp} />

	<main class="mx-auto w-full max-w-md flex-grow space-y-8 px-5 py-6 pb-32">
		<ModeInput
			mode={appState.mode}
			amount={appState.amount}
			{inputLabel}
			{inputHint}
			{unitLabel}
			{inputSpoonVal}
			{inputConversion}
			onModeChange={handleModeChange}
			onAmountChange={handleAmountChange}
		/>

		<section class="space-y-6">
			<BrewMethodSelector
				{brewMethods}
				brewMethod={appState.brewMethod}
				aeropressMode={appState.aeropressMode}
				onBrewMethodChange={handleBrewMethodChange}
				onAeropressModeChange={handleAeropressModeChange}
			/>

			<RoastSelector
				{roastLevels}
				roast={appState.roast}
				{roastDesc}
				onRoastChange={handleRoastChange}
			/>

			<QualitySelector
				{qualityLevels}
				quality={appState.quality}
				desc={currentBrewMethodLogic.desc}
				onQualityChange={handleQualityChange}
			/>

			<GrindSizeSelector
				{grindSizes}
				grindSize={appState.grindSize}
				{recommendedGrind}
				isLocked={isGrindLocked}
				onGrindChange={handleGrindChange}
			/>
		</section>

		<BrewGuide
			temp={currentBrewMethodLogic.temp}
			grind={appState.grindSize}
			brewTime={currentBrewMethodLogic.brewTime}
			{ratio}
			{baseRatio}
			{recommendedGrind}
		/>

		<PageFooter />
	</main>

	<ResultFooter
		mode={appState.mode}
		{ratio}
		{resultLabel}
		{resultValue}
		{resultUnit}
		{resultSpoonVal}
		{resultConversion}
		{waterVolumeInfo}
	/>
</div>
