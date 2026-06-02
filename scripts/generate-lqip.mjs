import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const slideshowDir = path.resolve(
  process.cwd(),
  "public/uploads/about/slideshow"
);

// LQIP settings: good size, high quality for fast loading
const LQIP_WIDTH = 1000;
const LQIP_QUALITY = 100;

async function generateLQIP() {
  const supportedExts = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

  // Read all images in the slideshow folder
  const files = fs
    .readdirSync(slideshowDir)
    .filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return (
        supportedExts.has(ext) && !file.includes("-low") && !file.includes("-high")
      );
    });

  console.log(`Found ${files.length} images to process`);

  for (const file of files) {
    const inputPath = path.join(slideshowDir, file);
    const basename = path.basename(file, path.extname(file));
    const outputPath = path.join(slideshowDir, `${basename}-low.webp`);

    // Skip if low-quality version already exists and is newer
    if (fs.existsSync(outputPath)) {
      const inputStat = fs.statSync(inputPath);
      const outputStat = fs.statSync(outputPath);
      if (outputStat.mtimeMs >= inputStat.mtimeMs) {
        console.log(`Skipping ${file} (low-quality version up to date)`);
        continue;
      }
    }

    console.log(`Generating low-quality version: ${file} → ${basename}-low.webp`);

    try {
      await sharp(inputPath)
        .resize(LQIP_WIDTH, null, {
          withoutEnlargement: true,
          fit: "inside",
        })
        .webp({ quality: LQIP_QUALITY })
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);
      console.log(`  ✓ Created ${basename}-low.webp (${(stats.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`  ✗ Error processing ${file}:`, err.message);
    }
  }

  console.log("\nDone! Low-quality images generated.");
}

generateLQIP().catch(console.error);