# Field Notes Course Platform

An original Next.js course platform for open, visual, practical data-science education.

The library currently includes:

- **Python for Data Science** — an absolute-beginner foundation with 25 coding lessons, downloadable notebooks, compact datasets, and the seven-chapter Signal Garden game build-along.
- **Machine Learning, Visually** — 6 modules and 16 lessons covering ML foundations, supervised learning, evaluation, production systems, and unsupervised learning.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Notebook artifacts

Generate and verify all downloadable notebooks:

```bash
npm run generate:notebooks
npm run generate:game
npm run verify:course-data
npm run verify:notebooks
npm run verify:game
```

`npm test` runs the complete artifact, notebook-execution, and TypeScript verification workflow.

Set `NEXT_PUBLIC_GITHUB_REPO_BASE` to the public GitHub blob base before deployment to enable **Open in Colab** links:

```bash
NEXT_PUBLIC_GITHUB_REPO_BASE=https://github.com/owner/repository/blob/main
```

Notebook source specifications live in `notebooks/templates/`; generated downloads live in `public/notebooks/`; teaching datasets live in `public/datasets/`.

## Before launch

- Replace `Twilight Labs` with the final company name.
- Connect the project inquiry form to a CRM or form backend.
- Add authentication and server-side progress persistence if required.
- Add automatically checked assessments.
- Add production analytics and SEO assets.

## Structure

- `app/` — Next.js routes and page layouts
- `components/` — shared diagrams, forms, navigation, and progress UI
- `lib/course-data.ts` — typed curriculum and lesson content

## License

Choose separate licenses for code and editorial content before publishing.
