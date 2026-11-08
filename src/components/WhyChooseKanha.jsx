import React from 'react';
import { Layers, Compass, Building2, MessageSquare, Palette, Sparkles, MapPin } from 'lucide-react';
import { WHATSAPP_BASE_URL, WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const WhyChooseKanha = () => {
  const pillars = [
    {
      icon: Layers,
      title: 'Four Diverse Stone Families',
      subtitle: 'Granite, Marble, Tiles & Quartz',
      description: 'Find natural igneous granites, European and Indian marbles, precision vitrified tiles, and non-porous quartz surfaces assembled under a single showroom roof in Shiroli.'
    },
    {
      icon: Compass,
      title: 'Material Selection Assistance',
      subtitle: 'Technical Guidance',
      description: 'Receive thoughtful guidance on stone density, porosity, slip ratings, and edge detailing tailored to regional cooking styles, climatic conditions, and structural requirements.'
    },
    {
      icon: Building2,
      title: 'Residential & Commercial Scope',
      subtitle: 'From Villas to Commercial Floors',
      description: 'Whether specifying stone for a single kitchen countertop, an entire private residence, or high-abrasion commercial floor layouts, we provide calibrated slab selections.'
    },
    {
      icon: MessageSquare,
      title: 'Customer-Focused Enquiry Support',
      subtitle: 'Direct WhatsApp & Showroom Visits',
      description: 'No convoluted contact forms or delayed quotes. Speak directly with knowledgeable stone specialists via WhatsApp or in person at Marble Market, Shiroli.'
    },
    {
      icon: Palette,
      title: 'Curated Design Inspiration',
      subtitle: 'Harmonious Combinations',
      description: 'Explore curated pairings of contrasting dark granites with warm light quartz, or bookmatched marble patterns designed to complement contemporary interior architecture.'
    },
    {
      icon: Sparkles,
      title: 'Transparent Stone Guidance',
      subtitle: 'Authentic Natural Stone',
      description: 'We believe in honest material counsel—clarifying the practical realities of natural stone veining, seal maintenance, and finish characteristics so you make confident choices.'
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 lg:py-28 bg-ivory border-b border-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <p className="text-[11px] uppercase tracking-[0.25em] text-taupe font-semibold mb-3">
            The Kanha Advantage
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal tracking-tight mb-4">
            A Thoughtful Approach to Architectural Stone.
          </h2>
          <p className="text-base text-charcoal/75 leading-relaxed">
            Selecting natural stone is a permanent architectural commitment. We support homeowners, architects, and interior designers with transparent expertise, extensive stone varieties, and personal enquiry assistance.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 bg-warmwhite/80 hover:bg-warmwhite border border-sand hover:border-taupe/60 transition-all duration-300 rounded-sm shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xs bg-sand/40 flex items-center justify-center text-taupe-dark mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-taupe-dark font-semibold mb-1">
                    {pillar.subtitle}
                  </p>
                  <h3 className="font-heading text-2xl text-charcoal font-semibold mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Showroom Invitation Banner */}
        <div className="mt-14 p-8 bg-sand/30 border border-sand rounded-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-taupe-dark text-xs uppercase tracking-wider font-semibold">
              <MapPin className="w-4 h-4" />
              <span>Showroom Experience at Shiroli</span>
            </div>
            <h4 className="font-heading text-2xl text-charcoal font-semibold">
              Inspect Full Slabs in Person
            </h4>
            <p className="text-xs sm:text-sm text-charcoal/75 max-w-2xl">
              Natural stone comes alive under natural lighting. We encourage you to walk our slab displays at Sangli Patha, Marble Market, Shiroli, Kolhapur to experience texture, veining, and surface feel firsthand.
            </p>
          </div>

          <a
            href={WHATSAPP_BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-charcoal hover:bg-charcoal-deep text-ivory text-xs uppercase tracking-[0.2em] font-medium transition-colors shrink-0 rounded-xs shadow-subtle flex items-center space-x-2"
          >
            <span>Plan a Showroom Visit</span>
          </a>
        </div>
      </div>
    </section>
  );
};
