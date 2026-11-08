import React, { useState, useEffect } from 'react';
import { X, MessageCircle, ZoomIn, Check, Layers, Maximize2, Shield, ArrowRight } from 'lucide-react';
import { buildWhatsAppUrl, createProductEnquiryMessage, WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const ProductModal = ({ product, allProducts, onClose, onSelectRelated }) => {
  const [selectedApplication, setSelectedApplication] = useState('');
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (product?.applications?.length > 0) {
      setSelectedApplication(product.applications[0]);
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const whatsappMessage = createProductEnquiryMessage({
    productName: product.name,
    category: product.category,
    application: selectedApplication || 'General Application',
  });

  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

  const relatedProducts = (allProducts || [])
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      {/* Background click to dismiss */}
      <div className="fixed inset-0 -z-10" onClick={onClose}></div>

      <div className="relative w-full max-w-4xl bg-warmwhite border border-sand shadow-elevated rounded-sm overflow-hidden my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-warmwhite/90 hover:bg-warmwhite text-charcoal rounded-full border border-sand hover:border-taupe transition-colors shadow-sm focus:outline-none"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Section with Zoom */}
          <div className="relative bg-sand/20 flex flex-col justify-between border-b md:border-b-0 md:border-r border-sand">
            <div
              className="relative aspect-square sm:aspect-[4/3] md:aspect-auto md:h-full min-h-[320px] overflow-hidden cursor-crosshair group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300"
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                        transform: 'scale(2.2)',
                      }
                    : { transform: 'scale(1)' }
                }
              />

              {/* Zoom hint overlay */}
              <div className="absolute bottom-3 left-3 bg-charcoal/80 backdrop-blur-sm text-sand text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-xs flex items-center gap-1.5 pointer-events-none">
                <ZoomIn className="w-3 h-3 text-taupe-light" />
                <span>Hover to zoom texture</span>
              </div>

              {/* Demo product badge */}
              {product.isDemo && (
                <div className="absolute top-3 left-3 bg-sand/90 backdrop-blur-sm text-charcoal border border-taupe/30 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs font-semibold">
                  Demo Product · Illustrative
                </div>
              )}
            </div>
          </div>

          {/* Product Information Section */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Name */}
              <div className="mb-4">
                <span className="text-[11px] uppercase tracking-[0.25em] text-taupe font-semibold">
                  {product.category} Collection
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl text-charcoal font-semibold mt-1">
                  {product.name}
                </h2>
                {product.colorTone && (
                  <p className="text-xs text-softgrey tracking-wide mt-1">
                    Tone: {product.colorTone}
                  </p>
                )}
              </div>

              {/* Editorial Description */}
              <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Specifications Grid */}
              <div className="space-y-4 pt-4 border-t border-sand/80 mb-6">
                {/* Surface Finishes */}
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest text-charcoal font-semibold mb-2">
                    Available Surface Finishes
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {product.finishes?.map((finish, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-ivory border border-sand text-[11px] text-charcoal/90 rounded-xs"
                      >
                        {finish}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verified Thickness */}
                {product.thickness && (
                  <div>
                    <h4 className="text-[11px] uppercase tracking-widest text-charcoal font-semibold mb-1">
                      Thickness Information
                    </h4>
                    <p className="text-xs text-charcoal/80 font-medium">
                      {product.thickness}
                    </p>
                  </div>
                )}

                {/* Suitable Applications (Selectable for contextual WhatsApp) */}
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest text-charcoal font-semibold mb-2">
                    Select Your Intended Application
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {product.applications?.map((app, idx) => {
                      const isSelected = selectedApplication === app;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedApplication(app)}
                          className={`px-3 py-1.5 text-xs rounded-xs border transition-all duration-200 text-left flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-charcoal text-ivory border-charcoal font-medium'
                              : 'bg-warmwhite hover:bg-sand/30 border-sand text-charcoal/80'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-sand" />}
                          <span>{app}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-sand space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2.5 py-3.5 bg-charcoal hover:bg-charcoal-deep text-ivory text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 rounded-sm shadow-subtle group"
              >
                <MessageCircle className="w-4 h-4 text-sand transition-transform group-hover:scale-110" />
                <span>Enquire on WhatsApp</span>
              </a>

              <p className="text-[10px] text-center text-softgrey tracking-wider">
                Direct consultation via official WhatsApp: {WHATSAPP_DISPLAY}
              </p>

              {/* Related Products Preview */}
              {relatedProducts.length > 0 && (
                <div className="pt-4 border-t border-sand/60">
                  <p className="text-[10px] uppercase tracking-widest text-softgrey font-semibold mb-2">
                    Similar {product.category} Varieties
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {relatedProducts.map((rel) => (
                      <button
                        key={rel.id}
                        onClick={() => onSelectRelated(rel)}
                        className="text-left group/rel p-1 bg-ivory border border-sand hover:border-taupe rounded-xs transition-colors"
                      >
                        <div className="aspect-[4/3] overflow-hidden bg-sand/30 mb-1 rounded-xs">
                          <img
                            src={rel.image}
                            alt={rel.name}
                            className="w-full h-full object-cover group-hover/rel:scale-105 transition-transform"
                          />
                        </div>
                        <p className="text-[10px] font-medium text-charcoal truncate">
                          {rel.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
