import type { State, BrewConfig } from './types';
import { brewLogic, getGrindAdjustedRatio } from './brewLogic';
import { cupsToMl, mlToCups, gramsToOz } from './utils/conversions';

const RETAINED_WATER_PER_GRAM = 2;

export interface BrewRequirements {
	isEspresso: boolean;
	desiredOutput: number;
	desiredOutputUnit: 'cups' | 'g';
	desiredOutputMl: number;
	beansNeeded: number;
	hotWaterNeededMl: number;
	finalOutputMl: number;
	finalOutputG: number;
}

export function getCurrentBrewMethodLogic(state: State): BrewConfig {
	if (state.brewMethod === 'aeropress') {
		const aeropressLogic = brewLogic.aeropress[state.aeropressMode];
		const roastLogic = aeropressLogic[state.roast];
		return roastLogic[state.quality];
	}
	const methodLogic = brewLogic[state.brewMethod];
	const roastLogic = methodLogic[state.roast];
	return roastLogic[state.quality];
}

export function getSpoonWeight(state: State): number {
	if (state.brewMethod === 'aeropress') {
		const aeropressLogic = brewLogic.aeropress[state.aeropressMode];
		return aeropressLogic[state.roast].spoonWeight;
	}
	const methodLogic = brewLogic[state.brewMethod];
	return methodLogic[state.roast].spoonWeight;
}

export function isEspressoMode(state: State): boolean {
	return (
		state.brewMethod === 'espresso' ||
		(state.brewMethod === 'aeropress' && state.aeropressMode === 'espresso')
	);
}

export function getRoastDescription(roast: State['roast']): string {
	switch (roast) {
		case 'light':
			return 'Dense beans with low porosity require finer grind and higher ratios for proper extraction.';
		case 'medium':
			return 'Balanced solubility with moderate density.';
		case 'dark':
			return 'Highly porous and soluble; prone to over-extraction. Use coarser grind and tighter ratios.';
	}
}

export function getBrewRequirements(
	state: State,
	ratio: number,
	isEspresso: boolean
): BrewRequirements {
	if (state.mode === 'beans') {
		if (isEspresso) {
			const finalOutputG = state.beansAmount * ratio;
			return {
				isEspresso,
				desiredOutput: finalOutputG,
				desiredOutputUnit: 'g',
				desiredOutputMl: finalOutputG,
				beansNeeded: state.beansAmount,
				hotWaterNeededMl: finalOutputG,
				finalOutputMl: finalOutputG,
				finalOutputG
			};
		}

		const hotWaterNeededMl = state.beansAmount * ratio;
		const finalOutputMl = Math.max(
			0,
			hotWaterNeededMl - state.beansAmount * RETAINED_WATER_PER_GRAM
		);

		return {
			isEspresso,
			desiredOutput: mlToCups(finalOutputMl),
			desiredOutputUnit: 'cups',
			desiredOutputMl: finalOutputMl,
			beansNeeded: state.beansAmount,
			hotWaterNeededMl,
			finalOutputMl,
			finalOutputG: finalOutputMl
		};
	}

	if (isEspresso) {
		const finalOutputG = state.cupsAmount;
		const beansNeeded = ratio === 0 ? 0 : finalOutputG / ratio;
		return {
			isEspresso,
			desiredOutput: finalOutputG,
			desiredOutputUnit: 'g',
			desiredOutputMl: finalOutputG,
			beansNeeded,
			hotWaterNeededMl: finalOutputG,
			finalOutputMl: finalOutputG,
			finalOutputG
		};
	}

	const desiredOutputMl = cupsToMl(state.cupsAmount);
	const beansNeeded =
		ratio <= RETAINED_WATER_PER_GRAM ? 0 : desiredOutputMl / (ratio - RETAINED_WATER_PER_GRAM);
	const hotWaterNeededMl = beansNeeded * ratio;

	return {
		isEspresso,
		desiredOutput: state.cupsAmount,
		desiredOutputUnit: 'cups',
		desiredOutputMl,
		beansNeeded,
		hotWaterNeededMl,
		finalOutputMl: desiredOutputMl,
		finalOutputG: desiredOutputMl
	};
}

export function getInputLabel(state: State, isEspresso: boolean): string {
	const isBeansMode = state.mode === 'beans';
	if (isBeansMode) return 'Beans Weight';
	if (isEspresso) return 'Espresso You Want';
	return 'Coffee You Want';
}

export function getInputHint(state: State, isEspresso: boolean): string {
	const isBeansMode = state.mode === 'beans';
	if (isBeansMode) return 'Enter amount of beans you have';
	if (isEspresso) return 'Final espresso yield after brewing';
	return 'Final cups in your mug after brewing';
}

export function getUnitLabel(state: State, isEspresso: boolean): string {
	const isBeansMode = state.mode === 'beans';
	if (isBeansMode) return 'g';
	if (isEspresso) return 'g';
	return 'cups';
}

export function getResultLabel(state: State, isEspresso: boolean): string {
	const isBeansMode = state.mode === 'beans';
	if (isBeansMode) {
		return isEspresso ? 'Espresso Yield' : 'Water Needed';
	}
	return 'Beans Needed';
}

export function getFooterLabel(state: State, isEspresso: boolean): string {
	if (state.mode === 'water') {
		return 'Beans & Water Needed';
	}
	return getResultLabel(state, isEspresso);
}

export function getResultUnit(state: State, isEspresso: boolean): string {
	const isBeansMode = state.mode === 'beans';
	if (isBeansMode) {
		return isEspresso ? 'g' : 'ml';
	}
	return 'g';
}

export function getInputSpoonVal(state: State, spoonWeight: number): string {
	const isEspresso = isEspressoMode(state);
	const amount = state.mode === 'beans' || isEspresso ? state.beansAmount : state.cupsAmount;
	return `~ ${(amount / spoonWeight).toFixed(1)} heaping tbsp`;
}

export function getResultSpoonVal(state: State, ratio: number, spoonWeight: number): string {
	const requirements = getBrewRequirements(state, ratio, isEspressoMode(state));
	const beans = requirements.beansNeeded;
	return `~ ${(beans / spoonWeight).toFixed(1)} heaping tbsp`;
}

export function getResultValue(state: State, ratio: number, isEspresso: boolean): string {
	const requirements = getBrewRequirements(state, ratio, isEspresso);
	if (state.mode === 'beans') {
		if (isEspresso) {
			return requirements.finalOutputG < 100
				? requirements.finalOutputG.toFixed(1)
				: Math.round(requirements.finalOutputG).toString();
		}
		return Math.round(requirements.hotWaterNeededMl).toString();
	}
	return requirements.beansNeeded < 100
		? requirements.beansNeeded.toFixed(1)
		: Math.round(requirements.beansNeeded).toString();
}

export function getInputConversion(state: State, isEspresso: boolean): string {
	const isBeansMode = state.mode === 'beans';
	if (isBeansMode) {
		return `${gramsToOz(state.beansAmount).toFixed(1)} oz`;
	}
	if (isEspresso) {
		return `${gramsToOz(state.cupsAmount).toFixed(1)} oz`;
	}
	const waterMl = cupsToMl(state.cupsAmount);
	return `${Math.round(waterMl)} ml (~${mlToCups(waterMl).toFixed(1)} cups)`;
}

export function getResultConversion(state: State, ratio: number, isEspresso: boolean): string {
	const requirements = getBrewRequirements(state, ratio, isEspresso);
	if (state.mode === 'beans') {
		if (isEspresso) {
			return `${gramsToOz(requirements.finalOutputG).toFixed(1)} oz`;
		}
		return `${mlToCups(requirements.hotWaterNeededMl).toFixed(1)} cups`;
	}
	return `${gramsToOz(requirements.beansNeeded).toFixed(1)} oz`;
}

export function getWaterVolumeInfo(state: State): string | null {
	if (state.mode !== 'water') return null;
	if (isEspressoMode(state)) return null;
	const waterMl = cupsToMl(state.cupsAmount);
	return `${Math.round(waterMl)} ml water`;
}

export function getHotWaterNeededInfo(state: State, ratio: number, isEspresso: boolean): string {
	if (state.mode === 'beans') {
		return '';
	}
	const requirements = getBrewRequirements(state, ratio, isEspresso);
	const cups = mlToCups(requirements.hotWaterNeededMl);
	if (isEspresso) {
		return `${Math.round(requirements.hotWaterNeededMl)} g hot water`;
	}
	return `${Math.round(requirements.hotWaterNeededMl)} ml hot water (~${cups.toFixed(1)} cups)`;
}

export function getHotWaterNeededValue(state: State, ratio: number, isEspresso: boolean): string {
	const requirements = getBrewRequirements(state, ratio, isEspresso);
	if (isEspresso) {
		return Math.round(requirements.hotWaterNeededMl).toString();
	}
	return Math.round(requirements.hotWaterNeededMl).toString();
}

export function getHotWaterNeededUnit(state: State, isEspresso: boolean): string {
	if (state.mode === 'beans' && !isEspresso) {
		return 'ml';
	}
	return isEspresso ? 'g' : 'ml';
}

/**
 * Get the ratio adjusted for grind size and manual offset.
 * Applies grind adjustment logic from RATIO_RESEARCH.md, then adds any manual ratioOffset.
 */
export function getAdjustedRatio(state: State): number {
	const brewConfig = getCurrentBrewMethodLogic(state);
	const baseRatio = brewConfig.ratio;
	const isEspresso = isEspressoMode(state);

	let ratio = baseRatio;

	if (state.grindMode === 'custom') {
		const recommendedGrind = brewConfig.grind;
		const selectedGrind = state.grindSize;
		ratio = getGrindAdjustedRatio(selectedGrind, recommendedGrind, baseRatio, isEspresso);
	}

	ratio += state.ratioOffset;

	if (isEspresso) {
		return Math.max(1.0, Math.min(4.0, ratio));
	} else {
		return Math.max(8, Math.min(22, ratio));
	}
}
