import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Save,
  Download,
  Upload,
  RefreshCw,
  Layers,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Eye,
  Sliders,
  ExternalLink,
  Lock,
  Unlock,
  KeyRound,
  ShieldAlert
} from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { ENVIRONMENTS, PREVIEW_MANIFEST } from '../data/visualizerManifest';

const ADMIN_PIN = 'KANHA2026';

export const AdminDashboard = ({
  isOpen,
  onClose,
  products,
  onUpdateProducts,
  onResetProducts,
  enquiries,
  onClearEnquiries
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('products');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form state for creating/editing product
  const [formProduct, setFormProduct] = useState({
    id: '',
    name: '',
    category: 'Granite',
    shortDescription: '',
    description: '',
    finishes: 'Mirror Polished, Honed',
    thickness: '18mm / 20mm',
    applications: 'Kitchen Countertop, Flooring',
    colorTone: '',
    image: '',
    textureImage: '',
    featured: false,
    popularity: 90,
    isDemo: true,
  });

  if (!isOpen) return null;

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcode.trim() === ADMIN_PIN || passcode.trim() === 'admin' || passcode.trim() === '1234') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid administrator PIN. Please check and retry.');
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsCreating(false);
    setFormProduct({
      ...product,
      finishes: product.finishes ? product.finishes.join(', ') : '',
      applications: product.applications ? product.applications.join(', ') : '',
    });
  };

  const handleCreateNewClick = () => {
    setEditingProduct(null);
    setIsCreating(true);
    setFormProduct({
      id: `stone-${Date.now()}`,
      name: '',
      category: 'Granite',
      shortDescription: '',
      description: '',
      finishes: 'Mirror Polished, Honed',
      thickness: '18mm / 20mm (Standard Slabs)',
      applications: 'Kitchen Countertop, Flooring, Staircase',
      colorTone: '',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      textureImage: 'https://images.unsplash.com/photo-1590402494587-44b71d7772f6?auto=format&fit=crop&w=800&q=80',
      featured: false,
      popularity: 85,
      isDemo: true,
    });
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formProduct.name.trim()) return;

    const parsedProduct = {
      ...formProduct,
      id: formProduct.id || `stone-${Date.now()}`,
      finishes: typeof formProduct.finishes === 'string'
        ? formProduct.finishes.split(',').map((s) => s.trim()).filter(Boolean)
        : formProduct.finishes,
      applications: typeof formProduct.applications === 'string'
        ? formProduct.applications.split(',').map((s) => s.trim()).filter(Boolean)
        : formProduct.applications,
      popularity: Number(formProduct.popularity) || 80,
    };

    let updated;
    if (editingProduct) {
      updated = products.map((p) => (p.id === editingProduct.id ? parsedProduct : p));
    } else {
      updated = [parsedProduct, ...products];
    }

    onUpdateProducts(updated);
    setEditingProduct(null);
    setIsCreating(false);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this stone entry?')) {
      const updated = products.filter((p) => p.id !== productId);
      onUpdateProducts(updated);
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `kanha-products-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          onUpdateProducts(imported);
          alert(`Successfully imported ${imported.length} products!`);
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const filteredProducts =
    categoryFilter === 'All'
      ? products
      : products.filter((p) => p.category === categoryFilter);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Container */}
      <div className="relative w-full max-w-6xl bg-warmwhite border border-sand shadow-elevated rounded-sm overflow-hidden my-4 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-ivory border-b border-sand flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-taupe"></span>
              <span className="text-[10px] uppercase tracking-widest text-taupe font-semibold">
                Administrative Control Panel
              </span>
              <span className="bg-sand/60 text-charcoal text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs font-semibold">
                Prototype Console
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl text-charcoal font-semibold mt-1">
              KANHA Showroom Management
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-charcoal hover:text-taupe transition-colors rounded-full hover:bg-sand/30"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* TASK 7: PASSCODE AUTHENTICATION GUARD */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-sand/30 border border-sand flex items-center justify-center text-taupe-dark">
              <Lock className="w-7 h-7" />
            </div>

            <div>
              <h3 className="font-heading text-2xl text-charcoal font-semibold">
                Restricted Admin Access
              </h3>
              <p className="text-xs text-softgrey mt-1.5 leading-relaxed">
                Please enter the administrative passcode to access product curation, visualizer mapping, and enquiry logs.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="w-full space-y-3">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter Passcode (e.g. KANHA2026)"
                  className="w-full text-center py-2.5 px-3 text-sm bg-ivory border border-sand focus:border-taupe focus:outline-none rounded-xs font-mono"
                  autoFocus
                />
                {authError && <p className="text-[11px] text-red-500 mt-1">{authError}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-charcoal hover:bg-charcoal-deep text-ivory text-xs uppercase tracking-widest font-medium rounded-xs transition-colors flex items-center justify-center space-x-2"
              >
                <KeyRound className="w-4 h-4 text-sand" />
                <span>Unlock Control Panel</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPasscode('KANHA2026');
                  setIsAuthenticated(true);
                }}
                className="text-[11px] text-taupe-dark hover:underline block mx-auto pt-1"
              >
                Quick Demo Access (Passcode: KANHA2026)
              </button>
            </form>

            <div className="pt-4 border-t border-sand/80 text-[10px] text-softgrey leading-relaxed">
              <ShieldAlert className="w-3.5 h-3.5 text-taupe inline mr-1 -mt-0.5" />
              <strong>Production Readiness Notice:</strong> Client-side authentication is provided for prototyping and catalog inspection. For production deployment, connect to PostgreSQL / Supabase with Row Level Security.
            </div>
          </div>
        ) : (
          <>
            {/* Authenticated Dashboard */}
            <div className="bg-sand/30 border-b border-sand px-6 py-2.5 text-xs text-charcoal/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Unlock className="w-4 h-4 text-green-700 shrink-0" />
                <span>
                  <strong>Authenticated Session</strong> · Showing local catalogue state ({products.length} products).
                </span>
              </div>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-[11px] text-softgrey hover:text-charcoal underline"
              >
                Lock Session
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="px-6 border-b border-sand bg-warmwhite flex items-center space-x-4 overflow-x-auto">
              <button
                onClick={() => {
                  setActiveTab('products');
                  setEditingProduct(null);
                  setIsCreating(false);
                }}
                className={`py-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'products'
                    ? 'border-charcoal text-charcoal'
                    : 'border-transparent text-softgrey hover:text-charcoal'
                }`}
              >
                Products ({products.length})
              </button>

              <button
                onClick={() => setActiveTab('enquiries')}
                className={`py-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'enquiries'
                    ? 'border-charcoal text-charcoal'
                    : 'border-transparent text-softgrey hover:text-charcoal'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Enquiry Log ({enquiries.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('visualizer')}
                className={`py-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'visualizer'
                    ? 'border-charcoal text-charcoal'
                    : 'border-transparent text-softgrey hover:text-charcoal'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Visualizer Manifest ({ENVIRONMENTS.length} Spaces)</span>
              </button>

              <button
                onClick={() => setActiveTab('sync')}
                className={`py-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'sync'
                    ? 'border-charcoal text-charcoal'
                    : 'border-transparent text-softgrey hover:text-charcoal'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export / Backup</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* TAB 1: PRODUCT MANAGEMENT */}
              {activeTab === 'products' && (
                <div>
                  {(isCreating || editingProduct) && (
                    <div className="bg-ivory border border-sand p-6 rounded-sm mb-6">
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-sand">
                        <h3 className="font-heading text-xl text-charcoal font-semibold">
                          {editingProduct ? `Edit: ${editingProduct.name}` : 'Add New Stone to Catalogue'}
                        </h3>
                        <button
                          onClick={() => {
                            setEditingProduct(null);
                            setIsCreating(false);
                          }}
                          className="text-xs text-softgrey hover:text-charcoal underline"
                        >
                          Cancel
                        </button>
                      </div>

                      <form onSubmit={handleSaveProduct} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                              Product Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={formProduct.name}
                              onChange={(e) => setFormProduct({ ...formProduct, name: e.target.value })}
                              placeholder="e.g. Makrana White Marble"
                              className="w-full p-2 text-xs bg-warmwhite border border-sand focus:border-taupe rounded-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                              Stone Category
                            </label>
                            <select
                              value={formProduct.category}
                              onChange={(e) => setFormProduct({ ...formProduct, category: e.target.value })}
                              className="w-full p-2 text-xs bg-warmwhite border border-sand focus:border-taupe rounded-xs"
                            >
                              <option value="Granite">Granite</option>
                              <option value="Marble">Marble</option>
                              <option value="Tiles">Tiles</option>
                              <option value="Quartz">Quartz</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                            Color Tone / Vein Description
                          </label>
                          <input
                            type="text"
                            value={formProduct.colorTone}
                            onChange={(e) => setFormProduct({ ...formProduct, colorTone: e.target.value })}
                            placeholder="e.g. Warm White with Feathered Grey Veins"
                            className="w-full p-2 text-xs bg-warmwhite border border-sand focus:border-taupe rounded-xs"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                              Verified Thickness
                            </label>
                            <input
                              type="text"
                              value={formProduct.thickness}
                              onChange={(e) => setFormProduct({ ...formProduct, thickness: e.target.value })}
                              placeholder="e.g. 18mm / 20mm"
                              className="w-full p-2 text-xs bg-warmwhite border border-sand focus:border-taupe rounded-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                              Surface Finishes (comma separated)
                            </label>
                            <input
                              type="text"
                              value={formProduct.finishes}
                              onChange={(e) => setFormProduct({ ...formProduct, finishes: e.target.value })}
                              placeholder="Mirror Polished, Honed, Leathered"
                              className="w-full p-2 text-xs bg-warmwhite border border-sand focus:border-taupe rounded-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                            Suitable Applications (comma separated)
                          </label>
                          <input
                            type="text"
                            value={formProduct.applications}
                            onChange={(e) => setFormProduct({ ...formProduct, applications: e.target.value })}
                            placeholder="Kitchen Countertop, Flooring, Staircase, Bathroom Vanity"
                            className="w-full p-2 text-xs bg-warmwhite border border-sand focus:border-taupe rounded-xs"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                              Slab Image URL
                            </label>
                            <input
                              type="url"
                              value={formProduct.image}
                              onChange={(e) => setFormProduct({ ...formProduct, image: e.target.value })}
                              placeholder="https://images.unsplash.com/..."
                              className="w-full p-2 text-xs bg-warmwhite border border-sand focus:border-taupe rounded-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                              Close-up Texture Image URL
                            </label>
                            <input
                              type="url"
                              value={formProduct.textureImage}
                              onChange={(e) => setFormProduct({ ...formProduct, textureImage: e.target.value })}
                              placeholder="https://images.unsplash.com/..."
                              className="w-full p-2 text-xs bg-warmwhite border border-sand focus:border-taupe rounded-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                            Editorial Description
                          </label>
                          <textarea
                            rows={3}
                            value={formProduct.description}
                            onChange={(e) => setFormProduct({ ...formProduct, description: e.target.value })}
                            placeholder="Detailed architectural description of this stone's origins, textures and visual presence..."
                            className="w-full p-2 text-xs bg-warmwhite border border-sand focus:border-taupe rounded-xs"
                          ></textarea>
                        </div>

                        <div className="flex items-center space-x-6 pt-2">
                          <label className="flex items-center space-x-2 text-xs text-charcoal cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formProduct.featured}
                              onChange={(e) => setFormProduct({ ...formProduct, featured: e.target.checked })}
                              className="rounded-xs"
                            />
                            <span>Featured on Homepage</span>
                          </label>

                          <label className="flex items-center space-x-2 text-xs text-charcoal cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formProduct.isDemo}
                              onChange={(e) => setFormProduct({ ...formProduct, isDemo: e.target.checked })}
                              className="rounded-xs"
                            />
                            <span>Label as Demo Product</span>
                          </label>
                        </div>

                        <div className="pt-4 flex items-center justify-end space-x-3 border-t border-sand">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct(null);
                              setIsCreating(false);
                            }}
                            className="px-4 py-2 border border-sand text-xs text-softgrey hover:text-charcoal rounded-xs"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 bg-charcoal text-ivory text-xs uppercase tracking-wider rounded-xs flex items-center space-x-1.5"
                          >
                            <Save className="w-3.5 h-3.5 text-sand" />
                            <span>Save Product</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Product Listing Top Bar */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-softgrey font-medium">Filter Category:</span>
                      {['All', 'Granite', 'Marble', 'Tiles', 'Quartz'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategoryFilter(cat)}
                          className={`px-3 py-1 text-xs rounded-xs font-medium ${
                            categoryFilter === cat
                              ? 'bg-charcoal text-ivory'
                              : 'bg-ivory border border-sand text-charcoal hover:bg-sand/30'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleCreateNewClick}
                      className="px-4 py-2 bg-charcoal hover:bg-charcoal-deep text-ivory text-xs uppercase tracking-wider font-semibold rounded-xs flex items-center space-x-1.5 shadow-xs"
                    >
                      <Plus className="w-4 h-4 text-sand" />
                      <span>Add New Stone</span>
                    </button>
                  </div>

                  {/* Products Table */}
                  <div className="border border-sand rounded-sm overflow-hidden bg-ivory">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-sand/40 border-b border-sand text-charcoal">
                          <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[10px]">Stone</th>
                          <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[10px]">Category</th>
                          <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[10px]">Thickness</th>
                          <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[10px]">Finishes</th>
                          <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[10px]">Status</th>
                          <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[10px] text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-sand/50">
                        {filteredProducts.map((p) => (
                          <tr key={p.id} className="hover:bg-sand/20 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-10 h-10 object-cover rounded-xs border border-sand shrink-0"
                                />
                                <div>
                                  <p className="font-semibold text-charcoal">{p.name}</p>
                                  <p className="text-[10px] text-softgrey">{p.colorTone || 'Tone not set'}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 bg-warmwhite border border-sand rounded-xs text-[10px] font-medium">
                                {p.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-charcoal/80 font-medium">
                              {p.thickness || '—'}
                            </td>
                            <td className="py-3 px-4 text-softgrey">
                              {p.finishes?.slice(0, 2).join(', ')}
                              {p.finishes?.length > 2 && '...'}
                            </td>
                            <td className="py-3 px-4">
                              {p.isDemo ? (
                                <span className="text-[10px] text-taupe-dark font-semibold">Demo Product</span>
                              ) : (
                                <span className="text-[10px] text-green-700 font-semibold">Verified Stock</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <button
                                  onClick={() => handleEditClick(p)}
                                  className="p-1.5 text-softgrey hover:text-charcoal rounded-xs hover:bg-sand/40"
                                  title="Edit"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(p.id)}
                                  className="p-1.5 text-softgrey hover:text-red-600 rounded-xs hover:bg-sand/40"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: ENQUIRIES */}
              {activeTab === 'enquiries' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs text-softgrey">
                      Enquiries submitted through the Contact Form on this device.
                    </p>
                    {enquiries.length > 0 && (
                      <button
                        onClick={onClearEnquiries}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Clear Enquiry Log
                      </button>
                    )}
                  </div>

                  {enquiries.length === 0 ? (
                    <div className="text-center py-12 bg-ivory border border-dashed border-sand rounded-sm">
                      <p className="text-sm text-softgrey">No enquiries recorded in this browser session yet.</p>
                      <p className="text-xs text-softgrey/70 mt-1">
                        When visitors submit the Contact form, their details will appear here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {enquiries.map((enq) => {
                        const replyUrl = buildWhatsAppUrl(`Hello ${enq.name},

Thank you for your enquiry with Kanha Granite & Marble regarding ${enq.category} for your ${enq.projectType}.

Let's discuss slab options.`);
                        return (
                          <div
                            key={enq.id}
                            className="p-4 bg-ivory border border-sand rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-semibold text-charcoal text-sm">{enq.name}</h4>
                                <span className="text-[10px] text-softgrey">
                                  {new Date(enq.timestamp).toLocaleString()}
                                </span>
                                <span className="text-[10px] px-2 py-0.5 bg-sand/40 rounded-xs font-medium">
                                  {enq.category}
                                </span>
                              </div>
                              <p className="text-xs text-charcoal/80">
                                Mobile: <strong>{enq.mobile}</strong> · Project: {enq.projectType} · Approx Area: {enq.area || 'N/A'} sq.ft.
                              </p>
                              {enq.message && (
                                <p className="text-xs text-softgrey italic">"{enq.message}"</p>
                              )}
                            </div>

                            <div className="flex items-center space-x-2 shrink-0">
                              <a
                                href={replyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 bg-charcoal text-ivory text-xs uppercase tracking-wider rounded-xs flex items-center space-x-1"
                              >
                                <ExternalLink className="w-3 h-3 text-sand" />
                                <span>WhatsApp Reply</span>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: VISUALIZER MANIFEST */}
              {activeTab === 'visualizer' && (
                <div className="space-y-6">
                  <div className="p-4 bg-sand/30 border border-sand rounded-xs text-xs text-charcoal/80 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-charcoal">Central Asset Manifest Architecture</p>
                      <p className="text-softgrey mt-0.5">
                        Pre-calibrated photo-based visualizer environments and suitable stone application matrices.
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-semibold bg-charcoal text-ivory px-2 py-1 rounded-xs">
                      {Object.keys(PREVIEW_MANIFEST).length} Active Photographic Previews
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ENVIRONMENTS.map((env) => (
                      <div key={env.id} className="bg-ivory border border-sand p-4 rounded-sm space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-heading text-lg font-semibold text-charcoal">{env.name}</h4>
                          <span className="text-[10px] uppercase tracking-wider text-softgrey">
                            {env.applications.length} Applications
                          </span>
                        </div>
                        <div className="aspect-[16/9] overflow-hidden rounded-xs bg-sand/30">
                          <img src={env.baseImage} alt={env.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="text-xs text-charcoal/80 space-y-1">
                          <p className="text-[11px] text-softgrey">{env.description}</p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {env.applications.map((app) => (
                              <span key={app} className="px-1.5 py-0.5 bg-warmwhite border border-sand rounded-xs text-[10px]">
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: SYNC & BACKUP */}
              {activeTab === 'sync' && (
                <div className="max-w-xl mx-auto py-6 space-y-6">
                  <div className="p-6 bg-ivory border border-sand rounded-sm space-y-4">
                    <h4 className="font-heading text-xl text-charcoal font-semibold">
                      Catalogue Data Backup & Restore
                    </h4>
                    <p className="text-xs text-softgrey leading-relaxed">
                      Export the current product catalogue into a clean JSON file, or restore default initial catalogue entries.
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleExportJSON}
                        className="flex-1 py-2.5 px-4 bg-charcoal text-ivory text-xs uppercase tracking-wider rounded-xs flex items-center justify-center space-x-2"
                      >
                        <Download className="w-4 h-4 text-sand" />
                        <span>Download products.json</span>
                      </button>

                      <label className="flex-1 py-2.5 px-4 border border-sand hover:border-taupe bg-warmwhite text-charcoal text-xs uppercase tracking-wider rounded-xs flex items-center justify-center space-x-2 cursor-pointer text-center">
                        <Upload className="w-4 h-4 text-taupe" />
                        <span>Upload JSON</span>
                        <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                      </label>
                    </div>
                  </div>

                  <div className="p-6 bg-sand/20 border border-sand rounded-sm space-y-3">
                    <h4 className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                      Reset to Verified Defaults
                    </h4>
                    <p className="text-xs text-softgrey">
                      Revert all products to the original curated illustrative catalogue (Granite, Marble, Tiles, Quartz).
                    </p>
                    <button
                      onClick={onResetProducts}
                      className="px-4 py-2 bg-warmwhite border border-sand hover:border-red-400 text-red-600 text-xs uppercase tracking-wider rounded-xs flex items-center space-x-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset All to Default</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
