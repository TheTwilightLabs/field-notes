import type { GameChapterContent } from "@/lib/course-data";

export function GameChapter({ content }: { content: GameChapterContent }) {
  return (
    <section className="game-chapter" aria-labelledby="game-chapter-title">
      <div className="game-chapter-heading">
        <div>
          <p className="eyebrow">BUILD-ALONG GAME / SIGNAL GARDEN</p>
          <h2 id="game-chapter-title">One chapter. One new system.</h2>
        </div>
        <strong>{String(content.chapter).padStart(2, "0")} / {String(content.totalChapters).padStart(2, "0")}</strong>
      </div>
      <div className="game-progress" aria-label={`Game chapter ${content.chapter} of ${content.totalChapters}`}>
        {Array.from({ length: content.totalChapters }, (_, index) => (
          <span className={index < content.chapter ? "unlocked" : ""} key={index} />
        ))}
      </div>
      <div className="game-console">
        <div className="game-world" aria-hidden="true">
          <span className="garden-orb orb-one" />
          <span className="garden-orb orb-two" />
          <span className="garden-orb orb-three" />
          <span className="garden-path path-one" />
          <span className="garden-path path-two" />
          <span className="garden-player">N</span>
        </div>
        <div className="game-status">
          <span>MECHANIC UNLOCKED</span>
          <h3>{content.mechanic}</h3>
          <dl>
            <div><dt>Location</dt><dd>{content.preview.location}</dd></div>
            <div><dt>Energy</dt><dd>{"◆".repeat(content.preview.energy)}{"◇".repeat(Math.max(0, 5 - content.preview.energy))}</dd></div>
            <div><dt>Signals</dt><dd>{content.preview.signals} / 3</dd></div>
          </dl>
          <p>&gt; {content.preview.message}</p>
        </div>
      </div>
      <div className="game-unlocks">
        {content.unlocks.map((unlock) => <span key={unlock}>{unlock}</span>)}
      </div>
    </section>
  );
}
