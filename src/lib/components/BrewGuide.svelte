<script lang="ts">
	import { Thermometer, Clock } from '@lucide/svelte';

	const { temp, grind, brewTime, ratio } = $props<{
		temp: string;
		grind: string;
		brewTime: string;
		ratio: number;
	}>();

	const grindLabels: Record<string, string> = {
		'extra-fine': 'Extra Fine',
		fine: 'Fine',
		'medium-fine': 'Medium-Fine',
		medium: 'Medium',
		'medium-coarse': 'Medium-Coarse',
		coarse: 'Coarse'
	};

	const displayGrind = $derived(grindLabels[grind] || grind);
</script>

<section class="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm">
	<h3 class="mb-4 flex items-center gap-2 text-sm font-bold text-stone-800">
		<Thermometer class="h-4 w-4 text-coffee-600" />
		Smart Brew Guide
	</h3>
	<div class="space-y-4">
		<div class="flex items-center justify-between border-b border-stone-50 pb-2">
			<span class="text-sm text-stone-500">Water Temp</span>
			<span class="text-sm font-bold text-stone-800">{temp}</span>
		</div>
		<div class="flex items-center justify-between border-b border-stone-50 pb-2">
			<span class="text-sm text-stone-500">Grind Size</span>
			<span class="text-sm font-bold text-stone-800">{displayGrind}</span>
		</div>
		<div class="flex items-center justify-between border-b border-stone-50 pb-2">
			<span class="flex items-center gap-1 text-sm text-stone-500">
				<Clock class="h-3 w-3" />
				Brew Time
			</span>
			<span class="text-sm font-bold text-stone-800">{brewTime}</span>
		</div>
		<div class="flex items-center justify-between">
			<span class="text-sm text-stone-500">Target Ratio</span>
			<span class="rounded bg-coffee-50 px-2 py-1 text-sm font-bold text-coffee-600">
				1:{ratio}
			</span>
		</div>
	</div>
</section>
