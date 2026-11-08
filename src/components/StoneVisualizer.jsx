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
  ChevronRight,
  Eye,
  Layers,
  ArrowRight,
  Sun,
  Moon,
  Lamp,
  SplitSquareVertical,
  Check
} from 'lucide-react';
import { ENVIRONMENTS, CATEGORIES, getVisualizerPreview } from '../data/visualizerManifest';
import {
  buildWhatsAppUrl,
  createVisualizerEnquiryMessage,
  createSlabInspectorEnquiryMessage,
  createDualComparisonEnquiryMessage,
  WHATSAPP_DISPLAY
} from '../utils/whatsapp';

export const StoneVisualizer = ({ products = [] }) => {
  // Master Visualizer Experience Switcher: '1.0-room' | '2.0-slab' | '3.0-comparison'
  const [activeExperience, setActiveExperience] = useState('1.0-room');

  // ==========================================
  // EXPERIENCE 1.0: REALISTIC ROOM VISUALIZER
  // ==========================================
  const [selectedEnvId, setSelectedEnvId] = useState('kitchen');
  const currentEnv = useMemo(
    () => ENVIRONMENTS.find((e) => e.id === selectedEnvId) || ENVIRONMENTS[0],
    [selectedEnvId]
  );

  const [selectedCategory, setSelectedCategory] = useState('Granite');

  const stonesInCategory = useMemo(() => {
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

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

  const suitableApplications = useMemo(() => {
    if (!currentEnv?.applications) return [];
    return currentEnv.applications.filter((app) => {
      const allowedCategories = currentEnv.applicationSuitability?.[app];
      if (!allowedCategories) return true;
      return allowedCategories.includes(selectedCategory);
    });
  }, [currentEnv, selectedCategory]);

  const [selectedApplication, setSelectedApplication] = useState('Countertop');

  useEffect(() => {
    if (suitableApplications.length > 0 && !suitableApplications.includes(selectedApplication)) {
      setSelectedApplication(suitableApplications[0]);
    }
  }, [suitableApplications, selectedApplication]);

  useEffect(() => {
    if (currentStone && currentStone.category !== selectedCategory) {
      if (stonesInCategory.length > 0) {
        setSelectedStoneId(stonesInCategory[0].id);
      }
    }
  }, [selectedCategory, currentStone, stonesInCategory]);

  const previewData = useMemo(() => {
    return getVisualizerPreview(selectedEnvId, selectedStoneId, selectedApplication);
  }, [selectedEnvId, selectedStoneId, selectedApplication]);

  // Comparison Slider State (Room Visualizer)
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  // Zoom & Fullscreen
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTextureModal, setShowTextureModal] = useState(false);

  // Slider Dragging Logic
  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFullscreen]);

  const handleResetSelection = () => {
    setSelectedEnvId('kitchen');
    setSelectedCategory('Granite');
    const defaultGranite = products.find((p) => p.category === 'Granite');
    if (defaultGranite) setSelectedStoneId(defaultGranite.id);
    setSelectedApplication('Countertop');
    setSliderPosition(50);
    setZoomLevel(1);
  };

  const roomWhatsappUrl = useMemo(() => {
    return buildWhatsAppUrl(
      createVisualizerEnquiryMessage({
        stoneName: currentStone?.name || 'Selected Stone',
        category: selectedCategory,
        room: currentEnv?.name || 'Interior Space',
        application: selectedApplication,
      })
    );
  }, [currentStone, selectedCategory, currentEnv, selectedApplication]);

  // ==========================================
  // EXPERIENCE 2.0: SLAB & LIGHTING INSPECTOR
  // ==========================================
  const [inspectorStoneId, setInspectorStoneId] = useState('granite-black-galaxy');
  const [lightingMode, setLightingMode] = useState('daylight'); // 'daylight' | 'warm' | 'studio'
  const [selectedFinish, setSelectedFinish] = useState('Mirror Polished');

  const inspectorStone = useMemo(() => {
    return products.find((p) => p.id === inspectorStoneId) || products[0];
  }, [products, inspectorStoneId]);

  const inspectorWhatsappUrl = useMemo(() => {
    return buildWhatsAppUrl(
      createSlabInspectorEnquiryMessage({
        stoneName: inspectorStone?.name || 'Slab Lot',
        category: inspectorStone?.category || 'Natural Stone',
        lighting: lightingMode === 'daylight' ? 'Natural Daylight (5000K)' : lightingMode === 'warm' ? 'Warm Architectural (3000K)' : 'Studio Gallery Accent',
        finish: selectedFinish,
      })
    );
  }, [inspectorStone, lightingMode, selectedFinish]);

  // Lighting Filter Styles
  const getLightingStyle = () => {
    switch (lightingMode) {
      case 'warm':
        return 'sepia-[0.25] brightness-[1.03] contrast-[1.02] hue-rotate-[-10deg]';
      case 'studio':
        return 'brightness-[1.12] contrast-[1.18] saturate-[1.1]';
      case 'daylight':
      default:
        return 'brightness-[0.98] contrast-[1.04]';
    }
  };

  // ==========================================
  // EXPERIENCE 3.0: DUAL STONE COMPARISON
  // ==========================================
  const [compareStoneAId, setCompareStoneAId] = useState('granite-black-galaxy');
  const [compareStoneBId, setCompareStoneBId] = useState('quartz-calacatta-style');
  const [compareSliderPos, setCompareSliderPos] = useState(50);
  const [isCompareDragging, setIsCompareDragging] = useState(false);
  const compareRef = useRef(null);

  const compareStoneA = useMemo(() => {
    return products.find((p) => p.id === compareStoneAId) || products[0];
  }, [products, compareStoneAId]);

  const compareStoneB = useMemo(() => {
    return products.find((p) => p.id === compareStoneBId) || products[1] || products[0];
  }, [products, compareStoneBId]);

  const handleCompareMove = useCallback((clientX) => {
    if (!compareRef.current) return;
    const rect = compareRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setCompareSliderPos(percentage);
  }, []);

  const handleCompareTouchMove = useCallback((e) => {
    if (!isCompareDragging) return;
    handleCompareMove(e.touches[0].clientX);
  }, [isCompareDragging, handleCompareMove]);

  const handleCompareMouseMove = useCallback((e) => {
    if (!isCompareDragging) return;
    handleCompareMove(e.clientX);
  }, [isCompareDragging, handleCompareMove]);

  const handleCompareMouseUp = useCallback(() => {
    setIsCompareDragging(false);
  }, []);

  useEffect(() => {
    if (isCompareDragging) {
      window.addEventListener('mousemove', handleCompareMouseMove);
      window.addEventListener('mouseup', handleCompareMouseUp);
      window.addEventListener('touchmove', handleCompareTouchMove);
      window.addEventListener('touchend', handleCompareMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleCompareMouseMove);
      window.removeEventListener('mouseup', handleCompareMouseUp);
      window.removeEventListener('touchmove', handleCompareTouchMove);
      window.removeEventListener('touchend', handleCompareMouseUp);
    };
  }, [isCompareDragging, handleCompareMouseMove, handleCompareMouseUp, handleCompareTouchMove]);

  const dualWhatsappUrl = useMemo(() => {
    return buildWhatsAppUrl(
      createDualComparisonEnquiryMessage({
        stoneA: compareStoneA,
        stoneB: compareStoneB,
        preferredStone: compareStoneA.name,
      })
    );
  }, [compareStoneA, compareStoneB]);

  return (
    <section id="visualizer" className="py-16 lg:py-24 bg-ivory border-b border-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 lg:mb-10 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-taupe font-semibold mb-2.5">
              <Compass className="w-3.5 h-3.5 text-taupe" />
              <span>Interactive Stone Visualizer Suite</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal tracking-tight">
              Preview Real Stone in Your Space.
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/75 mt-2.5 leading-relaxed">
              Explore three distinct architectural visualization experiences: realistic room installations, macro slab lighting simulation, and side-by-side stone comparison.
            </p>
          </div>

          {/* Reset Selection Button (when in Room Visualizer) */}
          {activeExperience === '1.0-room' && (
            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={handleResetSelection}
                className="px-3.5 py-2 bg-warmwhite hover:bg-sand/30 border border-sand text-charcoal text-xs uppercase tracking-wider font-medium transition-colors flex items-center space-x-1.5 rounded-xs shadow-xs"
                title="Reset room visualizer selections to default"
              >
                <RotateCcw className="w-3.5 h-3.5 text-taupe-dark" />
                <span>Reset Selection</span>
              </button>
            </div>
          )}
        </div>

        {/* TASK 3: THREE DISTINCT VISUALIZER EXPERIENCES TABS */}
        <div className="flex items-center space-x-2 bg-warmwhite p-1.5 border border-sand rounded-xs mb-8 overflow-x-auto shadow-xs">
          <button
            onClick={() => setActiveExperience('1.0-room')}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors whitespace-nowrap flex items-center space-x-2 ${
              activeExperience === '1.0-room'
                ? 'bg-charcoal text-ivory shadow-xs'
                : 'text-charcoal/80 hover:text-charcoal hover:bg-sand/30'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-sand" />
            <span>1.0 Room Visualizer (6 Rooms & Surfaces)</span>
          </button>

          <button
            onClick={() => setActiveExperience('2.0-slab')}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors whitespace-nowrap flex items-center space-x-2 ${
              activeExperience === '2.0-slab'
                ? 'bg-charcoal text-ivory shadow-xs'
                : 'text-charcoal/80 hover:text-charcoal hover:bg-sand/30'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-sand" />
            <span>2.0 Macro Slab & Lighting Inspector</span>
          </button>

          <button
            onClick={() => setActiveExperience('3.0-comparison')}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors whitespace-nowrap flex items-center space-x-2 ${
              activeExperience === '3.0-comparison'
                ? 'bg-charcoal text-ivory shadow-xs'
                : 'text-charcoal/80 hover:text-charcoal hover:bg-sand/30'
            }`}
          >
            <SplitSquareVertical className="w-3.5 h-3.5 text-sand" />
            <span>3.0 Dual Stone Comparison Slider</span>
          </button>
        </div>

        {/* ==================================================== */}
        {/* EXPERIENCE 1.0: REALISTIC PHOTO ROOM VISUALIZER     */}
        {/* ==================================================== */}
        {activeExperience === '1.0-room' && (
          <div>
            {/* 5-Step Process Ribbon Indicator */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pb-6 border-b border-sand/60 text-xs">
              <div className="p-2.5 bg-warmwhite border border-sand rounded-xs">
                <span className="text-[10px] uppercase tracking-widest text-taupe font-semibold block">Step 1</span>
                <span className="font-semibold text-charcoal truncate block">Room: {currentEnv.name}</span>
              </div>
              <div className="p-2.5 bg-warmwhite border border-sand rounded-xs">
                <span className="text-[10px] uppercase tracking-widest text-taupe font-semibold block">Step 2</span>
                <span className="font-semibold text-charcoal truncate block">Family: {selectedCategory}</span>
              </div>
              <div className="p-2.5 bg-warmwhite border border-sand rounded-xs">
                <span className="text-[10px] uppercase tracking-widest text-taupe font-semibold block">Step 3</span>
                <span className="font-semibold text-charcoal truncate block">Stone: {currentStone?.name}</span>
              </div>
              <div className="p-2.5 bg-warmwhite border border-sand rounded-xs">
                <span className="text-[10px] uppercase tracking-widest text-taupe font-semibold block">Step 4</span>
                <span className="font-semibold text-charcoal truncate block">Area: {selectedApplication}</span>
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
              {/* Left: Interactive Draggable Comparison Canvas */}
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
                      src={currentEnv.baseImage}
                      alt={`${currentEnv.name} original room view`}
                      className="w-full h-full object-cover object-center pointer-events-none"
                    />
                  </div>

                  {/* Original Space Badge */}
                  <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                    <span className="bg-charcoal/85 backdrop-blur-sm text-sand text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-xs font-semibold shadow-xs">
                      Original Space
                    </span>
                  </div>

                  {/* Layer 2: AFTER Photograph with Chosen Stone Applied */}
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
                          src={previewData.afterImage}
                          alt={`${currentStone?.name} in ${currentEnv.name} for ${selectedApplication}`}
                          className="w-full h-full object-cover object-center pointer-events-none"
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
                    /* Fallback: Preview Coming Soon */
                    <div
                      className="absolute inset-0 overflow-hidden pointer-events-none bg-charcoal/80 backdrop-blur-xs flex items-center justify-center text-center p-6"
                      style={{ width: `${sliderPosition}%` }}
                    >
                      <div className="bg-warmwhite/95 p-6 rounded-sm border border-sand max-w-sm shadow-luxury pointer-events-auto">
                        <AlertCircle className="w-8 h-8 text-taupe mx-auto mb-2" />
                        <span className="text-[10px] uppercase tracking-widest text-taupe font-semibold">
                          Asset Mapping Notice
                        </span>
                        <h4 className="font-heading text-xl text-charcoal font-semibold mt-1 mb-1.5">
                          Preview Coming Soon
                        </h4>
                        <p className="text-xs text-softgrey leading-relaxed mb-4">
                          A dedicated room photograph for <strong>{currentStone?.name}</strong> applied as <strong>{selectedApplication}</strong> in the {currentEnv.name} is scheduled for photography.
                        </p>
                        <div className="flex items-center justify-center space-x-2">
                          <a
                            href={roomWhatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-charcoal text-ivory text-[10px] uppercase tracking-wider font-semibold rounded-xs flex items-center space-x-1.5"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-sand" />
                            <span>Request Photos on WhatsApp</span>
                          </a>
                        </div>
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

                  {/* Top Control Bar: Zoom In, Zoom Out, Fullscreen, Texture Inspect */}
                  <div className="absolute top-4 right-4 z-30 flex items-center space-x-1.5 bg-warmwhite/90 backdrop-blur-sm p-1 border border-sand rounded-xs shadow-sm">
                    <button
                      onClick={() => setZoomLevel((prev) => Math.min(prev + 0.35, 2.4))}
                      className="p-1.5 text-charcoal hover:text-taupe rounded-xs hover:bg-sand/30"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setZoomLevel((prev) => Math.max(prev - 0.35, 1))}
                      className="p-1.5 text-charcoal hover:text-taupe rounded-xs hover:bg-sand/30"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    {zoomLevel !== 1 && (
                      <button
                        onClick={() => setZoomLevel(1)}
                        className="px-2 py-0.5 text-[10px] text-softgrey hover:text-charcoal uppercase font-semibold border-l border-sand"
                        title="Reset Zoom"
                      >
                        1x
                      </button>
                    )}
                    {currentStone?.textureImage && (
                      <button
                        onClick={() => setShowTextureModal(true)}
                        className="p-1.5 text-charcoal hover:text-taupe rounded-xs hover:bg-sand/30 border-l border-sand"
                        title="Inspect Close-up Texture"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-1.5 text-charcoal hover:text-taupe rounded-xs hover:bg-sand/30 border-l border-sand"
                      title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Preview'}
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-4 h-4" />
                      ) : (
                        <Maximize2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="absolute top-4 left-4 z-10 pointer-events-none hidden sm:block">
                    <span className="bg-warmwhite/80 backdrop-blur-sm text-charcoal/80 text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-xs border border-sand/60">
                      Drag slider horizontally to compare
                    </span>
                  </div>
                </div>

                {/* Display Card: Selected Room, Category, Material, and Application */}
                <div className="p-4 sm:p-5 bg-warmwhite border border-sand rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                  <div className="flex items-center space-x-3.5">
                    {currentStone?.textureImage && (
                      <img
                        src={currentStone.textureImage}
                        alt={currentStone.name}
                        className="w-12 h-12 rounded-xs object-cover border border-sand shrink-0 shadow-xs"
                      />
                    )}
                    <div>
                      <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-softgrey">
                        <span>{currentEnv.name}</span>
                        <span>•</span>
                        <span>{selectedCategory}</span>
                        <span>•</span>
                        <span className="text-taupe-dark font-semibold">{selectedApplication}</span>
                      </div>
                      <h3 className="font-heading text-xl text-charcoal font-semibold mt-0.5">
                        {currentStone?.name}
                      </h3>
                      <p className="text-xs text-softgrey mt-0.5 line-clamp-1">
                        {previewData?.caption || currentStone?.shortDescription}
                      </p>
                    </div>
                  </div>

                  <a
                    href={roomWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3 bg-charcoal hover:bg-charcoal-deep text-ivory text-xs uppercase tracking-[0.2em] font-medium rounded-xs transition-all duration-200 flex items-center justify-center space-x-2 shrink-0 shadow-subtle group"
                  >
                    <MessageCircle className="w-4 h-4 text-sand transition-transform group-hover:scale-110" />
                    <span>Enquire This Configuration</span>
                  </a>
                </div>
              </div>

              {/* Right: Steps 1, 2, 3, 4 Selection Panels */}
              <div className="lg:col-span-4 bg-warmwhite border border-sand p-6 rounded-sm shadow-subtle space-y-6">
                {/* Step 1: Select Environment */}
                <div className="pb-5 border-b border-sand">
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-[11px] uppercase tracking-widest text-charcoal font-semibold flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-sand/60 text-taupe-dark flex items-center justify-center text-[10px]">
                        1
                      </span>
                      <span>Select Environment</span>
                    </label>
                    <span className="text-[10px] text-softgrey">{ENVIRONMENTS.length} Spaces</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {ENVIRONMENTS.map((env) => {
                      const isSelected = selectedEnvId === env.id;
                      return (
                        <button
                          key={env.id}
                          onClick={() => setSelectedEnvId(env.id)}
                          className={`py-2 px-3 text-xs rounded-xs border text-left font-medium transition-colors ${
                            isSelected
                              ? 'bg-charcoal text-ivory border-charcoal font-semibold shadow-xs'
                              : 'bg-ivory hover:bg-sand/30 border-sand text-charcoal/80'
                          }`}
                        >
                          {env.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Select Category */}
                <div className="pb-5 border-b border-sand">
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-[11px] uppercase tracking-widest text-charcoal font-semibold flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-sand/60 text-taupe-dark flex items-center justify-center text-[10px]">
                        2
                      </span>
                      <span>Select Category</span>
                    </label>
                    <span className="text-[10px] text-softgrey">{CATEGORIES.length} Families</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`py-2 px-2 text-xs rounded-xs border text-center font-medium transition-colors ${
                            isSelected
                              ? 'bg-charcoal text-ivory border-charcoal font-semibold'
                              : 'bg-ivory hover:bg-sand/30 border-sand text-charcoal/80'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Select Stone */}
                <div className="pb-5 border-b border-sand">
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-[11px] uppercase tracking-widest text-charcoal font-semibold flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-sand/60 text-taupe-dark flex items-center justify-center text-[10px]">
                        3
                      </span>
                      <span>Select {selectedCategory} Stone</span>
                    </label>
                    <span className="text-[10px] text-softgrey">{stonesInCategory.length} Available</span>
                  </div>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {stonesInCategory.map((stone) => {
                      const isSelected = selectedStoneId === stone.id;
                      return (
                        <button
                          key={stone.id}
                          onClick={() => setSelectedStoneId(stone.id)}
                          className={`w-full text-left p-2.5 rounded-xs border transition-all duration-200 flex items-center justify-between ${
                            isSelected
                              ? 'bg-ivory border-charcoal shadow-xs'
                              : 'bg-warmwhite hover:bg-sand/20 border-sand text-charcoal/80'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            {stone.textureImage && (
                              <img
                                src={stone.textureImage}
                                alt={stone.name}
                                className="w-7 h-7 rounded-full object-cover border border-sand shrink-0"
                              />
                            )}
                            <div>
                              <p className="text-xs font-semibold text-charcoal">{stone.name}</p>
                              <p className="text-[10px] text-softgrey">{stone.colorTone || stone.category}</p>
                            </div>
                          </div>
                          {isSelected ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-taupe-dark shrink-0" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-sand shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 4: Select Suitable Application */}
                <div className="pb-2">
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-[11px] uppercase tracking-widest text-charcoal font-semibold flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-sand/60 text-taupe-dark flex items-center justify-center text-[10px]">
                        4
                      </span>
                      <span>Select Application</span>
                    </label>
                    <span className="text-[10px] text-softgrey">Suitable for {currentEnv.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {suitableApplications.map((app) => {
                      const isSelected = selectedApplication === app;
                      return (
                        <button
                          key={app}
                          onClick={() => setSelectedApplication(app)}
                          className={`px-3 py-1.5 text-xs rounded-xs border transition-colors ${
                            isSelected
                              ? 'bg-charcoal text-ivory border-charcoal font-semibold'
                              : 'bg-ivory hover:bg-sand/30 border-sand text-charcoal/80'
                          }`}
                        >
                          {app}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 border-t border-sand text-[11px] text-softgrey leading-relaxed">
                  <p>
                    Prepares a verified WhatsApp consultation message to <strong>{WHATSAPP_DISPLAY}</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* EXPERIENCE 2.0: MACRO SLAB & LIGHTING INSPECTOR     */}
        {/* ==================================================== */}
        {activeExperience === '2.0-slab' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive Macro Canvas with Lighting Filter */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-sand/30 overflow-hidden border border-sand rounded-sm shadow-subtle group">
                <img
                  src={inspectorStone.image}
                  alt={inspectorStone.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${getLightingStyle()}`}
                />

                {/* Lighting Simulation Badge */}
                <div className="absolute top-4 left-4 bg-charcoal/85 backdrop-blur-sm text-sand text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-xs flex items-center space-x-2">
                  {lightingMode === 'daylight' && <Sun className="w-3.5 h-3.5 text-sand" />}
                  {lightingMode === 'warm' && <Moon className="w-3.5 h-3.5 text-amber-300" />}
                  {lightingMode === 'studio' && <Lamp className="w-3.5 h-3.5 text-blue-200" />}
                  <span>
                    Simulated: {lightingMode === 'daylight' ? 'Natural Daylight (5000K)' : lightingMode === 'warm' ? 'Warm Architectural (3000K)' : 'Studio Gallery Accent (4000K)'}
                  </span>
                </div>

                {/* Finish Badge */}
                <div className="absolute bottom-4 left-4 bg-warmwhite/90 backdrop-blur-sm text-charcoal text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-xs border border-sand">
                  Finish: {selectedFinish}
                </div>
              </div>

              {/* Lighting Mode Selector Pills */}
              <div className="p-4 bg-warmwhite border border-sand rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-taupe font-semibold block">
                    Lighting Environment Simulator
                  </span>
                  <p className="text-xs text-softgrey mt-0.5">
                    Observe how natural mineral crystallization and veining react to different color temperatures.
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => setLightingMode('daylight')}
                    className={`px-3 py-1.5 text-xs rounded-xs font-medium flex items-center space-x-1.5 transition-colors ${
                      lightingMode === 'daylight'
                        ? 'bg-charcoal text-ivory'
                        : 'bg-ivory border border-sand text-charcoal hover:bg-sand/30'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>Daylight</span>
                  </button>

                  <button
                    onClick={() => setLightingMode('warm')}
                    className={`px-3 py-1.5 text-xs rounded-xs font-medium flex items-center space-x-1.5 transition-colors ${
                      lightingMode === 'warm'
                        ? 'bg-charcoal text-ivory'
                        : 'bg-ivory border border-sand text-charcoal hover:bg-sand/30'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>Warm 3000K</span>
                  </button>

                  <button
                    onClick={() => setLightingMode('studio')}
                    className={`px-3 py-1.5 text-xs rounded-xs font-medium flex items-center space-x-1.5 transition-colors ${
                      lightingMode === 'studio'
                        ? 'bg-charcoal text-ivory'
                        : 'bg-ivory border border-sand text-charcoal hover:bg-sand/30'
                    }`}
                  >
                    <Lamp className="w-3.5 h-3.5" />
                    <span>Studio 4000K</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Stone & Surface Controls */}
            <div className="lg:col-span-4 bg-warmwhite border border-sand p-6 rounded-sm shadow-subtle space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-taupe font-semibold block">
                  Select Slab to Inspect
                </span>
                <select
                  value={inspectorStoneId}
                  onChange={(e) => setInspectorStoneId(e.target.value)}
                  className="w-full mt-2 p-2.5 text-xs bg-ivory border border-sand rounded-xs font-medium text-charcoal"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-taupe font-semibold block mb-2">
                  Available Surface Finishes
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {inspectorStone.finishes?.map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFinish(f)}
                      className={`px-3 py-1.5 text-xs rounded-xs border transition-colors ${
                        selectedFinish === f
                          ? 'bg-charcoal text-ivory border-charcoal font-semibold'
                          : 'bg-ivory hover:bg-sand/30 border-sand text-charcoal/80'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-sand/20 border border-sand rounded-xs text-xs space-y-2">
                <p className="font-semibold text-charcoal">{inspectorStone.name}</p>
                <p className="text-softgrey leading-relaxed">{inspectorStone.description}</p>
                {inspectorStone.thickness && (
                  <p className="text-[11px] text-charcoal/80 pt-1 border-t border-sand/60">
                    <strong>Calibrated Thickness:</strong> {inspectorStone.thickness}
                  </p>
                )}
              </div>

              <a
                href={inspectorWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-charcoal hover:bg-charcoal-deep text-ivory text-xs uppercase tracking-widest font-medium rounded-xs flex items-center justify-center space-x-2 shadow-subtle transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-sand" />
                <span>Enquire This Slab Lot</span>
              </a>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* EXPERIENCE 3.0: DUAL STONE COMPARISON SLIDER        */}
        {/* ==================================================== */}
        {activeExperience === '3.0-comparison' && (
          <div className="space-y-8">
            {/* Dual Stone Selectors Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-warmwhite p-4 border border-sand rounded-sm">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-taupe font-semibold block mb-1">
                  Side A (Left)
                </label>
                <select
                  value={compareStoneAId}
                  onChange={(e) => setCompareStoneAId(e.target.value)}
                  className="w-full p-2.5 text-xs bg-ivory border border-sand rounded-xs font-semibold text-charcoal"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.category})
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-softgrey mt-1 block">Tone: {compareStoneA.colorTone}</span>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-taupe font-semibold block mb-1">
                  Side B (Right)
                </label>
                <select
                  value={compareStoneBId}
                  onChange={(e) => setCompareStoneBId(e.target.value)}
                  className="w-full p-2.5 text-xs bg-ivory border border-sand rounded-xs font-semibold text-charcoal"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.category})
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-softgrey mt-1 block">Tone: {compareStoneB.colorTone}</span>
              </div>
            </div>

            {/* Split Comparison Canvas with Draggable Slider */}
            <div
              ref={compareRef}
              className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-sand/30 overflow-hidden select-none border border-sand rounded-sm shadow-subtle cursor-ew-resize"
            >
              {/* Layer B (Right Underneath) */}
              <img
                src={compareStoneB.image}
                alt={compareStoneB.name}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              />

              <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
                <span className="bg-charcoal/85 backdrop-blur-sm text-sand text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-xs font-semibold">
                  Side B: {compareStoneB.name} ({compareStoneB.category})
                </span>
              </div>

              {/* Layer A (Left Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${compareSliderPos}%` }}
              >
                <img
                  src={compareStoneA.image}
                  alt={compareStoneA.name}
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                  style={{
                    width: compareRef.current ? `${compareRef.current.clientWidth}px` : '100%',
                    maxWidth: 'none',
                  }}
                />

                <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                  <span className="bg-sand/95 backdrop-blur-sm text-charcoal border border-taupe/40 text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-xs font-semibold">
                    Side A: {compareStoneA.name} ({compareStoneA.category})
                  </span>
                </div>
              </div>

              {/* Draggable Divider Handle */}
              <div
                className="absolute top-0 bottom-0 z-20 slider-handle cursor-ew-resize flex items-center justify-center"
                style={{ left: `${compareSliderPos}%`, transform: 'translateX(-50%)' }}
                onMouseDown={() => setIsCompareDragging(true)}
                onTouchStart={() => setIsCompareDragging(true)}
              >
                <div className="w-[2px] h-full bg-warmwhite shadow-luxury"></div>
                <div className="absolute w-10 h-10 rounded-full bg-warmwhite text-charcoal border border-sand shadow-luxury flex items-center justify-center space-x-1 pointer-events-none">
                  <SplitSquareVertical className="w-4 h-4 text-taupe-dark" />
                </div>
              </div>
            </div>

            {/* Comparison Parameters Bar & WhatsApp Action */}
            <div className="p-6 bg-warmwhite border border-sand rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1">
                <h4 className="font-heading text-xl text-charcoal font-semibold">
                  Comparing {compareStoneA.name} vs. {compareStoneB.name}
                </h4>
                <p className="text-xs text-softgrey">
                  Side A ({compareStoneA.category}): {compareStoneA.thickness || '18mm/20mm'} · Side B ({compareStoneB.category}): {compareStoneB.thickness || '18mm/20mm'}
                </p>
              </div>

              <a
                href={dualWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-charcoal hover:bg-charcoal-deep text-ivory text-xs uppercase tracking-widest font-medium rounded-xs transition-colors flex items-center space-x-2 shrink-0 shadow-subtle"
              >
                <MessageCircle className="w-4 h-4 text-sand" />
                <span>Enquire About Both Stones</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Texture Magnifier Modal */}
      {showTextureModal && currentStone?.textureImage && (
        <div className="fixed inset-0 z-50 bg-charcoal/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-warmwhite p-6 border border-sand rounded-sm shadow-elevated">
            <button
              onClick={() => setShowTextureModal(false)}
              className="absolute top-4 right-4 text-charcoal hover:text-taupe"
            >
              Close ✕
            </button>
            <span className="text-[10px] uppercase tracking-widest text-taupe font-semibold block">
              High-Resolution Slab Inspection
            </span>
            <h4 className="font-heading text-2xl text-charcoal font-semibold mt-1 mb-3">
              {currentStone.name}
            </h4>
            <div className="aspect-square w-full overflow-hidden rounded-xs border border-sand mb-3 bg-sand/20">
              <img
                src={currentStone.textureImage}
                alt={currentStone.name}
                className="w-full h-full object-cover filter brightness-[0.98]"
              />
            </div>
            <p className="text-xs text-softgrey leading-relaxed">
              Showing authentic crystalline flecks and mineral veining for {currentStone.name} ({currentStone.category}).
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
