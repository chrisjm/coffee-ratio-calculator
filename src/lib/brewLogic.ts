import type { BrewMethod, GrindSize, RoastLevel, QualityLevel, RoastConfig } from './types';

type BrewLogic = {
	[K in BrewMethod]: K extends 'aeropress'
	? {
		immersion: Record<RoastLevel, RoastConfig>;
		espresso: Record<RoastLevel, RoastConfig>;
	}
	: Record<RoastLevel, RoastConfig>;
};

export const brewLogic: BrewLogic = {
	'pour-over': {
		light: {
			spoonWeight: 9,
			high: {
				ratio: 17,
				temp: '100°C / 212°F',
				grind: 'medium-fine',
				brewTime: '2:30-3:30',
				desc: 'High ratio to highlight delicate floral and acidic notes.'
			},
			low: {
				ratio: 16,
				temp: '96°C / 205°F',
				grind: 'medium-fine',
				brewTime: '2:30-3:30',
				desc: 'Slightly tighter ratio to add body and mask potential under-development.'
			}
		},
		medium: {
			spoonWeight: 8,
			high: {
				ratio: 16,
				temp: '93°C / 200°F',
				grind: 'medium',
				brewTime: '2:30-3:30',
				desc: 'Balanced sweetness and acidity with moderate extraction.'
			},
			low: {
				ratio: 15,
				temp: '90°C / 195°F',
				grind: 'medium',
				brewTime: '2:30-3:30',
				desc: 'Stronger brew to emphasize chocolatey notes over clarity.'
			}
		},
		dark: {
			spoonWeight: 7,
			high: {
				ratio: 15,
				temp: '85°C / 185°F',
				grind: 'medium',
				brewTime: '2:30-3:30',
				desc: 'Rich and heavy body. Lower temp prevents bitterness.'
			},
			low: {
				ratio: 14,
				temp: '80°C / 176°F',
				grind: 'medium-coarse',
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
				grind: 'coarse',
				brewTime: '4:00',
				desc: 'Immersion requires tighter ratio. Coarse grind for clean separation.'
			},
			low: {
				ratio: 13,
				temp: '95°C / 203°F',
				grind: 'coarse',
				brewTime: '4:00',
				desc: 'Fuller body with stronger concentration.'
			}
		},
		medium: {
			spoonWeight: 8,
			high: {
				ratio: 13,
				temp: '92°C / 198°F',
				grind: 'medium-coarse',
				brewTime: '4:00',
				desc: 'Classic French press ratio with balanced extraction.'
			},
			low: {
				ratio: 12,
				temp: '88°C / 190°F',
				grind: 'medium-coarse',
				brewTime: '4:00',
				desc: 'Strong and bold. Perfect for morning coffee.'
			}
		},
		dark: {
			spoonWeight: 7,
			high: {
				ratio: 13,
				temp: '83°C / 181°F',
				grind: 'coarse',
				brewTime: '4:00',
				desc: 'Prevent over-extraction with lower temp and coarse grind.'
			},
			low: {
				ratio: 12,
				temp: '80°C / 176°F',
				grind: 'coarse',
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
					grind: 'medium-fine',
					brewTime: '1:30-2:00',
					desc: 'Shorter immersion time with finer grind for light roasts.'
				},
				low: {
					ratio: 14,
					temp: '93°C / 199°F',
					grind: 'medium-fine',
					brewTime: '1:30-2:00',
					desc: 'Concentrated and smooth with good body.'
				}
			},
			medium: {
				spoonWeight: 8,
				high: {
					ratio: 14,
					temp: '90°C / 194°F',
					grind: 'medium-fine',
					brewTime: '1:30-2:00',
					desc: 'Versatile ratio for clean, balanced cup.'
				},
				low: {
					ratio: 13,
					temp: '87°C / 189°F',
					grind: 'medium',
					brewTime: '1:30-2:00',
					desc: 'Rich and full-bodied AeroPress brew.'
				}
			},
			dark: {
				spoonWeight: 7,
				high: {
					ratio: 13,
					temp: '82°C / 180°F',
					grind: 'medium',
					brewTime: '1:30-2:00',
					desc: 'Lower temp prevents bitter extraction.'
				},
				low: {
					ratio: 12,
					temp: '78°C / 172°F',
					grind: 'medium',
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
					grind: 'fine',
					brewTime: '30-45s',
					desc: 'Lungo-style shot with extended ratio for light roasts.'
				},
				low: {
					ratio: 2.5,
					temp: '93°C / 199°F',
					grind: 'fine',
					brewTime: '30-45s',
					desc: 'Concentrated espresso-style shot with good clarity.'
				}
			},
			medium: {
				spoonWeight: 8,
				high: {
					ratio: 2.5,
					temp: '90°C / 194°F',
					grind: 'fine',
					brewTime: '30-45s',
					desc: 'Classic espresso ratio with balanced sweetness.'
				},
				low: {
					ratio: 2.0,
					temp: '87°C / 189°F',
					grind: 'fine',
					brewTime: '30-45s',
					desc: 'Ristretto-style shot. Intense and syrupy.'
				}
			},
			dark: {
				spoonWeight: 7,
				high: {
					ratio: 2.0,
					temp: '82°C / 180°F',
					grind: 'fine',
					brewTime: '30-45s',
					desc: 'Short ratio prevents over-extraction of bitter compounds.'
				},
				low: {
					ratio: 1.5,
					temp: '78°C / 172°F',
					grind: 'fine',
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
				grind: 'extra-fine',
				brewTime: '25-30s',
				desc: 'Lungo ratio for light roasts. Bright and complex.'
			},
			low: {
				ratio: 2.5,
				temp: '93°C / 199°F',
				grind: 'extra-fine',
				brewTime: '25-30s',
				desc: 'Extended extraction for dense light roast beans.'
			}
		},
		medium: {
			spoonWeight: 8,
			high: {
				ratio: 2.5,
				temp: '90°C / 194°F',
				grind: 'extra-fine',
				brewTime: '25-30s',
				desc: 'Traditional espresso ratio. Sweet and balanced.'
			},
			low: {
				ratio: 2.0,
				temp: '87°C / 189°F',
				grind: 'extra-fine',
				brewTime: '25-30s',
				desc: 'Ristretto ratio for concentrated sweetness.'
			}
		},
		dark: {
			spoonWeight: 7,
			high: {
				ratio: 2.0,
				temp: '82°C / 180°F',
				grind: 'extra-fine',
				brewTime: '25-30s',
				desc: 'Short ratio to avoid harsh bitterness.'
			},
			low: {
				ratio: 1.5,
				temp: '78°C / 172°F',
				grind: 'extra-fine',
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
				grind: 'extra-fine',
				brewTime: '5:00-7:00',
				desc: 'Adapted for espresso grind. Expect slow flow and longer brew time.'
			},
			low: {
				ratio: 15,
				temp: '95°C / 203°F',
				grind: 'extra-fine',
				brewTime: '5:00-7:00',
				desc: 'Tighter ratio compensates for fine grind resistance.'
			}
		},
		medium: {
			spoonWeight: 8,
			high: {
				ratio: 15,
				temp: '91°C / 196°F',
				grind: 'extra-fine',
				brewTime: '5:00-7:00',
				desc: 'Making the best of espresso grind in pour-over situation.'
			},
			low: {
				ratio: 14,
				temp: '88°C / 190°F',
				grind: 'extra-fine',
				brewTime: '5:00-7:00',
				desc: 'Stronger brew to mask any over-extraction from fine grind.'
			}
		},
		dark: {
			spoonWeight: 7,
			high: {
				ratio: 14,
				temp: '82°C / 180°F',
				grind: 'extra-fine',
				brewTime: '5:00-7:00',
				desc: 'Lower temp critical to prevent bitterness with fine grind.'
			},
			low: {
				ratio: 13,
				temp: '78°C / 172°F',
				grind: 'extra-fine',
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
				grind: 'medium',
				brewTime: '4:00-5:00',
				desc: 'Mug immersion then filter. Use whatever grind you have.'
			},
			low: {
				ratio: 14,
				temp: '95°C / 203°F',
				grind: 'medium',
				brewTime: '4:00-5:00',
				desc: 'Improvised brewing. Adjust based on available equipment.'
			}
		},
		medium: {
			spoonWeight: 8,
			high: {
				ratio: 14,
				temp: '91°C / 196°F',
				grind: 'medium',
				brewTime: '4:00-5:00',
				desc: 'Camping-friendly method. Flexible and forgiving.'
			},
			low: {
				ratio: 13,
				temp: '88°C / 190°F',
				grind: 'medium',
				brewTime: '4:00-5:00',
				desc: 'Strong cowboy coffee. Works with any grind size.'
			}
		},
		dark: {
			spoonWeight: 7,
			high: {
				ratio: 13,
				temp: '82°C / 180°F',
				grind: 'coarse',
				brewTime: '4:00-5:00',
				desc: 'Rustic brewing method. Coarser grind if available.'
			},
			low: {
				ratio: 12,
				temp: '78°C / 172°F',
				grind: 'coarse',
				brewTime: '4:00-5:00',
				desc: 'Bold camping brew. Make do with what you have.'
			}
		}
	}
};

export const brewMethods: readonly BrewMethod[] = [
	'pour-over',
	'french-press',
	'aeropress',
	'espresso',
	'preground-espresso',
	'cowboy'
];

export const roastLevels: readonly RoastLevel[] = ['light', 'medium', 'dark'];

export const qualityLevels: readonly QualityLevel[] = ['high', 'low'];

export const grindSizes: readonly GrindSize[] = [
	'extra-fine',
	'fine',
	'medium-fine',
	'medium',
	'medium-coarse',
	'coarse'
];

// Map grind sizes to numeric values for comparison
const grindSizeOrder: Record<GrindSize, number> = {
	'extra-fine': 0,
	'fine': 1,
	'medium-fine': 2,
	'medium': 3,
	'medium-coarse': 4,
	'coarse': 5
};

/**
 * Calculate ratio adjustment based on grind size deviation from recommended.
 * Per RATIO_RESEARCH.md: finer grind = higher ratio, coarser grind = lower ratio
 * 
 * @param selectedGrind - The grind size selected by the user
 * @param recommendedGrind - The recommended grind for the brew method/roast
 * @param baseRatio - The base ratio before adjustment
 * @param isEspresso - Whether this is espresso brewing (smaller adjustments)
 * @returns Adjusted ratio
 */
export function getGrindAdjustedRatio(
	selectedGrind: GrindSize,
	recommendedGrind: GrindSize,
	baseRatio: number,
	isEspresso: boolean = false
): number {
	const selectedLevel = grindSizeOrder[selectedGrind];
	const recommendedLevel = grindSizeOrder[recommendedGrind];
	const deviation = selectedLevel - recommendedLevel;

	if (deviation === 0) {
		return baseRatio;
	}

	// Adjustment per grind step:
	// - For filter brewing: ±0.5 ratio per step
	// - For espresso: ±0.15 ratio per step (more sensitive)
	const adjustmentPerStep = isEspresso ? 0.15 : 0.5;

	// Finer grind (negative deviation) = higher ratio (more water)
	// Coarser grind (positive deviation) = lower ratio (less water)
	const adjustment = -deviation * adjustmentPerStep;

	const adjustedRatio = baseRatio + adjustment;

	// Ensure ratio stays within reasonable bounds
	if (isEspresso) {
		return Math.max(1.5, Math.min(3.5, adjustedRatio));
	} else {
		return Math.max(10, Math.min(20, adjustedRatio));
	}
}
