import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Sliders, Sparkles } from 'lucide-react';
import { WHATSAPP_BASE_URL, WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const Navbar = ({ activeSection, onNavigate, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Story' },
    { id: 'materials', label: 'Materials' },
    { id: 'collections', label: 'Collections' },
    { id: 'visualizer', label: 'Visualizer', highlight: true },
    { id: 'applications', label: 'Applications' },
    { id: 'material-story', label: 'Anatomy' },
    { id: 'why-choose-us', label: 'Why Kanha' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-ivory/95 backdrop-blur-md border-b border-sand shadow-subtle py-3'
            : 'bg-ivory/80 backdrop-blur-sm border-b border-sand/40 py-4 lg:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group focus:outline-none"
            >
              <div className="flex items-center space-x-2">
                <span className="font-heading text-2xl sm:text-3xl tracking-widest text-charcoal font-semibold uppercase group-hover:text-taupe transition-colors">
                  KANHA
                </span>
                <span className="h-4 w-[1px] bg-taupe/40 hidden sm:inline-block"></span>
                <span className="text-[10px] sm:text-xs tracking-[0.25em] text-softgrey font-medium uppercase hidden sm:inline-block">
                  Granite & Marble
                </span>
              </div>
              <p className="text-[9px] tracking-[0.2em] text-softgrey uppercase sm:hidden">
                Granite & Marble
              </p>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs uppercase tracking-wider font-medium transition-colors relative py-1 focus:outline-none ${
                    activeSection === item.id
                      ? 'text-charcoal font-semibold'
                      : 'text-charcoal/70 hover:text-charcoal'
                  } ${
                    item.highlight
                      ? 'text-taupe-dark flex items-center gap-1 font-semibold'
                      : ''
                  }`}
                >
                  {item.highlight && <Sparkles className="w-3 h-3 text-taupe inline" />}
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-taupe rounded-full animate-fadeIn" />
                  )}
                </button>
              ))}
            </nav>

            {/* Header Actions: Admin shortcut & WhatsApp CTA */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={onOpenAdmin}
                title="Admin Dashboard (Prototype)"
                className="px-2.5 py-1.5 text-[11px] tracking-wider uppercase text-softgrey hover:text-charcoal border border-sand hover:border-taupe/60 transition-colors flex items-center gap-1.5 rounded-sm"
              >
                <Sliders className="w-3 h-3" />
                <span>Admin</span>
              </button>

              <a
                href={WHATSAPP_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-charcoal hover:bg-charcoal-deep text-ivory text-xs uppercase tracking-widest transition-all duration-200 hover:shadow-subtle rounded-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 text-sand" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              <a
                href={WHATSAPP_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-charcoal text-sand rounded-sm hover:bg-charcoal-deep"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-charcoal hover:text-taupe focus:outline-none"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-ivory border-b border-sand shadow-luxury animate-fadeIn">
            <div className="px-5 pt-3 pb-6 space-y-2">
              <div className="pb-3 border-b border-sand/60">
                <p className="text-[10px] tracking-widest text-softgrey uppercase font-medium">
                  Showroom Navigation
                </p>
              </div>

              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left py-2.5 px-2 text-sm uppercase tracking-wider flex items-center justify-between rounded ${
                    activeSection === item.id
                      ? 'bg-sand/30 text-charcoal font-semibold'
                      : 'text-charcoal/80 hover:bg-sand/20'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.highlight && <Sparkles className="w-3.5 h-3.5 text-taupe" />}
                    {item.label}
                  </span>
                  {activeSection === item.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-taupe"></span>
                  )}
                </button>
              ))}

              <div className="pt-4 border-t border-sand/60 space-y-3">
                <a
                  href={WHATSAPP_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-charcoal text-ivory text-xs uppercase tracking-widest rounded-sm"
                >
                  <MessageCircle className="w-4 h-4 text-sand" />
                  <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-2 text-xs text-softgrey hover:text-charcoal border border-sand rounded-sm uppercase tracking-wider"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Admin Panel Prototype</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
