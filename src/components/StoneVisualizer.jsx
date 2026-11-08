import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  Compass,
  Sliders,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCcw,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  Check,
  ChevronRight,
  Info
} from 'lucide-react';
import { ENVIRONMENTS, CATEGORIES, getVisualizerPreview } from '../data/visualizerManifest';
import { buildWhatsAppUrl, createVisualizerEnquiryMessage, WHATSAPP_DISPLAY } from '../utils/whatsapp';
import { getAssetUrl } from '../utils/imageHelper';

export const StoneVisualizer = ({ products = [], preselectedConfig = null }) => {
  // Step 1: Room Environment Selection
  const [selectedEnvId, setSelectedEnvId] = useState('kitchen');
  const currentEnv = useMemo(
    () => ENVIRONMENTS.find((e) => e.id === selectedEnvId) || ENVIRONMENTS[0],
    [selectedEnvId]
  );

  // Step 2: Category Selection
  const [selectedCategory, setSelectedCategory] = useState('Granite');

  // Filter stones in current category
  const stonesInCategory = useMemo(() => {
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  // Step 3: Stone Selection
  const [selectedStoneId, setSelectedStoneId] = useState(() => {
    const firstGranite = products.find((p) => p.category === 'Granite');
    return firstGranite ? firstGranite.id : 'granite-black-galaxy';
  });

  const currentStone = useMemo(() => {
    return (
      products.find((p) => p.id === selectedStoneId) ||
      stonesInCategory[0] ||
      products[0]
    );
  }, [products, selectedStoneId, stonesInCategory]);

  // Step 4: Application Selection (suitability filtered by room and category)
  const suitableApplications = useMemo(() => {
    if (!currentEnv?.applications) return [];
    return currentEnv.applications.filter((app) => {
      const allowedCategories = currentEnv.applicationSuitability?.[app];
      if (!allowedCategories) return true;
      return allowedCategories.includes(selectedCategory);
    });
  }, [currentEnv, selectedCategory]);

  const [selectedApplication, setSelectedApplication] = useState('Countertop');

  // Handle incoming preselection from Catalogue or ProductModal
  useEffect(() => {
    if (preselectedConfig) {
      if (preselectedConfig.category) {
        setSelectedCategory(preselectedConfig.category);
      }
      if (preselectedConfig.stoneId) {
        setSelectedStoneId(preselectedConfig.stoneId);
      }
      if (preselectedConfig.roomId) {
        setSelectedEnvId(preselectedConfig.roomId);
      }
      if (preselectedConfig.application) {
        setSelectedApplication(preselectedConfig.application);
      }
    }
  }, [preselectedConfig]);

  // Sync application when suitable list changes
  useEffect(() => {
    if (suitableApplications.length > 0 && !suitableApplications.includes(selectedApplication)) {
      setSelectedApplication(suitableApplications[0]);
    }
  }, [suitableApplications, selectedApplication]);

  // Sync selected stone if category changes
  useEffect(() => {
    if (currentStone && currentStone.category !== selectedCategory) {
      if (stonesInCategory.length > 0) {
        setSelectedStoneId(stonesInCategory[0].id);
      }
    }
  }, [selectedCategory, currentStone, stonesInCategory]);

  // Step 5: Lookup realistic before/after photographic preview
  const previewData = useMemo(() => {
    return getVisualizerPreview(selectedEnvId, selectedStoneId, selectedApplication);
  }, [selectedEnvId, selectedStoneId, selectedApplication]);

  // Comparison Slider State (0 to 100 percentage)
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef(null);

  // Mouse / Touch Dragging Handler
  const handleMove = useCallback(
    (clientX) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (!isDragging || !e.touches[0]) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleStopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleStopDragging);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleStopDragging);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleStopDragging);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleStopDragging);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleStopDragging]);

  // Reset visualizer controls
  const handleResetControls = () => {
    setSliderPosition(50);
    setZoomLevel(1);
  };

  // WhatsApp Enquiry deep link
  const visualizerWhatsappUrl = buildWhatsAppUrl(
    createVisualizerEnquiryMessage({
      room: currentEnv.name,
      category: selectedCategory,
      stoneName: currentStone?.name || 'Natural Stone',
      application: selectedApplication,
    })
  );

  return (
    <section id="visualizer" className="py-20 lg:py-28 bg-ivory border-b border-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-taupe font-semibold mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Interactive Space Visualizer</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal tracking-tight">
              Visualize in Real Space.
            </h2>
            <p className="text-sm sm:text-base text-charcoal/75 mt-3 leading-relaxed">
              Experience genuine photographic before-and-after installations. Select an interior room, stone variety, and intended architectural surface.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3 text-xs text-softgrey">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Photographic Comparison Active</span>
          </div>
        </div>

        {/* 5-Step Process Indicator Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pb-6 border-b border-sand/60 text-xs">
          <div className="p-2.5 bg-warmwhite border border-sand rounded-xs">
            <span className="text-[10px] uppercase tracking-widest text-taupe font-semibold block">Step 1</span>
            <span className="font-semibold text-charcoal truncate block">Room: {currentEnv.name}</span>
          </div>
          <div className="p-2.5 bg-warmwhite border border-sand rounded-xs">
            <span className="text-[10px] uppercase tracking-widest text-taupe font-semibold block">Step 2</span>
            <span className="font-semibold text-charcoal truncate block">Category: {selectedCategory}</span>
          </div>
          <div className="p-2.5 bg-warmwhite border border-sand rounded-xs">
            <span className="text-[10px] uppercase tracking-widest text-taupe font-semibold block">Step 3</span>
            <span className="font-semibold text-charcoal truncate block">Stone: {currentStone?.name}</span>
          </div>
          <div className="p-2.5 bg-warmwhite border border-sand rounded-xs">
            <span className="text-[10px] uppercase tracking-widest text-taupe font-semibold block">Step 4</span>
            <span className="font-semibold text-charcoal truncate block">Surface: {selectedApplication}</span>
          </div>
          <div className="col-span-2 sm:col-span-1 p-2.5 bg-charcoal text-ivory rounded-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-sand font-semibold block">Step 5</span>
              <span className="font-semibold truncate block">Realistic Preview</span>
            </div>
            <CheckCircle2 className="w-4 h-4 text-sand" />
          </div>
        </div>

        {/* Main Visualizer Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          {/* Left Canvas: Draggable Comparison Slider */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <div
              ref={containerRef}
              className={`relative aspect-[16/10] sm:aspect-[16/9] w-full bg-sand/30 overflow-hidden select-none border border-sand rounded-sm shadow-subtle ${
                isFullscreen ? 'fixed inset-0 z-50 aspect-auto rounded-none border-none' : ''
              }`}
            >
              {/* Layer 1: BEFORE / Base Room Photograph */}
              <div
                className="absolute inset-0 w-full h-full transition-transform duration-200"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                }}
              >
                <img
                  src={getAssetUrl(currentEnv.baseImage)}
                  alt={`${currentEnv.name} original room view`}
                  className="w-full h-full object-cover object-center pointer-events-none"
                  loading="eager"
                />
              </div>

              {/* Before Label Badge */}
              <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                <span className="bg-charcoal/85 backdrop-blur-sm text-sand text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-xs font-semibold shadow-xs">
                  Original Space
                </span>
              </div>

              {/* Layer 2: AFTER Photograph with Selected Stone Applied */}
              {previewData?.afterImage ? (
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div
                    className="absolute inset-0 w-full h-full transition-transform duration-200"
                    style={{
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: 'center center',
                      width: containerRef.current
                        ? `${containerRef.current.clientWidth}px`
                        : '100%',
                      maxWidth: 'none',
                    }}
                  >
                    <img
                      src={getAssetUrl(previewData.afterImage)}
                      alt={`${currentStone?.name} installed in ${currentEnv.name} for ${selectedApplication}`}
                      className="w-full h-full object-cover object-center pointer-events-none"
                      loading="eager"
                    />
                  </div>

                  {/* After Label Badge */}
                  <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                    <span className="bg-sand/95 backdrop-blur-sm text-charcoal border border-taupe/40 text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-xs font-semibold shadow-xs">
                      {currentStone?.name} · {selectedApplication}
                    </span>
                  </div>
                </div>
              ) : (
                /* Fallback: Clear "Preview Coming Soon" Message (Mandatory Section 5) */
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none bg-charcoal/85 backdrop-blur-xs flex items-center justify-center text-center p-6"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div className="bg-warmwhite/95 p-6 rounded-sm border border-sand max-w-sm shadow-luxury pointer-events-auto">
                    <AlertCircle className="w-8 h-8 text-taupe mx-auto mb-2" />
                    <span className="text-[10px] uppercase tracking-widest text-taupe font-semibold">
                      Photographic Notice
                    </span>
                    <h4 className="font-heading text-xl text-charcoal font-semibold mt-1 mb-1.5">
                      Preview Coming Soon
                    </h4>
                    <p className="text-xs text-softgrey leading-relaxed mb-4">
                      A dedicated room photograph for <strong>{currentStone?.name}</strong> applied as <strong>{selectedApplication}</strong> in the {currentEnv.name} is currently scheduled for photography.
                    </p>
                    <a
                      href={visualizerWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-charcoal text-ivory text-[10px] uppercase tracking-wider font-semibold rounded-xs flex items-center justify-center space-x-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-sand" />
                      <span>Request Lot Photos on WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Draggable Vertical Slider Handle */}
              <div
                className="absolute top-0 bottom-0 z-20 slider-handle cursor-ew-resize flex items-center justify-center"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                onMouseDown={() => setIsDragging(true)}
                onTouchStart={() => setIsDragging(true)}
              >
                <div className="w-[2px] h-full bg-warmwhite shadow-luxury"></div>
                <div className="absolute w-10 h-10 rounded-full bg-warmwhite text-charcoal border border-sand shadow-luxury flex items-center justify-center space-x-1 pointer-events-none transition-transform">
                  <Sliders className="w-4 h-4 text-taupe-dark rotate-90" />
                </div>
              </div>

              {/* Top Control Bar: Zoom In, Zoom Out, Fullscreen, Reset */}
              <div className="absolute top-4 right-4 z-30 flex items-center space-x-1.5 bg-warmwhite/90 backdrop-blur-sm p-1 border border-sand rounded-xs shadow-sm">
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(prev + 0.35, 2.4))}
                  className="p-1.5 text-charcoal hover:text-taupe rounded-xs hover:bg-sand/30"
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(prev - 0.35, 1))}
                  className="p-1.5 text-charcoal hover:text-taupe rounded-xs hover:bg-sand/30"
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                {zoomLevel !== 1 && (
                  <button
                    onClick={() => setZoomLevel(1)}
                    className="p-1.5 text-charcoal hover:text-taupe rounded-xs hover:bg-sand/30 text-[10px] uppercase font-bold"
                    title="Reset Zoom"
                  >
                    1x
                  </button>
                )}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1.5 text-charcoal hover:text-taupe rounded-xs hover:bg-sand/30"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                  aria-label="Toggle Fullscreen"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={handleResetControls}
                  className="p-1.5 text-charcoal hover:text-taupe rounded-xs hover:bg-sand/30"
                  title="Reset Slider"
                  aria-label="Reset Slider"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Slider Position Hint */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="bg-warmwhite/80 backdrop-blur-sm text-charcoal text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs border border-sand/60">
                  Drag slider · {Math.round(sliderPosition)}%
                </span>
              </div>
            </div>

            {/* Caption & Architectural Notes */}
            {previewData ? (
              <div className="p-4 bg-warmwhite border border-sand rounded-xs flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-charcoal font-medium">
                    {previewData.caption}
                  </p>
                  <p className="text-[11px] text-softgrey mt-1">
                    Applied Finish: <strong className="text-charcoal">{previewData.finish}</strong>
                  </p>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] uppercase tracking-wider font-semibold rounded-xs shrink-0">
                  Prepared Render
                </span>
              </div>
            ) : (
              <div className="p-4 bg-warmwhite border border-sand rounded-xs flex items-start gap-3">
                <Info className="w-4 h-4 text-taupe shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-charcoal">
                    No authentic installation render is prepared yet for <strong>{currentStone?.name}</strong> in the {currentEnv.name} for <strong>{selectedApplication}</strong>.
                  </p>
                  <p className="text-[11px] text-softgrey mt-0.5">
                    We only display genuine stone photographic installations. Inquire directly on WhatsApp to receive high-res physical slab and reference photos.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Step-by-Step Selectors & Material Swatches */}
          <div className="lg:col-span-4 space-y-6">
            {/* Step 1: Select Room (6 Rooms Required) */}
            <div className="p-4 bg-warmwhite border border-sand rounded-xs">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] uppercase tracking-widest text-taupe font-semibold">
                  Step 1 · Interior Environment
                </span>
                <span className="text-[11px] text-softgrey">6 Rooms</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {ENVIRONMENTS.map((env) => (
                  <button
                    key={env.id}
                    onClick={() => setSelectedEnvId(env.id)}
                    className={`p-2 text-xs text-center rounded-xs border transition-colors ${
                      selectedEnvId === env.id
                        ? 'bg-charcoal text-ivory border-charcoal font-medium shadow-xs'
                        : 'bg-ivory hover:bg-sand/40 border-sand text-charcoal'
                    }`}
                  >
                    {env.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Material Category */}
            <div className="p-4 bg-warmwhite border border-sand rounded-xs">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] uppercase tracking-widest text-taupe font-semibold">
                  Step 2 · Material Family
                </span>
                <span className="text-[11px] text-softgrey">{stonesInCategory.length} varieties</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`py-2 px-1 text-xs text-center rounded-xs border transition-colors ${
                      selectedCategory === cat
                        ? 'bg-charcoal text-ivory border-charcoal font-medium shadow-xs'
                        : 'bg-ivory hover:bg-sand/40 border-sand text-charcoal'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Select Stone Variety (with genuine slab thumbnails) */}
            <div className="p-4 bg-warmwhite border border-sand rounded-xs">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] uppercase tracking-widest text-taupe font-semibold">
                  Step 3 · Stone Variety
                </span>
                <span className="text-[11px] text-softgrey">{currentStone?.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                {stonesInCategory.map((stone) => {
                  const isSelected = selectedStoneId === stone.id;
                  return (
                    <button
                      key={stone.id}
                      onClick={() => setSelectedStoneId(stone.id)}
                      className={`group/stone p-1.5 text-left rounded-xs border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-charcoal bg-sand/30 ring-1 ring-charcoal'
                          : 'border-sand hover:border-taupe bg-ivory'
                      }`}
                    >
                      <div className="aspect-square w-full overflow-hidden bg-sand/30 rounded-xs mb-1.5">
                        <img
                          src={getAssetUrl(stone.image)}
                          alt={stone.name}
                          className="w-full h-full object-cover group-hover/stone:scale-105 transition-transform"
                          loading="lazy"
                        />
                      </div>
                      <p className="text-[11px] font-medium text-charcoal truncate">
                        {stone.name}
                      </p>
                      <p className="text-[9px] text-softgrey truncate mt-0.5">
                        {stone.colorTone}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Select Application Area */}
            <div className="p-4 bg-warmwhite border border-sand rounded-xs">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] uppercase tracking-widest text-taupe font-semibold">
                  Step 4 · Architectural Application
                </span>
                <span className="text-[11px] text-softgrey">Room-specific</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {suitableApplications.map((app) => {
                  const isSelected = selectedApplication === app;
                  return (
                    <button
                      key={app}
                      onClick={() => setSelectedApplication(app)}
                      className={`px-3 py-1.5 text-xs rounded-xs border transition-colors flex items-center space-x-1.5 ${
                        isSelected
                          ? 'bg-charcoal text-ivory border-charcoal font-medium shadow-xs'
                          : 'bg-ivory hover:bg-sand/40 border-sand text-charcoal'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-sand" />}
                      <span>{app}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Direct WhatsApp Enquiry with Pre-filled Context */}
            <div className="p-4 bg-charcoal text-ivory rounded-xs space-y-3">
              <div className="flex items-center space-x-2 text-sand text-xs uppercase tracking-wider font-semibold">
                <MessageCircle className="w-4 h-4" />
                <span>Enquire About This Setup</span>
              </div>
              <p className="text-xs text-ivory/80 leading-relaxed">
                Connect directly with our stone specialists in Kolhapur to verify availability, slab batch thickness, and quotation.
              </p>
              <div className="p-2.5 bg-charcoal-deep rounded-xs text-[11px] text-sand/90 font-mono space-y-0.5">
                <div>Stone: {currentStone?.name}</div>
                <div>Category: {selectedCategory}</div>
                <div>Room: {currentEnv.name}</div>
                <div>Application: {selectedApplication}</div>
              </div>
              <a
                href={visualizerWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-sand hover:bg-sand-dark text-charcoal text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>WhatsApp Enquiry</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <p className="text-[10px] text-ivory/60 text-center tracking-wider">
                Official Business Number: {WHATSAPP_DISPLAY}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
