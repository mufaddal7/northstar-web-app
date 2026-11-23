"use client";

import {
  Controls,
  Handle,
  MiniMap,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
} from "react";
import { erpModuleGroups, type ErpModuleGroup } from "@/lib/erp-module-data";
import { SectionHeading } from "@/components/ui";

import "@xyflow/react/dist/style.css";

type NodeKind = "experience" | "core" | "platform" | "plugins";

type ArchitectureNodeData = {
  title: string;
  eyebrow?: string;
  description?: string;
  items?: string[];
  kind: NodeKind;
};

type ArchitectureNode = Node<ArchitectureNodeData, "architecture">;

const palette = {
  finance: { color: "#b47d00", surface: "#fff5d6", ink: "#5b4100" },
  supply: { color: "#218449", surface: "#e5f7eb", ink: "#104b2b" },
  manufacturing: { color: "#d45d16", surface: "#ffede1", ink: "#71300f" },
  customer: { color: "#216fc3", surface: "#e7f1ff", ink: "#123e75" },
  people: { color: "#c33e65", surface: "#ffedf2", ink: "#721b37" },
  emerging: { color: "#7040a5", surface: "#f0e9ff", ink: "#402061" },
} as const;

const groupPaletteKey: Record<string, keyof typeof palette> = {
  finance: "finance",
  "supply-chain": "supply",
  manufacturing: "manufacturing",
  customer: "customer",
  "people-projects": "people",
  emerging: "emerging",
};

const experienceItems = [
  "Customer portal",
  "Sales & CRM (Customer Relationship Management)",
  "Supplier portal",
  "Mobile workforce",
  "Chat Bot & AI assistant",
  "WhatsApp & Messaging",
  "Call center & service center",
];

const platformItems = [
  "Workflow & approvals (Business Process Management)",
  "API & integrations (Application Programming Interface)",
  "Identity & access (Identity and Access Management)",
  "BI & dashboards (Business Intelligence)",
  "Audit & compliance (Governance, Risk & Compliance)",
];

const pluginItems = [
  "WMS (Warehouse Management System)",
  "TMS (Transportation Management System)",
  "MES (Manufacturing Execution System)",
  "PLM (Product Lifecycle Management)",
  "Tax engine (Tax Management)",
  "EDI (Electronic Data Interchange)",
  "E-commerce (Digital Commerce)",
  "Document management (Enterprise Content Management)",
];

const nodeTypes = { architecture: ArchitectureNode };

export function ErpReferenceArchitecture() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  const edges = useMemo(() => createEdges(isMobile), [isMobile]);
  const nodes = useMemo(
    () => layoutNodes(createNodes(isMobile), isMobile),
    [isMobile],
  );

  return (
    <section aria-labelledby="erp-reference-architecture-title">
      <div className="mx-auto w-full max-w-[1900px] px-[clamp(1rem,3vw,3rem)]">
        <SectionHeading
          eyebrow="Reference architecture"
          title="A connected ERP operating model."
          copy="Every business capability lives inside one ERP core. Platform services and specialist plugins extend it without fragmenting the operation."
        />

        <figure className="mt-9 overflow-hidden rounded-[1.75rem] border border-[#cbd3df] bg-[#f7f9fc] shadow-[0_24px_70px_rgb(12_19_42_/_0.12)] dark:border-white/15 dark:bg-[#10182e]">
          <figcaption className="flex flex-col gap-3 border-b border-[#cbd3df] px-5 py-5 dark:border-white/15 sm:flex-row sm:items-end sm:justify-between sm:px-7">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
                Northstar ERP blueprint
              </p>
              <h2
                className="mt-1 font-display text-3xl leading-tight tracking-[-0.035em] sm:text-4xl"
                id="erp-reference-architecture-title"
              >
                One source of truth, many connected capabilities.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
              <span className="rounded-full border border-border bg-surface px-3 py-1.5">
                6 domains
              </span>
              <span className="rounded-full border border-border bg-surface px-3 py-1.5">
                33 modules
              </span>
              <span className="rounded-full border border-border bg-surface px-3 py-1.5">
                Running flows
              </span>
            </div>
          </figcaption>

          <div className="relative h-[820px] sm:h-[700px] lg:h-[760px]">
            <ArchitectureFlow edges={edges} isMobile={isMobile} nodes={nodes} />
          </div>

          <div className="border-t border-[#cbd3df] px-5 py-4 dark:border-white/15 sm:px-7">
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
              {Object.entries(palette).map(([name, style]) => (
                <span className="flex items-center gap-2" key={name}>
                  <span
                    className="h-2.5 w-8 rounded-full"
                    style={{ backgroundColor: style.color }}
                  />
                  {name}
                </span>
              ))}
              <span className="ml-auto hidden normal-case tracking-normal sm:block">
                Scroll to zoom · drag to pan
              </span>
            </div>
            <p className="mt-3 text-xs leading-5 text-muted">
              Conceptual reference architecture. Module boundaries, integrations
              and plugin scope should be confirmed against the operating model,
              platform and regulatory requirements.
            </p>
          </div>
        </figure>
      </div>
    </section>
  );
}

function createNodes(isMobile: boolean): ArchitectureNode[] {
  return [
    makeNode(
      "experience",
      {
        title: "Experience & channels",
        // eyebrow: "Where demand enters the operation",
        items: experienceItems,
        kind: "experience",
      },
      isMobile ? 360 : 980,
    ),
    makeNode(
      "core",
      {
        title: "ERP core",
        eyebrow: "System of record",
        description:
          "Shared master data, transaction processing, financial control, workflow and audit trail.",
        kind: "core",
      },
      isMobile ? 360 : 1180,
    ),
    makeNode(
      "platform",
      {
        title: "Platform services",
        // eyebrow: "Connect, control and learn",
        items: platformItems,
        kind: "platform",
      },
      isMobile ? 360 : 900,
    ),
    makeNode(
      "plugins",
      {
        title: "Plugins & connected applications",
        // eyebrow: "Specialist depth without disconnected islands",
        description:
          "Approved extensions connected through APIs, events and integration patterns.",
        items: pluginItems,
        kind: "plugins",
      },
      isMobile ? 360 : 330,
    ),
  ];
}

function makeNode(
  id: string,
  data: ArchitectureNodeData,
  width: number,
): ArchitectureNode {
  return {
    id,
    data,
    position: { x: 0, y: 0 },
    style: { width },
    type: "architecture",
  };
}

function createEdges(isMobile: boolean): Edge[] {
  return [
    makeEdge(
      "experience-core",
      "experience",
      "core",
      "#216fc3",
      "source-bottom",
      "target-top",
    ),
    makeEdge(
      "core-platform",
      "core",
      "platform",
      "#287a9f",
      "source-bottom",
      "target-top",
    ),
    makeEdge(
      "core-plugins",
      "core",
      "plugins",
      "#b78217",
      isMobile ? "source-bottom" : "source-right",
      isMobile ? "target-top" : "target-left",
    ),
  ];
}

function makeEdge(
  id: string,
  source: string,
  target: string,
  color: string,
  sourceHandle: string,
  targetHandle: string,
): Edge {
  return {
    id,
    source,
    sourceHandle,
    target,
    targetHandle,
    animated: true,
    style: { stroke: color, strokeWidth: 3 },
    type: "smoothstep",
  };
}

function layoutNodes(nodes: ArchitectureNode[], isMobile: boolean) {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const core = byId.get("core");
  const experience = byId.get("experience");
  const platform = byId.get("platform");
  const plugins = byId.get("plugins");

  if (!core || !experience || !platform || !plugins) {
    return nodes;
  }

  const gap = isMobile ? 32 : 36;
  const platformGap = isMobile ? 32 : 2;
  const coreWidth = nodeWidth(core);
  const coreHeight = nodeHeight(core.data, isMobile);
  const experienceWidth = nodeWidth(experience);
  const platformWidth = nodeWidth(platform);
  const coreX = isMobile ? 0 : 40;
  const coreY = isMobile
    ? nodeHeight(experience.data, true) + gap
    : nodeHeight(experience.data, false) + gap;

  const positions = new Map<string, { x: number; y: number }>([
    [
      "experience",
      {
        x: coreX + (coreWidth - experienceWidth) / 2,
        y: 0,
      },
    ],
    ["core", { x: coreX, y: coreY }],
    [
      "platform",
      {
        x: isMobile ? 0 : coreX + (coreWidth - platformWidth) / 2,
        y: coreY + coreHeight + platformGap + 0,
      },
    ],
    [
      "plugins",
      {
        x: isMobile ? 0 : coreX + coreWidth + gap,
        y: isMobile
          ? coreY +
            coreHeight +
            platformGap +
            nodeHeight(platform.data, true) +
            gap
          : coreY + 20,
      },
    ],
  ]);

  return nodes.map((node) => ({
    ...node,
    position: positions.get(node.id) ?? { x: 0, y: 0 },
    style: {
      width: nodeWidth(node),
    },
  }));
}

function nodeWidth(node: ArchitectureNode) {
  return Number(node.style?.width ?? 280);
}

function nodeHeight(data: ArchitectureNodeData, isMobile: boolean) {
  if (data.kind === "core") return isMobile ? 620 : 500;

  const columns =
    data.kind === "plugins"
      ? 1
      : data.kind === "experience"
        ? isMobile
          ? 2
          : 4
        : isMobile
          ? 2
          : 5;
  const rows = Math.ceil((data.items?.length ?? 0) / columns);
  const header = data.description ? 72 : 52;
  const itemHeight = data.kind === "plugins" ? 38 : 40;

  return header + rows * itemHeight + 28;
}

function nodeColor(id: string) {
  if (id === "experience") return "#216fc3";
  if (id === "core") return "#b98724";
  if (id === "platform") return "#287a9f";
  return "#b78217";
}

function ArchitectureNode({ data }: NodeProps<ArchitectureNode>) {
  if (data.kind === "core") {
    return <CoreNode />;
  }

  const style =
    data.kind === "experience"
      ? { color: "#216fc3", surface: "#e7f1ff", ink: "#123e75" }
      : data.kind === "platform"
        ? { color: "#287a9f", surface: "#e8f7fb", ink: "#12465c" }
        : { color: "#b78217", surface: "#fff5d6", ink: "#5b4100" };

  return (
    <div
      className="erp-reference-node flex h-auto flex-col rounded-xl border-2 p-3 shadow-[0_8px_24px_rgb(12_19_42_/_0.1)]"
      style={{
        backgroundColor: style.surface,
        borderColor: style.color,
        color: style.ink,
      }}
    >
      <FlowHandles color={style.color} />
      <p className="text-center text-[9px] font-bold uppercase tracking-[0.16em] opacity-65">
        {data.eyebrow}
      </p>
      <h3 className="mt-1 text-center font-display text-xl leading-tight">
        {data.title}
      </h3>
      {data.description ? (
        <p className="mt-2 text-center text-[11px] leading-4 opacity-75">
          {data.description}
        </p>
      ) : null}
      <ModuleList items={data.items ?? []} kind={data.kind} />
    </div>
  );
}

function CoreNode() {
  return (
    <div className="erp-reference-node flex h-auto flex-col rounded-2xl border-2 border-[#b98724] bg-[#111c3b] p-4 pb-0 text-white shadow-[0_14px_38px_rgb(12_19_42_/_0.28)]">
      <FlowHandles color="#b98724" />
      <div className="flex items-start justify-between gap-4 border-b border-white/20 pb-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f0cf7b]">
            System of record
          </p>
          <h3 className="mt-1 font-display text-3xl">ERP core</h3>
        </div>
        <span className="rounded-full border border-[#e0bd67] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#f0cf7b]">
          33 modules
        </span>
      </div>
      <p className="mt-3 max-w-3xl text-[11px] leading-4 text-white/65">
        Shared master data, transaction processing, financial control, workflow,
        approvals and audit trail keep the operating model aligned.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {erpModuleGroups.map((group) => {
          const style = palette[groupPaletteKey[group.id]];
          return <DomainCard group={group} key={group.id} style={style} />;
        })}
      </div>
      <p className="mt-1 border-t border-white/15 pb-1 pt-1 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-[#f0cf7b]">
        Shared data · shared rules · shared visibility
      </p>
    </div>
  );
}

function DomainCard({
  group,
  style,
}: {
  group: ErpModuleGroup;
  style: { color: string; surface: string; ink: string };
}) {
  return (
    <section
      className="min-w-0 rounded-lg border p-2.5"
      style={{
        backgroundColor: style.surface,
        borderColor: style.color,
        color: style.ink,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-display text-sm leading-tight">{group.name}</h4>
        <span className="rounded-full border border-current/25 px-1.5 py-0.5 text-[9px] font-bold">
          {group.modules.length}
        </span>
      </div>
      <ul className="mt-2 grid grid-cols-2 gap-1">
        {group.modules.map((module) => (
          <li
            className="min-w-0 rounded border border-current/15 bg-white/70 px-1.5 py-1 text-[8px] font-bold leading-3"
            key={module.name}
          >
            {module.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ModuleList({ items, kind }: { items: string[]; kind: NodeKind }) {
  return (
    <ul
      className={`mt-3 flex flex-wrap justify-center gap-1.5 ${
        kind === "plugins"
          ? "flex-col"
          : kind === "experience"
            ? "[&>li]:basis-[calc(50%-0.375rem)] lg:[&>li]:basis-[calc(25%-0.375rem)]"
            : kind === "platform"
              ? "[&>li]:basis-[calc(50%-0.375rem)] lg:[&>li]:basis-[calc(20%-0.375rem)]"
              : "[&>li]:basis-[calc(50%-0.375rem)]"
      }`}
    >
      {items.map((item) => (
        <li
          className="flex min-h-8 w-full items-center justify-center rounded-md border border-current/15 bg-white/70 px-2 py-1.5 text-center text-[9px] font-bold leading-3"
          key={item}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function FlowHandles({ color }: { color: string }) {
  return (
    <>
      <Handle
        id="target-top"
        position={Position.Top}
        type="target"
        className="!h-2 !w-2 !border-0"
        style={{ backgroundColor: color }}
      />
      <Handle
        id="source-bottom"
        position={Position.Bottom}
        type="source"
        className="!h-2 !w-2 !border-0"
        style={{ backgroundColor: color }}
      />
      <Handle
        id="target-left"
        position={Position.Left}
        type="target"
        className="!h-2 !w-2 !border-0"
        style={{ backgroundColor: color }}
      />
      <Handle
        id="source-right"
        position={Position.Right}
        type="source"
        className="!h-2 !w-2 !border-0"
        style={{ backgroundColor: color }}
      />
    </>
  );
}

function ArchitectureFlow({
  edges,
  isMobile,
  nodes,
}: {
  edges: Edge[];
  isMobile: boolean;
  nodes: ArchitectureNode[];
}) {
  return (
    <ReactFlowProvider>
      <ArchitectureFlowCanvas edges={edges} isMobile={isMobile} nodes={nodes} />
    </ReactFlowProvider>
  );
}

function ArchitectureFlowCanvas({
  edges,
  isMobile,
  nodes,
}: {
  edges: Edge[];
  isMobile: boolean;
  nodes: ArchitectureNode[];
}) {
  const { getZoom, setCenter } = useReactFlow();
  const focusNode = useCallback(
    (_event: MouseEvent, node: ArchitectureNode) => {
      const width = Number(node.style?.width ?? 280);
      const height = Number(node.style?.height ?? 180);
      const nextZoom = Math.min(Math.max(getZoom() + 0.18, 0.85), 1.1);

      void setCenter(
        node.position.x + width / 2,
        node.position.y + height / 2,
        { duration: 320, zoom: nextZoom },
      );
    },
    [getZoom, setCenter],
  );

  return (
    <ReactFlow
      aria-label="Interactive ERP reference architecture"
      className="erp-reference-flow"
      defaultEdgeOptions={{
        animated: true,
        type: "smoothstep",
      }}
      edges={edges}
      fitView
      fitViewOptions={{ padding: 0.03 }}
      key={isMobile ? "mobile-layout" : "desktop-layout"}
      nodes={nodes}
      nodeTypes={nodeTypes}
      nodesConnectable={false}
      nodesDraggable={false}
      onNodeClick={focusNode}
      panOnDrag
      proOptions={{ hideAttribution: true }}
      zoomOnDoubleClick={false}
      zoomOnScroll
    >
      <Controls showInteractive={false} />
      <MiniMap
        aria-label="ERP architecture overview"
        maskColor="rgb(12 19 42 / 10%)"
        nodeColor={(node) => nodeColor(node.id)}
        pannable
        zoomable
      />
    </ReactFlow>
  );
}
