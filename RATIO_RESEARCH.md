To translate the physics and chemistry of coffee extraction into programmable logic, the baseline assumption must be that the historical "Golden Cup" standard of a static 1:18 ratio is fundamentally inadequate for optimization. The optimal coffee-to-water ratio is a dynamic mathematical target that must be constantly recalibrated against the physical properties of the bean and the chosen brewing method.

Here is a breakdown of how ratios and grind sizes must be adjusted across those primary variables.

### 1. Adjustments by Roast Level (Pyrolysis & Porosity)

Roasting physically degrades the cellular matrix of the bean, profoundly altering its density and solubility.

- **Light Roasts:**
  - These beans have undergone less thermal degradation, resulting in a high physical density and low porosity.
  - Because their cellulosic walls are largely intact, they possess very low solubility and require an aggressive extraction strategy.
  - **Target Ratios:** Higher solvent ratios of 1:16 to 1:18 for filter brewing, and extended ratios of 1:2.5 to 1:3.0 for espresso.
  - **Grind Requirement:** Requires a finer grind size to maximize surface area exposure.

- **Medium Roasts:**
  - These possess moderate density and balanced solubility.
  - **Target Ratios:** Baseline ratios of 1:15 to 1:16 for filter brewing, and 1:2.0 to 1:2.5 for espresso.
  - **Grind Requirement:** Moderate or baseline grind.

- **Dark Roasts:**
  - Heavy carbonization reduces the bean's density and shatters its cellular matrix, making it extremely porous and highly soluble.
  - They are exceptionally susceptible to over-extraction, which pulls out acrid, ashy, and bitter flavors.
  - **Target Ratios:** Tighter ratios of 1:14 to 1:15 for filter brewing, and heavily concentrated ratios of 1:1.5 to 1:2.0 for espresso.
  - **Grind Requirement:** Requires a coarser grind to restrict the extraction of bitter phenols.

### 2. Adjustments by Coffee Type (Altitude, Quality, & Processing)

The agricultural origin and processing of the raw material dictate its absolute extraction limits.

- **Altitude & Density:**
  - **High-Altitude (>1,500m):** Slow maturation creates dense, tightly packed cell walls that resist water penetration. These require higher ratios (1:16 to 1:18) and finer grinds to break down physical resistance.
  - **Low-Altitude (<1,000m):** Rapid maturation yields a loose, highly porous structure. Applying high-altitude parameters causes catastrophic over-extraction, so these require lower ratios (1:14 to 1:15) and coarser grinds.

- **Specialty vs. Commodity Quality:**
  - **Specialty:** High-scoring, defect-free coffees are optimized by pushing Extraction Yields to their maximum limits (using higher ratios) to highlight complex organic acids and sweet browning compounds.
  - **Commodity:** Lower-quality coffees often contain defects like sour beans or insect damage. To mask these defects, the optimal strategy is intentional under-extraction, achieved via lower coffee-to-water ratios (e.g., 1:14 instead of 1:17) and coarser grinds.

- **Post-Harvest Processing:**
  - Experimentally processed beans, particularly anaerobic naturals, undergo heavy microbial breakdown that dramatically increases their intrinsic solubility.
  - Because they extract at a highly accelerated rate, they require slightly lower coffee-to-water ratios and significantly lower water temperatures (88°C to 93°C) to prevent the extraction of harsh, dry tannins.

### 3. Adjustments by Brewing Methodology

Distinct fluid dynamics across different brewing apparatuses require unique baseline ratios and particle size constraints.

- **Percolation (Pour-Over / Automatic Drip):**
  - Gravity continuously drives fresh solvent (zero TDS water) through the bed, maintaining a high concentration gradient for efficient extraction.
  - **Target Ratios:** 1:15 to 1:18.
  - **Grind Requirement:** Medium-fine to medium.

- **Immersion (French Press / Cupping):**
  - Because water and coffee remain in static contact, the solvent slowly saturates with solubles, decreasing the concentration gradient and slowing the extraction rate until equilibrium is reached.
  - **Target Ratios:** To achieve adequate beverage strength, immersion requires a higher dose of coffee, utilizing tighter ratios of 1:12 to 1:15.
  - **Grind Requirement:** Medium-coarse to coarse.

- **Pressurized Extraction (Espresso):**
  - Forces water through a compacted bed at roughly 9 bar of pressure, generating a massive extraction in a very short contact time.
  - **Target Ratios:** Hyper-efficient ratios between 1:1.5 and 1:3.0.
  - **Grind Requirement:** Extra fine.

### 4. Dynamic Feedback & Dialing In

Once baseline parameters are set, sensory feedback and temporal data must dictate subsequent algorithmic adjustments.

- **Sensory Recalibration:** If a brew evaluates as "Sour, Empty, and Weak," the ratio should be increased (using less coffee relative to water) while grinding finer. If a brew is "Bitter, Astringent, and Heavy," the ratio should be decreased (using more coffee) while grinding coarser.
- **Degassing & Age:** Freshly roasted coffee off-gasses substantial amounts of trapped CO2, creating severe physical resistance against the brewing water. As beans age and lose this CO2, hydraulic resistance drops; consequently, the grind setting must be adjusted progressively finer over time to artificially recreate that resistance and maintain consistent flow rates.
