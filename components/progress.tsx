"use client";

import { useEffect, useState } from "react";

const key = "field-notes-completed-lessons";

function readCompleted() {
  if (typeof window === "undefined") return [] as string[];
  try {
    return JSON.parse(localStorage.getItem(key) || "[]") as string[];
  } catch {
    return [];
  }
}

export function CourseProgress({ courseSlug, lessonSlugs }: { courseSlug: string; lessonSlugs: string[] }) {
  const [completed, setCompleted] = useState<string[]>([]);
  useEffect(() => setCompleted(readCompleted()), []);
  const ids = lessonSlugs.map((slug) => `${courseSlug}/${slug}`);
  const count = ids.filter((id) => completed.includes(id) || completed.includes(id.split("/")[1])).length;
  const percent = Math.round((count / lessonSlugs.length) * 100);

  return (
    <div className="course-progress">
      <div><span>COURSE PROGRESS</span><strong>{count} / {lessonSlugs.length}</strong></div>
      <div className="progress-bar"><span style={{ width: `${percent}%` }} /></div>
    </div>
  );
}

export function CompleteLessonButton({ courseSlug, slug }: { courseSlug: string; slug: string }) {
  const [completed, setCompleted] = useState(false);
  const id = `${courseSlug}/${slug}`;

  useEffect(() => setCompleted(readCompleted().includes(id) || readCompleted().includes(slug)), [id, slug]);

  function toggle() {
    const current = readCompleted();
    const isComplete = current.includes(id) || current.includes(slug);
    const next = isComplete ? current.filter((item) => item !== id && item !== slug) : [...current, id];
    localStorage.setItem(key, JSON.stringify(next));
    setCompleted(next.includes(id));
  }

  return <button className={`button complete-button ${completed ? "completed" : ""}`} onClick={toggle}>{completed ? "Completed ✓" : "Mark lesson complete"}</button>;
}

export function LessonCheck({ courseSlug, slug }: { courseSlug: string; slug: string }) {
  const [completed, setCompleted] = useState(false);
  const id = `${courseSlug}/${slug}`;
  useEffect(() => setCompleted(readCompleted().includes(id) || readCompleted().includes(slug)), [id, slug]);
  return <span className={`lesson-check ${completed ? "checked" : ""}`} aria-label={completed ? "Completed" : "Not completed"}>{completed ? "✓" : ""}</span>;
}
