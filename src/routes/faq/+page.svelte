<script lang="ts">
	import { Coffee, BookOpen, Beaker } from '@lucide/svelte';
</script>

<svelte:head>
	<title>Coffee Brewing Science FAQ | Coffee Ratio Calculator</title>
	<meta
		name="description"
		content="Learn the science behind coffee ratios, roast levels, grind sizes, and brewing methods. Evidence-based answers to your coffee extraction questions."
	/>
	<link rel="canonical" href="https://coffee.chrisjmears.com/faq" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://coffee.chrisjmears.com/faq" />
	<meta property="og:title" content="Coffee Brewing Science FAQ | Coffee Ratio Calculator" />
	<meta
		property="og:description"
		content="Learn the science behind coffee ratios, roast levels, grind sizes, and brewing methods. Evidence-based answers to your coffee extraction questions."
	/>
	<meta property="og:image" content="https://coffee.chrisjmears.com/og-image.png" />

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": [
			{
				"@type": "Question",
				"name": "Why do different roast levels need different coffee-to-water ratios?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Roasting physically degrades the cellular matrix of the bean, altering its density and solubility. Light roasts have high density and low porosity, requiring higher ratios (1:16-1:18) and finer grinds. Dark roasts are extremely porous and highly soluble, requiring tighter ratios (1:14-1:15) and coarser grinds to prevent over-extraction of bitter compounds."
				}
			},
			{
				"@type": "Question",
				"name": "How does coffee bean altitude affect brewing?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "High-altitude coffees (>1,500m) develop dense, tightly packed cell walls that resist water penetration, requiring higher ratios (1:16-1:18) and finer grinds. Low-altitude coffees (<1,000m) have loose, porous structures that extract quickly, requiring lower ratios (1:14-1:15) and coarser grinds to prevent over-extraction."
				}
			},
			{
				"@type": "Question",
				"name": "Why does espresso use such different ratios than pour over?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Espresso forces water through compacted coffee at 9 bar of pressure, creating massive extraction in very short contact time. This allows hyper-efficient ratios of 1:1.5 to 1:3.0. Pour over uses gravity-driven percolation with longer contact time, requiring ratios of 1:15 to 1:18 to achieve proper extraction."
				}
			},
			{
				"@type": "Question",
				"name": "How should I adjust my grind as coffee beans age?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Freshly roasted coffee off-gasses CO2, creating physical resistance against brewing water. As beans age and lose CO2, hydraulic resistance drops. You must grind progressively finer over time to artificially recreate that resistance and maintain consistent flow rates and extraction."
				}
			}
		]
	}
	<\/script>`}
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-stone-50 to-white">
	<header class="border-b border-stone-200 bg-white">
		<div class="mx-auto max-w-3xl px-6 py-6">
			<a
				href="/"
				class="inline-flex items-center gap-2 text-coffee-700 transition-colors hover:text-coffee-800"
			>
				<Coffee class="h-5 w-5" />
				<span class="text-sm font-medium">← Back to Calculator</span>
			</a>
		</div>
	</header>

	<main class="mx-auto max-w-3xl px-6 py-12">
		<div class="mb-12 text-center">
			<div class="mb-4 flex justify-center">
				<div class="rounded-full bg-coffee-100 p-4">
					<Beaker class="h-8 w-8 text-coffee-700" />
				</div>
			</div>
			<h1 class="mb-4 font-serif text-4xl font-bold tracking-tight text-stone-900">
				The Science of Coffee Ratios
			</h1>
			<p class="text-lg text-stone-600">Evidence-based answers to your coffee brewing questions</p>
		</div>

		<article class="prose prose-lg max-w-none prose-stone">
			<section class="mb-16">
				<h2 class="flex items-center gap-2">
					<BookOpen class="h-6 w-6 text-coffee-700" />
					Roast Level & Extraction
				</h2>

				<div class="not-prose mb-8 rounded-lg border border-stone-200 bg-white p-6">
					<h3 class="mb-3 font-serif text-xl font-bold text-stone-900">
						Why do different roast levels need different coffee-to-water ratios?
					</h3>
					<p class="mb-4 text-stone-700">
						Roasting physically degrades the cellular matrix of the bean, profoundly altering its
						density and solubility. This fundamental change in bean structure requires dramatically
						different extraction strategies.
					</p>

					<div class="space-y-4">
						<div>
							<h4 class="mb-2 font-semibold text-coffee-800">Light Roasts</h4>
							<p class="mb-2 text-stone-700">
								These beans have undergone less thermal degradation, resulting in high physical
								density and low porosity. Their cellulosic walls remain largely intact, possessing
								very low solubility and requiring aggressive extraction.
							</p>
							<ul class="ml-6 list-disc space-y-1 text-stone-600">
								<li><strong>Filter brewing:</strong> 1:16 to 1:18 ratios</li>
								<li><strong>Espresso:</strong> 1:2.5 to 1:3.0 ratios</li>
								<li><strong>Grind:</strong> Finer to maximize surface area exposure</li>
							</ul>
						</div>

						<div>
							<h4 class="mb-2 font-semibold text-coffee-800">Medium Roasts</h4>
							<p class="mb-2 text-stone-700">
								These possess moderate density and balanced solubility, serving as the baseline for
								most brewing calculations.
							</p>
							<ul class="ml-6 list-disc space-y-1 text-stone-600">
								<li><strong>Filter brewing:</strong> 1:15 to 1:16 ratios</li>
								<li><strong>Espresso:</strong> 1:2.0 to 1:2.5 ratios</li>
								<li><strong>Grind:</strong> Moderate or baseline grind</li>
							</ul>
						</div>

						<div>
							<h4 class="mb-2 font-semibold text-coffee-800">Dark Roasts</h4>
							<p class="mb-2 text-stone-700">
								Heavy carbonization reduces bean density and shatters the cellular matrix, making it
								extremely porous and highly soluble. These are exceptionally susceptible to
								over-extraction, which pulls out acrid, ashy, and bitter flavors.
							</p>
							<ul class="ml-6 list-disc space-y-1 text-stone-600">
								<li><strong>Filter brewing:</strong> 1:14 to 1:15 ratios</li>
								<li><strong>Espresso:</strong> 1:1.5 to 1:2.0 ratios</li>
								<li><strong>Grind:</strong> Coarser to restrict extraction of bitter phenols</li>
							</ul>
						</div>
					</div>

					<p class="mt-4 text-sm text-stone-500">
						<strong>Sources:</strong> SCA Golden Cup Standards<sup>[2]</sup>, Adjusting Brewing
						Recipe for Roast Level<sup>[8]</sup>
					</p>
				</div>

				<div class="not-prose mb-8 rounded-lg border border-stone-200 bg-white p-6">
					<h3 class="mb-3 font-serif text-xl font-bold text-stone-900">
						What happens during the roasting process that changes extraction?
					</h3>
					<p class="text-stone-700">
						Roasting triggers pyrolysis—the thermal degradation of organic compounds. As temperature
						increases, the bean's cellular structure breaks down, creating porosity. Light roasts
						retain dense cell walls that resist water penetration, while dark roasts develop a
						shattered, highly permeable structure. This physical transformation directly determines
						how quickly solubles can be extracted during brewing.
					</p>
					<p class="mt-4 text-sm text-stone-500">
						<strong>Sources:</strong> Coffee Extraction Chart Chemistry<sup>[4]</sup>, Adjusting
						Brewing Recipe for Roast Level<sup>[8]</sup>
					</p>
				</div>
			</section>

			<section class="mb-16">
				<h2 class="flex items-center gap-2">
					<BookOpen class="h-6 w-6 text-coffee-700" />
					Coffee Origin & Quality
				</h2>

				<div class="not-prose mb-8 rounded-lg border border-stone-200 bg-white p-6">
					<h3 class="mb-3 font-serif text-xl font-bold text-stone-900">
						How does coffee bean altitude affect brewing?
					</h3>
					<p class="mb-4 text-stone-700">
						Altitude dramatically impacts bean density through maturation speed. Higher elevations
						create slower, more controlled development of the coffee cherry.
					</p>

					<div class="space-y-4">
						<div>
							<h4 class="mb-2 font-semibold text-coffee-800">High-Altitude (&gt;1,500m)</h4>
							<p class="mb-2 text-stone-700">
								Slow maturation creates dense, tightly packed cell walls that resist water
								penetration. These require higher ratios (1:16 to 1:18) and finer grinds to break
								down physical resistance.
							</p>
						</div>

						<div>
							<h4 class="mb-2 font-semibold text-coffee-800">Low-Altitude (&lt;1,000m)</h4>
							<p class="mb-2 text-stone-700">
								Rapid maturation yields a loose, highly porous structure. Applying high-altitude
								parameters causes catastrophic over-extraction, so these require lower ratios (1:14
								to 1:15) and coarser grinds.
							</p>
						</div>
					</div>

					<p class="mt-4 text-sm text-stone-500">
						<strong>Sources:</strong> Understanding Coffee Bean Density<sup>[9]</sup>
					</p>
				</div>

				<div class="not-prose mb-8 rounded-lg border border-stone-200 bg-white p-6">
					<h3 class="mb-3 font-serif text-xl font-bold text-stone-900">
						Does coffee quality affect the optimal ratio?
					</h3>
					<p class="mb-4 text-stone-700">
						Absolutely. Quality determines whether you want to maximize or minimize extraction.
					</p>

					<div class="space-y-4">
						<div>
							<h4 class="mb-2 font-semibold text-coffee-800">Specialty Coffee</h4>
							<p class="text-stone-700">
								High-scoring, defect-free coffees are optimized by pushing extraction yields to
								maximum limits (using higher ratios) to highlight complex organic acids and sweet
								browning compounds.
							</p>
						</div>

						<div>
							<h4 class="mb-2 font-semibold text-coffee-800">Commodity Coffee</h4>
							<p class="text-stone-700">
								Lower-quality coffees often contain defects like sour beans or insect damage. To
								mask these defects, the optimal strategy is intentional under-extraction, achieved
								via lower coffee-to-water ratios (e.g., 1:14 instead of 1:17) and coarser grinds.
							</p>
						</div>
					</div>

					<p class="mt-4 text-sm text-stone-500">
						<strong>Sources:</strong> SCA Golden Cup Standards<sup>[2]</sup>, Coffee Defects Guide<sup
							>[12]</sup
						>
					</p>
				</div>

				<div class="not-prose mb-8 rounded-lg border border-stone-200 bg-white p-6">
					<h3 class="mb-3 font-serif text-xl font-bold text-stone-900">
						How does coffee processing method affect brewing?
					</h3>
					<p class="text-stone-700">
						Experimentally processed beans, particularly anaerobic naturals, undergo heavy microbial
						breakdown that dramatically increases their intrinsic solubility. Because they extract
						at a highly accelerated rate, they require slightly lower coffee-to-water ratios and
						significantly lower water temperatures (88°C to 93°C) to prevent the extraction of
						harsh, dry tannins.
					</p>
					<p class="mt-4 text-sm text-stone-500">
						<strong>Sources:</strong> Adjusting Brewing Recipe for Roast Level<sup>[8]</sup>
					</p>
				</div>
			</section>

			<section class="mb-16">
				<h2 class="flex items-center gap-2">
					<BookOpen class="h-6 w-6 text-coffee-700" />
					Brewing Methods & Physics
				</h2>

				<div class="not-prose mb-8 rounded-lg border border-stone-200 bg-white p-6">
					<h3 class="mb-3 font-serif text-xl font-bold text-stone-900">
						Why does espresso use such different ratios than pour over?
					</h3>
					<p class="mb-4 text-stone-700">
						Different brewing methods have fundamentally different fluid dynamics that require
						unique baseline ratios and particle size constraints.
					</p>

					<div class="space-y-4">
						<div>
							<h4 class="mb-2 font-semibold text-coffee-800">Percolation (Pour-Over / Drip)</h4>
							<p class="mb-2 text-stone-700">
								Gravity continuously drives fresh solvent (zero TDS water) through the bed,
								maintaining a high concentration gradient for efficient extraction.
							</p>
							<ul class="ml-6 list-disc space-y-1 text-stone-600">
								<li><strong>Ratios:</strong> 1:15 to 1:18</li>
								<li><strong>Grind:</strong> Medium-fine to medium</li>
							</ul>
						</div>

						<div>
							<h4 class="mb-2 font-semibold text-coffee-800">Immersion (French Press / Cupping)</h4>
							<p class="mb-2 text-stone-700">
								Water and coffee remain in static contact. The solvent slowly saturates with
								solubles, decreasing the concentration gradient and slowing extraction until
								equilibrium is reached.
							</p>
							<ul class="ml-6 list-disc space-y-1 text-stone-600">
								<li>
									<strong>Ratios:</strong> Tighter ratios of 1:12 to 1:15 to achieve adequate beverage
									strength
								</li>
								<li><strong>Grind:</strong> Medium-coarse to coarse</li>
							</ul>
						</div>

						<div>
							<h4 class="mb-2 font-semibold text-coffee-800">Pressurized (Espresso)</h4>
							<p class="mb-2 text-stone-700">
								Forces water through compacted coffee at roughly 9 bar of pressure, generating
								massive extraction in very short contact time.
							</p>
							<ul class="ml-6 list-disc space-y-1 text-stone-600">
								<li><strong>Ratios:</strong> Hyper-efficient ratios between 1:1.5 and 1:3.0</li>
								<li><strong>Grind:</strong> Extra fine</li>
							</ul>
						</div>
					</div>

					<p class="mt-4 text-sm text-stone-500">
						<strong>Sources:</strong> Mathematics of Coffee Extraction<sup>[1]</sup>, Decoding
						Coffee Brewing Ratios<sup>[5]</sup>
					</p>
				</div>

				<div class="not-prose mb-8 rounded-lg border border-stone-200 bg-white p-6">
					<h3 class="mb-3 font-serif text-xl font-bold text-stone-900">
						What is the concentration gradient and why does it matter?
					</h3>
					<p class="text-stone-700">
						The concentration gradient is the difference in soluble concentration between the coffee
						bed and the surrounding water. In percolation methods, fresh water constantly flows
						through, maintaining a high gradient and efficient extraction. In immersion methods, the
						water becomes saturated with solubles, reducing the gradient and slowing extraction.
						This is why immersion methods need more coffee (tighter ratios) to achieve similar
						strength.
					</p>
					<p class="mt-4 text-sm text-stone-500">
						<strong>Sources:</strong> Mathematics of Coffee Extraction<sup>[1]</sup>
					</p>
				</div>
			</section>

			<section class="mb-16">
				<h2 class="flex items-center gap-2">
					<BookOpen class="h-6 w-6 text-coffee-700" />
					Dialing In & Adjustments
				</h2>

				<div class="not-prose mb-8 rounded-lg border border-stone-200 bg-white p-6">
					<h3 class="mb-3 font-serif text-xl font-bold text-stone-900">
						How should I adjust my grind as coffee beans age?
					</h3>
					<p class="mb-4 text-stone-700">
						Freshly roasted coffee off-gasses substantial amounts of trapped CO₂, creating severe
						physical resistance against the brewing water. This is why fresh coffee often "blooms"
						dramatically when you add water.
					</p>
					<p class="mb-4 text-stone-700">
						As beans age and lose this CO₂, hydraulic resistance drops. Water flows through the
						coffee bed more easily, potentially leading to faster extraction and channeling.
						Consequently, the grind setting must be adjusted progressively finer over time to
						artificially recreate that resistance and maintain consistent flow rates.
					</p>
					<p class="text-stone-700">
						<strong>Practical timeline:</strong> Most specialty coffee is optimal 4-14 days post-roast
						for filter brewing, and 7-21 days for espresso. After the first week, consider grinding slightly
						finer every few days.
					</p>
					<p class="mt-4 text-sm text-stone-500">
						<strong>Sources:</strong> Why Grinder Settings Need to Change as Beans Age<sup>[10]</sup
						>
					</p>
				</div>

				<div class="not-prose mb-8 rounded-lg border border-stone-200 bg-white p-6">
					<h3 class="mb-3 font-serif text-xl font-bold text-stone-900">
						How do I know if I need to adjust my ratio or grind?
					</h3>
					<p class="mb-4 text-stone-700">
						Sensory feedback and temporal data must dictate subsequent algorithmic adjustments:
					</p>

					<div class="space-y-4">
						<div>
							<h4 class="mb-2 font-semibold text-coffee-800">
								If brew tastes: Sour, Empty, and Weak
							</h4>
							<p class="text-stone-700">
								This indicates under-extraction. Increase the ratio (use less coffee relative to
								water) while grinding finer. This extends contact time and increases surface area.
							</p>
						</div>

						<div>
							<h4 class="mb-2 font-semibold text-coffee-800">
								If brew tastes: Bitter, Astringent, and Heavy
							</h4>
							<p class="text-stone-700">
								This indicates over-extraction. Decrease the ratio (use more coffee relative to
								water) while grinding coarser. This reduces contact time and decreases surface area.
							</p>
						</div>
					</div>

					<p class="mt-4 text-sm text-stone-500">
						<strong>Sources:</strong> The Brewed Coffee Compass<sup>[7]</sup>, Scott Rao on Dose and
						Brewing Ratio<sup>[6]</sup>
					</p>
				</div>

				<div class="not-prose mb-8 rounded-lg border border-stone-200 bg-white p-6">
					<h3 class="mb-3 font-serif text-xl font-bold text-stone-900">
						Why isn't the "Golden Cup" 1:18 ratio always optimal?
					</h3>
					<p class="text-stone-700">
						The historical "Golden Cup" standard of a static 1:18 ratio is fundamentally inadequate
						for optimization. The optimal coffee-to-water ratio is a dynamic mathematical target
						that must be constantly recalibrated against the physical properties of the bean (roast
						level, origin, processing) and the chosen brewing method (percolation, immersion,
						pressure). Modern specialty coffee has revealed that a one-size-fits-all approach
						ignores the complex physics and chemistry of extraction.
					</p>
					<p class="mt-4 text-sm text-stone-500">
						<strong>Sources:</strong> SCA Golden Cup Standards<sup>[2]</sup>, The Golden Ratio for
						Brewing Coffee<sup>[3]</sup>, Common Coffee Control Chart<sup>[11]</sup>
					</p>
				</div>
			</section>

			<section class="mb-12">
				<h2 class="mb-6">References</h2>
				<ol class="space-y-2 text-sm text-stone-600">
					<li>
						[1] <a
							href="https://www.siam.org/publications/siam-news/articles/the-mathematics-of-coffee-extraction-searching-for-the-ideal-brew/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-coffee-700 hover:underline"
							>The Mathematics of Coffee Extraction: Searching for the Ideal Brew</a
						> - SIAM.org
					</li>
					<li>
						[2] <a
							href="https://www.gustoscoffeeco.com/blogs/news/how-to-make-better-coffee-sca-golden-cup-standards"
							target="_blank"
							rel="noopener noreferrer"
							class="text-coffee-700 hover:underline"
							>How To Make Better Coffee – SCA Golden Cup Standards</a
						> - Gusto Coffee Co.
					</li>
					<li>
						[3] <a
							href="https://www.kingscoastcoffee.com/blogs/news/the-golden-ratio-for-brewing-coffee"
							target="_blank"
							rel="noopener noreferrer"
							class="text-coffee-700 hover:underline">The "Golden Ratio" for Brewing Coffee</a
						> - Kings Coast Coffee
					</li>
					<li>
						[4] <a
							href="https://baristalife.co/blogs/blog/coffee-extraction-chart"
							target="_blank"
							rel="noopener noreferrer"
							class="text-coffee-700 hover:underline"
							>Coffee Extraction Chart Chemistry: Science-Based Brewing Guide</a
						> - Barista Life
					</li>
					<li>
						[5] <a
							href="https://cmsale.com/news/decoding-coffee-brewing-ratios-what-you-need-to-know"
							target="_blank"
							rel="noopener noreferrer"
							class="text-coffee-700 hover:underline"
							>Decoding Coffee Brewing Ratios: What You Need to Know</a
						> - CM Sale
					</li>
					<li>
						[6] <a
							href="https://www.scottrao.com/blog/2020/2/4/how-to-choose-a-dose-and-brewing-ratio"
							target="_blank"
							rel="noopener noreferrer"
							class="text-coffee-700 hover:underline">What are the best dose and brewing ratio?</a
						> - Scott Rao
					</li>
					<li>
						[7] <a
							href="https://www.baristahustle.com/wp-content/uploads/2021/09/Coffee-Compass.pdf"
							target="_blank"
							rel="noopener noreferrer"
							class="text-coffee-700 hover:underline">The Brewed Coffee Compass</a
						> - Barista Hustle
					</li>
					<li>
						[8] <a
							href="https://perfectdailygrind.com/2019/10/how-to-adjust-your-brewing-recipe-for-coffee-roast-level/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-coffee-700 hover:underline"
							>Adjusting A Brewing Recipe To Your Coffee Roast Level</a
						> - Perfect Daily Grind
					</li>
					<li>
						[9] <a
							href="https://perfectdailygrind.com/2021/08/understanding-coffee-bean-density/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-coffee-700 hover:underline">Understanding coffee bean density</a
						> - Perfect Daily Grind
					</li>
					<li>
						[10] <a
							href="https://www.papelespresso.com/why-your-grinder-settings-need-to-change-as-coffee-beans-age/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-coffee-700 hover:underline"
							>Why Your Grinder Settings Need to Change as Coffee Beans Age</a
						> - Papel Espresso
					</li>
					<li>
						[11] <a
							href="https://www.baristahustle.com/towards-a-common-coffee-control-chart/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-coffee-700 hover:underline">Towards a Common Coffee Control Chart</a
						> - Barista Hustle
					</li>
					<li>
						[12] <a
							href="https://perfectdailygrind.com/2018/01/coffee-defects-how-to-avoid-them-a-producers-guide/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-coffee-700 hover:underline"
							>Coffee Defects & How to Avoid Them: A Producer's Guide</a
						> - Perfect Daily Grind
					</li>
				</ol>
			</section>

			<div class="not-prose rounded-lg border border-coffee-200 bg-coffee-50 p-6">
				<h3 class="mb-3 font-serif text-lg font-bold text-coffee-900">
					Ready to put this science into practice?
				</h3>
				<p class="mb-4 text-stone-700">
					Use our calculator to get personalized ratio recommendations based on your beans, roast
					level, and brewing method.
				</p>
				<a
					href="/"
					class="inline-flex items-center gap-2 rounded-lg bg-coffee-700 px-6 py-3 font-medium text-white transition-colors hover:bg-coffee-800"
				>
					<Coffee class="h-5 w-5" />
					Go to Calculator
				</a>
			</div>
		</article>
	</main>

	<footer class="border-t border-stone-200 bg-white py-8 text-center text-sm text-stone-400">
		<div class="space-y-2">
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
</div>
