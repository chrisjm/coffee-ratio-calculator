import { describe, it, expect } from 'vitest';
import {
	ozToMl,
	mlToOz,
	cupsToMl,
	mlToCups,
	gramsToOz,
	ozToGrams
} from './conversions';

describe('conversions', () => {
	describe('ozToMl', () => {
		it('should convert fluid ounces to milliliters', () => {
			expect(ozToMl(1)).toBeCloseTo(29.5735, 4);
			expect(ozToMl(8)).toBeCloseTo(236.588, 3);
			expect(ozToMl(0)).toBe(0);
		});
	});

	describe('mlToOz', () => {
		it('should convert milliliters to fluid ounces', () => {
			expect(mlToOz(29.5735)).toBeCloseTo(1, 4);
			expect(mlToOz(236.588)).toBeCloseTo(8, 3);
			expect(mlToOz(0)).toBe(0);
		});

		it('should be inverse of ozToMl', () => {
			const oz = 5.5;
			expect(mlToOz(ozToMl(oz))).toBeCloseTo(oz, 10);
		});
	});

	describe('cupsToMl', () => {
		it('should convert cups to milliliters (1 cup = 8 fl oz)', () => {
			expect(cupsToMl(1)).toBeCloseTo(236.588, 3);
			expect(cupsToMl(2)).toBeCloseTo(473.176, 3);
			expect(cupsToMl(0)).toBe(0);
		});
	});

	describe('mlToCups', () => {
		it('should convert milliliters to cups', () => {
			expect(mlToCups(236.588)).toBeCloseTo(1, 4);
			expect(mlToCups(473.176)).toBeCloseTo(2, 3);
			expect(mlToCups(0)).toBe(0);
		});

		it('should be inverse of cupsToMl', () => {
			const cups = 3.5;
			expect(mlToCups(cupsToMl(cups))).toBeCloseTo(cups, 10);
		});
	});

	describe('gramsToOz', () => {
		it('should convert grams to ounces (weight)', () => {
			expect(gramsToOz(28.3495)).toBeCloseTo(1, 4);
			expect(gramsToOz(100)).toBeCloseTo(3.5274, 4);
			expect(gramsToOz(0)).toBe(0);
		});
	});

	describe('ozToGrams', () => {
		it('should convert ounces to grams (weight)', () => {
			expect(ozToGrams(1)).toBeCloseTo(28.3495, 4);
			expect(ozToGrams(3.5274)).toBeCloseTo(100, 1);
			expect(ozToGrams(0)).toBe(0);
		});

		it('should be inverse of gramsToOz', () => {
			const grams = 50;
			expect(ozToGrams(gramsToOz(grams))).toBeCloseTo(grams, 10);
		});
	});
});
