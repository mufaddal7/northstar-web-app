import Link from "next/link";
export default function OfflinePage() { return <section className="not-found"><div className="shell"><p className="eyebrow">Offline</p><h1>You&apos;re not connected right now.</h1><p>Please check your connection and try again.</p><Link className="button button--gold" href="/">Try again</Link></div></section> }
