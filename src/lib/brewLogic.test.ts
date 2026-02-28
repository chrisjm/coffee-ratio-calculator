import { describe, it, expect } from 'vitest';
import {
	brewLogic,
	brewMethods,
	roastLevels,
	qualityLevels,
	grindSizes,
	getGrindAdjustedRatio
} from './brewLogic';

describe('brewLogic', () => {
	describe('brewLogic data structure', () => {
		it('should have all brew methods defined', () => {
			expect(brewLogic['pour-over']).toBeDefined();
			expect(brewLogic['french-press']).toBeDefined();
			expect(brewLogic.aeropress).toBeDefined();
			expect(brewLogic.espresso).toBeDefined();
			expect(brewLogic['preground-espresso']).toBeDefined();
			expect(brewLogic.cowboy).toBeDefined();
		});

		it('should have all roast levels for each brew method', () => {
			brewMethods.forEach((method) => {
				if (method === 'aeropress') {
					expect(brewLogic.aeropress.immersion.light).toBeDefined();
					expect(brewLogic.aeropress.immersion.medium).toBeDefined();
					expect(brewLogic.aeropress.immersion.dark).toBeDefined();
					expect(brewLogic.aeropress.espresso.light).toBeDefined();
					expect(brewLogic.aeropress.espresso.medium).toBeDefined();
					expect(brewLogic.aeropress.espresso.dark).toBeDefined();
				} else {
					const methodLogic = brewLogic[method];
					expect(methodLogic.light).toBeDefined();
					expect(methodLogic.medium).toBeDefined();
					expect(methodLogic.dark).toBeDefined();
				}
			});
		});

		it('should have high and low quality configs for each roast level', () => {
			brewMethods.forEach((method) => {
				roastLevels.forEach((roast) => {
					if (method === 'aeropress') {
						const immersionConfig = brewLogic.aeropress.immersion[roast];
						expect(immersionConfig.high).toBeDefined();
						expect(immersionConfig.low).toBeDefined();
						expect(immersionConfig.spoonWeight).toBeGreaterThan(0);

						const espressoConfig = brewLogic.aeropress.espresso[roast];
						expect(espressoConfig.high).toBeDefined();
						expect(espressoConfig.low).toBeDefined();
						expect(espressoConfig.spoonWeight).toBeGreaterThan(0);
					} else {
						const roastConfig = brewLogic[method][roast];
						expect(roastConfig.high).toBeDefined();
						expect(roastConfig.low).toBeDefined();
						expect(roastConfig.spoonWeight).toBeGreaterThan(0);
					}
				});
			});
		});

		it('should have valid brew config properties', () => {
			const config = brewLogic['pour-over'].light.high;
			expect(config.ratio).toBeGreaterThan(0);
			expect(config.temp).toBeTruthy();
			expect(config.grind).toBeTruthy();
			expect(config.brewTime).toBeTruthy();
			expect(config.desc).toBeTruthy();
		});
	});

	describe('spoonWeight values', () => {
		it('should have higher spoonWeight for light roasts', () => {
			expect(brewLogic['pour-over'].light.spoonWeight).toBe(9);
			expect(brewLogic['pour-over'].medium.spoonWeight).toBe(8);
			expect(brewLogic['pour-over'].dark.spoonWeight).toBe(7);
		});

		it('should be consistent across brew methods for same roast', () => {
			roastLevels.forEach((roast) => {
				const pourOverWeight = brewLogic['pour-over'][roast].spoonWeight;
				const frenchPressWeight = brewLogic['french-press'][roast].spoonWeight;
				expect(pourOverWeight).toBe(frenchPressWeight);
			});
		});
	});

	describe('ratio values', () => {
		it('should have higher ratios for high quality beans', () => {
			brewMethods.forEach((method) => {
				roastLevels.forEach((roast) => {
					if (method === 'aeropress') {
						const immersionHigh = brewLogic.aeropress.immersion[roast].high.ratio;
						const immersionLow = brewLogic.aeropress.immersion[roast].low.ratio;
						expect(immersionHigh).toBeGreaterThanOrEqual(immersionLow);

						const espressoHigh = brewLogic.aeropress.espresso[roast].high.ratio;
						const espressoLow = brewLogic.aeropress.espresso[roast].low.ratio;
						expect(espressoHigh).toBeGreaterThanOrEqual(espressoLow);
					} else {
						const highRatio = brewLogic[method][roast].high.ratio;
						const lowRatio = brewLogic[method][roast].low.ratio;
						expect(highRatio).toBeGreaterThanOrEqual(lowRatio);
					}
				});
			});
		});

		it('should have espresso ratios much lower than filter methods', () => {
			const espressoRatio = brewLogic.espresso.medium.high.ratio;
			const pourOverRatio = brewLogic['pour-over'].medium.high.ratio;
			expect(espressoRatio).toBeLessThan(5);
			expect(pourOverRatio).toBeGreaterThan(10);
		});
	});

	describe('constant arrays', () => {
		it('should export brewMethods array', () => {
			expect(brewMethods).toHaveLength(6);
			expect(brewMethods).toContain('pour-over');
			expect(brewMethods).toContain('french-press');
			expect(brewMethods).toContain('aeropress');
			expect(brewMethods).toContain('espresso');
			expect(brewMethods).toContain('preground-espresso');
			expect(brewMethods).toContain('cowboy');
		});

		it('should export roastLevels array', () => {
			expect(roastLevels).toHaveLength(3);
			expect(roastLevels).toContain('light');
			expect(roastLevels).toContain('medium');
			expect(roastLevels).toContain('dark');
		});

		it('should export qualityLevels array', () => {
			expect(qualityLevels).toHaveLength(2);
			expect(qualityLevels).toContain('high');
			expect(qualityLevels).toContain('low');
		});

		it('should export grindSizes array', () => {
			expect(grindSizes).toHaveLength(6);
			expect(grindSizes).toContain('extra-fine');
			expect(grindSizes).toContain('fine');
			expect(grindSizes).toContain('medium-fine');
			expect(grindSizes).toContain('medium');
			expect(grindSizes).toContain('medium-coarse');
			expect(grindSizes).toContain('coarse');
		});
	});

	describe('getGrindAdjustedRatio', () => {
		describe('filter brewing adjustments', () => {
			it('should return base ratio when grind matches recommendation', () => {
				const result = getGrindAdjustedRatio('medium', 'medium', 15, false);
				expect(result).toBe(15);
			});

			it('should increase ratio for finer grind', () => {
				const result = getGrindAdjustedRatio('medium-fine', 'medium', 15, false);
				expect(result).toBe(15.5);
			});

			it('should decrease ratio for coarser grind', () => {
				const result = getGrindAdjustedRatio('medium-coarse', 'medium', 15, false);
				expect(result).toBe(14.5);
			});

			it('should adjust by 0.5 per grind step for filter brewing', () => {
				const twoStepsFiner = getGrindAdjustedRatio('medium-fine', 'medium-coarse', 15, false);
				expect(twoStepsFiner).toBe(16);

				const twoStepsCoarser = getGrindAdjustedRatio('medium-coarse', 'medium-fine', 15, false);
				expect(twoStepsCoarser).toBe(14);
			});

			it('should enforce minimum ratio of 10 for filter brewing', () => {
				const result = getGrindAdjustedRatio('coarse', 'extra-fine', 12, false);
				expect(result).toBeGreaterThanOrEqual(10);
			});

			it('should enforce maximum ratio of 20 for filter brewing', () => {
				const result = getGrindAdjustedRatio('extra-fine', 'coarse', 18, false);
				expect(result).toBeLessThanOrEqual(20);
			});
		});

		describe('espresso adjustments', () => {
			it('should return base ratio when grind matches recommendation', () => {
				const result = getGrindAdjustedRatio('fine', 'fine', 2.5, true);
				expect(result).toBe(2.5);
			});

			it('should increase ratio for finer grind', () => {
				const result = getGrindAdjustedRatio('extra-fine', 'fine', 2.5, true);
				expect(result).toBe(2.65);
			});

			it('should decrease ratio for coarser grind', () => {
				const result = getGrindAdjustedRatio('medium-fine', 'fine', 2.5, true);
				expect(result).toBe(2.35);
			});

			it('should adjust by 0.15 per grind step for espresso', () => {
				const twoStepsFiner = getGrindAdjustedRatio('extra-fine', 'medium-fine', 2.5, true);
				expect(twoStepsFiner).toBeCloseTo(2.8, 2);

				const twoStepsCoarser = getGrindAdjustedRatio('medium-fine', 'extra-fine', 2.5, true);
				expect(twoStepsCoarser).toBeCloseTo(2.2, 2);
			});

			it('should enforce minimum ratio of 1.5 for espresso', () => {
				const result = getGrindAdjustedRatio('coarse', 'extra-fine', 2.0, true);
				expect(result).toBeGreaterThanOrEqual(1.5);
			});

			it('should enforce maximum ratio of 3.5 for espresso', () => {
				const result = getGrindAdjustedRatio('extra-fine', 'coarse', 3.0, true);
				expect(result).toBeLessThanOrEqual(3.5);
			});
		});

		describe('edge cases', () => {
			it('should handle extreme grind deviations', () => {
				const extremeFine = getGrindAdjustedRatio('extra-fine', 'coarse', 15, false);
				expect(extremeFine).toBeGreaterThan(15);
				expect(extremeFine).toBeLessThanOrEqual(20);

				const extremeCoarse = getGrindAdjustedRatio('coarse', 'extra-fine', 15, false);
				expect(extremeCoarse).toBeLessThan(15);
				expect(extremeCoarse).toBeGreaterThanOrEqual(10);
			});

			it('should handle all grind size combinations', () => {
				grindSizes.forEach((selected) => {
					grindSizes.forEach((recommended) => {
						const result = getGrindAdjustedRatio(selected, recommended, 15, false);
						expect(result).toBeGreaterThanOrEqual(10);
						expect(result).toBeLessThanOrEqual(20);
					});
				});
			});
		});
	});
});
