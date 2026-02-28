export type BrewMethod =
	| 'pour-over'
	| 'french-press'
	| 'aeropress'
	| 'espresso'
	| 'preground-espresso'
	| 'cowboy';

export type GrindSize =
	| 'extra-fine'
	| 'fine'
	| 'medium-fine'
	| 'medium'
	| 'medium-coarse'
	| 'coarse';

export type RoastLevel = 'light' | 'medium' | 'dark';

export type QualityLevel = 'high' | 'low';

export type AeropressMode = 'immersion' | 'espresso';

export type AppMode = 'beans' | 'water';

export interface State {
	mode: AppMode;
	amount: number;
	brewMethod: BrewMethod;
	aeropressMode: AeropressMode;
	roast: RoastLevel;
	quality: QualityLevel;
	grindSize: GrindSize;
	grindOverride: boolean;
}

export interface BrewConfig {
	ratio: number;
	temp: string;
	grind: GrindSize;
	brewTime: string;
	desc: string;
}

export interface RoastConfig {
	spoonWeight: number;
	high: BrewConfig;
	low: BrewConfig;
}
