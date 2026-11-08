import React, { useState } from 'react';
import {
  ShieldCheck,
  Flame,
  Droplets,
  Scale,
  Sparkles,
  HelpCircle,
  MessageCircle,
  Layers,
  ArrowRight,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  STONE_CATEGORY_STANDARDS,
  INDIVIDUAL_STONE_ANALYSIS
} from '../data/stoneAnalysisData';
import { buildWhatsAppUrl, createStoneAnalysisEnquiryMessage } from '../utils/whatsapp';

export const StoneAnalysis = () => {
  const [viewMode, setViewMode] = useState('categories'); // 'categories' | 'individual'
  const [selectedCategory, setSelectedCategory] = useState('granite');

  // Individual stone matchup states
  const [stoneAId, setStoneAId] = useState('granite-black-galaxy');
  const [stoneBId, setStoneBId] = useState('quartz-calacatta-style');

  const stoneA = INDIVIDUAL_STONE_ANALYSIS.find((s) => s.id === stoneAId) || INDIVIDUAL_STONE_ANALYSIS[0];
  const stoneB = INDIVIDUAL_STONE_ANALYSIS.find((s) => s.id === stoneBId) || INDIVIDUAL_STONE_ANALYSIS[1];

  const currentCategoryData =
    STONE_CATEGORY_STANDARDS.find((c) => c.id === selectedCategory) ||
    STONE_CATEGORY_STANDARDS[0];

  const whatsappUrl = buildWhatsAppUrl(
    createStoneAnalysisEnquiryMessage({
      materialName: viewMode === 'categories' ? currentCategoryData.name : `${stoneA.name} & ${stoneB.name}`,
      category: viewMode === 'categories' ? currentCategoryData.name : 'Comparative Assessment',
      targetApplication: 'Countertop & Flooring Specification',
    })
  );

  return (
    <section id="stone-analysis" className="py-20 lg:py-28 bg-warmwhite border-b border-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-taupe font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-taupe" />
            <span>Verified Material Analysis & Laboratory Benchmarks</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal tracking-tight">
            Scientific Stone Specifications.
          </h2>
          <p className="text-sm sm:text-base text-charcoal/75 mt-3 leading-relaxed">
            Architectural stone specification requires objective engineering metrics. Review laboratory-tested Mohs hardness, water absorption percentages, compressive strengths, and thermal thresholds across our material portfolio.
          </p>

          <div className="mt-4 p-3 bg-ivory border border-sand rounded-xs text-[11px] text-softgrey flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-taupe shrink-0 mt-0.5" />
            <span>
              <strong>Measurement Integrity:</strong> All data adheres to ASTM, IS:1121/1130, and ISO 13006 testing benchmarks. Where a specific quarry extraction lot has not been tested for an exact attribute, it is strictly noted as <em>Not Provided</em>.
            </span>
          </div>
        </div>

        {/* View Mode Segmented Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-sand">
          <div className="flex items-center space-x-2 bg-ivory p-1 border border-sand rounded-xs">
            <button
              onClick={() => setViewMode('categories')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors ${
                viewMode === 'categories'
                  ? 'bg-charcoal text-ivory shadow-xs'
                  : 'text-charcoal/80 hover:text-charcoal'
              }`}
            >
              Stone Family Benchmarks (4 Categories)
            </button>

            <button
              onClick={() => setViewMode('individual')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors ${
                viewMode === 'individual'
                  ? 'bg-charcoal text-ivory shadow-xs'
                  : 'text-charcoal/80 hover:text-charcoal'
              }`}
            >
              Side-by-Side Stone Matchup
            </button>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-semibold text-charcoal hover:text-taupe-dark transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-sand bg-charcoal p-0.5 rounded-full" />
            <span>Ask Technical Specialist on WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* VIEW MODE 1: Stone Family Standards */}
        {viewMode === 'categories' && (
          <div className="space-y-8">
            {/* Category Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {STONE_CATEGORY_STANDARDS.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-4 rounded-xs border text-left transition-all duration-200 ${
                      isSelected
                        ? 'bg-charcoal text-ivory border-charcoal shadow-subtle'
                        : 'bg-ivory hover:bg-sand/30 border-sand text-charcoal'
                    }`}
                  >
                    <span className={`text-[10px] uppercase tracking-widest block font-medium ${
                      isSelected ? 'text-sand' : 'text-softgrey'
                    }`}>
                      {cat.geologicalClass.split(' ')[0]}
                    </span>
                    <span className="font-heading text-lg sm:text-xl font-semibold block mt-0.5">
                      {cat.name}
                    </span>
                    <span className={`text-[10px] block mt-1 font-mono ${
                      isSelected ? 'text-sand/80' : 'text-softgrey'
                    }`}>
                      Mohs {cat.mohsHardness}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Category Architectural Spec Card */}
            <div className="bg-ivory border border-sand p-6 sm:p-8 rounded-sm shadow-subtle">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-sand/80">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-taupe font-semibold">
                    Standards: {currentCategoryData.testedStandards}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl text-charcoal font-semibold mt-0.5">
                    {currentCategoryData.name} Technical Profile
                  </h3>
                  <p className="text-xs text-softgrey mt-1">
                    Geological Classification: {currentCategoryData.geologicalClass}
                  </p>
                </div>

                <div className="flex items-center space-x-4 bg-warmwhite p-3 border border-sand rounded-xs shrink-0">
                  <div className="text-center px-3 border-r border-sand">
                    <span className="text-[10px] uppercase text-softgrey block">Hardness</span>
                    <span className="font-heading text-lg font-semibold text-charcoal">
                      {currentCategoryData.mohsHardness}
                    </span>
                  </div>
                  <div className="text-center px-3 border-r border-sand">
                    <span className="text-[10px] uppercase text-softgrey block">Absorption</span>
                    <span className="font-heading text-lg font-semibold text-charcoal">
                      {currentCategoryData.waterAbsorption.split(' ')[0]}
                    </span>
                  </div>
                  <div className="text-center px-3">
                    <span className="text-[10px] uppercase text-softgrey block">Strength</span>
                    <span className="font-heading text-lg font-semibold text-charcoal">
                      {currentCategoryData.compressiveStrength.split(' ')[0]} MPa
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical Parameters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-warmwhite border border-sand rounded-xs">
                  <div className="flex items-center space-x-2 text-taupe-dark text-xs uppercase tracking-wider font-semibold mb-1.5">
                    <Scale className="w-4 h-4" />
                    <span>Mohs Mineral Hardness</span>
                  </div>
                  <p className="text-sm font-semibold text-charcoal">{currentCategoryData.mohsHardness}</p>
                  <p className="text-[11px] text-softgrey mt-1">
                    Resistance to scratching against standard diamond, quartz and steel cutlery test tools.
                  </p>
                </div>

                <div className="p-4 bg-warmwhite border border-sand rounded-xs">
                  <div className="flex items-center space-x-2 text-taupe-dark text-xs uppercase tracking-wider font-semibold mb-1.5">
                    <Droplets className="w-4 h-4" />
                    <span>Water Absorption Rate</span>
                  </div>
                  <p className="text-sm font-semibold text-charcoal">{currentCategoryData.waterAbsorption}</p>
                  <p className="text-[11px] text-softgrey mt-1">
                    Indicates internal crystalline porosity. Lower percentages indicate higher stain immunity.
                  </p>
                </div>

                <div className="p-4 bg-warmwhite border border-sand rounded-xs">
                  <div className="flex items-center space-x-2 text-taupe-dark text-xs uppercase tracking-wider font-semibold mb-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Specific Density & Mass</span>
                  </div>
                  <p className="text-sm font-semibold text-charcoal">{currentCategoryData.density}</p>
                  <p className="text-[11px] text-softgrey mt-1">
                    Critical for calculating structural floor loads and cantilever carcass support.
                  </p>
                </div>

                <div className="p-4 bg-warmwhite border border-sand rounded-xs">
                  <div className="flex items-center space-x-2 text-taupe-dark text-xs uppercase tracking-wider font-semibold mb-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Compressive Load Strength</span>
                  </div>
                  <p className="text-sm font-semibold text-charcoal">{currentCategoryData.compressiveStrength}</p>
                  <p className="text-[11px] text-softgrey mt-1">
                    Load-bearing capacity under direct vertical compression before fracturing.
                  </p>
                </div>

                <div className="p-4 bg-warmwhite border border-sand rounded-xs">
                  <div className="flex items-center space-x-2 text-taupe-dark text-xs uppercase tracking-wider font-semibold mb-1.5">
                    <Flame className="w-4 h-4" />
                    <span>Thermal Tolerance</span>
                  </div>
                  <p className="text-sm font-semibold text-charcoal">{currentCategoryData.thermalResistance.split('.')[0]}</p>
                  <p className="text-[11px] text-softgrey mt-1">
                    Behavior under direct hot cooking utensils and temperature shifts.
                  </p>
                </div>

                <div className="p-4 bg-warmwhite border border-sand rounded-xs">
                  <div className="flex items-center space-x-2 text-taupe-dark text-xs uppercase tracking-wider font-semibold mb-1.5">
                    <Layers className="w-4 h-4" />
                    <span>Surface Finishes</span>
                  </div>
                  <p className="text-xs font-semibold text-charcoal leading-snug">{currentCategoryData.surfaceFinishes}</p>
                  <p className="text-[11px] text-softgrey mt-1">
                    Surface textures achievable with diamond abrasives or thermal treatments.
                  </p>
                </div>
              </div>

              {/* Maintenance Protocol & Recommended Uses */}
              <div className="p-5 bg-sand/30 border border-sand rounded-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs uppercase tracking-widest text-charcoal font-semibold">
                    Maintenance Protocol
                  </h4>
                  <p className="text-xs text-charcoal/80 leading-relaxed max-w-2xl">
                    {currentCategoryData.maintenance}
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="text-[10px] text-softgrey uppercase tracking-wider block mb-1">
                    Verified Suitability
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {currentCategoryData.idealApplications.slice(0, 2).map((app, i) => (
                      <span key={i} className="text-[10px] bg-warmwhite text-charcoal px-2 py-0.5 rounded-xs border border-sand">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW MODE 2: Side-by-Side Specific Stone Matchup */}
        {viewMode === 'individual' && (
          <div className="bg-ivory border border-sand p-6 sm:p-8 rounded-sm shadow-subtle space-y-8">
            {/* Selection Bars for Stone A and Stone B */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-sand">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-taupe font-semibold block mb-1.5">
                  Select Primary Stone (Material A)
                </label>
                <select
                  value={stoneAId}
                  onChange={(e) => setStoneAId(e.target.value)}
                  className="w-full p-2.5 text-xs bg-warmwhite border border-sand rounded-xs focus:border-taupe focus:outline-none font-medium text-charcoal"
                >
                  {INDIVIDUAL_STONE_ANALYSIS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.category})
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-softgrey mt-1 block">Origin: {stoneA.origin}</span>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-taupe font-semibold block mb-1.5">
                  Select Comparison Stone (Material B)
                </label>
                <select
                  value={stoneBId}
                  onChange={(e) => setStoneBId(e.target.value)}
                  className="w-full p-2.5 text-xs bg-warmwhite border border-sand rounded-xs focus:border-taupe focus:outline-none font-medium text-charcoal"
                >
                  {INDIVIDUAL_STONE_ANALYSIS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.category})
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-softgrey mt-1 block">Origin: {stoneB.origin}</span>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-sand/30 border-b border-sand text-charcoal">
                    <th className="py-3 px-4 uppercase tracking-wider text-[10px] w-1/3">Engineering Parameter</th>
                    <th className="py-3 px-4 uppercase tracking-wider text-[10px] w-1/3 font-semibold text-taupe-dark">
                      {stoneA.name}
                    </th>
                    <th className="py-3 px-4 uppercase tracking-wider text-[10px] w-1/3 font-semibold text-taupe-dark">
                      {stoneB.name}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand/50">
                  <tr className="hover:bg-sand/10 transition-colors">
                    <td className="py-3 px-4 font-semibold text-charcoal bg-sand/10">Material Category</td>
                    <td className="py-3 px-4 text-charcoal/90">{stoneA.category}</td>
                    <td className="py-3 px-4 text-charcoal/90">{stoneB.category}</td>
                  </tr>
                  <tr className="hover:bg-sand/10 transition-colors">
                    <td className="py-3 px-4 font-semibold text-charcoal bg-sand/10">Mohs Hardness</td>
                    <td className="py-3 px-4 font-mono font-medium">{stoneA.mohsHardness}</td>
                    <td className="py-3 px-4 font-mono font-medium">{stoneB.mohsHardness}</td>
                  </tr>
                  <tr className="hover:bg-sand/10 transition-colors">
                    <td className="py-3 px-4 font-semibold text-charcoal bg-sand/10">Water Absorption (%)</td>
                    <td className="py-3 px-4 font-mono">{stoneA.waterAbsorption}</td>
                    <td className="py-3 px-4 font-mono">{stoneB.waterAbsorption}</td>
                  </tr>
                  <tr className="hover:bg-sand/10 transition-colors">
                    <td className="py-3 px-4 font-semibold text-charcoal bg-sand/10">Specific Density</td>
                    <td className="py-3 px-4 font-mono">{stoneA.density}</td>
                    <td className="py-3 px-4 font-mono">{stoneB.density}</td>
                  </tr>
                  <tr className="hover:bg-sand/10 transition-colors">
                    <td className="py-3 px-4 font-semibold text-charcoal bg-sand/10">Compressive Strength</td>
                    <td className="py-3 px-4 font-mono">
                      {stoneA.compressiveStrength === 'Not Provided' ? (
                        <span className="text-softgrey italic">Not Provided</span>
                      ) : (
                        stoneA.compressiveStrength
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono">
                      {stoneB.compressiveStrength === 'Not Provided' ? (
                        <span className="text-softgrey italic">Not Provided</span>
                      ) : (
                        stoneB.compressiveStrength
                      )}
                    </td>
                  </tr>
                  <tr className="hover:bg-sand/10 transition-colors">
                    <td className="py-3 px-4 font-semibold text-charcoal bg-sand/10">Thermal Resistance</td>
                    <td className="py-3 px-4">{stoneA.thermalResistance}</td>
                    <td className="py-3 px-4">{stoneB.thermalResistance}</td>
                  </tr>
                  <tr className="hover:bg-sand/10 transition-colors">
                    <td className="py-3 px-4 font-semibold text-charcoal bg-sand/10">Available Finishes</td>
                    <td className="py-3 px-4 text-xs">{stoneA.surfaceFinishes}</td>
                    <td className="py-3 px-4 text-xs">{stoneB.surfaceFinishes}</td>
                  </tr>
                  <tr className="hover:bg-sand/10 transition-colors">
                    <td className="py-3 px-4 font-semibold text-charcoal bg-sand/10">Maintenance Demand</td>
                    <td className="py-3 px-4">{stoneA.maintenance}</td>
                    <td className="py-3 px-4">{stoneB.maintenance}</td>
                  </tr>
                  <tr className="hover:bg-sand/10 transition-colors">
                    <td className="py-3 px-4 font-semibold text-charcoal bg-sand/10">Test Certificate Status</td>
                    <td className="py-3 px-4 text-[11px] text-taupe-dark font-medium">{stoneA.testedStatus}</td>
                    <td className="py-3 px-4 text-[11px] text-taupe-dark font-medium">{stoneB.testedStatus}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Direct WhatsApp Call for this Matchup */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-sand">
              <p className="text-xs text-softgrey">
                Need structural calculations or batch test certificates for your project in Kolhapur?
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-charcoal hover:bg-charcoal-deep text-ivory text-xs uppercase tracking-wider font-medium rounded-xs shadow-subtle flex items-center space-x-2 shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-sand" />
                <span>Enquire About {stoneA.name} vs {stoneB.name}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
