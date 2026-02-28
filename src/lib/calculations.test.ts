import { describe, it, expect } from 'vitest';
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
} from './calculations';
import type { State } from './types';

const createMockState = (overrides: Partial<State> = {}): State => ({
	mode: 'water',
	beansAmount: 18,
	cupsAmount: 2,
	brewMethod: 'pour-over',
	aeropressMode: 'immersion',
	roast: 'medium',
	quality: 'high',
	grindSize: 'medium',
	grindOverride: false,
	...overrides
});

describe('calculations', () => {
	describe('getCurrentBrewMethodLogic', () => {
		it('should return correct config for standard brew methods', () => {
			const state = createMockState({ brewMethod: 'pour-over', roast: 'light', quality: 'high' });
			const config = getCurrentBrewMethodLogic(state);
			expect(config.ratio).toBe(17);
			expect(config.temp).toBe('100°C / 212°F');
			expect(config.grind).toBe('medium-fine');
		});

		it('should return correct config for aeropress immersion', () => {
			const state = createMockState({
				brewMethod: 'aeropress',
				aeropressMode: 'immersion',
				roast: 'medium',
				quality: 'high'
			});
			const config = getCurrentBrewMethodLogic(state);
			expect(config.ratio).toBe(14);
			expect(config.temp).toBe('90°C / 194°F');
		});

		it('should return correct config for aeropress espresso', () => {
			const state = createMockState({
				brewMethod: 'aeropress',
				aeropressMode: 'espresso',
				roast: 'medium',
				quality: 'high'
			});
			const config = getCurrentBrewMethodLogic(state);
			expect(config.ratio).toBe(2.5);
			expect(config.grind).toBe('fine');
		});

		it('should handle different quality levels', () => {
			const highQuality = createMockState({ quality: 'high' });
			const lowQuality = createMockState({ quality: 'low' });

			const highConfig = getCurrentBrewMethodLogic(highQuality);
			const lowConfig = getCurrentBrewMethodLogic(lowQuality);

			expect(highConfig.ratio).toBeGreaterThanOrEqual(lowConfig.ratio);
		});
	});

	describe('getSpoonWeight', () => {
		it('should return correct spoon weight for roast level', () => {
			expect(getSpoonWeight(createMockState({ roast: 'light' }))).toBe(9);
			expect(getSpoonWeight(createMockState({ roast: 'medium' }))).toBe(8);
			expect(getSpoonWeight(createMockState({ roast: 'dark' }))).toBe(7);
		});

		it('should handle aeropress modes', () => {
			const immersion = createMockState({
				brewMethod: 'aeropress',
				aeropressMode: 'immersion',
				roast: 'medium'
			});
			const espresso = createMockState({
				brewMethod: 'aeropress',
				aeropressMode: 'espresso',
				roast: 'medium'
			});

			expect(getSpoonWeight(immersion)).toBe(8);
			expect(getSpoonWeight(espresso)).toBe(8);
		});
	});

	describe('isEspressoMode', () => {
		it('should return true for espresso brew method', () => {
			const state = createMockState({ brewMethod: 'espresso' });
			expect(isEspressoMode(state)).toBe(true);
		});

		it('should return true for aeropress espresso mode', () => {
			const state = createMockState({
				brewMethod: 'aeropress',
				aeropressMode: 'espresso'
			});
			expect(isEspressoMode(state)).toBe(true);
		});

		it('should return false for other brew methods', () => {
			expect(isEspressoMode(createMockState({ brewMethod: 'pour-over' }))).toBe(false);
			expect(isEspressoMode(createMockState({ brewMethod: 'french-press' }))).toBe(false);
		});

		it('should return false for aeropress immersion mode', () => {
			const state = createMockState({
				brewMethod: 'aeropress',
				aeropressMode: 'immersion'
			});
			expect(isEspressoMode(state)).toBe(false);
		});
	});

	describe('getRoastDescription', () => {
		it('should return description for light roast', () => {
			const desc = getRoastDescription('light');
			expect(desc).toContain('Dense beans');
			expect(desc).toContain('low porosity');
		});

		it('should return description for medium roast', () => {
			const desc = getRoastDescription('medium');
			expect(desc).toContain('Balanced');
		});

		it('should return description for dark roast', () => {
			const desc = getRoastDescription('dark');
			expect(desc).toContain('porous');
			expect(desc).toContain('over-extraction');
		});
	});

	describe('getInputLabel', () => {
		it('should return "Beans Weight" for beans mode', () => {
			const state = createMockState({ mode: 'beans' });
			expect(getInputLabel(state, false)).toBe('Beans Weight');
			expect(getInputLabel(state, true)).toBe('Beans Weight');
		});

		it('should return "Beans Weight" for espresso in water mode', () => {
			const state = createMockState({ mode: 'water' });
			expect(getInputLabel(state, true)).toBe('Beans Weight');
		});

		it('should return "Number of Cups" for non-espresso water mode', () => {
			const state = createMockState({ mode: 'water' });
			expect(getInputLabel(state, false)).toBe('Number of Cups');
		});
	});

	describe('getInputHint', () => {
		it('should return beans hint for beans mode', () => {
			const state = createMockState({ mode: 'beans' });
			expect(getInputHint(state, false)).toContain('beans you have');
		});

		it('should return beans hint for espresso', () => {
			const state = createMockState({ mode: 'water' });
			expect(getInputHint(state, true)).toContain('beans you have');
		});

		it('should return cups hint for water mode', () => {
			const state = createMockState({ mode: 'water' });
			expect(getInputHint(state, false)).toBe('8oz per cup');
		});
	});

	describe('getUnitLabel', () => {
		it('should return "g" for beans mode', () => {
			const state = createMockState({ mode: 'beans' });
			expect(getUnitLabel(state, false)).toBe('g');
		});

		it('should return "g" for espresso', () => {
			const state = createMockState({ mode: 'water' });
			expect(getUnitLabel(state, true)).toBe('g');
		});

		it('should return "cups" for water mode', () => {
			const state = createMockState({ mode: 'water' });
			expect(getUnitLabel(state, false)).toBe('cups');
		});
	});

	describe('getResultLabel', () => {
		it('should return "Water Needed" for beans mode non-espresso', () => {
			const state = createMockState({ mode: 'beans' });
			expect(getResultLabel(state, false)).toBe('Water Needed');
		});

		it('should return "Espresso Yield" for beans mode espresso', () => {
			const state = createMockState({ mode: 'beans' });
			expect(getResultLabel(state, true)).toBe('Espresso Yield');
		});

		it('should return "Beans Needed" for water mode', () => {
			const state = createMockState({ mode: 'water' });
			expect(getResultLabel(state, false)).toBe('Beans Needed');
			expect(getResultLabel(state, true)).toBe('Beans Needed');
		});
	});

	describe('getResultUnit', () => {
		it('should return "ml" for beans mode non-espresso', () => {
			const state = createMockState({ mode: 'beans' });
			expect(getResultUnit(state, false)).toBe('ml');
		});

		it('should return "g" for beans mode espresso', () => {
			const state = createMockState({ mode: 'beans' });
			expect(getResultUnit(state, true)).toBe('g');
		});

		it('should return "g" for water mode', () => {
			const state = createMockState({ mode: 'water' });
			expect(getResultUnit(state, false)).toBe('g');
		});
	});

	describe('getInputSpoonVal', () => {
		it('should calculate spoons for beans mode', () => {
			const state = createMockState({ mode: 'beans', beansAmount: 16, roast: 'medium' });
			const spoonWeight = 8;
			const result = getInputSpoonVal(state, spoonWeight);
			expect(result).toBe('~ 2.0 heaping tbsp');
		});

		it('should calculate spoons for water mode', () => {
			const state = createMockState({ mode: 'water', cupsAmount: 2 });
			const spoonWeight = 8;
			const result = getInputSpoonVal(state, spoonWeight);
			expect(result).toContain('tbsp');
		});

		it('should handle espresso mode', () => {
			const state = createMockState({ mode: 'water', cupsAmount: 2 });
			const spoonWeight = 8;
			const result = getInputSpoonVal(state, spoonWeight);
			expect(result).toBe('~ 0.3 heaping tbsp');
		});
	});

	describe('getResultSpoonVal', () => {
		it('should calculate spoons for beans mode', () => {
			const state = createMockState({ mode: 'beans', beansAmount: 24 });
			const spoonWeight = 8;
			const result = getResultSpoonVal(state, 15, spoonWeight);
			expect(result).toBe('~ 3.0 heaping tbsp');
		});

		it('should calculate spoons for water mode', () => {
			const state = createMockState({ mode: 'water', cupsAmount: 2 });
			const spoonWeight = 8;
			const result = getResultSpoonVal(state, 16, spoonWeight);
			expect(result).toContain('tbsp');
		});

		it('should calculate spoons for water mode with espresso', () => {
			const state = createMockState({ mode: 'water', beansAmount: 18, brewMethod: 'espresso' });
			const spoonWeight = 8;
			const result = getResultSpoonVal(state, 2.5, spoonWeight);
			expect(result).toBe('~ 2.3 heaping tbsp');
		});
	});

	describe('getResultValue', () => {
		it('should calculate water needed in beans mode', () => {
			const state = createMockState({ mode: 'beans', beansAmount: 20 });
			const result = getResultValue(state, 15, false);
			expect(result).toBe('300');
		});

		it('should calculate espresso yield in beans mode', () => {
			const state = createMockState({ mode: 'beans', beansAmount: 18 });
			const result = getResultValue(state, 2.5, true);
			expect(result).toBe('45');
		});

		it('should calculate beans needed in water mode with small amount', () => {
			const state = createMockState({ mode: 'water', cupsAmount: 2 });
			const result = getResultValue(state, 16, false);
			expect(result).toContain('.');
		});

		it('should calculate beans needed in water mode with large amount', () => {
			const state = createMockState({ mode: 'water', cupsAmount: 10 });
			const result = getResultValue(state, 16, false);
			expect(result).toBe('148');
		});

		it('should handle large values without decimals', () => {
			const state = createMockState({ mode: 'beans', beansAmount: 100 });
			const result = getResultValue(state, 15, false);
			expect(result).toBe('1500');
		});

		it('should calculate espresso yield in water mode with small yield', () => {
			const state = createMockState({ mode: 'water', beansAmount: 18, brewMethod: 'espresso' });
			const result = getResultValue(state, 2.5, true);
			expect(result).toBe('45.0');
		});

		it('should calculate espresso yield in water mode with large yield', () => {
			const state = createMockState({ mode: 'water', beansAmount: 50, brewMethod: 'espresso' });
			const result = getResultValue(state, 2.5, true);
			expect(result).toBe('125');
		});
	});

	describe('getInputConversion', () => {
		it('should convert grams to oz in beans mode', () => {
			const state = createMockState({ mode: 'beans', beansAmount: 28.35 });
			const result = getInputConversion(state, false);
			expect(result).toContain('oz');
			expect(result).toContain('1.0');
		});

		it('should convert cups to ml in water mode', () => {
			const state = createMockState({ mode: 'water', cupsAmount: 2 });
			const result = getInputConversion(state, false);
			expect(result).toContain('ml');
			expect(result).toContain('473');
		});

		it('should convert grams to oz in water mode with espresso', () => {
			const state = createMockState({ mode: 'water', beansAmount: 18, brewMethod: 'espresso' });
			const result = getInputConversion(state, true);
			expect(result).toContain('oz');
			expect(result).toContain('0.6');
		});
	});

	describe('getResultConversion', () => {
		it('should convert ml to cups in beans mode', () => {
			const state = createMockState({ mode: 'beans', beansAmount: 20 });
			const result = getResultConversion(state, 15, false);
			expect(result).toContain('cups');
		});

		it('should convert espresso yield to oz in beans mode', () => {
			const state = createMockState({ mode: 'beans', beansAmount: 18 });
			const result = getResultConversion(state, 2.5, true);
			expect(result).toContain('oz');
		});

		it('should convert beans to oz in water mode', () => {
			const state = createMockState({ mode: 'water', cupsAmount: 2 });
			const result = getResultConversion(state, 16, false);
			expect(result).toContain('oz');
		});

		it('should convert espresso yield to oz in water mode with espresso', () => {
			const state = createMockState({ mode: 'water', beansAmount: 18, brewMethod: 'espresso' });
			const result = getResultConversion(state, 2.5, true);
			expect(result).toContain('oz');
			expect(result).toContain('1.6');
		});
	});

	describe('getWaterVolumeInfo', () => {
		it('should return water volume for water mode', () => {
			const state = createMockState({ mode: 'water', cupsAmount: 2 });
			const result = getWaterVolumeInfo(state);
			expect(result).toContain('ml water');
			expect(result).toContain('473');
		});

		it('should return null for beans mode', () => {
			const state = createMockState({ mode: 'beans' });
			const result = getWaterVolumeInfo(state);
			expect(result).toBeNull();
		});

		it('should return null for espresso mode', () => {
			const state = createMockState({ mode: 'water', brewMethod: 'espresso' });
			const result = getWaterVolumeInfo(state);
			expect(result).toBeNull();
		});
	});

	describe('getAdjustedRatio', () => {
		it('should return base ratio when grind matches recommendation', () => {
			const state = createMockState({
				brewMethod: 'pour-over',
				roast: 'medium',
				quality: 'high',
				grindSize: 'medium'
			});
			const ratio = getAdjustedRatio(state);
			expect(ratio).toBe(16);
		});

		it('should adjust ratio for different grind sizes', () => {
			const baseState = createMockState({
				brewMethod: 'pour-over',
				roast: 'medium',
				quality: 'high',
				grindSize: 'medium'
			});
			const finerState = createMockState({
				brewMethod: 'pour-over',
				roast: 'medium',
				quality: 'high',
				grindSize: 'medium-fine'
			});

			const baseRatio = getAdjustedRatio(baseState);
			const finerRatio = getAdjustedRatio(finerState);

			expect(finerRatio).toBeGreaterThan(baseRatio);
		});

		it('should handle espresso adjustments', () => {
			const state = createMockState({
				brewMethod: 'espresso',
				roast: 'medium',
				quality: 'high',
				grindSize: 'extra-fine'
			});
			const ratio = getAdjustedRatio(state);
			expect(ratio).toBeGreaterThan(0);
			expect(ratio).toBeLessThan(5);
		});

		it('should handle aeropress espresso mode', () => {
			const state = createMockState({
				brewMethod: 'aeropress',
				aeropressMode: 'espresso',
				roast: 'medium',
				quality: 'high',
				grindSize: 'fine'
			});
			const ratio = getAdjustedRatio(state);
			expect(ratio).toBe(2.5);
		});
	});
});
