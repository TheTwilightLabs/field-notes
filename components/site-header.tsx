"use client";

import Link from "next/link";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Field Notes home">
        FIELD<span>_</span>NOTES
      </Link>
      <div className="header-intro">
        <p>Open visual courses for data science.</p>
        <p>Created by <strong>Twilight Labs.</strong></p>
      </div>
      <button className="menu-button" type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span />
        <span />
      </button>
      <nav className={`site-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
        <Link href="/courses" onClick={() => setOpen(false)}>Courses</Link>
        <Link href="/courses/machine-learning" onClick={() => setOpen(false)}>Start learning</Link>
        <Link href="/#work" onClick={() => setOpen(false)}>Work with us</Link>
        <Link className="nav-cta" href="/courses/machine-learning" onClick={() => setOpen(false)}>Open course</Link>
      </nav>
    </header>
  );
}
