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
		getFooterLabel,
		getResultLabel,
		getResultUnit,
		getInputSpoonVal,
		getResultSpoonVal,
		getResultValue,
		getInputConversion,
		getResultConversion,
		getHotWaterNeededInfo,
		getHotWaterNeededValue,
		getHotWaterNeededUnit,
		getAdjustedRatio
	} from '$lib/calculations';

	const storageKey = 'coffee-ratio-state';

	const initialState: State = {
		mode: 'beans',
		beansAmount: 20,
		cupsAmount: 2,
		brewMethod: 'pour-over',
		aeropressMode: 'immersion',
		roast: 'medium',
		quality: 'high',
		grindMode: 'pre-ground',
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
	const amountStep = $derived(appState.mode === 'beans' || _isEspressoMode ? 1 : 0.5);

	const AEROPRESS_SOFT_MAX_CUPS = 1.5;

	const roastDesc = $derived(getRoastDescription(appState.roast));
	const showAeropressModeSelector = $derived(appState.mode === 'beans');
	const showAeropressCapacityWarning = $derived(
		appState.mode === 'water' &&
			appState.brewMethod === 'aeropress' &&
			appState.cupsAmount > AEROPRESS_SOFT_MAX_CUPS
	);

	const inputLabel = $derived(getInputLabel(appState, _isEspressoMode));
	const inputHint = $derived(getInputHint(appState, _isEspressoMode));
	const unitLabel = $derived(getUnitLabel(appState, _isEspressoMode));
	const footerLabel = $derived(getFooterLabel(appState, _isEspressoMode));
	const resultLabel = $derived(getResultLabel(appState, _isEspressoMode));
	const resultUnit = $derived(getResultUnit(appState, _isEspressoMode));
	const inputSpoonVal = $derived(getInputSpoonVal(appState, spoonWeight));
	const resultSpoonVal = $derived(getResultSpoonVal(appState, ratio, spoonWeight));
	const resultValue = $derived(getResultValue(appState, ratio, _isEspressoMode));
	const inputConversion = $derived(getInputConversion(appState, _isEspressoMode));
	const resultConversion = $derived(getResultConversion(appState, ratio, _isEspressoMode));
	const hotWaterNeededInfo = $derived(getHotWaterNeededInfo(appState, ratio, _isEspressoMode));
	const hotWaterNeededValue = $derived(getHotWaterNeededValue(appState, ratio, _isEspressoMode));
	const hotWaterNeededUnit = $derived(getHotWaterNeededUnit(appState, _isEspressoMode));

	const resetApp = () => {
		appState.mode = initialState.mode;
		appState.beansAmount = initialState.beansAmount;
		appState.cupsAmount = initialState.cupsAmount;
		appState.brewMethod = initialState.brewMethod;
		appState.aeropressMode = initialState.aeropressMode;
		appState.roast = initialState.roast;
		appState.quality = initialState.quality;
		appState.grindMode = initialState.grindMode;
		appState.grindSize = initialState.grindSize;
		appState.grindOverride = false;
	};

	const handleModeChange = (mode: State['mode']) => {
		appState.mode = mode;
		if (mode === 'water' && appState.brewMethod === 'aeropress') {
			appState.aeropressMode = 'immersion';
		}
	};

	const handleAmountChange = (amount: number) => {
		if (appState.mode === 'beans') {
			appState.beansAmount = amount;
		} else {
			appState.cupsAmount = amount;
		}
	};

	const syncRecommendedGrind = () => {
		appState.grindSize = recommendedGrind;
		appState.grindOverride = false;
	};

	const handleRoastChange = (roast: State['roast']) => {
		appState.roast = roast;
		if (appState.grindMode === 'pre-ground' || isGrindLocked) {
			syncRecommendedGrind();
		}
	};

	const handleQualityChange = (quality: State['quality']) => {
		appState.quality = quality;
		if (appState.grindMode === 'pre-ground' || isGrindLocked) {
			syncRecommendedGrind();
		}
	};

	const handleBrewMethodChange = (method: State['brewMethod']) => {
		appState.brewMethod = method;
		if (method === 'aeropress' && appState.mode === 'water') {
			appState.aeropressMode = 'immersion';
		}
		if (appState.grindMode === 'pre-ground' || method === 'preground-espresso') {
			appState.grindMode = 'pre-ground';
			syncRecommendedGrind();
		}
	};

	const handleAeropressModeChange = (mode: State['aeropressMode']) => {
		appState.aeropressMode = mode;
		if (appState.grindMode === 'pre-ground' || isGrindLocked) {
			syncRecommendedGrind();
		}
	};

	const handleGrindModeChange = (grindMode: State['grindMode']) => {
		appState.grindMode = isGrindLocked ? 'pre-ground' : grindMode;
		if (appState.grindMode === 'pre-ground') {
			syncRecommendedGrind();
		} else {
			appState.grindOverride = appState.grindSize !== recommendedGrind;
		}
	};

	const handleGrindChange = (grind: State['grindSize']) => {
		appState.grindSize = grind;
		appState.grindMode = 'custom';
		appState.grindOverride = grind !== recommendedGrind;
	};

	onMount(() => {
		const saved = localStorage.getItem(storageKey);
		if (saved) {
			try {
				const parsed = JSON.parse(saved) as Partial<State> & { amount?: number };
				if (parsed.mode) appState.mode = parsed.mode;
				if (typeof parsed.beansAmount === 'number') appState.beansAmount = parsed.beansAmount;
				if (typeof parsed.cupsAmount === 'number') appState.cupsAmount = parsed.cupsAmount;
				// Migration: older versions stored a single `amount`
				if (typeof parsed.amount === 'number') {
					if (parsed.mode === 'water') {
						appState.cupsAmount = parsed.amount;
					} else {
						appState.beansAmount = parsed.amount;
					}
				}
				if (parsed.brewMethod) appState.brewMethod = parsed.brewMethod;
				if (parsed.aeropressMode) appState.aeropressMode = parsed.aeropressMode;
				if (parsed.roast) appState.roast = parsed.roast;
				if (parsed.quality) appState.quality = parsed.quality;
				if (parsed.grindMode) appState.grindMode = parsed.grindMode;
				if (parsed.grindSize) appState.grindSize = parsed.grindSize;
				if (typeof parsed.grindOverride === 'boolean')
					appState.grindOverride = parsed.grindOverride;
				if (appState.brewMethod === 'preground-espresso') {
					appState.grindMode = 'pre-ground';
				}
				if (appState.grindMode === 'pre-ground') {
					syncRecommendedGrind();
				}
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

	<main class="pb-safe-32 mx-auto w-full max-w-md grow space-y-8 px-5 py-6">
		<ModeInput
			mode={appState.mode}
			amount={appState.mode === 'beans' ? appState.beansAmount : appState.cupsAmount}
			{inputLabel}
			{inputHint}
			{unitLabel}
			{amountStep}
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
				{showAeropressModeSelector}
				{showAeropressCapacityWarning}
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
				grindMode={appState.grindMode}
				grindSize={appState.grindSize}
				{recommendedGrind}
				isLocked={isGrindLocked}
				onGrindModeChange={handleGrindModeChange}
				onGrindChange={handleGrindChange}
			/>
		</section>

		<BrewGuide
			temp={currentBrewMethodLogic.temp}
			grindMode={appState.grindMode}
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
		{footerLabel}
		{resultLabel}
		{resultValue}
		{resultUnit}
		{resultSpoonVal}
		{resultConversion}
		{hotWaterNeededValue}
		{hotWaterNeededUnit}
		{hotWaterNeededInfo}
	/>
</div>
