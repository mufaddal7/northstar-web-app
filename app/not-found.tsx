import Link from "next/link";
export default function NotFound() { return <section className="not-found"><div className="shell"><p className="eyebrow">404</p><h1>That direction doesn&apos;t exist.</h1><p>Return to the Northstar home page to explore the available paths.</p><Link className="button button--gold" href="/">Back to home</Link></div></section> }
