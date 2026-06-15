import Link from "next/link";
import { ConceptDiagram } from "@/components/diagrams";
import { LeadForm } from "@/components/forms";
import { courses, machineLearningCourse } from "@/lib/course-data";

export default function Home() {
  return (
    <main>
      <section className="home-hero editorial-grid">
        <div className="home-hero-copy">
          <p className="eyebrow">OPEN COURSE 001 / MACHINE LEARNING</p>
          <h1>Learn how machines <em>learn.</em></h1>
          <p className="intro-copy">A visual, first-principles course about models, data, evaluation, and the work required to make machine learning useful.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/courses/machine-learning">Start the ML course</Link>
            <Link className="button text-button" href="/courses">Browse curriculum ↗</Link>
          </div>
          <dl className="hero-stats">
            <div><dt>Lessons</dt><dd>16</dd></div>
            <div><dt>Modules</dt><dd>06</dd></div>
            <div><dt>Level</dt><dd>Beginner+</dd></div>
          </dl>
        </div>
        <ConceptDiagram type="gradient" />
      </section>

      <section className="manifesto">
        <p className="eyebrow">WHY FIELD NOTES</p>
        <p className="manifesto-text">Data science is often taught as formulas and libraries. <strong>We teach the ideas underneath them.</strong> Build intuition first, then learn how to make responsible systems.</p>
        <div className="manifesto-meta"><span>OPEN SOURCE</span><span>VISUAL FIRST</span><span>PROJECT BASED</span></div>
      </section>

      <section className="course-preview page-shell">
        <div className="section-heading">
          <div><p className="eyebrow">START HERE</p><h2>{machineLearningCourse.title}</h2></div>
          <Link className="button" href="/courses/machine-learning">View full syllabus →</Link>
        </div>
        <div className="module-cards">
          {machineLearningCourse.modules.map((module) => (
            <article className="module-card" key={module.number}>
              <span>{module.number}</span><h3>{module.title}</h3><p>{module.description}</p><small>{module.lessons.length} lessons</small>
            </article>
          ))}
        </div>
      </section>

      <section className="catalog-strip page-shell">
        <div><p className="eyebrow">THE LIBRARY</p><h2>Start with foundations. Build the whole system.</h2></div>
        <div className="catalog-list">
          {courses.map((course, index) => (
            <Link href={course.status === "available" ? `/courses/${course.slug}` : "/courses"} key={course.slug}>
              <span>{course.kind === "foundation" ? "F" : `0${courses.filter((item) => item.kind === "course").indexOf(course) + 1}`}</span><strong>{course.shortTitle}</strong><small>{course.status}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="work-copy"><p className="eyebrow">BUILT BY TWILIGHT LABS</p><h2>We turn difficult data problems into useful products.</h2><p>The team behind Field Notes helps companies design ML systems, data platforms, and visual explanations people can actually use.</p><ul><li>Machine-learning product strategy</li><li>ML prototypes and evaluation</li><li>Data platforms and analytics</li><li>Technical storytelling</li></ul></div>
        <LeadForm />
      </section>
    </main>
  );
}
