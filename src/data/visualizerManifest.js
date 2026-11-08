/**
 * Central Asset Manifest for Kanha Granite and Marble Interactive Visualizer.
 * Designed to easily register new room camera angles, stone materials, and application previews.
 */

export const ENVIRONMENTS = [
  {
    id: 'kitchen',
    name: 'Kitchen',
    description: 'Culinary spaces with high heat, stain, and durability requirements.',
    baseImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1800&q=85',
    applications: ['Countertop', 'Island', 'Backsplash', 'Flooring'],
    applicationSuitability: {
      'Countertop': ['Granite', 'Quartz', 'Marble'],
      'Island': ['Granite', 'Quartz', 'Marble'],
      'Backsplash': ['Quartz', 'Marble', 'Tiles'],
      'Flooring': ['Granite', 'Tiles', 'Marble'],
    },
  },
  {
    id: 'living-room',
    name: 'Living Room',
    description: 'Expansive main halls, reception areas, and luxury media walls.',
    baseImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85',
    applications: ['Flooring', 'Feature Wall'],
    applicationSuitability: {
      'Flooring': ['Marble', 'Granite', 'Tiles'],
      'Feature Wall': ['Marble', 'Quartz', 'Granite', 'Tiles'],
    },
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    description: 'Private wellness suites, moisture-sealed vanity counters, and wet walls.',
    baseImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1800&q=85',
    applications: ['Vanity', 'Wall', 'Flooring'],
    applicationSuitability: {
      'Vanity': ['Granite', 'Quartz', 'Marble'],
      'Wall': ['Marble', 'Tiles', 'Quartz'],
      'Flooring': ['Tiles', 'Granite', 'Marble'],
    },
  },
  {
    id: 'staircase',
    name: 'Staircase',
    description: 'Architectural vertical transitions with heavy foot traffic requirements.',
    baseImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=85',
    applications: ['Steps', 'Risers'],
    applicationSuitability: {
      'Steps': ['Granite', 'Marble'],
      'Risers': ['Marble', 'Granite', 'Tiles'],
    },
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    description: 'Restful master sanctuaries, ambient flooring, and headboard accent walls.',
    baseImage: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1800&q=85',
    applications: ['Flooring', 'Feature Wall'],
    applicationSuitability: {
      'Flooring': ['Marble', 'Tiles', 'Granite'],
      'Feature Wall': ['Marble', 'Tiles', 'Quartz'],
    },
  },
  {
    id: 'dining-area',
    name: 'Dining Area',
    description: 'Entertaining spaces anchored around bespoke stone dining tables and flooring.',
    baseImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85',
    applications: ['Tabletop', 'Flooring'],
    applicationSuitability: {
      'Tabletop': ['Marble', 'Quartz', 'Granite'],
      'Flooring': ['Marble', 'Tiles', 'Granite'],
    },
  },
];

export const CATEGORIES = ['Granite', 'Marble', 'Tiles', 'Quartz'];

/**
 * High-quality photographic interior previews mapped by:
 * `${roomId}__${stoneId}__${application.toLowerCase().replace(/\s+/g, '-')}`
 * or fallback by `${roomId}__${stoneId}`
 */
export const PREVIEW_MANIFEST = {
  // === KITCHEN ===
  'kitchen__granite-black-galaxy__countertop': {
    afterImage: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1800&q=85',
    caption: 'Black Galaxy Granite with polished mirror sheen on heavy-traffic perimeter countertops.',
    finish: 'Mirror Polished 20mm',
  },
  'kitchen__granite-black-galaxy__island': {
    afterImage: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1800&q=85',
    caption: 'Monolithic Black Galaxy Granite island anchor reflecting overhead pendant lighting.',
    finish: 'Mirror Polished 20mm',
  },
  'kitchen__granite-absolute-black__countertop': {
    afterImage: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1800&q=85',
    caption: 'Pure jet-black monolithic granite surface with zero visible veining and high heat tolerance.',
    finish: 'Honed Matte 20mm',
  },
  'kitchen__granite-absolute-black__island': {
    afterImage: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1800&q=85',
    caption: 'Seamless Absolute Black granite kitchen island with integrated under-mount sink cutout.',
    finish: 'Leathered Antique 20mm',
  },
  'kitchen__granite-kashmir-white__countertop': {
    afterImage: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1800&q=85',
    caption: 'Kashmir White natural granite brightening the workspace with delicate burgundy micro-garnets.',
    finish: 'Mirror Polished 18mm',
  },
  'kitchen__quartz-calacatta-style__island': {
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    caption: 'Calacatta-Style Quartz waterfall island featuring broad grey veining down mitered edges.',
    finish: 'Mirror Polished 20mm',
  },
  'kitchen__quartz-calacatta-style__countertop': {
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    caption: 'Calacatta-Style Quartz perimeter counter providing non-porous stain resistance against oils & sauces.',
    finish: 'Mirror Polished 20mm',
  },
  'kitchen__quartz-calacatta-style__backsplash': {
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    caption: 'Full-height continuous Calacatta Quartz slab backsplash eliminating grout cleaning behind hobs.',
    finish: 'Polished 15mm Slab',
  },
  'kitchen__quartz-pure-white__countertop': {
    afterImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1800&q=85',
    caption: 'Ultra-clean pure white engineered quartz surface for contemporary Scandinavian minimalism.',
    finish: 'Suede Finish 20mm',
  },
  'kitchen__quartz-pure-white__island': {
    afterImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1800&q=85',
    caption: 'Luminous White Quartz waterfall island emphasizing clean lines and pristine light reflectance.',
    finish: 'Ultra Polished 20mm',
  },
  'kitchen__marble-indian-statuario__island': {
    afterImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85',
    caption: 'Authentic Indian Statuario Marble island slab displaying expressive natural grey river veins.',
    finish: 'Satin Honed 18mm',
  },
  'kitchen__marble-indian-statuario__countertop': {
    afterImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85',
    caption: 'Sealed natural Statuario marble countertops adding aristocratic warmth to bespoke cabinetry.',
    finish: 'Mirror Polished 18mm',
  },
  'kitchen__tiles-large-format__flooring': {
    afterImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=85',
    caption: 'Large-format porcelain slabs on kitchen floor minimizing grout joints for seamless cleaning.',
    finish: 'Silk Matte Vitrified',
  },

  // === LIVING ROOM ===
  'living-room__marble-indian-statuario__flooring': {
    afterImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85',
    caption: 'Expansive Indian Statuario Marble flooring with continuous natural veining and cool tactile luxury.',
    finish: 'Mirror Polished 18mm',
  },
  'living-room__marble-indian-statuario__feature-wall': {
    afterImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
    caption: 'Dramatic bookmatched Statuario marble slab feature wall creating a permanent architectural focal point.',
    finish: 'Bookmatch Polished 18mm',
  },
  'living-room__marble-botticino__flooring': {
    afterImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85',
    caption: 'Warm Botticino beige marble flooring casting a golden, welcoming glow across the main hall.',
    finish: 'Brushed Velvet 18mm',
  },
  'living-room__granite-alaska-white__feature-wall': {
    afterImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=85',
    caption: 'High-contrast Alaska White Granite accent wall with crystalline patches and dark mineral bursts.',
    finish: 'Leathered Touch 20mm',
  },
  'living-room__tiles-large-format__flooring': {
    afterImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85',
    caption: 'Continuous 1200x2400mm vitrified porcelain slabs delivering marble grandeur with zero maintenance.',
    finish: 'Nano Polished GVT',
  },

  // === BATHROOM ===
  'bathroom__marble-italian-carrara__vanity': {
    afterImage: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1800&q=85',
    caption: 'Italian Carrara Marble floating vanity top with delicate feathered grey mist and undermount basin.',
    finish: 'Honed Satin 18mm',
  },
  'bathroom__marble-italian-carrara__wall': {
    afterImage: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1800&q=85',
    caption: 'Full-height Carrara marble wall cladding creating a serene private spa atmosphere.',
    finish: 'Honed 18mm Slabs',
  },
  'bathroom__granite-absolute-black__vanity': {
    afterImage: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1800&q=85',
    caption: 'Monochromatic Absolute Black Granite floating vanity offering total moisture resistance.',
    finish: 'Honed Matte 20mm',
  },
  'bathroom__quartz-calacatta-style__vanity': {
    afterImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85',
    caption: 'Calacatta Quartz vanity top combining opulent marble veining with soap-and-lotion stain immunity.',
    finish: 'Polished 18mm',
  },
  'bathroom__tiles-matte-finish__flooring': {
    afterImage: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1800&q=85',
    caption: 'Anti-slip tactile matte floor tiles engineered for wet bathroom safety and warm barefoot comfort.',
    finish: 'R10 Anti-Slip Matte',
  },

  // === STAIRCASE ===
  'staircase__granite-black-galaxy__steps': {
    afterImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=85',
    caption: 'Heavy-duty Black Galaxy Granite steps with bullnosed edges and diamond-grooved anti-skid treads.',
    finish: 'Full Bullnose + Grooved 20mm',
  },
  'staircase__granite-black-galaxy__risers': {
    afterImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=85',
    caption: 'Polished Black Galaxy risers shimmering with golden crystalline sparkles under step riser LED lights.',
    finish: 'Mirror Polished 18mm',
  },
  'staircase__marble-indian-statuario__steps': {
    afterImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
    caption: 'Sculptural white marble staircase treads turning functional circulation into a centerpiece of grandeur.',
    finish: 'Polished Bullnose 20mm',
  },
  'staircase__granite-tan-brown__steps': {
    afterImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=85',
    caption: 'Resilient Tan Brown Granite treads built for decades of high-abrasion family foot traffic.',
    finish: 'Chiseled Bullnose 20mm',
  },

  // === BEDROOM ===
  'bedroom__marble-botticino__flooring': {
    afterImage: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1800&q=85',
    caption: 'Creamy Botticino marble bedroom flooring creating an oasis of quiet Mediterranean warmth.',
    finish: 'Honed Matte 18mm',
  },
  'bedroom__granite-kashmir-white__flooring': {
    afterImage: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1800&q=85',
    caption: 'Airy Kashmir White flooring reflecting morning sunlight and complementing natural wood furnishings.',
    finish: 'Mirror Polished 18mm',
  },
  'bedroom__marble-indian-statuario__feature-wall': {
    afterImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85',
    caption: 'Opulent Statuario marble bedhead wall bringing boutique 5-star hotel luxury into the master suite.',
    finish: 'Silk Satin 18mm',
  },

  // === DINING AREA ===
  'dining-area__marble-indian-statuario__tabletop': {
    afterImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85',
    caption: 'Bespoke Statuario natural marble dining tabletop with beveled edges and continuous organic veining.',
    finish: 'Beveled Mirror Polished 20mm',
  },
  'dining-area__quartz-calacatta-style__tabletop': {
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    caption: 'Calacatta Quartz dining surface impervious to spilled wine, turmeric, citrus, or hot dinnerware.',
    finish: 'Chamfered Edge 20mm',
  },
  'dining-area__marble-botticino__flooring': {
    afterImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85',
    caption: 'Warm Botticino stone floor under the dining suite ensuring effortless sweep and timeless elegance.',
    finish: 'Polished 18mm',
  },
};

/**
 * Helper to lookup a preview from the manifest
 */
export const getVisualizerPreview = (roomId, stoneId, application) => {
  if (!roomId || !stoneId) return null;
  const appSlug = (application || '').toLowerCase().replace(/\s+/g, '-');
  const exactKey = `${roomId}__${stoneId}__${appSlug}`;
  if (PREVIEW_MANIFEST[exactKey]) {
    return {
      ...PREVIEW_MANIFEST[exactKey],
      isExactMatch: true,
    };
  }

  // Check if any preview for this room and stone exists
  const fallbackPrefix = `${roomId}__${stoneId}`;
  const matchingKey = Object.keys(PREVIEW_MANIFEST).find((k) => k.startsWith(fallbackPrefix));
  if (matchingKey) {
    return {
      ...PREVIEW_MANIFEST[matchingKey],
      isExactMatch: false,
    };
  }

  return null;
};
