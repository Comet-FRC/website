/**
 * Image resolver using import.meta.glob for Astro image optimization.
 * Maps content-collection string paths (e.g. "/uploads/robots/rocky.avif")
 * to imported ImageMetadata objects so components can use Astro's <Image />.
 */

// Glob import all images from src/assets/
const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{jpg,jpeg,png,webp,avif,gif,svg}',
  { eager: true }
);

// Build a lookup map: "/uploads/..." path → imported ImageMetadata
const imagePathMap = new Map<string, ImageMetadata>();

for (const [globPath, mod] of Object.entries(imageModules)) {
  // Convert glob path to the old /uploads/... format for matching
  // e.g. "/src/assets/robots/rocky.avif" → "/uploads/robots/rocky.avif"
  const uploadsPath = globPath
    .replace('/src/assets/', '/uploads/')
    .replace(/\\/g, '/'); // Normalize Windows backslashes

  imagePathMap.set(uploadsPath, mod.default);
}

/**
 * Resolve a content-collection image path (e.g. "/uploads/robots/rocky.avif")
 * to the corresponding ImageMetadata for use with Astro's <Image />.
 *
 * @param path - The string path from frontmatter (e.g. "/uploads/robots/rocky.avif")
 * @returns The ImageMetadata object, or undefined if not found
 */
export function resolveImage(path: string): ImageMetadata | undefined {
  if (!path) return undefined;
  // Normalize backslashes (Windows)
  const normalized = path.replace(/\\/g, '/');
  return imagePathMap.get(normalized);
}

/**
 * Resolve a path and return it as a URL string (for CSS background-image, etc.)
 * Falls back to the original path if not found.
 *
 * @param path - The string path from frontmatter
 * @returns The resolved URL string
 */
export function resolveImageUrl(path: string): string {
  const resolved = resolveImage(path);
  if (resolved) {
    return resolved.src;
  }
  return path;
}