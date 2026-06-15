import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConceptDiagram } from "@/components/diagrams";
import { CompleteLessonButton } from "@/components/progress";
import { CodingLesson } from "@/components/coding-lesson";
import { GameChapter } from "@/components/game-chapter";
import { getCourse, getLesson, getLessonNavigation } from "@/lib/course-data";

type Props = { params: Promise<{ courseSlug: string; lessonSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const values = await params;
  const course = getCourse(values.courseSlug);
  const lesson = course && getLesson(course, values.lessonSlug);
  return { title: lesson?.title || "Lesson" };
}

export default async function LessonPage({ params }: Props) {
  const values = await params;
  const course = getCourse(values.courseSlug);
  if (!course) notFound();
  const lesson = getLesson(course, values.lessonSlug);
  if (!lesson) notFound();
  const navigation = getLessonNavigation(course, lesson.slug);

  return (
    <main className="lesson-layout">
      <aside className="lesson-sidebar">
        <Link className="sidebar-back" href={`/courses/${course.slug}`}>← Course syllabus</Link>
        <p>{course.shortTitle}</p>
        <nav>{course.modules.map((module) => <div key={module.number}><span>{module.number} / {module.title}</span>{module.lessons.map((item) => <Link className={item.slug === lesson.slug ? "active" : ""} key={item.slug} href={`/courses/${course.slug}/${item.slug}`}>{item.title}</Link>)}</div>)}</nav>
      </aside>
      <article className="lesson-article">
        <header className="lesson-header"><p className="eyebrow">{lesson.eyebrow}</p><h1>{lesson.title}</h1><p>{lesson.summary}</p><div className="lesson-meta"><span>{lesson.duration}</span><span>LESSON {String(navigation.index + 1).padStart(2, "0")} / {navigation.total}</span></div></header>
        <ConceptDiagram type={lesson.diagram} label={`FIG_${String(navigation.index + 1).padStart(3, "0")}`} />
        <p className="concept-caption"><span>CORE CONCEPT</span>{lesson.concept}</p>
        {lesson.game && <GameChapter content={lesson.game} />}
        {lesson.coding && <CodingLesson content={lesson.coding} />}
        <div className="lesson-body">
          {lesson.sections.map((section, index) => (
            <section key={section.title}>
              <span className="section-number">{String(index + 1).padStart(2, "0")}</span>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          {lesson.casestudy && (
            <section className="case-study">
              <span className="case-study-badge">CASE STUDY</span>
              <h2>{lesson.casestudy.title}</h2>
              {lesson.casestudy.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          )}

          <aside className="key-ideas">
            <p className="eyebrow">KEY IDEAS</p>
            <ol>
              {lesson.keyIdeas.map((idea) => (
                <li key={idea}>{idea}</li>
              ))}
            </ol>
          </aside>

          <section className="exercises-container">
            <p className="eyebrow">FIELD EXERCISES</p>
            
            <div className="exercise-tier conceptual">
              <span className="exercise-tier-label">Tier 1: Conceptual understanding</span>
              <h3>{lesson.exercises.conceptual.prompt}</h3>
              <details>
                <summary>Show a useful hint</summary>
                <p>{lesson.exercises.conceptual.hint}</p>
              </details>
            </div>

            <div className="exercise-tier applied">
              <span className="exercise-tier-label">Tier 2: Applied scenario</span>
              <h3>{lesson.exercises.applied.prompt}</h3>
              <details>
                <summary>Show a useful hint</summary>
                <p>{lesson.exercises.applied.hint}</p>
              </details>
            </div>

            <div className="exercise-tier critical">
              <span className="exercise-tier-label">Tier 3: Critical thinking</span>
              <h3>{lesson.exercises.critical.prompt}</h3>
              <details>
                <summary>Show a useful hint</summary>
                <p>{lesson.exercises.critical.hint}</p>
              </details>
            </div>
          </section>
        </div>
        <div className="lesson-complete"><CompleteLessonButton courseSlug={course.slug} slug={lesson.slug} /></div>
        <nav className="lesson-navigation">
          {navigation.previous ? <Link href={`/courses/${course.slug}/${navigation.previous.slug}`}><small>Previous lesson</small><strong>← {navigation.previous.title}</strong></Link> : <span />}
          {navigation.next ? <Link className="next" href={`/courses/${course.slug}/${navigation.next.slug}`}><small>Next lesson</small><strong>{navigation.next.title} →</strong></Link> : <Link className="next" href={`/courses/${course.slug}`}><small>Course complete</small><strong>Return to syllabus →</strong></Link>}
        </nav>
      </article>
    </main>
  );
}
