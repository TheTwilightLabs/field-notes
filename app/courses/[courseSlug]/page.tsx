import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConceptDiagram } from "@/components/diagrams";
import { CourseProgress, LessonCheck } from "@/components/progress";
import { getCourse } from "@/lib/course-data";

type Props = { params: Promise<{ courseSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = getCourse((await params).courseSlug);
  return { title: course?.title || "Course" };
}

export default async function CoursePage({ params }: Props) {
  const course = getCourse((await params).courseSlug);
  if (!course || course.status !== "available") notFound();
  const slugs = course.modules.flatMap((module) => module.lessons.map((lesson) => lesson.slug));

  return (
    <main>
      <section className="course-hero editorial-grid">
        <div className="course-hero-copy">
          <p className="eyebrow">{course.kind === "foundation" ? "FOUNDATION / START HERE" : "COURSE / NOW OPEN"}</p><h1>{course.title}</h1><p className="intro-copy">{course.description}</p>
          <dl className="course-meta"><div><dt>Level</dt><dd>{course.level}</dd></div><div><dt>Time</dt><dd>{course.duration}</dd></div><div><dt>Lessons</dt><dd>{slugs.length}</dd></div></dl>
          <Link className="button primary" href={`/courses/${course.slug}/${slugs[0]}`}>Begin course →</Link>
        </div>
        <ConceptDiagram type={course.kind === "foundation" ? "pipeline" : "classification"} />
      </section>
      <section className="course-promise page-shell"><p className="eyebrow">COURSE OUTCOME</p><p>{course.promise}</p><CourseProgress courseSlug={course.slug} lessonSlugs={slugs} /></section>
      <section className="syllabus page-shell">
        <div className="section-heading"><div><p className="eyebrow">COMPLETE SYLLABUS</p><h2>{course.modules.length} modules. One practical path.</h2></div></div>
        {course.modules.map((module) => (
          <article className="syllabus-module" key={module.number}>
            <div className="module-summary"><span>{module.number}</span><div><h3>{module.title}</h3><p>{module.description}</p></div></div>
            <ol>{module.lessons.map((lesson) => <li key={lesson.slug}><Link href={`/courses/${course.slug}/${lesson.slug}`}><LessonCheck courseSlug={course.slug} slug={lesson.slug} /><span>{lesson.title}</span><small>{lesson.duration}</small><b>→</b></Link></li>)}</ol>
          </article>
        ))}
      </section>
    </main>
  );
}
