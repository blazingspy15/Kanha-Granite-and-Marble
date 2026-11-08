# KANHA GRANITE & MARBLE — Luxury Architectural Showroom Website

> **Natural Stone. Timeless Spaces.**  
> Official web platform and interactive stone visualizer for **Kanha Granite and Marble**, located at Marble Market, Shiroli, Kolhapur, Maharashtra, India.

---

## 📁 Refined Project Structure

```text
kanha-granite-marble/
├── public/                     # Static assets served as-is (copied directly to dist/)
│   ├── _redirects              # Netlify SPA redirect rules (prevents 404s on reload)
│   ├── favicon.svg             # Monogram brand favicon
│   └── robots.txt              # Search crawler directives
│
├── src/                        # Application source code
│   ├── components/             # Reusable UI sections & interactive features
│   │   ├── AdminDashboard.jsx  # PIN-protected catalogue & enquiry manager
│   │   ├── ApplicationGallery.jsx # Architectural applications showcases
│   │   ├── BrandStory.jsx      # Editorial heritage & craftsmanship story
│   │   ├── Collections.jsx     # Filterable stone catalogue with search & specs
│   │   ├── ContactSection.jsx  # Verified Google Maps embed & enquiry form
│   │   ├── FloatingWhatsApp.jsx# Quick floating WhatsApp contact button
│   │   ├── Footer.jsx          # Showroom address, timings, map & links
│   │   ├── Hero.jsx            # Full-viewport editorial hero with CTAs
│   │   ├── MaterialGuide.jsx   # Stone care, maintenance & finish comparison
│   │   ├── Navbar.jsx          # Sticky ivory navigation with mobile drawer
│   │   ├── ProductModal.jsx    # Stone detail view with specifications & enquiry
│   │   ├── StoneAnalysis.jsx   # Technical engineering benchmarks & Mohs hardness
│   │   ├── StoneVisualizer.jsx # 3-in-1 interactive stone visualizer
│   │   └── WhyChooseKanha.jsx  # Showroom value propositions & trust points
│   │
│   ├── data/                   # Central data models and manifests
│   │   ├── galleryItems.json   # Architectural showcase photo items
│   │   ├── materialGuides.json # Stone maintenance and suitability guides
│   │   ├── products.json       # Granite, marble, quartz, and tile catalogue
│   │   ├── stoneAnalysisData.js# Engineering test data and Mohs scale values
│   │   └── visualizerManifest.js# Central manifest for rooms, surfaces & previews
│   │
│   ├── styles/
│   │   └── index.css           # Tailwind base, Cormorant Garamond & luxury styling
│   │
│   ├── utils/
│   │   └── whatsapp.js         # Contextual WhatsApp deep-link generation
│   │
│   ├── App.jsx                 # Master application component & layout state
│   └── main.jsx                # React DOM mounting entry point
│
├── dist/                       # Production build output (upload this to Netlify Drop)
│   ├── assets/                 # Bundled, minified JS & CSS
│   ├── _redirects              # Copied from public/
│   ├── favicon.svg             # Copied from public/
│   ├── index.html              # Processed HTML
│   └── robots.txt              # Copied from public/
│
├── index.html                  # HTML entry point with Google Fonts
├── netlify.toml                # Netlify build configuration & SPA rewrites
├── package.json                # Project dependencies & scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind theme tokens (Ivory, Sand, Taupe, Charcoal)
├── vite.config.js              # Vite config (relative base './' for universal hosting)
└── .gitignore                  # Git ignore rules
```

---

## 🚀 Quick Start

### 1. Run Locally (Development Mode)
```bash
npm run dev
```
Opens the live preview at `http://localhost:3000`.

### 2. Build for Production
```bash
npm run build
```
Generates the optimized static website in the `dist/` directory.

---

## 🌐 Deploying to the Public Web

### Option A: Instant Free Deployment via Netlify Drop (Recommended)
1. Run `npm run build`.
2. Open **[Netlify Drop](https://app.netlify.com/drop)** in your web browser.
3. Drag and drop the **`dist`** folder onto the page.
4. Your site will be live instantly with a free public HTTPS link you can share with anyone.

### Option B: GitHub Pages / Git Deployment
- Push this repository to GitHub.
- In Netlify, select **"Import an existing project"** and link your repo. It will read `netlify.toml` and build automatically on every push.

---

## 📍 Business Details
- **Business Name:** KANHA GRANITE AND MARBLE
- **Address:** Sangli Patha, Marble Market, Shiroli, Kolhapur, Maharashtra, India - 416122
- **Google Maps Coordinates:** `16.7349763, 74.2913544`
- **WhatsApp:** `+91 98200 84842`
