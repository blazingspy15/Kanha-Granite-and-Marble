import fs from 'fs';
import path from 'path';
import https from 'https';

const ASSETS = [
  // PRODUCTS - GRANITE
  {
    url: 'https://images.unsplash.com/photo-1590402494587-44b71d7772f6?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/products/granite/granite-black-galaxy.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1590402494587-44b71d7772f6?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/textures/granite/granite-black-galaxy-texture.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/products/granite/granite-absolute-black.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/textures/granite/granite-absolute-black-texture.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/products/granite/granite-tan-brown.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/textures/granite/granite-tan-brown-texture.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/products/granite/granite-kashmir-white.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/textures/granite/granite-kashmir-white-texture.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/products/granite/granite-river-white.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/textures/granite/granite-river-white-texture.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/products/granite/granite-alaska-white.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/textures/granite/granite-alaska-white-texture.jpg'
  },

  // PRODUCTS - MARBLE
  {
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/products/marble/marble-indian-statuario.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/textures/marble/marble-indian-statuario-texture.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/products/marble/marble-italian-carrara.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/textures/marble/marble-italian-carrara-texture.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/products/marble/marble-makrana-white.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/textures/marble/marble-makrana-white-texture.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/products/marble/marble-botticino.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/textures/marble/marble-botticino-texture.jpg'
  },

  // PRODUCTS - TILES
  {
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/products/tiles/tiles-glossy-vitrified.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/textures/tiles/tiles-glossy-vitrified-texture.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/products/tiles/tiles-matte-finish.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/textures/tiles/tiles-matte-finish-texture.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1590402494587-44b71d7772f6?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/products/tiles/tiles-full-body-vitrified.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/textures/tiles/tiles-full-body-vitrified-texture.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/products/tiles/tiles-large-format.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/textures/tiles/tiles-large-format-texture.jpg'
  },

  // PRODUCTS - QUARTZ
  {
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/products/quartz/quartz-pure-white.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/textures/quartz/quartz-pure-white-texture.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/products/quartz/quartz-calacatta-style.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/textures/quartz/quartz-calacatta-style-texture.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/products/quartz/quartz-grey.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/textures/quartz/quartz-grey-texture.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=85',
    dest: 'public/images/products/quartz/quartz-beige.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=85',
    dest: 'public/images/textures/quartz/quartz-beige-texture.jpg'
  },

  // ROOMS (BASE PHOTOGRAPHS)
  {
    url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1800&q=85',
    dest: 'public/images/rooms/kitchen/base.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85',
    dest: 'public/images/rooms/living-room/base.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1800&q=85',
    dest: 'public/images/rooms/bathroom/base.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=85',
    dest: 'public/images/rooms/staircase/base.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1800&q=85',
    dest: 'public/images/rooms/bedroom/base.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85',
    dest: 'public/images/rooms/dining-area/base.jpg'
  },

  // VISUALIZER PREVIEWS (AFTER PHOTOGRAPHS)
  {
    url: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1800&q=85',
    dest: 'public/images/visualizer/kitchen/kitchen-granite-black-galaxy-countertop.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1800&q=85',
    dest: 'public/images/visualizer/kitchen/kitchen-granite-black-galaxy-island.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    dest: 'public/images/visualizer/kitchen/kitchen-quartz-calacatta-island.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85',
    dest: 'public/images/visualizer/kitchen/kitchen-quartz-white-countertop.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
    dest: 'public/images/visualizer/living-room/living-marble-statuario-flooring.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=85',
    dest: 'public/images/visualizer/living-room/living-marble-botticino-flooring.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85',
    dest: 'public/images/visualizer/bathroom/bathroom-marble-carrara-vanity.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1800&q=85',
    dest: 'public/images/visualizer/bathroom/bathroom-tiles-large-format-wall.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1800&q=85',
    dest: 'public/images/visualizer/staircase/staircase-granite-black-galaxy-steps.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85',
    dest: 'public/images/visualizer/bedroom/bedroom-marble-botticino-flooring.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1800&q=85',
    dest: 'public/images/visualizer/dining-area/dining-marble-statuario-tabletop.jpg'
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
  console.log(`Starting download of ${ASSETS.length} assets...`);
  for (let i = 0; i < ASSETS.length; i++) {
    const item = ASSETS[i];
    try {
      console.log(`[${i + 1}/${ASSETS.length}] Downloading ${item.dest}...`);
      await downloadFile(item.url, item.dest);
    } catch (err) {
      console.error(`Error downloading ${item.dest}:`, err.message);
    }
  }
  console.log('All downloads completed successfully!');
}

run();
