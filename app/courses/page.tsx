import type { Metadata } from "next";
import Link from "next/link";
import { courses } from "@/lib/course-data";

export const metadata: Metadata = { title: "Courses" };

export default function CoursesPage() {
  const foundations = courses.filter((course) => course.kind === "foundation");
  const curriculum = courses.filter((course) => course.kind === "course");

  return (
    <main className="page-shell courses-page">
      <header className="page-intro">
        <p className="eyebrow">FIELD GUIDE / COURSE CATALOG</p>
        <h1>Learn the whole <em>system.</em></h1>
        <p>Each course explains one part of data science visually, then connects it to the practical decisions required to build useful products.</p>
      </header>
      <section className="catalog-section">
        <div className="section-heading"><div><p className="eyebrow">FOUNDATIONS</p><h2>Build the skills to begin.</h2></div></div>
        <div className="course-grid foundation-grid">
        {foundations.map((course) => (
          <article className={`course-card ${course.status}`} key={course.slug}>
            <div className="course-card-top"><span>FOUNDATION</span><span>{course.status}</span></div>
            <h2>{course.title}</h2><p>{course.description}</p>
            <dl><div><dt>Level</dt><dd>{course.level}</dd></div><div><dt>Duration</dt><dd>{course.duration}</dd></div></dl>
            {course.status === "available" ? <Link className="button primary" href={`/courses/${course.slug}`}>Open course →</Link> : <span className="button disabled">In development</span>}
          </article>
        ))}
        </div>
      </section>
      <section className="catalog-section">
        <div className="section-heading"><div><p className="eyebrow">CONNECTED CURRICULUM</p><h2>Learn the whole system.</h2></div></div>
        <div className="course-grid">
        {curriculum.map((course, index) => (
          <article className={`course-card ${course.status}`} key={course.slug}>
            <div className="course-card-top"><span>COURSE_00{index + 1}</span><span>{course.status}</span></div>
            <h2>{course.title}</h2><p>{course.description}</p>
            <dl><div><dt>Level</dt><dd>{course.level}</dd></div><div><dt>Duration</dt><dd>{course.duration}</dd></div></dl>
            {course.status === "available" ? <Link className="button primary" href={`/courses/${course.slug}`}>Open course →</Link> : <span className="button disabled">In development</span>}
          </article>
        ))}
        </div>
      </section>
    </main>
  );
}
