import sharp from "sharp";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import { join, parse } from "node:path";
const directory = "public/images";
await mkdir(directory, { recursive: true });
const manifest = [];
for (const filename of (await readdir("assets/originals")).filter((x) =>
  /\.jpe?g$/i.test(x),
)) {
  const input = join("assets/originals", filename),
    id = parse(filename).name;
  const metadata = await sharp(input).metadata();
  const widths = [480, 960, 1600, 2400].filter((w) => w <= metadata.width);
  for (const width of widths) {
    const resized = sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true });
    await Promise.all([
      resized
        .clone()
        .avif({ quality: 60, effort: 3 })
        .toFile(join(directory, `${id}-${width}.avif`)),
      resized
        .clone()
        .webp({ quality: 82, effort: 4 })
        .toFile(join(directory, `${id}-${width}.webp`)),
      resized
        .clone()
        .jpeg({ quality: 86, mozjpeg: true })
        .toFile(join(directory, `${id}-${width}.jpg`)),
    ]);
  }
  manifest.push({ id, width: metadata.width, height: metadata.height, widths });
  console.log(id, widths.join("/"));
}
await writeFile(
  "src/data/image-manifest.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
