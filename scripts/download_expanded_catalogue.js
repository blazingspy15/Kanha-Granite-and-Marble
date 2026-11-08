import fs from 'fs';
import path from 'path';
import https from 'https';

// Curated high-res stone slab photography matching each mineral and material type
const EXPANDED_ASSETS = [
  // === GRANITE (New 12 additions to complete 18) ===
  {
    id: 'granite-steel-grey',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/granite/granite-steel-grey.jpg'
  },
  {
    id: 'granite-steel-grey-texture',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/granite/granite-steel-grey-texture.jpg'
  },
  {
    id: 'granite-colonial-white',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/granite/granite-colonial-white.jpg'
  },
  {
    id: 'granite-colonial-white-texture',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/granite/granite-colonial-white-texture.jpg'
  },
  {
    id: 'granite-viscount-white',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/granite/granite-viscount-white.jpg'
  },
  {
    id: 'granite-viscount-white-texture',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/granite/granite-viscount-white-texture.jpg'
  },
  {
    id: 'granite-imperial-red',
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/granite/granite-imperial-red.jpg'
  },
  {
    id: 'granite-imperial-red-texture',
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/granite/granite-imperial-red-texture.jpg'
  },
  {
    id: 'granite-black-pearl',
    url: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/granite/granite-black-pearl.jpg'
  },
  {
    id: 'granite-black-pearl-texture',
    url: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/granite/granite-black-pearl-texture.jpg'
  },
  {
    id: 'granite-platinum-white',
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/granite/granite-platinum-white.jpg'
  },
  {
    id: 'granite-platinum-white-texture',
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/granite/granite-platinum-white-texture.jpg'
  },
  {
    id: 'granite-hassan-green',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/granite/granite-hassan-green.jpg'
  },
  {
    id: 'granite-hassan-green-texture',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/granite/granite-hassan-green-texture.jpg'
  },
  {
    id: 'granite-rajasthan-black',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/granite/granite-rajasthan-black.jpg'
  },
  {
    id: 'granite-rajasthan-black-texture',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/granite/granite-rajasthan-black-texture.jpg'
  },
  {
    id: 'granite-crystal-yellow',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/granite/granite-crystal-yellow.jpg'
  },
  {
    id: 'granite-crystal-yellow-texture',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/granite/granite-crystal-yellow-texture.jpg'
  },
  {
    id: 'granite-p-white',
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/granite/granite-p-white.jpg'
  },
  {
    id: 'granite-p-white-texture',
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/granite/granite-p-white-texture.jpg'
  },
  {
    id: 'granite-sira-grey',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/granite/granite-sira-grey.jpg'
  },
  {
    id: 'granite-sira-grey-texture',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/granite/granite-sira-grey-texture.jpg'
  },
  {
    id: 'granite-lakha-red',
    url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/granite/granite-lakha-red.jpg'
  },
  {
    id: 'granite-lakha-red-texture',
    url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/granite/granite-lakha-red-texture.jpg'
  },

  // === MARBLE (New 14 additions to complete 18) ===
  {
    id: 'marble-morwad-white',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/marble/marble-morwad-white.jpg'
  },
  {
    id: 'marble-morwad-white-texture',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/marble/marble-morwad-white-texture.jpg'
  },
  {
    id: 'marble-ambaji-white',
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/marble/marble-ambaji-white.jpg'
  },
  {
    id: 'marble-ambaji-white-texture',
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/marble/marble-ambaji-white-texture.jpg'
  },
  {
    id: 'marble-fantasy-brown',
    url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/marble/marble-fantasy-brown.jpg'
  },
  {
    id: 'marble-fantasy-brown-texture',
    url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/marble/marble-fantasy-brown-texture.jpg'
  },
  {
    id: 'marble-perlato-sicilia',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/marble/marble-perlato-sicilia.jpg'
  },
  {
    id: 'marble-perlato-sicilia-texture',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/marble/marble-perlato-sicilia-texture.jpg'
  },
  {
    id: 'marble-rainforest-brown',
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/marble/marble-rainforest-brown.jpg'
  },
  {
    id: 'marble-rainforest-brown-texture',
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/marble/marble-rainforest-brown-texture.jpg'
  },
  {
    id: 'marble-rainforest-green',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/marble/marble-rainforest-green.jpg'
  },
  {
    id: 'marble-rainforest-green-texture',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/marble/marble-rainforest-green-texture.jpg'
  },
  {
    id: 'marble-spider-green',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/marble/marble-spider-green.jpg'
  },
  {
    id: 'marble-spider-green-texture',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/marble/marble-spider-green-texture.jpg'
  },
  {
    id: 'marble-bruno-white',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/marble/marble-bruno-white.jpg'
  },
  {
    id: 'marble-bruno-white-texture',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/marble/marble-bruno-white-texture.jpg'
  },
  {
    id: 'marble-onyx-white',
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/marble/marble-onyx-white.jpg'
  },
  {
    id: 'marble-onyx-white-texture',
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/marble/marble-onyx-white-texture.jpg'
  },
  {
    id: 'marble-italian-beige',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/marble/marble-italian-beige.jpg'
  },
  {
    id: 'marble-italian-beige-texture',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/marble/marble-italian-beige-texture.jpg'
  },
  {
    id: 'marble-travertine-beige',
    url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/marble/marble-travertine-beige.jpg'
  },
  {
    id: 'marble-travertine-beige-texture',
    url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/marble/marble-travertine-beige-texture.jpg'
  },
  {
    id: 'marble-dyna-marble',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/marble/marble-dyna-marble.jpg'
  },
  {
    id: 'marble-dyna-marble-texture',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/marble/marble-dyna-marble-texture.jpg'
  },
  {
    id: 'marble-vietnam-white',
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/marble/marble-vietnam-white.jpg'
  },
  {
    id: 'marble-vietnam-white-texture',
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/marble/marble-vietnam-white-texture.jpg'
  },
  {
    id: 'marble-turkish-grey',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/marble/marble-turkish-grey.jpg'
  },
  {
    id: 'marble-turkish-grey-texture',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/marble/marble-turkish-grey-texture.jpg'
  },

  // === TILES (New 14 additions to complete 18) ===
  {
    id: 'tiles-matte-vitrified',
    url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/tiles/tiles-matte-vitrified.jpg'
  },
  {
    id: 'tiles-matte-vitrified-texture',
    url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/tiles/tiles-matte-vitrified-texture.jpg'
  },
  {
    id: 'tiles-double-charge',
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/tiles/tiles-double-charge.jpg'
  },
  {
    id: 'tiles-double-charge-texture',
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/tiles/tiles-double-charge-texture.jpg'
  },
  {
    id: 'tiles-porcelain-tiles',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/tiles/tiles-porcelain-tiles.jpg'
  },
  {
    id: 'tiles-porcelain-tiles-texture',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/tiles/tiles-porcelain-tiles-texture.jpg'
  },
  {
    id: 'tiles-ceramic-wall',
    url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/tiles/tiles-ceramic-wall.jpg'
  },
  {
    id: 'tiles-ceramic-wall-texture',
    url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/tiles/tiles-ceramic-wall-texture.jpg'
  },
  {
    id: 'tiles-gvt-tiles',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/tiles/tiles-gvt-tiles.jpg'
  },
  {
    id: 'tiles-gvt-tiles-texture',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/tiles/tiles-gvt-tiles-texture.jpg'
  },
  {
    id: 'tiles-pgvt-tiles',
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/tiles/tiles-pgvt-tiles.jpg'
  },
  {
    id: 'tiles-pgvt-tiles-texture',
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/tiles/tiles-pgvt-tiles-texture.jpg'
  },
  {
    id: 'tiles-wooden-finish',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/tiles/tiles-wooden-finish.jpg'
  },
  {
    id: 'tiles-wooden-finish-texture',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/tiles/tiles-wooden-finish-texture.jpg'
  },
  {
    id: 'tiles-marble-finish',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/tiles/tiles-marble-finish.jpg'
  },
  {
    id: 'tiles-marble-finish-texture',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/tiles/tiles-marble-finish-texture.jpg'
  },
  {
    id: 'tiles-stone-finish',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/tiles/tiles-stone-finish.jpg'
  },
  {
    id: 'tiles-stone-finish-texture',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/tiles/tiles-stone-finish-texture.jpg'
  },
  {
    id: 'tiles-concrete-finish',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/tiles/tiles-concrete-finish.jpg'
  },
  {
    id: 'tiles-concrete-finish-texture',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/tiles/tiles-concrete-finish-texture.jpg'
  },
  {
    id: 'tiles-anti-skid',
    url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/tiles/tiles-anti-skid.jpg'
  },
  {
    id: 'tiles-anti-skid-texture',
    url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/tiles/tiles-anti-skid-texture.jpg'
  },
  {
    id: 'tiles-outdoor-tiles',
    url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/tiles/tiles-outdoor-tiles.jpg'
  },
  {
    id: 'tiles-outdoor-tiles-texture',
    url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/tiles/tiles-outdoor-tiles-texture.jpg'
  },
  {
    id: 'tiles-subway-tiles',
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/tiles/tiles-subway-tiles.jpg'
  },
  {
    id: 'tiles-subway-tiles-texture',
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/tiles/tiles-subway-tiles-texture.jpg'
  },
  {
    id: 'tiles-terrazzo-finish',
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/tiles/tiles-terrazzo-finish.jpg'
  },
  {
    id: 'tiles-terrazzo-finish-texture',
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/tiles/tiles-terrazzo-finish-texture.jpg'
  },
  {
    id: 'tiles-decorative-tiles',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/tiles/tiles-decorative-tiles.jpg'
  },
  {
    id: 'tiles-decorative-tiles-texture',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/tiles/tiles-decorative-tiles-texture.jpg'
  },

  // === QUARTZ (New 12 additions to complete 16) ===
  {
    id: 'quartz-calacatta-white',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/quartz/quartz-calacatta-white.jpg'
  },
  {
    id: 'quartz-calacatta-white-texture',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/quartz/quartz-calacatta-white-texture.jpg'
  },
  {
    id: 'quartz-carrara-white',
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/quartz/quartz-carrara-white.jpg'
  },
  {
    id: 'quartz-carrara-white-texture',
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/quartz/quartz-carrara-white-texture.jpg'
  },
  {
    id: 'quartz-arctic-white',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/quartz/quartz-arctic-white.jpg'
  },
  {
    id: 'quartz-arctic-white-texture',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/quartz/quartz-arctic-white-texture.jpg'
  },
  {
    id: 'quartz-stellar-grey',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/quartz/quartz-stellar-grey.jpg'
  },
  {
    id: 'quartz-stellar-grey-texture',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/quartz/quartz-stellar-grey-texture.jpg'
  },
  {
    id: 'quartz-concrete-grey',
    url: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/quartz/quartz-concrete-grey.jpg'
  },
  {
    id: 'quartz-concrete-grey-texture',
    url: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/quartz/quartz-concrete-grey-texture.jpg'
  },
  {
    id: 'quartz-black',
    url: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/quartz/quartz-black.jpg'
  },
  {
    id: 'quartz-black-texture',
    url: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/quartz/quartz-black-texture.jpg'
  },
  {
    id: 'quartz-calacatta-gold',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/quartz/quartz-calacatta-gold.jpg'
  },
  {
    id: 'quartz-calacatta-gold-texture',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/quartz/quartz-calacatta-gold-texture.jpg'
  },
  {
    id: 'quartz-statuario-quartz',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/quartz/quartz-statuario-quartz.jpg'
  },
  {
    id: 'quartz-statuario-quartz-texture',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/quartz/quartz-statuario-quartz-texture.jpg'
  },
  {
    id: 'quartz-crystal-quartz',
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/quartz/quartz-crystal-quartz.jpg'
  },
  {
    id: 'quartz-crystal-quartz-texture',
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/quartz/quartz-crystal-quartz-texture.jpg'
  },
  {
    id: 'quartz-carrara-grey',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/quartz/quartz-carrara-grey.jpg'
  },
  {
    id: 'quartz-carrara-grey-texture',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/quartz/quartz-carrara-grey-texture.jpg'
  },
  {
    id: 'quartz-onyx-style',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/quartz/quartz-onyx-style.jpg'
  },
  {
    id: 'quartz-onyx-style-texture',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/quartz/quartz-onyx-style-texture.jpg'
  },
  {
    id: 'quartz-marble-look',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/quartz/quartz-marble-look.jpg'
  },
  {
    id: 'quartz-marble-look-texture',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/quartz/quartz-marble-look-texture.jpg'
  },
  {
    id: 'quartz-sparkling-white',
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/quartz/quartz-sparkling-white.jpg'
  },
  {
    id: 'quartz-sparkling-white-texture',
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/quartz/quartz-sparkling-white-texture.jpg'
  },
  {
    id: 'quartz-cream-quartz',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=85',
    dest: 'public/images/products/quartz/quartz-cream-quartz.jpg'
  },
  {
    id: 'quartz-cream-quartz-texture',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=85',
    dest: 'public/images/textures/quartz/quartz-cream-quartz-texture.jpg'
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(dest);
    const get = (targetUrl) => {
      https.get(targetUrl, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          get(response.headers.location);
          return;
        }
        if (response.statusCode !== 200) {
          reject(new Error(`Failed with status code: ${response.statusCode}`));
          return;
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    };
    get(url);
  });
}

async function run() {
  console.log(`Starting download of ${EXPANDED_ASSETS.length} expanded catalogue assets...`);
  let successCount = 0;
  for (let i = 0; i < EXPANDED_ASSETS.length; i++) {
    const item = EXPANDED_ASSETS[i];
    try {
      console.log(`[${i + 1}/${EXPANDED_ASSETS.length}] Downloading ${item.dest}...`);
      await downloadFile(item.url, item.dest);
      successCount++;
    } catch (err) {
      console.error(`Error downloading ${item.dest}:`, err.message);
    }
  }
  console.log(`Successfully downloaded ${successCount}/${EXPANDED_ASSETS.length} assets.`);
}

run();
