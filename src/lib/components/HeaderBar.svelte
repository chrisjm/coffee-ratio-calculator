<script lang="ts">
	import { Coffee } from '@lucide/svelte';

	const { onReset } = $props<{ onReset: () => void }>();
</script>

<header class="safe-top sticky top-0 z-10 border-b border-stone-200 bg-white">
	<div class="mx-auto flex max-w-md items-center justify-between px-6 py-4">
		<div class="flex items-center gap-2">
			<Coffee class="h-6 w-6 text-coffee-700" />
			<h1 class="font-serif text-lg font-bold tracking-tight text-stone-900">
				Coffee Ratio Calculator
			</h1>
		</div>
		<button
			onclick={onReset}
			class="text-xs font-medium tracking-wider text-stone-400 uppercase transition-colors hover:text-coffee-700"
		>
			Reset
		</button>
	</div>
</header>
