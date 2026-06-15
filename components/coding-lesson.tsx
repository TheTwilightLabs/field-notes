import type { CodingLessonContent } from "@/lib/course-data";

function getColabUrl(notebook: string) {
  const base = process.env.NEXT_PUBLIC_GITHUB_REPO_BASE?.replace(/\/$/, "");
  if (!base) return undefined;
  const githubPath = `${base}/public/notebooks/${notebook}`;
  return githubPath.replace("https://github.com/", "https://colab.research.google.com/github/");
}

export function CodingLesson({ content }: { content: CodingLessonContent }) {
  const colabUrl = content.colabNotebook ? getColabUrl(content.colabNotebook) : undefined;

  return (
    <>
      <section className="coding-brief" aria-labelledby="coding-objectives">
        <div>
          <p className="eyebrow">PRACTICAL OUTCOME</p>
          <h2 id="coding-objectives">{content.outcome}</h2>
        </div>
        <div className="coding-brief-lists">
          <div><h3>Learning objectives</h3><ul>{content.objectives.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><h3>Prerequisites</h3><ul>{content.prerequisites.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>
      </section>

      <section className="code-walkthrough" aria-labelledby="code-walkthrough">
        <p className="eyebrow">STEP-BY-STEP CODE</p>
        <h2 id="code-walkthrough">Write it. Run it. Inspect it.</h2>
        {content.steps.map((step, index) => (
          <article className="code-step" key={step.title}>
            <header><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.explanation}</p></div></header>
            <div className="code-panel"><span>PYTHON</span><pre><code>{step.code}</code></pre></div>
            {step.output && <div className="output-panel"><span>EXPECTED OUTPUT</span><pre>{step.output}</pre></div>}
          </article>
        ))}
      </section>

      <section className="lesson-resources" aria-labelledby="lesson-resources">
        <div className="resources-heading">
          <div><p className="eyebrow">DOWNLOAD &amp; PRACTICE</p><h2 id="lesson-resources">Take the lesson with you.</h2></div>
          {content.colabNotebook && (colabUrl
            ? <a className="button primary" href={colabUrl} target="_blank" rel="noreferrer">Open starter in Colab ↗</a>
            : <span className="button disabled" aria-disabled="true" title="Set NEXT_PUBLIC_GITHUB_REPO_BASE to enable Colab links">Colab link not configured</span>)}
        </div>
        {content.colabNotebook && !colabUrl && <p className="resource-note">Downloads work now. Set <code>NEXT_PUBLIC_GITHUB_REPO_BASE</code> to a public GitHub blob URL, such as <code>https://github.com/owner/repo/blob/main</code>, to enable Colab.</p>}
        <div className="resource-grid">
          {content.resources.map((resource) => (
            <article className="resource-card" key={resource.href}>
              <div><span>{resource.kind}</span><small>{resource.format} / {resource.size}</small></div>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              {resource.attribution && <small className="resource-attribution">{resource.attribution}</small>}
              <a className="button" href={resource.href} download>Download {resource.format} ↓</a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
