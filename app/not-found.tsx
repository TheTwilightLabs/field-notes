import Link from "next/link";

export default function NotFound() {
  return <main className="not-found page-shell"><p className="eyebrow">ERROR_404</p><h1>That field note does not exist.</h1><Link className="button primary" href="/courses">Browse courses →</Link></main>;
}
