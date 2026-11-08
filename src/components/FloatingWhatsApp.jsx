import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_BASE_URL, WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const FloatingWhatsApp = () => {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto">
      {/* Floating Greeting Tooltip */}
      {!tooltipDismissed && (
        <div className="mb-2 bg-warmwhite/95 backdrop-blur-md border border-sand shadow-luxury p-3 rounded-sm max-w-xs animate-fadeIn relative hidden sm:block">
          <button
            onClick={() => setTooltipDismissed(true)}
            className="absolute top-1.5 right-1.5 text-softgrey hover:text-charcoal p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="pr-4">
            <p className="text-[10px] uppercase tracking-wider text-taupe font-semibold">
              Live Showroom Desk
            </p>
            <p className="text-xs text-charcoal font-medium mt-0.5">
              Need slab photos or current lot rates?
            </p>
            <p className="text-[11px] text-softgrey mt-1">
              Chat directly with our Kolhapur team on WhatsApp.
            </p>
          </div>
        </div>
      )}

      {/* Main Floating Button */}
      <a
        href={WHATSAPP_BASE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with Kanha Granite and Marble on WhatsApp (${WHATSAPP_DISPLAY})`}
        className="group relative flex items-center justify-center w-14 h-14 bg-charcoal hover:bg-charcoal-deep text-sand rounded-full shadow-elevated border border-sand hover:scale-105 transition-all duration-300 focus:outline-none"
      >
        {/* Subtle breathing ripple */}
        <span className="absolute -inset-1 rounded-full bg-sand/30 animate-ping opacity-60"></span>

        <MessageCircle className="w-6 h-6 text-sand relative z-10 transition-transform group-hover:rotate-12" />

        {/* Hover Pill on Left */}
        <span className="absolute right-16 bg-charcoal text-ivory text-xs px-3 py-1.5 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block shadow-subtle tracking-wider uppercase">
          WhatsApp: {WHATSAPP_DISPLAY}
        </span>
      </a>
    </div>
  );
};
