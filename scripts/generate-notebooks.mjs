import fs from "node:fs";
import path from "node:path";
import specs from "../notebooks/templates/notebook-specs.mjs";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public", "notebooks");
const envFile = path.join(root, ".env.local");
const configuredBase = fs.existsSync(envFile)
  ? fs.readFileSync(envFile, "utf8").match(/^NEXT_PUBLIC_GITHUB_REPO_BASE=(.+)$/m)?.[1]?.trim()
  : undefined;
const repoBase = (process.env.NEXT_PUBLIC_GITHUB_REPO_BASE || configuredBase)?.replace(/\/$/, "");
fs.mkdirSync(outDir, { recursive: true });

const markdown = (source) => ({ cell_type: "markdown", metadata: {}, source: source.split(/(?<=\n)/) });
const code = (source) => ({ cell_type: "code", execution_count: null, metadata: {}, outputs: [], source: source.split(/(?<=\n)/) });

function datasetCell(dataset) {
  if (!dataset) return markdown("## Dataset loading\n\nThis lesson does not require an external dataset.\n");
  const value = repoBase
    ? `${repoBase.replace("https://github.com/", "https://raw.githubusercontent.com/").replace("/blob/", "/")}/public/datasets/${dataset}`
    : `../datasets/${dataset}`;
  return code(`DATASET_PATH = ${JSON.stringify(value)}\nprint("Dataset:", DATASET_PATH)`);
}

function notebook(spec, variant) {
  const isSolution = variant === "solution";
  const cells = [
    markdown(`# ${spec.title}\n\n**Lesson objective:** ${spec.objective}\n\n**Required packages:** ${spec.packages.length ? spec.packages.join(", ") : "Python standard library only"}\n\n**Expected outcome:** ${spec.expectedOutcome}\n\n**Troubleshooting:** Restart the kernel and run all cells from the top. Confirm the active environment contains the required packages.\n`),
    datasetCell(spec.dataset),
    markdown("## Guided practice\n\nRead each step, predict the result, and run the cell.\n"),
  ];
  if (isSolution) {
    cells.push(markdown("## Completed solution\n\nThe cells below contain one complete, executable solution.\n"));
    cells.push(...spec.solutionCells.map((source) => code(source)));
  } else {
    cells.push(markdown("## Your turn\n\nComplete the exercise below. Compare your work with the separate solution notebook only after attempting it.\n"));
    cells.push(code("# TODO: Write your solution here\n"));
  }
  return {
    cells: cells.map((cell, index) => ({ ...cell, id: `${variant}-${String(index + 1).padStart(2, "0")}` })),
    metadata: {
      kernelspec: { display_name: "Python 3", language: "python", name: "python3" },
      language_info: { name: "python", version: "3.11" },
      field_notes: { lesson_slug: spec.slug, variant },
    },
    nbformat: 4,
    nbformat_minor: 5,
  };
}

for (const spec of specs) {
  for (const variant of ["starter", "solution"]) {
    fs.writeFileSync(path.join(outDir, `${spec.slug}-${variant}.ipynb`), `${JSON.stringify(notebook(spec, variant), null, 2)}\n`);
  }
}

console.log(`Generated ${specs.length * 2} notebooks in ${path.relative(root, outDir)}`);
