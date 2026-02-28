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

	type BrewMethod =
		| 'pour-over'
		| 'french-press'
		| 'aeropress'
		| 'espresso'
		| 'preground-espresso'
		| 'cowboy';
	type GrindSize = 'extra-fine' | 'fine' | 'medium-fine' | 'medium' | 'medium-coarse' | 'coarse';

	const logic = {
		'pour-over': {
			light: {
				spoonWeight: 9,
				high: {
					ratio: 17,
					temp: '100°C / 212°F',
					grind: 'medium-fine' as GrindSize,
					brewTime: '2:30-3:30',
					desc: 'High ratio to highlight delicate floral and acidic notes.'
				},
				low: {
					ratio: 16,
					temp: '96°C / 205°F',
					grind: 'medium-fine' as GrindSize,
					brewTime: '2:30-3:30',
					desc: 'Slightly tighter ratio to add body and mask potential under-development.'
				}
			},
			medium: {
				spoonWeight: 8,
				high: {
					ratio: 16,
					temp: '93°C / 200°F',
					grind: 'medium' as GrindSize,
					brewTime: '2:30-3:30',
					desc: 'Balanced sweetness and acidity with moderate extraction.'
				},
				low: {
					ratio: 15,
					temp: '90°C / 195°F',
					grind: 'medium' as GrindSize,
					brewTime: '2:30-3:30',
					desc: 'Stronger brew to emphasize chocolatey notes over clarity.'
				}
			},
			dark: {
				spoonWeight: 7,
				high: {
					ratio: 15,
					temp: '85°C / 185°F',
					grind: 'medium' as GrindSize,
					brewTime: '2:30-3:30',
					desc: 'Rich and heavy body. Lower temp prevents bitterness.'
				},
				low: {
					ratio: 14,
					temp: '80°C / 176°F',
					grind: 'medium-coarse' as GrindSize,
					brewTime: '2:30-3:30',
					desc: 'Very strong. Punchy. Ideal for adding milk or sugar.'
				}
			}
		},
		'french-press': {
			light: {
				spoonWeight: 9,
				high: {
					ratio: 14,
					temp: '98°C / 208°F',
					grind: 'coarse' as GrindSize,
					brewTime: '4:00',
					desc: 'Immersion requires tighter ratio. Coarse grind for clean separation.'
				},
				low: {
					ratio: 13,
					temp: '95°C / 203°F',
					grind: 'coarse' as GrindSize,
					brewTime: '4:00',
					desc: 'Fuller body with stronger concentration.'
				}
			},
			medium: {
				spoonWeight: 8,
				high: {
					ratio: 13,
					temp: '92°C / 198°F',
					grind: 'medium-coarse' as GrindSize,
					brewTime: '4:00',
					desc: 'Classic French press ratio with balanced extraction.'
				},
				low: {
					ratio: 12,
					temp: '88°C / 190°F',
					grind: 'medium-coarse' as GrindSize,
					brewTime: '4:00',
					desc: 'Strong and bold. Perfect for morning coffee.'
				}
			},
			dark: {
				spoonWeight: 7,
				high: {
					ratio: 13,
					temp: '83°C / 181°F',
					grind: 'coarse' as GrindSize,
					brewTime: '4:00',
					desc: 'Prevent over-extraction with lower temp and coarse grind.'
				},
				low: {
					ratio: 12,
					temp: '80°C / 176°F',
					grind: 'coarse' as GrindSize,
					brewTime: '4:00',
					desc: 'Intense and concentrated. Great with milk.'
				}
			}
		},
		aeropress: {
			immersion: {
				light: {
					spoonWeight: 9,
					high: {
						ratio: 15,
						temp: '96°C / 205°F',
						grind: 'medium-fine' as GrindSize,
						brewTime: '1:30-2:00',
						desc: 'Shorter immersion time with finer grind for light roasts.'
					},
					low: {
						ratio: 14,
						temp: '93°C / 199°F',
						grind: 'medium-fine' as GrindSize,
						brewTime: '1:30-2:00',
						desc: 'Concentrated and smooth with good body.'
					}
				},
				medium: {
					spoonWeight: 8,
					high: {
						ratio: 14,
						temp: '90°C / 194°F',
						grind: 'medium-fine' as GrindSize,
						brewTime: '1:30-2:00',
						desc: 'Versatile ratio for clean, balanced cup.'
					},
					low: {
						ratio: 13,
						temp: '87°C / 189°F',
						grind: 'medium' as GrindSize,
						brewTime: '1:30-2:00',
						desc: 'Rich and full-bodied AeroPress brew.'
					}
				},
				dark: {
					spoonWeight: 7,
					high: {
						ratio: 13,
						temp: '82°C / 180°F',
						grind: 'medium' as GrindSize,
						brewTime: '1:30-2:00',
						desc: 'Lower temp prevents bitter extraction.'
					},
					low: {
						ratio: 12,
						temp: '78°C / 172°F',
						grind: 'medium' as GrindSize,
						brewTime: '1:30-2:00',
						desc: 'Strong concentrate perfect for dilution or milk drinks.'
					}
				}
			},
			espresso: {
				light: {
					spoonWeight: 9,
					high: {
						ratio: 3.0,
						temp: '96°C / 205°F',
						grind: 'fine' as GrindSize,
						brewTime: '30-45s',
						desc: 'Lungo-style shot with extended ratio for light roasts.'
					},
					low: {
						ratio: 2.5,
						temp: '93°C / 199°F',
						grind: 'fine' as GrindSize,
						brewTime: '30-45s',
						desc: 'Concentrated espresso-style shot with good clarity.'
					}
				},
				medium: {
					spoonWeight: 8,
					high: {
						ratio: 2.5,
						temp: '90°C / 194°F',
						grind: 'fine' as GrindSize,
						brewTime: '30-45s',
						desc: 'Classic espresso ratio with balanced sweetness.'
					},
					low: {
						ratio: 2.0,
						temp: '87°C / 189°F',
						grind: 'fine' as GrindSize,
						brewTime: '30-45s',
						desc: 'Ristretto-style shot. Intense and syrupy.'
					}
				},
				dark: {
					spoonWeight: 7,
					high: {
						ratio: 2.0,
						temp: '82°C / 180°F',
						grind: 'fine' as GrindSize,
						brewTime: '30-45s',
						desc: 'Short ratio prevents over-extraction of bitter compounds.'
					},
					low: {
						ratio: 1.5,
						temp: '78°C / 172°F',
						grind: 'fine' as GrindSize,
						brewTime: '30-45s',
						desc: 'Ultra-concentrated shot. Perfect for milk-based drinks.'
					}
				}
			}
		},
		espresso: {
			light: {
				spoonWeight: 9,
				high: {
					ratio: 3.0,
					temp: '96°C / 205°F',
					grind: 'extra-fine' as GrindSize,
					brewTime: '25-30s',
					desc: 'Lungo ratio for light roasts. Bright and complex.'
				},
				low: {
					ratio: 2.5,
					temp: '93°C / 199°F',
					grind: 'extra-fine' as GrindSize,
					brewTime: '25-30s',
					desc: 'Extended extraction for dense light roast beans.'
				}
			},
			medium: {
				spoonWeight: 8,
				high: {
					ratio: 2.5,
					temp: '90°C / 194°F',
					grind: 'extra-fine' as GrindSize,
					brewTime: '25-30s',
					desc: 'Traditional espresso ratio. Sweet and balanced.'
				},
				low: {
					ratio: 2.0,
					temp: '87°C / 189°F',
					grind: 'extra-fine' as GrindSize,
					brewTime: '25-30s',
					desc: 'Ristretto ratio for concentrated sweetness.'
				}
			},
			dark: {
				spoonWeight: 7,
				high: {
					ratio: 2.0,
					temp: '82°C / 180°F',
					grind: 'extra-fine' as GrindSize,
					brewTime: '25-30s',
					desc: 'Short ratio to avoid harsh bitterness.'
				},
				low: {
					ratio: 1.5,
					temp: '78°C / 172°F',
					grind: 'extra-fine' as GrindSize,
					brewTime: '25-30s',
					desc: 'Ultra-short pull. Thick and syrupy body.'
				}
			}
		},
		'preground-espresso': {
			light: {
				spoonWeight: 9,
				high: {
					ratio: 16,
					temp: '98°C / 208°F',
					grind: 'extra-fine' as GrindSize,
					brewTime: '5:00-7:00',
					desc: 'Adapted for espresso grind. Expect slow flow and longer brew time.'
				},
				low: {
					ratio: 15,
					temp: '95°C / 203°F',
					grind: 'extra-fine' as GrindSize,
					brewTime: '5:00-7:00',
					desc: 'Tighter ratio compensates for fine grind resistance.'
				}
			},
			medium: {
				spoonWeight: 8,
				high: {
					ratio: 15,
					temp: '91°C / 196°F',
					grind: 'extra-fine' as GrindSize,
					brewTime: '5:00-7:00',
					desc: 'Making the best of espresso grind in pour-over situation.'
				},
				low: {
					ratio: 14,
					temp: '88°C / 190°F',
					grind: 'extra-fine' as GrindSize,
					brewTime: '5:00-7:00',
					desc: 'Stronger brew to mask any over-extraction from fine grind.'
				}
			},
			dark: {
				spoonWeight: 7,
				high: {
					ratio: 14,
					temp: '82°C / 180°F',
					grind: 'extra-fine' as GrindSize,
					brewTime: '5:00-7:00',
					desc: 'Lower temp critical to prevent bitterness with fine grind.'
				},
				low: {
					ratio: 13,
					temp: '78°C / 172°F',
					grind: 'extra-fine' as GrindSize,
					brewTime: '5:00-7:00',
					desc: 'Camping survival mode. Strong and serviceable.'
				}
			}
		},
		cowboy: {
			light: {
				spoonWeight: 9,
				high: {
					ratio: 15,
					temp: '98°C / 208°F',
					grind: 'medium' as GrindSize,
					brewTime: '4:00-5:00',
					desc: 'Mug immersion then filter. Use whatever grind you have.'
				},
				low: {
					ratio: 14,
					temp: '95°C / 203°F',
					grind: 'medium' as GrindSize,
					brewTime: '4:00-5:00',
					desc: 'Improvised brewing. Adjust based on available equipment.'
				}
			},
			medium: {
				spoonWeight: 8,
				high: {
					ratio: 14,
					temp: '91°C / 196°F',
					grind: 'medium' as GrindSize,
					brewTime: '4:00-5:00',
					desc: 'Camping-friendly method. Flexible and forgiving.'
				},
				low: {
					ratio: 13,
					temp: '88°C / 190°F',
					grind: 'medium' as GrindSize,
					brewTime: '4:00-5:00',
					desc: 'Strong cowboy coffee. Works with any grind size.'
				}
			},
			dark: {
				spoonWeight: 7,
				high: {
					ratio: 13,
					temp: '82°C / 180°F',
					grind: 'coarse' as GrindSize,
					brewTime: '4:00-5:00',
					desc: 'Rustic brewing method. Coarser grind if available.'
				},
				low: {
					ratio: 12,
					temp: '78°C / 172°F',
					grind: 'coarse' as GrindSize,
					brewTime: '4:00-5:00',
					desc: 'Bold camping brew. Make do with what you have.'
				}
			}
		}
	} as const;

	const brewMethods: readonly BrewMethod[] = [
		'pour-over',
		'french-press',
		'aeropress',
		'espresso',
		'preground-espresso',
		'cowboy'
	] as const;
	const roastLevels = ['light', 'medium', 'dark'] as const;
	const qualityLevels = ['high', 'low'] as const;
	const grindSizes: readonly GrindSize[] = [
		'extra-fine',
		'fine',
		'medium-fine',
		'medium',
		'medium-coarse',
		'coarse'
	] as const;
	const storageKey = 'coffee-ratio-state';

	type State = {
		mode: 'beans' | 'water';
		amount: number;
		brewMethod: BrewMethod;
		aeropressMode: 'immersion' | 'espresso';
		roast: 'light' | 'medium' | 'dark';
		quality: 'high' | 'low';
		grindSize: GrindSize;
		grindOverride: boolean;
	};

	const initialState: State = {
		mode: 'beans',
		amount: 20,
		brewMethod: 'pour-over',
		aeropressMode: 'immersion',
		roast: 'light',
		quality: 'high',
		grindSize: 'medium-fine',
		grindOverride: false
	};

	let appState = $state(initialState);

	let hydrated = $state(false);

	const currentBrewMethodLogic = $derived.by(() => {
		if (appState.brewMethod === 'aeropress') {
			const aeropressLogic = logic.aeropress[appState.aeropressMode];
			const roastLogic = aeropressLogic[appState.roast];
			return roastLogic[appState.quality];
		}
		const methodLogic = logic[appState.brewMethod];
		const roastLogic = methodLogic[appState.roast];
		return roastLogic[appState.quality];
	});

	const spoonWeight = $derived.by(() => {
		if (appState.brewMethod === 'aeropress') {
			const aeropressLogic = logic.aeropress[appState.aeropressMode];
			return aeropressLogic[appState.roast].spoonWeight;
		}
		const methodLogic = logic[appState.brewMethod];
		return methodLogic[appState.roast].spoonWeight;
	});

	const ratio = $derived(currentBrewMethodLogic.ratio);
	const recommendedGrind = $derived(currentBrewMethodLogic.grind);
	const isGrindLocked = $derived(appState.brewMethod === 'preground-espresso');
	const isEspressoMode = $derived(
		appState.brewMethod === 'espresso' ||
			(appState.brewMethod === 'aeropress' && appState.aeropressMode === 'espresso')
	);

	const roastDesc = $derived(
		appState.roast === 'light'
			? 'Dense beans with low porosity require finer grind and higher ratios for proper extraction.'
			: appState.roast === 'medium'
				? 'Balanced solubility with moderate density.'
				: 'Highly porous and soluble; prone to over-extraction. Use coarser grind and tighter ratios.'
	);

	const isBeansMode = $derived(appState.mode === 'beans');
	const inputLabel = $derived(
		isBeansMode ? 'Beans Weight' : isEspressoMode ? 'Beans Weight' : 'Water Volume'
	);
	const inputHint = $derived(
		isBeansMode ? 'Enter amount of beans you have' : 'Enter amount of coffee you want'
	);
	const unitLabel = $derived(isBeansMode ? 'g' : isEspressoMode ? 'g' : 'ml');
	const resultLabel = $derived(
		isBeansMode ? (isEspressoMode ? 'Espresso Yield' : 'Water Needed') : 'Beans Needed'
	);
	const resultUnit = $derived(isBeansMode ? (isEspressoMode ? 'g' : 'ml') : 'g');
	const inputSpoonVal = $derived(`~ ${(appState.amount / spoonWeight).toFixed(1)} heaping tbsp`);
	const resultSpoonVal = $derived.by(() => {
		const beans = appState.amount / ratio;
		return `~ ${(beans / spoonWeight).toFixed(1)} heaping tbsp`;
	});
	const resultValue = $derived.by(() => {
		if (appState.mode === 'beans') {
			return Math.round(appState.amount * ratio).toString();
		}
		const beans = appState.amount / ratio;
		return beans < 100 ? beans.toFixed(1) : Math.round(beans).toString();
	});

	const resetApp = () => {
		appState.mode = initialState.mode;
		appState.amount = initialState.amount;
		appState.brewMethod = initialState.brewMethod;
		appState.aeropressMode = initialState.aeropressMode;
		appState.roast = initialState.roast;
		appState.quality = initialState.quality;
		appState.grindSize = initialState.grindSize;
		appState.grindOverride = initialState.grindOverride;
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

	const handleBrewMethodChange = (method: BrewMethod) => {
		appState.brewMethod = method;
		if (!appState.grindOverride) {
			appState.grindSize = recommendedGrind;
		}
	};

	const handleAeropressModeChange = (mode: 'immersion' | 'espresso') => {
		appState.aeropressMode = mode;
		if (!appState.grindOverride) {
			appState.grindSize = recommendedGrind;
		}
	};

	const handleGrindChange = (grind: GrindSize) => {
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
		/>
	</main>

	<ResultFooter
		mode={appState.mode}
		{ratio}
		{resultLabel}
		{resultValue}
		{resultUnit}
		{resultSpoonVal}
	/>
</div>
