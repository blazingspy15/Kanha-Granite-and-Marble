import React, { useState, useMemo } from 'react';
import { Search, Filter, MessageCircle, Eye, ArrowUpRight, Sparkles } from 'lucide-react';
import { buildWhatsAppUrl, createProductEnquiryMessage } from '../utils/whatsapp';

export const Collections = ({ products, onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFinish, setSelectedFinish] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', 'Granite', 'Marble', 'Tiles', 'Quartz'];

  // Extract unique finishes across all products
  const allFinishes = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      p.finishes?.forEach((f) => set.add(f));
    });
    return ['All', ...Array.from(set)];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === 'All' || product.category === selectedCategory;
        const matchesFinish =
          selectedFinish === 'All' || product.finishes?.includes(selectedFinish);
        const matchesSearch =
          searchQuery === '' ||
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.colorTone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.applications?.some((app) =>
            app.toLowerCase().includes(searchQuery.toLowerCase())
          );
        return matchesCategory && matchesFinish && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        if (sortBy === 'popularity') return (b.popularity || 0) - (a.popularity || 0);
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        return 0;
      });
  }, [products, selectedCategory, selectedFinish, searchQuery, sortBy]);

  return (
    <section id="collections" className="py-20 lg:py-28 bg-warmwhite border-b border-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-taupe font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Architectural Stone Catalogue</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal tracking-tight">
              Curated Collections.
            </h2>
            <p className="text-sm sm:text-base text-charcoal/75 mt-3 leading-relaxed">
              Explore our core families of natural granite, Italian & Indian marble, designer tiles, and engineered quartz surfaces.
            </p>
          </div>

          {/* Demo Catalogue Disclaimer Pill */}
          <div className="mt-4 md:mt-0 p-3 bg-ivory border border-sand rounded-sm text-xs text-softgrey max-w-sm">
            <span className="font-semibold text-charcoal">Illustrative Demo Catalogue:</span> Slab selections shown are representative demo products. Inquire on WhatsApp for live quarry lot arrivals and verified dimensions.
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-ivory border border-sand p-4 sm:p-5 rounded-sm mb-10 shadow-sm space-y-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-softgrey font-semibold mr-2 hidden sm:inline">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-all duration-200 rounded-xs font-medium ${
                  selectedCategory === cat
                    ? 'bg-charcoal text-ivory shadow-xs'
                    : 'bg-warmwhite hover:bg-sand/40 text-charcoal/80 border border-sand/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Subfilters: Search, Finish Filter, Sort */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-3 border-t border-sand/60">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-softgrey absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stone name, tone or room..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-warmwhite border border-sand focus:border-taupe focus:outline-none rounded-xs placeholder:text-softgrey/70 text-charcoal"
              />
            </div>

            {/* Finish Dropdown */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-softgrey shrink-0" />
              <select
                value={selectedFinish}
                onChange={(e) => setSelectedFinish(e.target.value)}
                className="w-full py-2 px-3 text-xs bg-warmwhite border border-sand focus:border-taupe focus:outline-none rounded-xs text-charcoal font-medium"
              >
                <option value="All">All Surface Finishes</option>
                {allFinishes.filter((f) => f !== 'All').map((finish) => (
                  <option key={finish} value={finish}>
                    Finish: {finish}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="sm:col-span-2 lg:col-span-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2 px-3 text-xs bg-warmwhite border border-sand focus:border-taupe focus:outline-none rounded-xs text-charcoal font-medium"
              >
                <option value="featured">Sort by: Featured Curation</option>
                <option value="popularity">Sort by: Popularity</option>
                <option value="name-asc">Sort by: Name (A – Z)</option>
                <option value="name-desc">Sort by: Name (Z – A)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Count Display */}
        <div className="flex items-center justify-between text-xs text-softgrey mb-6">
          <span>
            Showing <strong className="text-charcoal font-semibold">{filteredProducts.length}</strong> stone varieties
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </span>
          {(selectedCategory !== 'All' || selectedFinish !== 'All' || searchQuery !== '') && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedFinish('All');
                setSearchQuery('');
              }}
              className="text-taupe-dark hover:underline font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-ivory border border-dashed border-sand rounded-sm">
            <p className="font-heading text-2xl text-charcoal mb-2">No Matching Stones Found</p>
            <p className="text-xs text-softgrey max-w-md mx-auto mb-6">
              Try adjusting your search query or selecting a different finish or stone category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedFinish('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-charcoal text-ivory text-xs uppercase tracking-wider rounded-sm"
            >
              View All Stones
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const defaultApp = product.applications?.[0] || 'Kitchen Countertop';
              const whatsappUrl = buildWhatsAppUrl(
                createProductEnquiryMessage({
                  productName: product.name,
                  category: product.category,
                  application: defaultApp,
                })
              );

              return (
                <div
                  key={product.id}
                  className="group bg-ivory/50 hover:bg-warmwhite border border-sand hover:border-taupe/60 transition-all duration-300 flex flex-col justify-between rounded-sm overflow-hidden shadow-subtle hover:shadow-luxury"
                >
                  <div>
                    {/* Image Container */}
                    <div
                      onClick={() => onSelectProduct(product)}
                      className="relative aspect-[4/3] overflow-hidden bg-sand/20 cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={`${product.name} ${product.category}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.98]"
                        loading="lazy"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                        <span className="bg-charcoal/85 backdrop-blur-sm text-sand text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-xs font-medium">
                          {product.category}
                        </span>
                        {product.isDemo && (
                          <span className="bg-warmwhite/90 backdrop-blur-sm text-charcoal border border-sand text-[9px] tracking-wider uppercase px-1.5 py-0.5 rounded-xs font-semibold">
                            Demo Sample
                          </span>
                        )}
                      </div>

                      {/* Quick Inspect Button on Hover */}
                      <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="px-3 py-1.5 bg-warmwhite/95 text-charcoal text-[11px] uppercase tracking-wider font-semibold rounded-xs shadow-sm flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-taupe" />
                          <span>View Slab Details</span>
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3
                            onClick={() => onSelectProduct(product)}
                            className="font-heading text-xl sm:text-2xl text-charcoal font-semibold hover:text-taupe-dark transition-colors cursor-pointer"
                          >
                            {product.name}
                          </h3>
                          {product.colorTone && (
                            <p className="text-[11px] text-softgrey tracking-wide mt-0.5">
                              {product.colorTone}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="p-1.5 text-softgrey hover:text-charcoal hover:bg-sand/30 rounded-xs transition-colors"
                          title="View Full Specifications"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-charcoal/70 leading-relaxed mb-4 line-clamp-2">
                        {product.shortDescription || product.description}
                      </p>

                      {/* Thickness & Finishes summary */}
                      <div className="pt-3 border-t border-sand/60 space-y-2">
                        {product.thickness && (
                          <div className="text-[11px] text-charcoal/80 flex items-center justify-between">
                            <span className="text-softgrey">Thickness:</span>
                            <span className="font-medium">{product.thickness}</span>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1">
                          {product.finishes?.slice(0, 3).map((f, i) => (
                            <span
                              key={i}
                              className="text-[10px] bg-sand/30 text-charcoal/80 px-2 py-0.5 rounded-xs"
                            >
                              {f}
                            </span>
                          ))}
                          {product.finishes?.length > 3 && (
                            <span className="text-[10px] text-softgrey self-center">
                              +{product.finishes.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="px-5 pb-5 pt-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="w-full py-2.5 px-2 bg-warmwhite hover:bg-sand/30 border border-sand text-charcoal text-[11px] uppercase tracking-wider font-semibold rounded-xs transition-colors text-center"
                    >
                      Specifications
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-2 bg-charcoal hover:bg-charcoal-deep text-ivory text-[11px] uppercase tracking-wider font-medium rounded-xs transition-colors flex items-center justify-center space-x-1.5 group/btn"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-sand transition-transform group-hover/btn:scale-110" />
                      <span>Enquire</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
