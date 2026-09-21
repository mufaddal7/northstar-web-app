export function SectionHeading({ eyebrow, title, copy, inverse = false }: { eyebrow: string; title: string; copy?: string; inverse?: boolean }) {
  return <div className={`section-heading ${inverse ? "section-heading--inverse" : ""}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy ? <p>{copy}</p> : null}</div>;
}
