import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, Compass, Eye, Sparkles } from 'lucide-react';
import { getAssetUrl } from '../utils/imageHelper';

export const FeaturedCollection = ({ products = [], onSelectProduct, onVisualizeStone }) => {
  const scrollRef = useRef(null);

  // Filter 8 iconic featured stones
  const featuredStones = products.filter((p) => p.featured).slice(0, 8);
  const displayItems = featuredStones.length >= 6 ? featuredStones : products.slice(0, 8);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="featured" className="py-24 lg:py-32 bg-ivory border-b border-sand/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-taupe font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curator's Master Selection</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal tracking-tight">
              Featured Architectural Slabs.
            </h2>
            <p className="text-sm sm:text-base text-charcoal/75 mt-2">
              Hand-selected lots exhibiting superior crystalline clarity, expressive veining, and flawless surface finish.
            </p>
          </div>

          {/* Scroll Navigation Buttons */}
          <div className="flex items-center space-x-2.5 mt-6 sm:mt-0">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-warmwhite hover:bg-sand/40 border border-sand text-charcoal transition-colors shadow-xs"
              aria-label="Scroll previous stones"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-warmwhite hover:bg-sand/40 border border-sand text-charcoal transition-colors shadow-xs"
              aria-label="Scroll next stones"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Showcase */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayItems.map((stone) => (
            <div
              key={stone.id}
              className="shrink-0 w-[300px] sm:w-[340px] snap-start bg-warmwhite border border-sand hover:border-taupe/60 rounded-sm overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-subtle hover:shadow-luxury"
            >
              <div>
                {/* Real Slab Photo with Zoom */}
                <div
                  onClick={() => onSelectProduct(stone)}
                  className="relative aspect-[4/3] overflow-hidden bg-sand/30 cursor-pointer"
                >
                  <img
                    src={getAssetUrl(stone.image)}
                    alt={`${stone.name} slab`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.98]"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                    <span className="bg-charcoal/90 text-sand text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-xs font-semibold">
                      {stone.category}
                    </span>
                    <span className="bg-warmwhite/90 text-charcoal text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs font-medium">
                      Featured
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-3 py-1.5 bg-warmwhite/95 text-charcoal text-[11px] uppercase tracking-wider font-semibold rounded-xs shadow-sm flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-taupe" />
                      <span>Inspect Slab</span>
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3
                    onClick={() => onSelectProduct(stone)}
                    className="font-heading text-xl sm:text-2xl text-charcoal font-semibold hover:text-taupe-dark transition-colors cursor-pointer"
                  >
                    {stone.name}
                  </h3>
                  <p className="text-[11px] text-softgrey mt-0.5 mb-3">
                    {stone.colorTone} · {stone.origin || 'Selected Quarry'}
                  </p>
                  <p className="text-xs text-charcoal/75 leading-relaxed line-clamp-2 mb-4">
                    {stone.shortDescription || stone.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-3 border-t border-sand/50">
                    {stone.finishes?.slice(0, 2).map((f, i) => (
                      <span key={i} className="text-[10px] bg-sand/30 text-charcoal/80 px-2 py-0.5 rounded-xs">
                        {f}
                      </span>
                    ))}
                    {stone.applications?.[0] && (
                      <span className="text-[10px] bg-taupe/15 text-charcoal/90 px-2 py-0.5 rounded-xs">
                        {stone.applications[0]}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-5 pb-5 pt-1 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onVisualizeStone && onVisualizeStone(stone, stone.applications?.[0])}
                  className="py-2 px-2 bg-ivory hover:bg-sand/40 border border-sand text-charcoal text-[11px] uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center justify-center space-x-1"
                >
                  <Compass className="w-3.5 h-3.5 text-taupe" />
                  <span>Visualize</span>
                </button>

                <button
                  onClick={() => onSelectProduct(stone)}
                  className="py-2 px-2 bg-charcoal hover:bg-charcoal-deep text-ivory text-[11px] uppercase tracking-wider font-medium rounded-xs transition-colors text-center"
                >
                  Specifications
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCollection;
