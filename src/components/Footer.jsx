import React, { useState } from 'react';
import { MessageCircle, MapPin, X, ArrowUpRight } from 'lucide-react';
import { WHATSAPP_BASE_URL, WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const Footer = ({ onNavigate }) => {
  const [legalModal, setLegalModal] = useState(null); // 'privacy' | 'terms' | null

  return (
    <>
      <footer className="bg-charcoal text-ivory pt-16 pb-12 border-t border-charcoal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-charcoal-light">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="space-y-1">
                <h3 className="font-heading text-2xl sm:text-3xl tracking-widest uppercase font-semibold text-warmwhite">
                  KANHA
                </h3>
                <p className="text-[10px] tracking-[0.25em] text-sand uppercase font-medium">
                  Granite & Marble
                </p>
              </div>

              <p className="font-heading text-lg italic text-sand/80">
                Natural Stone. Timeless Spaces.
              </p>

              <p className="text-xs text-softgrey leading-relaxed max-w-sm">
                Curating premier natural granite, Indian & Italian marble, designer tiles, and engineered quartz surfaces at Shiroli Marble Market, Kolhapur.
              </p>

              <div className="pt-2">
                <a
                  href={WHATSAPP_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-sand text-charcoal text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-warmwhite transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-charcoal" />
                  <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-sand font-semibold mb-4">
                Navigation
              </p>
              <ul className="space-y-2.5 text-xs text-softgrey">
                <li>
                  <button
                    onClick={() => onNavigate('home')}
                    className="hover:text-warmwhite transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('about')}
                    className="hover:text-warmwhite transition-colors"
                  >
                    Brand Story
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('collections')}
                    className="hover:text-warmwhite transition-colors"
                  >
                    Collections
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('visualizer')}
                    className="hover:text-warmwhite transition-colors"
                  >
                    Interactive Visualizer
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('applications')}
                    className="hover:text-warmwhite transition-colors"
                  >
                    Application Gallery
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('material-guide')}
                    className="hover:text-warmwhite transition-colors"
                  >
                    Material Guide
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="hover:text-warmwhite transition-colors"
                  >
                    Contact Showroom
                  </button>
                </li>
              </ul>
            </div>

            {/* Product Families */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-sand font-semibold mb-4">
                Collections
              </p>
              <ul className="space-y-2.5 text-xs text-softgrey">
                <li>
                  <button
                    onClick={() => onNavigate('collections')}
                    className="hover:text-warmwhite transition-colors"
                  >
                    Granite Slabs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('collections')}
                    className="hover:text-warmwhite transition-colors"
                  >
                    Indian & Italian Marble
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('collections')}
                    className="hover:text-warmwhite transition-colors"
                  >
                    Vitrified & Porcelain Tiles
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('collections')}
                    className="hover:text-warmwhite transition-colors"
                  >
                    Engineered Quartz
                  </button>
                </li>
              </ul>
            </div>

            {/* Showroom Address & Verified Coordinates */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-sand font-semibold mb-4">
                Showroom Location
              </p>
              <address className="not-italic text-xs text-softgrey leading-relaxed space-y-2">
                <p>
                  <strong className="text-warmwhite">KANHA GRANITE AND MARBLE</strong><br />
                  Sangli Patha, Marble Market,<br />
                  Shiroli, Kolhapur,<br />
                  Maharashtra, India - 416122.
                </p>
                <p className="text-[10px] font-mono text-sand/80 pt-1">
                  GPS: 16.7349763, 74.2913544
                </p>
                <div className="pt-2 flex flex-col space-y-1.5">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=16.7349763%2C74.2913544"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-sand hover:text-warmwhite transition-colors text-[11px]"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Get Directions to Showroom</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>

                  <a
                    href="https://maps.app.goo.gl/kMwAcZoxJS654vDDA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-softgrey hover:text-warmwhite transition-colors text-[11px]"
                  >
                    <span>View on Google Maps</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </address>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Legal Modals */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-softgrey/80 gap-4">
            <p>© {new Date().getFullYear()} KANHA GRANITE & MARBLE. All rights reserved.</p>

            <div className="flex items-center space-x-6">
              <button
                onClick={() => setLegalModal('privacy')}
                className="hover:text-warmwhite transition-colors"
              >
                Privacy Policy
              </button>
              <span className="text-charcoal-light">•</span>
              <button
                onClick={() => setLegalModal('terms')}
                className="hover:text-warmwhite transition-colors"
              >
                Terms and Conditions
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modal (Privacy Policy & Terms) */}
      {legalModal && (
        <div className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-warmwhite p-6 sm:p-8 border border-sand rounded-sm shadow-elevated max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-4 right-4 p-2 text-charcoal hover:text-taupe"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {legalModal === 'privacy' ? (
              <div className="space-y-4 text-xs text-charcoal/80">
                <h3 className="font-heading text-2xl text-charcoal font-semibold">
                  Privacy Policy
                </h3>
                <p>
                  At <strong>Kanha Granite & Marble</strong>, we respect your privacy. This policy outlines how we handle customer enquiry data:
                </p>
                <h4 className="font-semibold text-charcoal text-sm">1. Information Collection</h4>
                <p>
                  When you submit an enquiry through our website or interact via WhatsApp, we collect basic details (such as your name, contact phone number, stone category, project type, and approximate floor area) solely to respond to your product inquiry and provide accurate quotation estimates.
                </p>
                <h4 className="font-semibold text-charcoal text-sm">2. Use of Information</h4>
                <p>
                  Information provided is used exclusively for quotation, slab availability checks, and customer service. We do not sell, rent, or distribute personal information to third parties.
                </p>
                <h4 className="font-semibold text-charcoal text-sm">3. WhatsApp Communications</h4>
                <p>
                  Our WhatsApp communication is direct with our showroom staff (+91 98200 84842). You may opt out of further conversation at any point simply by informing our representative.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-xs text-charcoal/80">
                <h3 className="font-heading text-2xl text-charcoal font-semibold">
                  Terms and Conditions
                </h3>
                <p>
                  Welcome to <strong>Kanha Granite & Marble</strong>. By browsing this website and inquiring about our products, you acknowledge the following terms:
                </p>
                <h4 className="font-semibold text-charcoal text-sm">1. Natural Stone Variation</h4>
                <p>
                  Natural granite, marble, and quartz slabs are geological products. Veining intensity, color shading, fissure patterns, and crystalline deposits naturally vary from block to block. Online photographs and visualizer renderings represent sample appearances. Clients are advised to physically inspect slabs prior to cutting.
                </p>
                <h4 className="font-semibold text-charcoal text-sm">2. Quotations and Availability</h4>
                <p>
                  Product availability, slab thicknesses, and price quotations are confirmed at the time of showroom visit or direct WhatsApp confirmation based on current lot inventory.
                </p>
                <h4 className="font-semibold text-charcoal text-sm">3. Demonstrative Content</h4>
                <p>
                  Catalogue items labeled as demo samples serve illustrative purposes to showcase aesthetic varieties available through our sourcing network.
                </p>
              </div>
            )}

            <div className="pt-6 border-t border-sand mt-6 flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 bg-charcoal text-ivory text-xs uppercase tracking-wider rounded-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
