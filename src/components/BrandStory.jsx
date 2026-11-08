import React from 'react';
import { Mountain, Compass, Shield, Gem, ArrowRight } from 'lucide-react';
import { getAssetUrl } from '../utils/imageHelper';

export const BrandStory = ({ onExploreMaterials }) => {
  const pillars = [
    {
      number: '01',
      title: 'Geological Authenticity',
      subtitle: 'Formed over millions of years',
      icon: Mountain,
      description: 'Every slab tells a deep geological story—crystallized minerals, volcanic fissures, and sediment layers that make each piece an irreplaceable natural work of art.',
    },
    {
      number: '02',
      title: 'Architectural Curation',
      subtitle: 'Hand-selected blocks & lots',
      icon: Compass,
      description: 'We curate 70 distinct stone varieties across granite, marble, porcelain tiles, and engineered quartz, ensuring consistent batch quality and structural density.',
    },
    {
      number: '03',
      title: 'Master Surface Finishes',
      subtitle: 'From mirror polished to honed',
      icon: Gem,
      description: 'Surface textures tailored to application demands: high-gloss mirror finishes for grand living spaces, honed matte for tactile serenity, and leathered textures for grip and depth.',
    },
    {
      number: '04',
      title: 'Enduring Architecture',
      subtitle: 'Built for generations',
      icon: Shield,
      description: 'Natural stone resists thermal shock, high traffic, and everyday wear, gaining character over decades and grounding your sanctuary with permanent natural elegance.',
    }
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-ivory border-b border-sand/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Eyebrow & Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-24">
          <div className="lg:col-span-4">
            <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-taupe font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-taupe"></span>
              <span>Our Philosophy</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal tracking-tight leading-[1.12]">
              Stone That Becomes Part of Your Story.
            </h2>
          </div>
          <div className="lg:col-span-8 flex flex-col justify-end">
            <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-normal max-w-2xl mb-4">
              At Kanha Granite and Marble in Shiroli, Kolhapur, we believe natural stone is not merely a construction surface—it is an enduring organic anchor that defines the emotional resonance of modern architecture.
            </p>
            <p className="text-xs sm:text-sm text-softgrey leading-relaxed max-w-xl">
              From monolithic kitchen islands carved from dense igneous granite to ethereal bookmatched marble feature walls, we connect architects, interior designers, and discerning homeowners directly with verified stone quarries.
            </p>
          </div>
        </div>

        {/* Asymmetrical Editorial Composition: Large Feature Image + 4 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Large Photographic Editorial */}
          <div className="lg:col-span-5 relative group overflow-hidden rounded-sm border border-sand bg-sand/20 min-h-[420px] lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85"
              alt="Architectural natural stone interior with continuous marble surfaces"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-[0.95]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent flex flex-col justify-end p-8 text-ivory">
              <span className="text-[10px] uppercase tracking-[0.25em] text-sand font-mono mb-2">
                Shiroli Marble Market · Kolhapur
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-normal leading-snug">
                Precision cut, individually inspected, and sustainably sourced.
              </h3>
            </div>
          </div>

          {/* Right 4 Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.number}
                  className="p-6 sm:p-7 bg-warmwhite/80 border border-sand hover:border-taupe/60 transition-all duration-300 rounded-sm flex flex-col justify-between group shadow-subtle hover:shadow-luxury"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-taupe font-semibold tracking-widest">
                        {item.number}
                      </span>
                      <Icon className="w-5 h-5 text-taupe group-hover:text-charcoal transition-colors" />
                    </div>
                    <h4 className="font-heading text-xl text-charcoal font-semibold mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] uppercase tracking-wider text-taupe font-medium mb-3">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-charcoal/75 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default BrandStory;
