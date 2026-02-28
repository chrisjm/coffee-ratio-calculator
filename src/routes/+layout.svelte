<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.png" />

	<!-- Apple Touch Icons -->
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180.png" />
	<link rel="apple-touch-icon" sizes="167x167" href="/apple-touch-icon-167.png" />
	<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152.png" />
	<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120.png" />

	<!-- Resource Hints -->
	<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
	<link rel="dns-prefetch" href="https://fonts.gstatic.com" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;500;700&family=Merriweather:ital,wght@0,300;0,700;1,300&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
{@render children()}
