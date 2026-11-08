import React, { useState } from 'react';
import {
  MapPin,
  MessageCircle,
  Navigation,
  ExternalLink,
  CheckCircle2,
  Phone,
  Clock,
  Compass,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import {
  WHATSAPP_BASE_URL,
  WHATSAPP_DISPLAY,
  createContactFormEnquiryMessage,
  buildWhatsAppUrl
} from '../utils/whatsapp';

export const MAP_COORDINATES = {
  lat: 16.7349763,
  lng: 74.2913544,
  display: '16.7349763, 74.2913544',
};

export const MAP_EMBED_URL = 'https://www.google.com/maps?q=16.7349763,74.2913544&output=embed';
export const MAP_DIRECTIONS_URL = 'https://www.google.com/maps/dir/?api=1&destination=16.7349763%2C74.2913544';
export const MAP_SHORT_URL = 'https://maps.app.goo.gl/kMwAcZoxJS654vDDA';
export const MAP_PLACE_URL = 'https://www.google.com/maps/place/Kanha+granite+and+marble/@16.7349763,74.2913544,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc101007618e2ab:0x5f2af658c47de5f6!8m2!3d16.7349763!4d74.2913544!16s%2Fg%2F11xrzj0qtn';

export const ContactSection = ({ onSaveEnquiry }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    category: 'Granite',
    productName: '',
    projectType: 'Residential Kitchen',
    area: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);

  const categories = ['Granite', 'Marble', 'Tiles', 'Quartz', 'Complete Home Package'];
  const projectTypes = [
    'Residential Kitchen',
    'Full Home Flooring',
    'Master Bathroom / Vanity',
    'Architectural Staircase',
    'Commercial / Office Building',
    'Villa / Bungalow Project',
    'Other / Custom Requirement',
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name';
    }
    const cleanPhone = formData.mobile.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.mobile = 'Please enter a valid 10-digit mobile number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (onSaveEnquiry) {
      onSaveEnquiry({
        ...formData,
        id: `enq-${Date.now()}`,
        timestamp: new Date().toISOString(),
        status: 'New',
      });
    }

    const whatsappMessage = createContactFormEnquiryMessage(formData);
    const url = buildWhatsAppUrl(whatsappMessage);

    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-ivory border-b border-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <p className="text-[11px] uppercase tracking-[0.25em] text-taupe font-semibold mb-3 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-taupe" />
            <span>Showroom Location & Direct Enquiry</span>
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal tracking-tight">
            Connect With Our Stone Specialists.
          </h2>
          <p className="text-sm sm:text-base text-charcoal/75 mt-3 leading-relaxed">
            Visit our physical slab displays in Marble Market, Shiroli, Kolhapur or submit your project details below to receive a personalized WhatsApp quotation.
          </p>
        </div>

        {/* Top Split: Showroom Information & Customer Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Column: Business Details & Timing */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-warmwhite border border-sand p-6 sm:p-8 rounded-sm shadow-subtle">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-widest text-taupe font-semibold">
                  Official Showroom
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-sand/40 text-charcoal rounded-xs font-medium">
                  Kolhapur Region
                </span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl text-charcoal font-semibold mb-1">
                KANHA GRANITE AND MARBLE
              </h3>
              <p className="text-[10px] uppercase tracking-widest text-softgrey font-semibold mb-6">
                Natural Stone · Timeless Spaces
              </p>

              <div className="space-y-5">
                {/* Physical Location */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xs bg-sand/30 flex items-center justify-center text-taupe-dark shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                      Showroom & Stockyard Address
                    </p>
                    <address className="not-italic text-xs text-charcoal/80 leading-relaxed mt-1">
                      Sangli Patha, Marble Market,<br />
                      Shiroli, Kolhapur,<br />
                      Maharashtra, India - 416122.
                    </address>
                    <div className="mt-2 inline-flex items-center space-x-1.5 text-[10px] bg-sand/30 text-charcoal px-2 py-0.5 rounded-xs font-mono">
                      <span>GPS: {MAP_COORDINATES.display}</span>
                    </div>
                  </div>
                </div>

                {/* Verified Official WhatsApp */}
                <div className="flex items-start space-x-3.5 pt-4 border-t border-sand/60">
                  <div className="w-9 h-9 rounded-xs bg-sand/30 flex items-center justify-center text-taupe-dark shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                      Official Business WhatsApp
                    </p>
                    <a
                      href={WHATSAPP_BASE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-charcoal hover:text-taupe-dark transition-colors inline-block mt-1"
                    >
                      {WHATSAPP_DISPLAY}
                    </a>
                    <p className="text-[10px] text-softgrey mt-0.5">
                      Fastest response for slab photographs, current lot rates & availability.
                    </p>
                  </div>
                </div>

                {/* Visiting Hours */}
                <div className="flex items-start space-x-3.5 pt-4 border-t border-sand/60">
                  <div className="w-9 h-9 rounded-xs bg-sand/30 flex items-center justify-center text-taupe-dark shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                      Showroom Operating Hours
                    </p>
                    <p className="text-xs text-charcoal/80 mt-1">
                      Monday – Saturday: 9:30 AM – 7:30 PM<br />
                      Sunday: Open by Appointment / WhatsApp Enquiry
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Action */}
              <div className="mt-8 pt-6 border-t border-sand space-y-2.5">
                <a
                  href={WHATSAPP_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-3.5 bg-charcoal hover:bg-charcoal-deep text-ivory text-xs uppercase tracking-widest rounded-xs transition-colors shadow-subtle"
                >
                  <MessageCircle className="w-4 h-4 text-sand" />
                  <span>Start WhatsApp Consultation</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Customer Enquiry Form */}
          <div className="lg:col-span-7 bg-warmwhite border border-sand p-6 sm:p-8 lg:p-10 rounded-sm shadow-subtle">
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-widest text-taupe font-semibold">
                Project Consultation
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl text-charcoal font-semibold mt-0.5">
                Request a Custom Stone Quotation
              </h3>
              <p className="text-xs text-softgrey mt-1">
                Share your room specifications. Submitting prepares a structured message directly to our WhatsApp desk.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-sand/30 border border-sand rounded-sm text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-taupe-dark mx-auto" />
                <h4 className="font-heading text-2xl text-charcoal font-semibold">
                  Enquiry Prepared
                </h4>
                <p className="text-xs text-charcoal/80 leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Your enquiry has been prepared and opened in WhatsApp with our Shiroli showroom.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 bg-charcoal text-ivory text-xs uppercase tracking-wider rounded-xs"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Patil"
                      className={`w-full p-2.5 text-xs bg-ivory border ${
                        errors.name ? 'border-red-500' : 'border-sand'
                      } focus:border-taupe focus:outline-none rounded-xs`}
                    />
                    {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                      WhatsApp Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="e.g. 98220 12345"
                      className={`w-full p-2.5 text-xs bg-ivory border ${
                        errors.mobile ? 'border-red-500' : 'border-sand'
                      } focus:border-taupe focus:outline-none rounded-xs`}
                    />
                    {errors.mobile && <p className="text-[10px] text-red-500 mt-1">{errors.mobile}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                      Stone Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2.5 text-xs bg-ivory border border-sand focus:border-taupe focus:outline-none rounded-xs text-charcoal"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                      Specific Stone Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.productName}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      placeholder="e.g. Black Galaxy, Statuario, Calacatta"
                      className="w-full p-2.5 text-xs bg-ivory border border-sand focus:border-taupe focus:outline-none rounded-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full p-2.5 text-xs bg-ivory border border-sand focus:border-taupe focus:outline-none rounded-xs text-charcoal"
                    >
                      {projectTypes.map((pt) => (
                        <option key={pt} value={pt}>
                          {pt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                      Approximate Area (Sq. Ft.)
                    </label>
                    <input
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      placeholder="e.g. 500"
                      className="w-full p-2.5 text-xs bg-ivory border border-sand focus:border-taupe focus:outline-none rounded-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Project Requirements or Edge Profile Preferences
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your project timeline, location, thickness or finish requirements..."
                    className="w-full p-2.5 text-xs bg-ivory border border-sand focus:border-taupe focus:outline-none rounded-xs"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-charcoal hover:bg-charcoal-deep text-ivory text-xs uppercase tracking-[0.2em] font-medium rounded-xs transition-all duration-200 flex items-center justify-center space-x-2 shadow-subtle group"
                  >
                    <MessageCircle className="w-4 h-4 text-sand transition-transform group-hover:scale-110" />
                    <span>Submit Enquiry via WhatsApp</span>
                  </button>
                  <p className="text-[10px] text-center text-softgrey mt-2">
                    Direct enquiry to {WHATSAPP_DISPLAY}. Fast, personal response from our Shiroli team.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* TASK 1: MANDATORY PREMIUM GOOGLE MAPS SHOWCASE SECTION */}
        <div className="bg-warmwhite border border-sand rounded-sm shadow-luxury overflow-hidden">
          {/* Header of Map Showcase */}
          <div className="p-6 sm:p-8 bg-ivory border-b border-sand flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest text-taupe font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5 text-taupe" />
                <span>Verified Showroom Coordinates</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl text-charcoal font-semibold">
                Visit Kanha Granite & Marble in Shiroli
              </h3>
              <p className="text-xs text-softgrey mt-1">
                Located at Sangli Patha, Marble Market, Shiroli, Kolhapur (Coordinates: {MAP_COORDINATES.display})
              </p>
            </div>

            {/* Action Buttons: Get Directions & Open in Google Maps */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href={MAP_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-charcoal hover:bg-charcoal-deep text-ivory text-xs uppercase tracking-wider font-medium rounded-xs transition-colors flex items-center space-x-1.5 shadow-xs"
                title="Calculate driving route from your current location"
              >
                <Navigation className="w-3.5 h-3.5 text-sand" />
                <span>Get Directions</span>
              </a>

              <a
                href={MAP_SHORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-warmwhite hover:bg-sand/30 border border-sand text-charcoal text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center space-x-1.5 shadow-xs"
                title="View full location page on Google Maps app"
              >
                <ExternalLink className="w-3.5 h-3.5 text-taupe-dark" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Responsive Map Canvas with Loading Fallback & Exact Coords Marker */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-sand/20 overflow-hidden">
            {/* Loading Fallback / Skeleton */}
            {isMapLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-sand/20 z-10 animate-pulse">
                <MapPin className="w-8 h-8 text-taupe mb-2 animate-bounce" />
                <p className="text-xs text-charcoal font-medium">Loading Verified Showroom Map...</p>
                <p className="text-[10px] text-softgrey mt-0.5">Connecting to Google Maps at {MAP_COORDINATES.display}</p>
              </div>
            )}

            {/* Google Maps Embed pointing strictly to coordinates: 16.7349763, 74.2913544 */}
            <iframe
              title="Kanha Granite and Marble Verified Location Map"
              src={MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setIsMapLoading(false)}
              className="w-full h-full filter contrast-[1.02]"
            ></iframe>

            {/* Overlaid Location Badge on Map */}
            <div className="absolute bottom-4 left-4 z-20 bg-warmwhite/95 backdrop-blur-md border border-sand px-3.5 py-2 rounded-xs shadow-md hidden sm:block max-w-xs pointer-events-none">
              <p className="font-heading text-sm text-charcoal font-semibold">KANHA Showroom & Yard</p>
              <p className="text-[10px] text-softgrey mt-0.5 leading-snug">
                Sangli Patha, Marble Market, Shiroli, Kolhapur — 416122
              </p>
            </div>
          </div>

          {/* Footer note of map section */}
          <div className="p-4 bg-ivory border-t border-sand flex flex-col sm:flex-row items-center justify-between text-[11px] text-softgrey gap-2">
            <span>
              Direct landmark: Near Sangli Patha, on the Kolhapur-Sangli highway junction at Shiroli Marble Market.
            </span>
            <span className="font-mono text-charcoal">
              Coordinates: {MAP_COORDINATES.lat}, {MAP_COORDINATES.lng}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
