/**
 * Unit conversion utilities for coffee measurements
 */

// Volume conversions
const ML_PER_FL_OZ = 29.5735;
const FL_OZ_PER_CUP = 8;
const ML_PER_CUP = ML_PER_FL_OZ * FL_OZ_PER_CUP; // 236.588

// Weight conversions
const GRAMS_PER_OZ = 28.3495;

/**
 * Convert fluid ounces to milliliters
 */
export function ozToMl(oz: number): number {
	return oz * ML_PER_FL_OZ;
}

/**
 * Convert milliliters to fluid ounces
 */
export function mlToOz(ml: number): number {
	return ml / ML_PER_FL_OZ;
}

/**
 * Convert cups to milliliters (1 cup = 8 fl oz)
 */
export function cupsToMl(cups: number): number {
	return cups * ML_PER_CUP;
}

/**
 * Convert milliliters to cups
 */
export function mlToCups(ml: number): number {
	return ml / ML_PER_CUP;
}

/**
 * Convert grams to ounces (weight)
 */
export function gramsToOz(grams: number): number {
	return grams / GRAMS_PER_OZ;
}

/**
 * Convert ounces to grams (weight)
 */
export function ozToGrams(oz: number): number {
	return oz * GRAMS_PER_OZ;
}
