import React from 'react';
import { Mountain, Eye, Sparkles, Home } from 'lucide-react';

export const BrandStory = () => {
  const stages = [
    {
      step: '01',
      title: 'Natural Beauty',
      icon: Mountain,
      description: 'Formed over millions of years through deep geological pressure and elemental crystallization, natural stone carries an unrepeatable record of the Earth’s natural artistry in every slab.',
      image: 'https://images.unsplash.com/photo-1590402494587-44b71d7772f6?auto=format&fit=crop&w=800&q=80',
      tag: 'Geological Artistry'
    },
    {
      step: '02',
      title: 'Material Selection',
      icon: Eye,
      description: 'Every block and slab presents unique mineral veins, crystalline depths, and tonal shades. We curate genuine varieties of granite, marble, tiles, and quartz suited to diverse architectural visions.',
      image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
      tag: 'Curated Textures'
    },
    {
      step: '03',
      title: 'Craftsmanship',
      icon: Sparkles,
      description: 'From mirror polishing that highlights crystalline depth to honed, leathered, and flamed finishes, proper surface treatment transforms raw slabs into durable architectural elements.',
      image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80',
      tag: 'Refined Finishes'
    },
    {
      step: '04',
      title: 'Beautiful Spaces',
      icon: Home,
      description: 'Whether it is a monolithic kitchen island, a grand marble living expanse, or a tranquil spa bathroom, stone grounds living spaces with organic luxury and timeless endurance.',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
      tag: 'Timeless Sanctuaries'
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-ivory border-b border-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <p className="text-[11px] uppercase tracking-[0.25em] text-taupe font-semibold mb-3">
            Kanha Granite & Marble · Editorial Narrative
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal tracking-tight mb-6">
            Every Stone Has a Story.
          </h2>
          <p className="text-base sm:text-lg text-charcoal/75 leading-relaxed font-normal">
            Natural stone is more than a building material—it is a timeless tactile canvas shaped by nature. At Kanha Granite & Marble, we celebrate the organic variation, textural nuance, and enduring strength that authentic stone brings to residential and commercial architecture.
          </p>
        </div>

        {/* 4 Visual Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className="group bg-warmwhite/70 hover:bg-warmwhite border border-sand hover:border-taupe/50 transition-all duration-300 flex flex-col overflow-hidden rounded-sm shadow-sm"
              >
                {/* Stage Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-sand/30">
                  <img
                    src={stage.image}
                    alt={stage.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.96]"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-sm text-sand text-[10px] tracking-widest uppercase px-2 py-1 rounded-xs">
                    Stage {stage.step}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-warmwhite/90 backdrop-blur-sm text-charcoal text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-xs">
                    {stage.tag}
                  </div>
                </div>

                {/* Stage Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-sand/40 flex items-center justify-center text-taupe-dark">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-heading text-xl text-charcoal font-semibold">
                        {stage.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Natural Variation Note */}
        <div className="mt-14 p-6 bg-sand/30 border border-sand/80 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <h4 className="text-xs uppercase tracking-widest text-charcoal font-semibold mb-1">
              Natural Material Note
            </h4>
            <p className="text-xs text-charcoal/75 leading-relaxed">
              Because natural granite and marble are geological products, natural variations in color, veining patterns, crystalline flecks, and surface shading are intrinsic characteristics that verify each slab’s authenticity. We invite clients to view full slabs in person at our Shiroli, Kolhapur showroom.
            </p>
          </div>
          <span className="shrink-0 text-[11px] text-taupe-dark uppercase tracking-wider font-semibold border-b border-taupe/40 pb-0.5">
            Shiroli Marble Market
          </span>
        </div>
      </div>
    </section>
  );
};
