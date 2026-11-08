import React, { useState } from 'react';
import { BookOpen, Check, HelpCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const MaterialGuide = ({ guides }) => {
  const [activeGuideId, setActiveGuideId] = useState(guides[0]?.id || 'granite-vs-marble');
  const activeGuide = guides.find((g) => g.id === activeGuideId) || guides[0];

  const whatsappInquiryUrl = buildWhatsAppUrl(
    `Hello Kanha Granite and Marble,

I was reading your Material Guide on "${activeGuide.title}" and would like guidance for my project.

Please advise on suitable options.

Thank you.`
  );

  return (
    <section id="material-guide" className="py-20 lg:py-28 bg-warmwhite border-b border-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-taupe font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Architectural Knowledge Base</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal tracking-tight">
            The Stone Selection Guide.
          </h2>
          <p className="text-sm sm:text-base text-charcoal/75 mt-3 leading-relaxed">
            Clear, honest material advice covering geological differences, finish choices, maintenance considerations, and installation tips to help you choose with confidence.
          </p>
        </div>

        {/* Interactive Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Guide Index / Sidebar */}
          <div className="lg:col-span-4 bg-ivory border border-sand p-4 sm:p-5 rounded-sm shadow-sm space-y-1.5">
            <p className="text-[10px] uppercase tracking-widest text-softgrey font-semibold px-2 mb-3">
              Topics & Guides
            </p>
            {guides.map((guide, idx) => {
              const isActive = guide.id === activeGuideId;
              return (
                <button
                  key={guide.id}
                  onClick={() => setActiveGuideId(guide.id)}
                  className={`w-full text-left p-3.5 rounded-xs transition-all duration-200 flex items-center justify-between text-xs font-medium ${
                    isActive
                      ? 'bg-charcoal text-ivory shadow-xs'
                      : 'bg-warmwhite hover:bg-sand/30 text-charcoal/80 border border-sand/60'
                  }`}
                >
                  <div className="pr-2">
                    <span className="text-[10px] uppercase tracking-wider block opacity-70 mb-0.5">
                      {guide.category}
                    </span>
                    <span className="line-clamp-1">{guide.title}</span>
                  </div>
                  <span className={`text-[10px] shrink-0 ${isActive ? 'text-sand' : 'text-softgrey'}`}>
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Guide Content Display */}
          <div className="lg:col-span-8 bg-ivory border border-sand p-6 sm:p-8 rounded-sm shadow-subtle">
            {/* Guide Header */}
            <div className="pb-6 border-b border-sand/80">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-[11px] uppercase tracking-widest text-taupe font-semibold">
                  {activeGuide.category}
                </span>
                <span className="text-[11px] text-softgrey">{activeGuide.readingTime}</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl text-charcoal font-semibold mb-3">
                {activeGuide.title}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                {activeGuide.summary}
              </p>
            </div>

            {/* Comparison Table / Key Breakdown */}
            {activeGuide.comparisonTable && (
              <div className="py-6 border-b border-sand/80 overflow-x-auto">
                <h4 className="text-[11px] uppercase tracking-widest text-charcoal font-semibold mb-3">
                  Comparative Breakdown
                </h4>
                <div className="min-w-[500px]">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-sand/30 border-b border-sand">
                        <th className="py-2.5 px-3 font-semibold text-charcoal uppercase tracking-wider text-[10px] w-1/3">
                          Parameter
                        </th>
                        <th className="py-2.5 px-3 font-semibold text-charcoal uppercase tracking-wider text-[10px] w-1/3">
                          First Option / Natural
                        </th>
                        <th className="py-2.5 px-3 font-semibold text-charcoal uppercase tracking-wider text-[10px] w-1/3">
                          Second Option / Alternative
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sand/50">
                      {activeGuide.comparisonTable.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-sand/15 transition-colors">
                          <td className="py-3 px-3 font-medium text-charcoal align-top bg-sand/10">
                            {row.aspect}
                          </td>
                          <td className="py-3 px-3 text-charcoal/80 align-top">
                            {row.granite}
                          </td>
                          <td className="py-3 px-3 text-charcoal/80 align-top">
                            {row.marble}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Kanha Recommendation Box */}
            <div className="py-6 border-b border-sand/80">
              <div className="p-4 bg-sand/30 border border-sand/70 rounded-xs">
                <div className="flex items-center space-x-2 text-taupe-dark font-semibold text-xs uppercase tracking-wider mb-1">
                  <Check className="w-4 h-4" />
                  <span>Kanha Recommendation</span>
                </div>
                <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed">
                  {activeGuide.recommendation}
                </p>
              </div>
            </div>

            {/* Consult Kanha CTA */}
            <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-charcoal font-semibold">Have specific questions about your layout?</p>
                <p className="text-[11px] text-softgrey">
                  Discuss your floorplan dimensions with our Kolhapur stone advisors.
                </p>
              </div>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-charcoal hover:bg-charcoal-deep text-ivory text-xs uppercase tracking-wider font-medium rounded-xs shadow-subtle shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5 text-sand" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
