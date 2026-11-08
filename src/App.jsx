import React, { useState, useEffect } from 'react';
import initialProducts from './data/products.json';
import galleryItems from './data/galleryItems.json';
import materialGuides from './data/materialGuides.json';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandStory } from './components/BrandStory';
import { ExploreMaterials } from './components/ExploreMaterials';
import { FeaturedCollection } from './components/FeaturedCollection';
import { Collections } from './components/Collections';
import { ProductModal } from './components/ProductModal';
import { StoneVisualizer } from './components/StoneVisualizer';
import { ApplicationGallery } from './components/ApplicationGallery';
import { MaterialStory } from './components/MaterialStory';
import { WhyChooseKanha } from './components/WhyChooseKanha';
import { StoneAnalysis } from './components/StoneAnalysis';
import { MaterialGuide } from './components/MaterialGuide';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

const STORAGE_KEY_PRODUCTS = 'kanha_products_v2';

export function App() {
  // Load products with localStorage fallback
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 70) return parsed;
      }
    } catch (e) {
      console.warn('Could not load products from localStorage, using initial catalogue.', e);
    }
    return initialProducts;
  });

  // Active section tracking for navbar
  const [activeSection, setActiveSection] = useState('home');

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visualizerConfig, setVisualizerConfig] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  // Direct connection from catalogue / cards to visualizer
  const handleVisualizeStone = (product, application) => {
    let targetRoom = 'kitchen';
    if (product.category === 'Marble') targetRoom = 'living-room';
    if (product.category === 'Tiles') targetRoom = 'bathroom';
    if (application) {
      const appLower = application.toLowerCase();
      if (appLower.includes('step') || appLower.includes('riser')) {
        targetRoom = 'staircase';
      } else if (appLower.includes('table')) {
        targetRoom = 'dining-area';
      } else if (appLower.includes('vanity') || appLower.includes('bath')) {
        targetRoom = 'bathroom';
      } else if (appLower.includes('living') || appLower.includes('feature wall')) {
        targetRoom = 'living-room';
      } else if (appLower.includes('counter') || appLower.includes('island')) {
        targetRoom = 'kitchen';
      }
    }

    setVisualizerConfig({
      stoneId: product.id,
      category: product.category,
      roomId: targetRoom,
      application: application || product.applications?.[0] || 'Countertop',
    });

    handleNavigate('visualizer');
  };

  // Jump to collections filtered by category
  const handleSelectMaterialCategory = (category) => {
    setSelectedCategoryFilter(category);
    handleNavigate('collections');
  };

  // Update localStorage when products change
  const handleUpdateProducts = (updated) => {
    setProducts(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  };

  // Reset products to default initial JSON
  const handleResetProducts = () => {
    if (window.confirm('Reset catalogue to original 70 verified products?')) {
      setProducts(initialProducts);
      try {
        localStorage.removeItem(STORAGE_KEY_PRODUCTS);
      } catch (e) {}
    }
  };

  // Smooth scroll handler
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // IntersectionObserver for tracking active section on scroll
  useEffect(() => {
    const sections = [
      'home',
      'about',
      'materials',
      'featured',
      'collections',
      'visualizer',
      'applications',
      'material-story',
      'why-choose-us',
      'stone-analysis',
      'material-guide',
      'contact'
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans antialiased flex flex-col selection:bg-sand selection:text-charcoal">
      {/* 1. Sticky Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Architectural Journey Sections */}
      <main className="flex-1">
        {/* Section 1: Hero Section with Interactive 3D Stone Slab */}
        <Hero
          onExploreCollections={() => handleNavigate('collections')}
          onOpenVisualizer={() => handleNavigate('visualizer')}
        />

        {/* Section 2: Brand Story Editorial Narrative */}
        <BrandStory
          onExploreMaterials={() => handleNavigate('materials')}
        />

        {/* Section 3: Explore Materials (Granite, Marble, Tiles, Quartz) */}
        <ExploreMaterials
          onSelectCategory={handleSelectMaterialCategory}
          onOpenVisualizer={() => handleNavigate('visualizer')}
        />

        {/* Section 4: Featured Stone Collection Showcase */}
        <FeaturedCollection
          products={products}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onVisualizeStone={handleVisualizeStone}
        />

        {/* Complete 70-Stone Architectural Catalogue with "Load More" Pagination */}
        <Collections
          products={products}
          initialCategory={selectedCategoryFilter}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onVisualizeStone={handleVisualizeStone}
        />

        {/* Section 6: Photo-Based Interior Room Stone Visualizer */}
        <StoneVisualizer
          products={products}
          preselectedConfig={visualizerConfig}
        />

        {/* Section 5: Stone in Architecture Application Gallery */}
        <ApplicationGallery
          galleryItems={galleryItems}
        />

        {/* Section 7: Material Story — The Anatomy of Stone */}
        <MaterialStory />

        {/* Section 8: Why Choose Kanha */}
        <WhyChooseKanha />

        {/* Engineering Benchmarks & Stone Density Analysis */}
        <StoneAnalysis />

        {/* Educational Architectural Material Guide */}
        <MaterialGuide
          guides={materialGuides}
        />

        {/* Section 9: Contact Page with Verified Map & WhatsApp */}
        <ContactSection />
      </main>

      {/* Section 10: Luxury Architectural Footer */}
      <Footer
        onNavigate={handleNavigate}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          allProducts={products}
          onClose={() => setSelectedProduct(null)}
          onSelectRelated={(related) => setSelectedProduct(related)}
          onVisualizeStone={handleVisualizeStone}
        />
      )}
    </div>
  );
}

export default App;
