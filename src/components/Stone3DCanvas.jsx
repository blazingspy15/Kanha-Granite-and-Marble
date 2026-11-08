import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAssetUrl } from '../utils/imageHelper';

// Register GSAP plugin safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SLAB_TEXTURES = [
  {
    id: 'carrara',
    name: 'Carrara Marble',
    category: 'Italian Marble',
    texture: 'images/textures/marble/italian-carrara-texture.jpg',
    color: '#E8E8E6',
    roughness: 0.16,
    metalness: 0.05
  },
  {
    id: 'black-galaxy',
    name: 'Black Galaxy',
    category: 'Igneous Granite',
    texture: 'images/textures/granite/black-galaxy-texture.jpg',
    color: '#161616',
    roughness: 0.12,
    metalness: 0.18
  },
  {
    id: 'calacatta-gold',
    name: 'Calacatta Gold',
    category: 'Engineered Quartz',
    texture: 'images/textures/quartz/calacatta-gold-texture.jpg',
    color: '#F4EFEA',
    roughness: 0.14,
    metalness: 0.08
  },
  {
    id: 'alaska-white',
    name: 'Alaska White',
    category: 'Natural Granite',
    texture: 'images/textures/granite/alaska-white-texture.jpg',
    color: '#ECEBE6',
    roughness: 0.20,
    metalness: 0.05
  }
];

export const Stone3DCanvas = ({ className = '' }) => {
  const mountRef = useRef(null);
  const [activeTextureIndex, setActiveTextureIndex] = useState(0);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const activeTextureRef = useRef(activeTextureIndex);
  activeTextureRef.current = activeTextureIndex;

  useEffect(() => {
    // 1. WebGL Support Verification
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };

    if (!checkWebGL()) {
      setWebGLSupported(false);
      setIsLoading(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 500;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 2. Three.js Scene, Camera, High-Precision Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.4);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.18;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL init failed:', e);
      setWebGLSupported(false);
      setIsLoading(false);
      return;
    }

    // 3. Architectural Lighting Rig (Simulates natural high-end showroom daylighting)
    const ambientLight = new THREE.AmbientLight(0xfdfbf7, 1.4);
    scene.add(ambientLight);

    // Warm Key Light (mimics ceiling flood downlight)
    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.4);
    keyLight.position.set(4.5, 5.5, 4.0);
    scene.add(keyLight);

    // Soft Rim Light (catches bevel edge specular reflections)
    const rimLight = new THREE.DirectionalLight(0xdde8f4, 1.4);
    rimLight.position.set(-4.5, -2.5, -3.0);
    scene.add(rimLight);

    // Subtle Ground Fill (warm travertine bounce)
    const fillLight = new THREE.DirectionalLight(0xe8ddcc, 0.9);
    fillLight.position.set(0, -4, 2);
    scene.add(fillLight);

    // 4. Architectural Stone Slab Geometry & Chamfered Edges
    // Proportions: 2.3m x 3.25m x 0.08m (authentic large-format jumbo slab)
    const slabGeometry = new THREE.BoxGeometry(2.35, 3.25, 0.08, 2, 2, 2);

    // Texture Loader with Cache
    const textureLoader = new THREE.TextureLoader();
    const loadedTextures = new Map();

    const loadTexture = (path) => {
      const fullUrl = getAssetUrl(path);
      if (loadedTextures.has(fullUrl)) {
        return Promise.resolve(loadedTextures.get(fullUrl));
      }
      return new Promise((resolve) => {
        textureLoader.load(
          fullUrl,
          (tex) => {
            tex.wrapS = THREE.ClampToEdgeWrapping;
            tex.wrapT = THREE.ClampToEdgeWrapping;
            tex.colorSpace = THREE.SRGBColorSpace;
            loadedTextures.set(fullUrl, tex);
            resolve(tex);
          },
          undefined,
          () => {
            // Procedural fallback canvas if network texture fails
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#EAE6DF';
            ctx.fillRect(0, 0, 512, 512);
            ctx.strokeStyle = '#C8BEB2';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(40, 0);
            ctx.bezierCurveTo(120, 200, 300, 300, 480, 512);
            ctx.stroke();
            const fallbackTex = new THREE.CanvasTexture(canvas);
            fallbackTex.colorSpace = THREE.SRGBColorSpace;
            resolve(fallbackTex);
          }
        );
      });
    };

    // Physically-based material with polished stone sheen
    const slabMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.16,
      metalness: 0.08
    });

    const slabMesh = new THREE.Mesh(slabGeometry, slabMaterial);
    // Initial architectural angle
    slabMesh.rotation.x = 0.12;
    slabMesh.rotation.y = -0.32;
    scene.add(slabMesh);

    // Fine chamfer wireframe edge highlight
    const edgesGeom = new THREE.EdgesGeometry(slabGeometry);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0xd6cbb8,
      linewidth: 1,
      transparent: true,
      opacity: 0.4
    });
    const edgesLine = new THREE.LineSegments(edgesGeom, edgesMat);
    slabMesh.add(edgesLine);

    // Load initial texture
    const currentConfig = SLAB_TEXTURES[activeTextureRef.current];
    loadTexture(currentConfig.texture).then((tex) => {
      slabMaterial.map = tex;
      slabMaterial.needsUpdate = true;
      setIsLoading(false);
    });

    // 5. GSAP ScrollTrigger Integration
    let scrollProgress = 0;
    let scrollTriggerInstance = null;

    if (!prefersReducedMotion) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          scrollProgress = self.progress;
        }
      });
    }

    // Interactive Mouse Tracking State
    let mouseX = 0;
    let mouseY = 0;
    let isVisible = true;

    const handleMouseMove = (e) => {
      if (prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 0.45;
      mouseY = y * 0.3;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });

    // IntersectionObserver to pause render loops when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Responsive Canvas Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Expose texture updater to React re-renders
    const updateMeshTexture = async (index) => {
      const cfg = SLAB_TEXTURES[index];
      if (!cfg) return;
      const tex = await loadTexture(cfg.texture);
      slabMaterial.map = tex;
      slabMaterial.roughness = cfg.roughness;
      slabMaterial.metalness = cfg.metalness;
      slabMaterial.needsUpdate = true;
    };

    container._updateTexture = updateMeshTexture;

    // 6. Smooth Cinematic Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Floating wave animation
        const floatOffset = Math.sin(elapsedTime * 0.85) * 0.04;

        // Cinematic scroll rotation + mouse parallax
        const targetRotationY = -0.32 + mouseX + scrollProgress * 1.1;
        const targetRotationX = 0.12 - mouseY + Math.sin(elapsedTime * 0.65) * 0.02 + scrollProgress * 0.2;
        const targetRotationZ = scrollProgress * 0.15;

        // Smooth damping lerp (0.05 factor)
        slabMesh.rotation.y += (targetRotationY - slabMesh.rotation.y) * 0.06;
        slabMesh.rotation.x += (targetRotationX - slabMesh.rotation.x) * 0.06;
        slabMesh.rotation.z += (targetRotationZ - slabMesh.rotation.z) * 0.06;
        slabMesh.position.y = floatOffset;
        slabMesh.position.z = -scrollProgress * 0.4;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      slabGeometry.dispose();
      slabMaterial.dispose();
      edgesGeom.dispose();
      edgesMat.dispose();
      loadedTextures.forEach((tex) => tex.dispose());
      if (renderer) renderer.dispose();
    };
  }, []);

  // Sync texture change from React state
  useEffect(() => {
    if (mountRef.current && mountRef.current._updateTexture) {
      mountRef.current._updateTexture(activeTextureIndex);
    }
  }, [activeTextureIndex]);

  // Fallback for devices without WebGL
  if (!webGLSupported) {
    const fallbackItem = SLAB_TEXTURES[activeTextureIndex];
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="relative w-full max-w-sm aspect-[3/4] rounded-sm overflow-hidden shadow-luxury border border-sand bg-warmwhite p-2">
          <img
            src={getAssetUrl(fallbackItem.texture)}
            alt={fallbackItem.name}
            className="w-full h-full object-cover filter brightness-[0.98]"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-warmwhite/90 backdrop-blur-md p-3 border border-sand rounded-xs">
            <span className="text-[10px] uppercase tracking-wider text-taupe font-semibold block">
              {fallbackItem.category}
            </span>
            <span className="font-heading text-lg text-charcoal font-semibold">
              {fallbackItem.name}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className="w-full h-[420px] sm:h-[500px] lg:h-[580px] cursor-grab active:cursor-grabbing relative"
        title="Interactive 3D Architectural Stone Slab · Move cursor to tilt, scroll to rotate"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-ivory/50 backdrop-blur-xs">
            <div className="flex items-center space-x-2 text-xs text-taupe">
              <span className="w-2 h-2 rounded-full bg-taupe animate-pulse"></span>
              <span className="uppercase tracking-widest text-[10px]">Loading 3D Stone...</span>
            </div>
          </div>
        )}
      </div>

      {/* Floating 3D Material Switcher Pill */}
      <div className="z-10 -mt-6 sm:-mt-8 flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-warmwhite/90 backdrop-blur-md border border-sand shadow-subtle rounded-full max-w-md">
        {SLAB_TEXTURES.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setActiveTextureIndex(idx)}
            className={`px-3 py-1 text-[10px] uppercase tracking-widest font-medium rounded-full transition-all duration-200 ${
              activeTextureIndex === idx
                ? 'bg-charcoal text-ivory shadow-xs'
                : 'text-charcoal/70 hover:text-charcoal hover:bg-sand/30'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="mt-3 text-center">
        <span className="text-[10px] uppercase tracking-[0.2em] text-softgrey font-medium">
          3D Architectural Slab · Tilt & Scroll-Linked Rotation
        </span>
      </div>
    </div>
  );
};

export default Stone3DCanvas;
