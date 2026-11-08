import React from 'react';
import { ArrowUpRight, Compass, Shield, Sparkles, Layers } from 'lucide-react';
import { getAssetUrl } from '../utils/imageHelper';

const MATERIALS = [
  {
    id: 'granite',
    category: 'Granite',
    count: '18 Slabs',
    tagline: 'Igneous Strength & Natural Crystalline Character',
    description: 'Forged under extreme tectonic heat and pressure. Granite is dense, heat-resistant up to 480°C, and virtually impervious to scratches—the premier choice for culinary countertops and heavy-wear zones.',
    heroImage: 'images/products/granite/black-galaxy.jpg',
    textureImage: 'images/textures/granite/black-galaxy-texture.jpg',
    origin: 'South India & Rajasthan Quarries',
    hardness: 'Mohs 6 – 7',
    porosity: '< 0.4% (Ultra Dense)',
    idealFor: ['Kitchen Countertops', 'Outdoor Paving', 'Heavy-Traffic Flooring', 'Staircases'],
    popularStones: ['Black Galaxy', 'Tan Brown', 'Kashmir White', 'Alaska White']
  },
  {
    id: 'marble',
    category: 'Marble',
    count: '18 Slabs',
    tagline: 'Timeless Metamorphic Elegance & Fluid Veining',
    description: 'Celebrated across millennia for its translucent crystalline matrix and expressive mineral veining. Ideal for grand living spaces, bookmatched feature walls, and serene master baths.',
    heroImage: 'images/products/marble/italian-carrara.jpg',
    textureImage: 'images/textures/marble/italian-carrara-texture.jpg',
    origin: 'Makrana, Italy (Carrara) & Kishangarh',
    hardness: 'Mohs 3 – 4',
    porosity: '0.5 – 1.5% (Sealing Recommended)',
    idealFor: ['Living Room Flooring', 'Bookmatched Walls', 'Bathroom Vanities', 'Dining Tops'],
    popularStones: ['Italian Carrara', 'Indian Statuario', 'Makrana White', 'Botticino']
  },
  {
    id: 'tiles',
    category: 'Tiles',
    count: '18 Slabs',
    tagline: 'Vitrified Architectural Precision & Minimal Grout Lines',
    description: 'High-tech vitrified porcelain slabs fired at 1200°C. Offering near-zero water absorption, precise edge rectification, and seamless large-format aesthetics for contemporary architecture.',
    heroImage: 'images/products/tiles/glossy-vitrified-marble-look.jpg',
    textureImage: 'images/textures/tiles/glossy-vitrified-marble-look-texture.jpg',
    origin: 'Morbi Precision Ceramic Hubs',
    hardness: 'Mohs 7 – 8',
    porosity: '< 0.05% (Non-Porous)',
    idealFor: ['Commercial & Residential Floors', 'Shower Enclosures', 'Accent Facades'],
    popularStones: ['Glossy Vitrified Slab', 'Matte Architectural', 'Full Body Vitrified']
  },
  {
    id: 'quartz',
    category: 'Quartz',
    count: '16 Slabs',
    tagline: 'Engineered Purity with Zero Maintenance',
    description: 'Composed of 93% pure crushed quartz crystal bound with advanced polymer resins. Non-porous, stain-resistant, antimicrobial, and delivers flawless veining consistency.',
    heroImage: 'images/products/quartz/calacatta-gold.jpg',
    textureImage: 'images/textures/quartz/calacatta-gold-texture.jpg',
    origin: 'Engineered Precision Manufacturing',
    hardness: 'Mohs 7',
    porosity: '0.00% (Zero Sealing Required)',
    idealFor: ['Modern Kitchen Worktops', 'Waterfall Islands', 'Bathroom Counters', 'Backsplashes'],
    popularStones: ['Calacatta Gold', 'Pure White', 'Statuario Quartz', 'Concrete Grey']
  }
];

export const ExploreMaterials = ({ onSelectCategory, onOpenVisualizer }) => {
  return (
    <section id="materials" className="py-24 lg:py-32 bg-warmwhite border-b border-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-taupe font-semibold mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Architectural Material Breakdown</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal tracking-tight">
              Explore Our Four Core Materials.
            </h2>
            <p className="text-sm sm:text-base text-charcoal/75 mt-3 leading-relaxed">
              Every stone material offers distinct thermal properties, density, hardness, and visual textures. Choose the ideal material engineered for your specific architectural application.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <button
              onClick={() => onSelectCategory('All')}
              className="px-5 py-2.5 bg-charcoal hover:bg-charcoal-deep text-ivory text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-xs flex items-center space-x-2"
            >
              <span>View Complete 70 Slabs</span>
              <ArrowUpRight className="w-4 h-4 text-sand" />
            </button>
          </div>
        </div>

        {/* 4 Asymmetric Architectural Material Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {MATERIALS.map((mat) => (
            <div
              key={mat.id}
              className="group bg-ivory border border-sand hover:border-taupe/60 rounded-sm overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-subtle hover:shadow-luxury"
            >
              <div>
                {/* Photo Header with Real Slab and Swatch preview */}
                <div className="relative aspect-[16/10] overflow-hidden bg-sand/20">
                  <img
                    src={getAssetUrl(mat.heroImage)}
                    alt={`${mat.category} material sample`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.98]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className="bg-charcoal/90 backdrop-blur-sm text-sand text-[10px] tracking-widest uppercase px-3 py-1 rounded-xs font-semibold">
                      {mat.category}
                    </span>
                    <span className="bg-warmwhite/90 backdrop-blur-sm text-charcoal text-[10px] tracking-wider uppercase px-2 py-1 rounded-xs font-semibold">
                      {mat.count}
                    </span>
                  </div>

                  {/* Texture Swatch Inset */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 rounded-xs border-2 border-warmwhite shadow-md overflow-hidden bg-sand">
                    <img
                      src={getAssetUrl(mat.textureImage)}
                      alt={`${mat.category} close up texture`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Bottom Title on Image */}
                  <div className="absolute bottom-4 left-4 right-20 text-ivory">
                    <h3 className="font-heading text-2xl sm:text-3xl font-semibold">
                      {mat.category}
                    </h3>
                    <p className="text-[11px] text-sand/90 tracking-wide line-clamp-1">
                      {mat.tagline}
                    </p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-7">
                  <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed mb-6">
                    {mat.description}
                  </p>

                  {/* Engineering Benchmarks Grid */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 bg-warmwhite border border-sand/80 rounded-xs mb-6 text-xs">
                    <div>
                      <span className="text-[10px] text-softgrey uppercase tracking-wider block">Hardness:</span>
                      <span className="font-semibold text-charcoal">{mat.hardness}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-softgrey uppercase tracking-wider block">Porosity:</span>
                      <span className="font-semibold text-charcoal">{mat.porosity}</span>
                    </div>
                  </div>

                  {/* Ideal Applications */}
                  <div className="mb-6">
                    <span className="text-[10px] uppercase tracking-wider text-softgrey font-semibold block mb-2">
                      Primary Architectural Applications:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {mat.idealFor.map((app, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-sand/35 text-charcoal/90 px-2.5 py-1 rounded-xs font-medium"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-2 border-t border-sand/50 flex items-center justify-between gap-3">
                <button
                  onClick={() => onSelectCategory(mat.category)}
                  className="px-4 py-2.5 bg-charcoal hover:bg-charcoal-deep text-ivory text-xs uppercase tracking-wider font-medium rounded-xs transition-colors flex items-center space-x-1.5"
                >
                  <span>Explore {mat.category} ({mat.count})</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-sand" />
                </button>

                <button
                  onClick={onOpenVisualizer}
                  className="px-3.5 py-2.5 bg-warmwhite hover:bg-sand/40 border border-sand text-charcoal text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center space-x-1"
                >
                  <Compass className="w-3.5 h-3.5 text-taupe" />
                  <span className="hidden sm:inline">Visualize</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExploreMaterials;
