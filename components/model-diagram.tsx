import Link from "next/link";
import { ArrowUpRight, CompassMark } from "@/components/icons";
import { pillars } from "@/lib/site-data";

export function ModelDiagram({ compact = false }: { compact?: boolean }) {
  return <div className={`model-diagram ${compact ? "model-diagram--compact" : ""}`}><div className="model-diagram__axis" aria-hidden="true"><CompassMark/><span/></div><div className="model-diagram__items">{pillars.map((pillar) => <Link className="model-node" href={`/what-we-do/${pillar.slug}`} key={pillar.slug}><span className="model-node__number">{pillar.number}</span><div><p>{pillar.name}</p><span>{pillar.statement}</span></div><ArrowUpRight/></Link>)}<div className="model-outcome"><span>04</span><div><p>Business outcomes</p><span>Clarity, capability and progress.</span></div></div></div></div>;
}
