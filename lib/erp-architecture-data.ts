export type ArchitectureLibraryItem = {
  name: string;
  description?: string;
};

export const erpArchitecturePlugins: Record<string, ArchitectureLibraryItem[]> = {
  finance: [
    {
      name: "Tax engine",
      description: "Tax determination, statutory reporting and filing support.",
    },
    {
      name: "Document management",
      description: "Controlled documents, approvals and retention linked to records.",
    },
  ],
  "supply-chain": [
    {
      name: "WMS",
      description: "Warehouse receiving, picking, packing and dispatch.",
    },
    {
      name: "TMS",
      description: "Shipment planning, carriers, freight visibility and costs.",
    },
    {
      name: "EDI",
      description: "Structured trading-partner orders, invoices and notices.",
    },
  ],
  manufacturing: [
    {
      name: "MES",
      description: "Detailed shop-floor execution, output and traceability.",
    },
    {
      name: "PLM",
      description: "Product definitions, revisions and engineering changes.",
    },
  ],
  customer: [
    {
      name: "E-commerce",
      description: "Digital storefronts, catalogues, payments and fulfilment.",
    },
    {
      name: "Customer portal",
      description: "Self-service access to orders, cases, documents and status.",
    },
  ],
  "people-projects": [
    {
      name: "Mobile workforce",
      description: "Field work, time, expenses and customer sign-off.",
    },
  ],
  emerging: [
    {
      name: "AI assistant",
      description: "Bounded assistance for summaries, search and workflow steps.",
    },
  ],
};

export const erpArchitecturePlatformServices: ArchitectureLibraryItem[] = [
  {
    name: "Workflow & approvals",
    description: "Business process management across connected records.",
  },
  {
    name: "API & integrations",
    description: "Application programming interfaces and event connections.",
  },
  {
    name: "Identity & access",
    description: "Identity and access management for users and roles.",
  },
  {
    name: "BI & dashboards",
    description: "Business intelligence, metrics and operational visibility.",
  },
  {
    name: "Audit & compliance",
    description: "Governance, risk, compliance and audit evidence.",
  },
];

export const erpArchitectureExperienceChannels: ArchitectureLibraryItem[] = [
  {
    name: "Sales & CRM",
    description: "Customer relationship management and sales activity.",
  },
  {
    name: "Supplier portal",
    description: "Shared supplier information, documents and collaboration.",
  },
  {
    name: "Call & service centre",
    description: "Customer support, service cases and handoffs.",
  },
  {
    name: "WhatsApp & messaging",
    description: "Conversation channels connected to business workflows.",
  },
  {
    name: "Chat bot & AI assistant",
    description: "Guided self-service and bounded conversational support.",
  },
];
