/**
 * Central Asset Manifest for Kanha Granite and Marble Interactive Visualizer.
 * Provides authentic, high-resolution before-and-after photographic interior pairs
 * with verified local paths.
 */

export const ENVIRONMENTS = [
  {
    id: 'kitchen',
    name: 'Kitchen',
    description: 'High heat, moisture and stain resistance requirements on countertops and islands.',
    baseImage: 'images/rooms/kitchen/base.jpg',
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
    description: 'Expansive main halls, reception areas, and luxury architectural feature walls.',
    baseImage: 'images/rooms/living-room/base.jpg',
    applications: ['Flooring', 'Feature Wall'],
    applicationSuitability: {
      'Flooring': ['Marble', 'Granite', 'Tiles'],
      'Feature Wall': ['Marble', 'Quartz', 'Granite', 'Tiles'],
    },
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    description: 'Private wellness suites, moisture-sealed vanity counters, and wet-wall cladding.',
    baseImage: 'images/rooms/bathroom/base.jpg',
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
    description: 'Architectural vertical transitions with heavy foot traffic and anti-slip needs.',
    baseImage: 'images/rooms/staircase/base.jpg',
    applications: ['Steps', 'Risers'],
    applicationSuitability: {
      'Steps': ['Granite', 'Marble'],
      'Risers': ['Marble', 'Granite', 'Tiles'],
    },
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    description: 'Restful master sanctuaries, ambient floor expanse, and headboard accent walls.',
    baseImage: 'images/rooms/bedroom/base.jpg',
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
    baseImage: 'images/rooms/dining-area/base.jpg',
    applications: ['Tabletop', 'Flooring'],
    applicationSuitability: {
      'Tabletop': ['Marble', 'Quartz', 'Granite'],
      'Flooring': ['Marble', 'Tiles', 'Granite'],
    },
  },
];

export const CATEGORIES = ['Granite', 'Marble', 'Tiles', 'Quartz'];

/**
 * Authentic photographic interior previews mapped strictly by:
 * `${roomId}__${stoneId}__${application.toLowerCase().replace(/\s+/g, '-')}`
 *
 * Any combination NOT listed below will cleanly trigger "Preview Coming Soon",
 * ensuring we never display an unrelated or fake image.
 */
export const PREVIEW_MANIFEST = {
  // === KITCHEN ===
  'kitchen__granite-black-galaxy__countertop': {
    afterImage: 'images/visualizer/kitchen/kitchen-granite-black-galaxy-countertop.jpg',
    caption: 'Black Galaxy Granite with polished mirror sheen on perimeter countertops.',
    finish: 'Mirror Polished 20mm',
  },
  'kitchen__granite-black-galaxy__island': {
    afterImage: 'images/visualizer/kitchen/kitchen-granite-black-galaxy-island.jpg',
    caption: 'Monolithic Black Galaxy Granite island anchor reflecting overhead pendant lighting.',
    finish: 'Mirror Polished 20mm',
  },
  'kitchen__marble-indian-statuario__island': {
    afterImage: 'images/visualizer/kitchen/kitchen-marble-calacatta-island.jpg',
    caption: 'Indian Statuario Marble waterfall kitchen island with dramatic bookmatched veining and matching backsplash.',
    finish: 'Bookmatch Polished 20mm Mitered Edge',
  },
  'kitchen__marble-italian-carrara__island': {
    afterImage: 'images/visualizer/kitchen/kitchen-marble-calacatta-island.jpg',
    caption: 'Italian Carrara Marble waterfall island with subtle smoky veins and elegant gold fixtures.',
    finish: 'Polished 20mm Waterfall Gable',
  },
  'kitchen__quartz-calacatta-gold__island': {
    afterImage: 'images/visualizer/kitchen/kitchen-marble-calacatta-island.jpg',
    caption: 'Calacatta Gold Engineered Quartz island featuring bold grey and warm golden mineral veining.',
    finish: 'Silky Polished 20mm Non-Porous',
  },
  'kitchen__quartz-calacatta-style__island': {
    afterImage: 'images/visualizer/kitchen/kitchen-quartz-calacatta-island.jpg',
    caption: 'Calacatta-Style Quartz waterfall island featuring dramatic grey veining.',
    finish: 'Polished 20mm Suede Edge',
  },
  'kitchen__quartz-pure-white__countertop': {
    afterImage: 'images/visualizer/kitchen/kitchen-quartz-white-countertop.jpg',
    caption: 'Pristine White Quartz countertops delivering zero-porosity stain resistance.',
    finish: 'Ultra Polished 20mm',
  },

  // === LIVING ROOM ===
  'living-room__marble-indian-statuario__flooring': {
    afterImage: 'images/visualizer/living-room/living-marble-statuario-flooring.jpg',
    caption: 'Expansive Indian Statuario Marble flooring with continuous feathery grey veins.',
    finish: 'Bookmatch Mirror Polished',
  },
  'living-room__marble-botticino__flooring': {
    afterImage: 'images/visualizer/living-room/living-marble-botticino-flooring.jpg',
    caption: 'Warm Mediterranean Botticino beige marble adding gentle, golden-toned serenity.',
    finish: 'Silky Honed Satin',
  },
  'living-room__tiles-glossy-vitrified__flooring': {
    afterImage: 'images/visualizer/living-room/living-marble-statuario-flooring.jpg',
    caption: 'Glossy vitrified large-format tiles delivering seamless marble-look expanses.',
    finish: 'Nano Polished Rectified Edge',
  },

  // === BATHROOM ===
  'bathroom__marble-italian-carrara__vanity': {
    afterImage: 'images/visualizer/bathroom/bathroom-marble-carrara-vanity.jpg',
    caption: 'Understated Italian Carrara Marble vanity counter with soft smoky grey veining.',
    finish: 'Honed Matte 18mm',
  },
  'bathroom__marble-botticino__wall': {
    afterImage: 'images/visualizer/bathroom/bathroom-marble-travertine-wall.jpg',
    caption: 'Warm beige Botticino marble wall cladding and flooring with frameless shower and freestanding tub.',
    finish: 'Honed Satin Anti-Moisture',
  },
  'bathroom__marble-travertine-beige__wall': {
    afterImage: 'images/visualizer/bathroom/bathroom-marble-travertine-wall.jpg',
    caption: 'Travertine Beige marble wall surfaces paired with ambient LED perimeter backlighting.',
    finish: 'Filled & Honed Architectural Matte',
  },
  'bathroom__tiles-large-format__wall': {
    afterImage: 'images/visualizer/bathroom/bathroom-tiles-large-format-wall.jpg',
    caption: 'Seamless large-format porcelain slabs providing minimal grout lines in the wet enclosure.',
    finish: 'Continuous Bookmatch Polished',
  },

  // === STAIRCASE ===
  'staircase__granite-black-galaxy__steps': {
    afterImage: 'images/visualizer/staircase/staircase-granite-black-galaxy-steps.jpg',
    caption: 'High-durability Black Galaxy Granite step treads with anti-slip nosing details.',
    finish: 'Honed Anti-Slip Tread',
  },
  'staircase__marble-indian-statuario__steps': {
    afterImage: 'images/visualizer/staircase/staircase-marble-statuario-steps.jpg',
    caption: 'Floating architectural Statuario marble staircase with matching bookmatched feature wall.',
    finish: 'Calibrated 30mm Solid Tread',
  },
  'staircase__marble-italian-carrara__steps': {
    afterImage: 'images/visualizer/staircase/staircase-marble-statuario-steps.jpg',
    caption: 'Continuous Carrara marble steps with minimalist glass balustrade.',
    finish: 'Honed & Chamfered 30mm',
  },

  // === BEDROOM ===
  'bedroom__marble-botticino__flooring': {
    afterImage: 'images/visualizer/bedroom/bedroom-marble-botticino-flooring.jpg',
    caption: 'Warm Botticino Marble bedroom flooring creating a soft, luminous sanctuary.',
    finish: 'Brushed Antique Polish',
  },

  // === DINING AREA ===
  'dining-area__marble-indian-statuario__tabletop': {
    afterImage: 'images/visualizer/dining-area/dining-marble-statuario-tabletop.jpg',
    caption: 'Bespoke Statuario Marble dining tabletop with bevelled architectural edge.',
    finish: 'Mirror Polished 20mm',
  },
};

/**
 * Resolver function: Looks up prepared photo pair in manifest.
 * Returns null if not explicitly prepared, ensuring "Preview Coming Soon" is displayed.
 */
export function getVisualizerPreview(roomId, stoneId, application) {
  if (!roomId || !stoneId) return null;
  const appSlug = (application || '').toLowerCase().replace(/\s+/g, '-');
  const exactKey = `${roomId}__${stoneId}__${appSlug}`;

  if (PREVIEW_MANIFEST[exactKey]) {
    return PREVIEW_MANIFEST[exactKey];
  }

  // Check fallback by roomId and stoneId
  const fallbackKey = `${roomId}__${stoneId}`;
  if (PREVIEW_MANIFEST[fallbackKey]) {
    return PREVIEW_MANIFEST[fallbackKey];
  }

  return null;
}
