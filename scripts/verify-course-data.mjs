import fs from "node:fs";
import path from "node:path";
import specs from "../notebooks/templates/notebook-specs.mjs";

const root = path.resolve(import.meta.dirname, "..");
const curriculum = fs.readFileSync(path.join(root, "lib", "python-course-data.ts"), "utf8");
const errors = [];

for (const spec of specs) {
  if (!curriculum.includes(`slug: "${spec.slug}"`)) errors.push(`missing curriculum lesson: ${spec.slug}`);
  for (const variant of ["starter", "solution"]) {
    const file = path.join(root, "public", "notebooks", `${spec.slug}-${variant}.ipynb`);
    if (!fs.existsSync(file)) errors.push(`missing notebook: ${path.relative(root, file)}`);
  }
  if (spec.dataset && !fs.existsSync(path.join(root, "public", "datasets", spec.dataset))) {
    errors.push(`missing dataset: ${spec.dataset}`);
  }
}

if (specs.length !== 18) errors.push(`expected 18 notebook-based Python lessons, found ${specs.length}`);
const gameCurriculum = fs.readFileSync(path.join(root, "lib", "python-game-data.ts"), "utf8");
const gameLessons = [...gameCurriculum.matchAll(/slug: "game-[^"]+"/g)].length;
if (gameLessons !== 7) errors.push(`expected 7 Signal Garden lessons, found ${gameLessons}`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Verified 25 Python curriculum lessons and all notebook resource links.");
