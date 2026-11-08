import React, { useState } from 'react';
import { Eye, Sparkles, Layers, Sliders, ShieldCheck } from 'lucide-react';
import { getAssetUrl } from '../utils/imageHelper';

const ANATOMY_FEATURES = [
  {
    id: 'veining',
    title: 'Fluid Metamorphic Veining',
    category: 'Vein Formation',
    summary: 'Mineral ribbons formed over geologic epochs as recrystallized limestone undergoes intense heat and hydrothermal infiltration.',
    description: 'Unlike printed ceramics or artificial surfaces with repetitive stamped graphics, genuine marble veining flows with authentic fractal variation. Each vein tells where mineral-rich water once coursed through the stone millions of years ago, creating unrepeatable dramatic movement across your floor or focal wall.',
    texture: 'images/textures/marble/italian-carrara-texture.jpg',
    macroDetail: 'Calcite crystalline matrix with dolomite & graphite veins',
    highlight: 'Natural Non-Repetitive Flow'
  },
  {
    id: 'minerals',
    title: 'Crystalline Mineral Flecks',
    category: 'Igneous Minerals',
    summary: 'Deep-set quartz crystals, feldspar platelets, and reflective bronze mica embedded inside molten magma.',
    description: 'In granite varieties like Black Galaxy, the mesmerizing golden or copper sparkles are authentic bronzite / enstatite mineral crystals locked within a dense gabbroic volcanic matrix. When ambient light strikes the surface, these crystals bounce back warm points of illumination, producing a living, breathing three-dimensional depth.',
    texture: 'images/textures/granite/black-galaxy-texture.jpg',
    macroDetail: '92% dense igneous matrix with natural bronzite crystals',
    highlight: 'Natural Light Bouncing Depth'
  },
  {
    id: 'finishes',
    title: 'Master Architectural Finishes',
    category: 'Surface Finishes',
    summary: 'Precision mechanical abrasive treatments that bring out mirror sheen, satin softness, or organic tactile grip.',
    description: 'A stone’s character shifts dramatically with its surface finish. Mirror polishing amplifies crystalline color depth and vein contrast for formal areas; Honing produces a velvety low-sheen satin finish beloved in contemporary minimalist homes; Leathering creates an undulating, tactile matte surface with enhanced slip resistance.',
    texture: 'images/textures/granite/tan-brown-texture.jpg',
    macroDetail: 'Polished, Honed, Leathered & Flamed textures available',
    highlight: 'Tactile Sensory Experience'
  },
  {
    id: 'chromatic',
    title: 'Organic Chromatic Variation',
    category: 'Natural Pigmentation',
    summary: 'Earthy undertones created by elemental trace minerals that shift softly between daylight and warm evening lighting.',
    description: 'Natural stone reacts organically to shifting ambient illumination. In morning sunlight, creamy ivory and beige tones reflect clean warmth; under dim evening incandescent fixtures, golden taupe and charcoal undertones deepen into cozy architectural richness. No synthetic surface can emulate this live interplay with light.',
    texture: 'images/textures/quartz/calacatta-gold-texture.jpg',
    macroDetail: 'Trace minerals: iron oxide (gold), chlorite (green), hematite (red)',
    highlight: 'Dynamic Lighting Interaction'
  }
];

export const MaterialStory = () => {
  const [selectedFeature, setSelectedFeature] = useState(ANATOMY_FEATURES[0]);

  return (
    <section id="material-story" className="py-24 lg:py-32 bg-ivory border-b border-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-taupe font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Science & Poetry of Stone</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal tracking-tight">
            The Anatomy of Stone.
          </h2>
          <p className="text-sm sm:text-base text-charcoal/75 mt-3 leading-relaxed">
            Every natural slab is a deep geological archive. Discover the authentic physical characteristics that distinguish genuine quarry stone from synthetic imitations.
          </p>
        </div>

        {/* Interactive Anatomy Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Feature Selection Buttons (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {ANATOMY_FEATURES.map((feat) => {
              const isSelected = selectedFeature.id === feat.id;
              return (
                <button
                  key={feat.id}
                  onClick={() => setSelectedFeature(feat)}
                  className={`text-left p-5 sm:p-6 rounded-sm border transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-warmwhite border-taupe shadow-luxury'
                      : 'bg-warmwhite/50 hover:bg-warmwhite border-sand text-charcoal/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-taupe font-semibold">
                      {feat.category}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-xs font-medium ${
                      isSelected ? 'bg-charcoal text-ivory' : 'bg-sand/30 text-charcoal/70'
                    }`}>
                      {feat.highlight}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl text-charcoal font-semibold mb-1">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-charcoal/70 line-clamp-2">
                    {feat.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Close-up Texture & Deep Geological Narrative (7 cols) */}
          <div className="lg:col-span-7 bg-warmwhite border border-sand rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-subtle">
            <div>
              {/* Macro Texture Image */}
              <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden mb-6 bg-sand border border-sand">
                <img
                  src={getAssetUrl(selectedFeature.texture)}
                  alt={selectedFeature.title}
                  className="w-full h-full object-cover filter brightness-[0.98]"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-charcoal/90 backdrop-blur-sm text-sand text-[10px] uppercase tracking-widest px-3 py-1 rounded-xs font-semibold">
                  Macro Surface Inspection
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-warmwhite/90 backdrop-blur-md p-3 border border-sand rounded-xs text-xs text-charcoal flex items-center justify-between">
                  <span className="font-medium">{selectedFeature.macroDetail}</span>
                  <span className="text-[10px] uppercase tracking-wider text-taupe font-semibold hidden sm:inline">
                    Natural Mineral Matrix
                  </span>
                </div>
              </div>

              {/* Title & Detailed Narrative */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-taupe font-semibold">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Geological Character Analysis</span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl text-charcoal font-semibold">
                  {selectedFeature.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                  {selectedFeature.description}
                </p>
              </div>
            </div>

            {/* Verification Guarantee */}
            <div className="pt-6 mt-6 border-t border-sand/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center space-x-2 text-charcoal/80">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All 70 slabs verified with genuine close-up photography.</span>
              </div>
              <a
                href="#collections"
                className="text-taupe-dark hover:underline font-semibold text-xs tracking-wider uppercase inline-flex items-center space-x-1"
              >
                <span>Browse Matching Slabs</span>
                <span>→</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default MaterialStory;
