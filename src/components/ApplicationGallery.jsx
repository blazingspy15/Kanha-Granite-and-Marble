import React, { useState } from 'react';
import { Sparkles, MessageCircle, ArrowUpRight } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export const ApplicationGallery = ({ galleryItems }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterCategories = [
    'All',
    'Kitchen Countertops',
    'Kitchen Islands',
    'Marble Flooring',
    'Bathroom Walls',
    'Bathroom Vanities',
    'Staircases',
    'Living Room Interiors',
    'Commercial Interiors',
    'Feature Walls',
  ];

  const filteredItems =
    selectedFilter === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedFilter);

  return (
    <section id="applications" className="py-20 lg:py-28 bg-warmwhite border-b border-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-taupe font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architectural Applications</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal tracking-tight">
            Realized in Stone.
          </h2>
          <p className="text-sm sm:text-base text-charcoal/75 mt-3 leading-relaxed">
            From precision kitchen gables to expansive bookmatched living room floors, examine how natural stone brings enduring gravitas and architectural warmth to everyday spaces.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-xs whitespace-nowrap transition-all duration-200 font-medium ${
                selectedFilter === cat
                  ? 'bg-charcoal text-ivory shadow-xs'
                  : 'bg-ivory hover:bg-sand/40 text-charcoal/80 border border-sand'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image-led Architectural Gallery Grid (Asymmetric & Editorial) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => {
            const enquiryMessage = `Hello Kanha Granite and Marble,

I am interested in your ${item.title} application (${item.category}).
Featured Stone: ${item.stone}

Please share suitable slab recommendations and consultation details.

Thank you.`;
            const whatsappUrl = buildWhatsAppUrl(enquiryMessage);

            return (
              <div
                key={item.id}
                className="group bg-ivory border border-sand hover:border-taupe/60 transition-all duration-300 rounded-sm overflow-hidden flex flex-col justify-between shadow-subtle hover:shadow-luxury"
              >
                <div>
                  {/* Large Architectural Photography */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-sand/30">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.98]"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-sm text-sand text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-xs">
                      {item.category}
                    </div>
                  </div>

                  {/* Caption & Stone Details */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-heading text-xl sm:text-2xl text-charcoal font-semibold">
                        {item.title}
                      </h3>
                      <span className="text-[10px] uppercase tracking-wider text-taupe-dark font-medium bg-sand/40 px-2 py-0.5 rounded-xs shrink-0">
                        {item.material}
                      </span>
                    </div>

                    <p className="text-xs text-charcoal/70 leading-relaxed mb-4">
                      {item.caption}
                    </p>

                    <div className="pt-3 border-t border-sand/60 flex items-center justify-between text-[11px] text-softgrey">
                      <span>Stone Palette:</span>
                      <span className="font-semibold text-charcoal">{item.stone}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action */}
                <div className="px-6 pb-6 pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 bg-warmwhite hover:bg-charcoal hover:text-ivory text-charcoal border border-sand hover:border-charcoal text-[11px] uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center justify-center space-x-2 group/btn"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-taupe group-hover/btn:text-sand" />
                    <span>Enquire for this Look</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
