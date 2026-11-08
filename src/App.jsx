import React, { useState, useEffect } from 'react';
import initialProducts from './data/products.json';
import galleryItems from './data/galleryItems.json';
import materialGuides from './data/materialGuides.json';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandStory } from './components/BrandStory';
import { Collections } from './components/Collections';
import { ProductModal } from './components/ProductModal';
import { StoneVisualizer } from './components/StoneVisualizer';
import { ApplicationGallery } from './components/ApplicationGallery';
import { WhyChooseKanha } from './components/WhyChooseKanha';
import { StoneAnalysis } from './components/StoneAnalysis';
import { MaterialGuide } from './components/MaterialGuide';
import { ContactSection } from './components/ContactSection';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

const STORAGE_KEY_PRODUCTS = 'kanha_products_v1';
const STORAGE_KEY_ENQUIRIES = 'kanha_enquiries_v1';

export function App() {
  // Load products with localStorage fallback
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not load products from localStorage, using initial catalogue.', e);
    }
    return initialProducts;
  });

  // Load customer enquiries from localStorage
  const [enquiries, setEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ENQUIRIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not load enquiries from localStorage', e);
    }
    return [];
  });

  // Active section tracking for navbar
  const [activeSection, setActiveSection] = useState('home');

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [visualizerConfig, setVisualizerConfig] = useState(null);

  // Direct connection from catalogue to visualizer (Section 7)
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
    if (window.confirm('Reset catalogue to original sample products?')) {
      setProducts(initialProducts);
      try {
        localStorage.removeItem(STORAGE_KEY_PRODUCTS);
      } catch (e) {}
    }
  };

  // Add new customer enquiry from contact form
  const handleSaveEnquiry = (newEnquiry) => {
    const updated = [newEnquiry, ...enquiries];
    setEnquiries(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ENQUIRIES, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save enquiry to localStorage', e);
    }
  };

  // Clear enquiries
  const handleClearEnquiries = () => {
    if (window.confirm('Clear all logged customer enquiries?')) {
      setEnquiries([]);
      try {
        localStorage.removeItem(STORAGE_KEY_ENQUIRIES);
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
      'collections',
      'visualizer',
      'applications',
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
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onExploreCollections={() => handleNavigate('collections')}
          onOpenVisualizer={() => handleNavigate('visualizer')}
        />

        {/* 3. Brand Story Editorial */}
        <BrandStory />

        {/* 4. Product Collections Catalogue */}
        <Collections
          products={products}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onVisualizeStone={handleVisualizeStone}
        />

        {/* 5. Standout Photo-Based Interior Stone Visualizer */}
        <StoneVisualizer
          products={products}
          preselectedConfig={visualizerConfig}
        />

        {/* 6. Application Gallery */}
        <ApplicationGallery
          galleryItems={galleryItems}
        />

        {/* 7. Why Choose Kanha */}
        <WhyChooseKanha />

        {/* 8. Verified Stone Analysis & Engineering Benchmarks */}
        <StoneAnalysis />

        {/* 9. Educational Material Guide */}
        <MaterialGuide
          guides={materialGuides}
        />

        {/* 10. Contact Page with Verified Address, Map & Form */}
        <ContactSection
          onSaveEnquiry={handleSaveEnquiry}
        />
      </main>

      {/* 10. Minimal Luxury Footer */}
      <Footer
        onNavigate={handleNavigate}
      />

      {/* 11. Floating WhatsApp Button */}
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

      {/* Admin Dashboard Protected Prototype */}
      <AdminDashboard
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        products={products}
        onUpdateProducts={handleUpdateProducts}
        onResetProducts={handleResetProducts}
        enquiries={enquiries}
        onClearEnquiries={handleClearEnquiries}
      />
    </div>
  );
}

export default App;
