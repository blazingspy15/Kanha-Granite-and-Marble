import React, { useEffect, useRef } from 'react';
import { ArrowRight, Compass, MapPin, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { Stone3DCanvas } from './Stone3DCanvas';
import { MAP_DIRECTIONS_URL, MAP_COORDINATES } from './ContactSection';

export const Hero = ({ onExploreCollections, onOpenVisualizer }) => {
  const heroRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-reveal',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'transform'
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-ivory"
    >
      {/* Background Architectural Ambient Tone */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-sand/30 blur-3xl"></div>
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-taupe/15 blur-3xl"></div>
        <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-sand/20 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Architectural Eyebrow Tag with Location */}
            <div className="hero-reveal inline-flex items-center space-x-2.5 px-3.5 py-1.5 mb-6 bg-sand/60 backdrop-blur-sm border border-taupe/30 rounded-xs self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-taupe"></span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-semibold text-charcoal">
                Marble Market, Shiroli · Kolhapur
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="hero-reveal font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-charcoal leading-[1.06] tracking-tight mb-6">
              Nature Carved.{' '}
              <span className="italic block font-normal text-taupe-dark">
                Spaces Defined.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="hero-reveal text-base sm:text-lg md:text-xl text-charcoal/80 font-normal leading-relaxed max-w-xl mb-10 text-balance">
              Discover premium granite, marble, tiles and quartz for timeless interiors.
            </p>

            {/* Action Buttons */}
            <div className="hero-reveal flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-12">
              <button
                onClick={onExploreCollections}
                className="px-8 py-4 bg-charcoal hover:bg-charcoal-deep text-ivory text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center space-x-3 group shadow-subtle rounded-xs"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-4 h-4 text-sand transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenVisualizer}
                className="px-8 py-4 bg-warmwhite/90 hover:bg-warmwhite backdrop-blur-sm text-charcoal border border-sand hover:border-taupe text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center space-x-2.5 rounded-xs shadow-xs"
              >
                <Compass className="w-4 h-4 text-taupe" />
                <span>Visualize Your Stone</span>
              </button>
            </div>

            {/* Architectural Material Summary Highlights */}
            <div className="hero-reveal grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-sand/80 max-w-2xl">
              <div>
                <p className="font-heading text-2xl text-charcoal font-semibold">18</p>
                <p className="text-[10px] text-softgrey uppercase tracking-wider mt-0.5">Granite Varieties</p>
              </div>
              <div>
                <p className="font-heading text-2xl text-charcoal font-semibold">18</p>
                <p className="text-[10px] text-softgrey uppercase tracking-wider mt-0.5">Marble Selections</p>
              </div>
              <div>
                <p className="font-heading text-2xl text-charcoal font-semibold">18</p>
                <p className="text-[10px] text-softgrey uppercase tracking-wider mt-0.5">Vitrified Tiles</p>
              </div>
              <div>
                <p className="font-heading text-2xl text-charcoal font-semibold">16</p>
                <p className="text-[10px] text-softgrey uppercase tracking-wider mt-0.5">Quartz Surfaces</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Floating Stone Slab (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-lg relative">
              {/* Subtle architectural backdrop halo */}
              <div className="absolute inset-0 rounded-full bg-sand/40 filter blur-2xl transform scale-90 -z-10 pointer-events-none"></div>
              <Stone3DCanvas />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Location Coordinates & Smooth Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between pt-4 border-t border-sand/40 text-xs text-softgrey">
        <div className="flex items-center space-x-2">
          <MapPin className="w-3.5 h-3.5 text-taupe shrink-0" />
          <span className="hidden sm:inline">Sangli Patha, Marble Market, Shiroli ·</span>
          <span className="font-mono text-[10px]">{MAP_COORDINATES.display}</span>
          <a
            href={MAP_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-taupe-dark hover:underline ml-1 font-medium"
          >
            Directions →
          </a>
        </div>

        <button
          onClick={onExploreCollections}
          className="flex items-center space-x-1.5 hover:text-charcoal transition-colors group cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll to explore</span>
          <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
