import type { State, BrewConfig } from './types';
import { brewLogic } from './brewLogic';
import { cupsToMl, mlToCups, gramsToOz } from './utils/conversions';

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

export function getInputLabel(state: State, isEspresso: boolean): string {
	const isBeansMode = state.mode === 'beans';
	if (isBeansMode) return 'Beans Weight';
	if (isEspresso) return 'Beans Weight';
	return 'Number of Cups';
}

export function getInputHint(state: State, isEspresso: boolean): string {
	const isBeansMode = state.mode === 'beans';
	if (isBeansMode) return 'Enter amount of beans you have';
	if (isEspresso) return 'Enter amount of beans you have';
	return '8oz per cup';
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

export function getResultUnit(state: State, isEspresso: boolean): string {
	const isBeansMode = state.mode === 'beans';
	if (isBeansMode) {
		return isEspresso ? 'g' : 'ml';
	}
	return 'g';
}

export function getInputSpoonVal(state: State, spoonWeight: number): string {
	return `~ ${(state.amount / spoonWeight).toFixed(1)} heaping tbsp`;
}

export function getResultSpoonVal(state: State, ratio: number, spoonWeight: number): string {
	const beans = state.amount / ratio;
	return `~ ${(beans / spoonWeight).toFixed(1)} heaping tbsp`;
}

export function getResultValue(state: State, ratio: number, isEspresso: boolean): string {
	if (state.mode === 'beans') {
		return Math.round(state.amount * ratio).toString();
	}
	if (isEspresso) {
		const espressoYield = state.amount * ratio;
		return espressoYield < 100 ? espressoYield.toFixed(1) : Math.round(espressoYield).toString();
	}
	const waterMl = cupsToMl(state.amount);
	const beans = waterMl / ratio;
	return beans < 100 ? beans.toFixed(1) : Math.round(beans).toString();
}

export function getInputConversion(state: State, isEspresso: boolean): string {
	const isBeansMode = state.mode === 'beans';
	if (isBeansMode) {
		return `${gramsToOz(state.amount).toFixed(1)} oz`;
	}
	if (isEspresso) {
		return `${gramsToOz(state.amount).toFixed(1)} oz`;
	}
	return `${Math.round(cupsToMl(state.amount))} ml`;
}

export function getResultConversion(state: State, ratio: number, isEspresso: boolean): string {
	if (state.mode === 'beans') {
		if (isEspresso) {
			const espressoYield = state.amount * ratio;
			return `${gramsToOz(espressoYield).toFixed(1)} oz`;
		}
		const waterMl = state.amount * ratio;
		return `${mlToCups(waterMl).toFixed(1)} cups`;
	}
	if (isEspresso) {
		const espressoYield = state.amount * ratio;
		return `${gramsToOz(espressoYield).toFixed(1)} oz`;
	}
	const waterMl = cupsToMl(state.amount);
	const beans = waterMl / ratio;
	return `${gramsToOz(beans).toFixed(1)} oz`;
}
