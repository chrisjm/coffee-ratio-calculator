<script lang="ts">
	import { Coffee, BookOpen } from '@lucide/svelte';
</script>

<footer class="mt-12 pb-4 text-center text-sm text-stone-400">
	<div class="space-y-2">
		<a href="/faq" class="inline-flex items-center gap-1.5 transition-colors hover:text-coffee-700">
			<BookOpen class="h-4 w-4" />
			<span>Learn the Science</span>
		</a>
		<a
			href="https://buymeacoffee.com/chrisjm"
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-1.5 transition-colors hover:text-coffee-700"
		>
			<Coffee class="h-4 w-4" />
			<span>Buy Me a Coffee</span>
		</a>
		<div>
			Crafted by <a
				href="https://www.chrisjmears.com/"
				target="_blank"
				rel="noopener noreferrer"
				class="transition-colors hover:text-coffee-700"
			>
				Chris J Mears
			</a>
		</div>
	</div>
</footer>
