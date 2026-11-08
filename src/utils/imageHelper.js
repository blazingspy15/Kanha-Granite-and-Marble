/**
 * Image helper to reliably resolve local public asset paths in development,
 * subpath hosting (e.g. GitHub Pages /Kanha-Granite-and-Marble/), and root deployments (e.g. Netlify).
 */
export function getAssetUrl(relativePath) {
  if (!relativePath) return '';
  if (
    relativePath.startsWith('http://') ||
    relativePath.startsWith('https://') ||
    relativePath.startsWith('data:')
  ) {
    return relativePath;
  }

  const clean = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  const base = import.meta.env.BASE_URL || './';
  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`;
}
