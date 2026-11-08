import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Sparkles, MapPin, Navigation, ExternalLink } from 'lucide-react';
import { MAP_DIRECTIONS_URL, MAP_COORDINATES } from './ContactSection';

export const Hero = ({ onExploreCollections, onOpenVisualizer }) => {
  return (
    <section id="home" className="relative min-h-[92vh] sm:min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-ivory">
      {/* High-Resolution Architectural Editorial Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=88"
          alt="Luxury architectural kitchen with Calacatta marble waterfall island and natural stone surfaces"
          className="w-full h-full object-cover object-center filter brightness-[0.93] contrast-[1.03]"
          loading="eager"
        />
        {/* Subtle Luxury Gradient Overlays in Warm Ivory & Sand */}
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/95 via-ivory/85 to-ivory/30 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-ivory/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Architectural Eyebrow Tag with Verified Kolhapur Location */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 mb-6 bg-sand/80 backdrop-blur-md border border-taupe/30 rounded-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-taupe"></span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-charcoal">
              Marble Market, Shiroli · Kolhapur
            </span>
          </div>

          {/* Main Headline with Editorial Serif Hierarchy */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-charcoal leading-[1.08] tracking-tight mb-6">
            Nature’s Finest.{' '}
            <span className="italic block font-normal text-taupe-dark">
              Crafted for Your Spaces.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-charcoal/80 font-normal leading-relaxed max-w-xl mb-10 text-balance">
            Explore an exquisite collection of granite, marble, tiles and quartz surfaces designed to bring timeless beauty to every space.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-12 sm:mb-14">
            <button
              onClick={onExploreCollections}
              className="px-7 sm:px-8 py-3.5 sm:py-4 bg-charcoal hover:bg-charcoal-deep text-ivory text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center space-x-3 group shadow-subtle rounded-xs"
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-4 h-4 text-sand transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onOpenVisualizer}
              className="px-7 sm:px-8 py-3.5 sm:py-4 bg-warmwhite/90 hover:bg-warmwhite backdrop-blur-sm text-charcoal border border-sand hover:border-taupe text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center space-x-2.5 rounded-xs shadow-xs"
            >
              <Compass className="w-4 h-4 text-taupe" />
              <span>Interactive Visualizer Suite</span>
            </button>
          </div>

          {/* Luxury Curated Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-sand/80 max-w-2xl">
            <div>
              <p className="font-heading text-xl sm:text-2xl text-charcoal font-semibold">Granite</p>
              <p className="text-[10px] sm:text-[11px] text-softgrey uppercase tracking-wider mt-0.5">Igneous Slabs</p>
            </div>
            <div>
              <p className="font-heading text-xl sm:text-2xl text-charcoal font-semibold">Marble</p>
              <p className="text-[10px] sm:text-[11px] text-softgrey uppercase tracking-wider mt-0.5">Indian & Imported</p>
            </div>
            <div>
              <p className="font-heading text-xl sm:text-2xl text-charcoal font-semibold">Tiles</p>
              <p className="text-[10px] sm:text-[11px] text-softgrey uppercase tracking-wider mt-0.5">Vitrified Slabs</p>
            </div>
            <div>
              <p className="font-heading text-xl sm:text-2xl text-charcoal font-semibold">Quartz</p>
              <p className="text-[10px] sm:text-[11px] text-softgrey uppercase tracking-wider mt-0.5">Engineered Surfaces</p>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Location Floating Badge at Bottom Right */}
      <div className="hidden xl:flex absolute bottom-8 right-8 z-10 items-center space-x-3 bg-warmwhite/95 backdrop-blur-md px-4 py-2.5 border border-sand rounded-xs text-[11px] text-charcoal shadow-subtle">
        <MapPin className="w-4 h-4 text-taupe shrink-0" />
        <div>
          <span className="font-semibold block">Sangli Patha, Marble Market, Shiroli</span>
          <span className="text-[10px] text-softgrey font-mono block">GPS: {MAP_COORDINATES.display}</span>
        </div>
        <a
          href={MAP_DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 px-2.5 py-1 bg-sand/50 hover:bg-sand text-charcoal text-[10px] uppercase tracking-wider font-semibold rounded-xs transition-colors"
          title="Open driving route in Google Maps"
        >
          Directions
        </a>
      </div>
    </section>
  );
};
