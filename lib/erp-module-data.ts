export type ModulePackaging =
  | "Core in many suites"
  | "Core in manufacturing ERP"
  | "Common extension"
  | "Often adjacent"
  | "Emerging capability";

export type ErpModule = {
  name: string;
  description: string;
  packaging: ModulePackaging;
  keywords: string[];
};

export type ErpModuleGroup = {
  id: string;
  name: string;
  description: string;
  modules: ErpModule[];
};

export const erpModuleGroups: ErpModuleGroup[] = [
  {
    id: "finance",
    name: "Finance & governance",
    description:
      "The records and controls used to understand money, obligations and financial performance.",
    modules: [
      {
        name: "Financial management & accounting",
        description:
          "General ledger, payables, receivables, cash, fixed assets, expenses, close and financial statements.",
        packaging: "Core in many suites",
        keywords: ["General ledger (GL)", "Accounts payable (AP)", "Accounts receivable (AR)"],
      },
      {
        name: "Tax & statutory reporting",
        description:
          "Tax determination, filing support, statutory books and country-specific reporting requirements.",
        packaging: "Common extension",
        keywords: ["Tax", "Statutory reporting"],
      },
      {
        name: "Enterprise performance management (EPM)",
        description:
          "Budgeting, forecasting, financial consolidation, scenario planning and performance reporting.",
        packaging: "Often adjacent",
        keywords: ["EPM", "Budgeting", "Forecasting"],
      },
      {
        name: "Governance, risk & compliance (GRC)",
        description:
          "Controls, audit evidence, policy workflows, risk registers and access or duty-separation reviews.",
        packaging: "Common extension",
        keywords: ["GRC", "Audit", "Risk controls"],
      },
    ],
  },
  {
    id: "supply-chain",
    name: "Supply chain & operations",
    description:
      "How organizations source materials, manage stock, take orders and deliver goods.",
    modules: [
      {
        name: "Procurement / source-to-pay",
        description:
          "Supplier selection, requests for quotation, approvals, purchase orders, receipts and invoice matching.",
        packaging: "Core in many suites",
        keywords: ["Source-to-pay", "RFQ", "Purchase orders"],
      },
      {
        name: "Supplier management & collaboration",
        description:
          "Supplier onboarding, portals, shared documents, performance reviews and risk information.",
        packaging: "Common extension",
        keywords: ["Supplier portal", "Supplier risk"],
      },
      {
        name: "Inventory & materials management",
        description:
          "Stock quantities, locations, transfers, replenishment, valuation, lots and serial numbers.",
        packaging: "Core in many suites",
        keywords: ["Inventory", "Stock", "Lot tracking"],
      },
      {
        name: "Warehouse management (WMS)",
        description:
          "Warehouse receiving, put-away, bin moves, picking, packing, cycle counting and dispatch.",
        packaging: "Common extension",
        keywords: ["WMS", "Picking", "Put-away"],
      },
      {
        name: "Order management (OMS)",
        description:
          "Order capture, pricing, availability checks, allocation, fulfillment, cancellations and returns.",
        packaging: "Common extension",
        keywords: ["OMS", "Order fulfillment", "Returns"],
      },
      {
        name: "Supply chain planning",
        description:
          "Demand and supply plans, material requirements planning (MRP), replenishment and scenario-based planning.",
        packaging: "Common extension",
        keywords: ["Demand planning", "Supply planning", "MRP"],
      },
      {
        name: "Transportation & logistics",
        description:
          "Transportation management system (TMS) capabilities for shipment planning, carrier coordination, freight visibility and transportation costs.",
        packaging: "Common extension",
        keywords: ["TMS", "Logistics", "Freight"],
      },
      {
        name: "Global trade & compliance",
        description:
          "Trade documentation, restricted-party checks, import and export processes, duties and landed costs.",
        packaging: "Often adjacent",
        keywords: ["Trade compliance", "Landed cost"],
      },
    ],
  },
  {
    id: "manufacturing",
    name: "Manufacturing, quality & assets",
    description:
      "The capabilities that plan production, record execution and keep products and equipment within specification.",
    modules: [
      {
        name: "Manufacturing & production planning",
        description:
          "Bills of material, routings, work orders, material requirements and production schedules.",
        packaging: "Core in manufacturing ERP",
        keywords: ["BOM", "Bill of materials", "Work orders", "Production planning"],
      },
      {
        name: "Manufacturing execution / shop-floor (MES)",
        description:
          "Detailed production instructions, labor and machine activity, output, downtime and traceability.",
        packaging: "Often adjacent",
        keywords: ["MES", "Shop floor", "Production tracking"],
      },
      {
        name: "Quality management (QMS)",
        description:
          "Inspection plans, test results, defects, non-conformance, corrective actions and quality holds.",
        packaging: "Common extension",
        keywords: ["QMS", "Inspection", "Non-conformance"],
      },
      {
        name: "Enterprise asset management (EAM)",
        description:
          "Equipment and facility records, maintenance plans, service history and spare parts.",
        packaging: "Common extension",
        keywords: ["EAM", "Maintenance", "Asset management"],
      },
      {
        name: "Product lifecycle management (PLM)",
        description:
          "Engineering definitions, product revisions, design changes and product data across its lifecycle.",
        packaging: "Often adjacent",
        keywords: ["PLM", "Engineering change"],
      },
    ],
  },
  {
    id: "customer",
    name: "Customer, service & revenue",
    description:
      "Front-office capabilities that connect customer demand, sales, service and commercial models to operations.",
    modules: [
      {
        name: "Customer relationship management (CRM)",
        description:
          "Accounts, contacts, leads, opportunities, sales activity and customer service history.",
        packaging: "Often adjacent",
        keywords: ["CRM", "Sales pipeline"],
      },
      {
        name: "Commerce & e-commerce",
        description:
          "Digital storefronts, product catalogs, customer pricing, orders, payments and fulfillment connections.",
        packaging: "Often adjacent",
        keywords: ["E-commerce", "Digital commerce"],
      },
      {
        name: "Marketing automation",
        description:
          "Campaign execution, audience segments, consent, lead journeys and campaign measurement.",
        packaging: "Often adjacent",
        keywords: ["Campaigns", "Lead nurturing"],
      },
      {
        name: "Subscription & recurring billing",
        description:
          "Recurring or usage-based charges, renewals, billing schedules and revenue recognition workflows.",
        packaging: "Often adjacent",
        keywords: ["Subscription billing", "Recurring revenue"],
      },
      {
        name: "Field service management (FSM)",
        description:
          "Service cases, technician schedules, mobile work orders, parts and customer sign-off.",
        packaging: "Often adjacent",
        keywords: ["FSM", "Dispatch", "Mobile service"],
      },
    ],
  },
  {
    id: "people-projects",
    name: "People, projects & analytics",
    description:
      "Capabilities for workforce administration, project delivery and management insight.",
    modules: [
      {
        name: "Human capital management (HCM / HR)",
        description:
          "Employee records, recruitment, onboarding, organizational structures, learning and absence.",
        packaging: "Common extension",
        keywords: ["HCM", "HR", "Employee records"],
      },
      {
        name: "Payroll & workforce management",
        description:
          "Pay calculations, time and attendance, shifts, leave and workforce scheduling.",
        packaging: "Common extension",
        keywords: ["Payroll", "Time and attendance"],
      },
      {
        name: "Project management & professional services automation (PSA)",
        description:
          "Project plans, budgets, resources, time, expenses, billing and project margins.",
        packaging: "Common extension",
        keywords: ["PSA", "Project accounting", "Billable time"],
      },
      {
        name: "Resource & capacity management",
        description:
          "Skills, availability, workloads and capacity across teams, projects or service operations.",
        packaging: "Common extension",
        keywords: ["Resource planning", "Capacity planning"],
      },
      {
        name: "Business intelligence (BI) & analytics",
        description:
          "Operational and financial reports, dashboards, key measures and analysis across connected data.",
        packaging: "Common extension",
        keywords: ["BI", "Analytics", "Dashboards"],
      },
    ],
  },
  {
    id: "emerging",
    name: "Less-known & newer capabilities",
    description:
      "Capabilities gaining attention; they may be separate products, extensions or emerging features rather than standard ERP modules.",
    modules: [
      {
        name: "ESG & carbon accounting",
        description:
          "Environmental, social and governance (ESG) capabilities collect activity and supplier data to support emissions calculations, sustainability reporting and audit trails.",
        packaging: "Emerging capability",
        keywords: ["ESG", "Carbon accounting", "Scope 1, 2 & 3"],
      },
      {
        name: "AI copilots & agents",
        description:
          "Can help summarize records, draft content, surface patterns or coordinate bounded workflow steps with review.",
        packaging: "Emerging capability",
        keywords: ["AI copilot", "AI agents", "Workflow automation"],
      },
      {
        name: "Low-code & composable extensions",
        description:
          "Tools for configuring workflows or building smaller applications around ERP data and APIs.",
        packaging: "Emerging capability",
        keywords: ["Low-code", "Composable ERP", "Extensions"],
      },
      {
        name: "IoT & connected operations",
        description:
          "Internet of Things (IoT) equipment or sensor events can connect to maintenance, quality, inventory or production workflows.",
        packaging: "Emerging capability",
        keywords: ["IoT", "Connected operations", "Predictive maintenance"],
      },
      {
        name: "Integration platform & APIs",
        description:
          "Integration platform as a service (iPaaS) and APIs connect ERP records and events with other business applications, data services and partner systems.",
        packaging: "Common extension",
        keywords: ["API", "iPaaS", "Integrations"],
      },
      {
        name: "Document & content management",
        description:
          "Organizes business documents, approvals, retention and links between files and ERP transactions.",
        packaging: "Common extension",
        keywords: ["Document management", "Approvals", "Retention"],
      },
    ],
  },
];

export const erpModuleWordTerms = erpModuleGroups.flatMap((group) =>
  group.modules.flatMap((module) => [
    { label: module.name, tone: group.id },
    ...module.keywords.map((label) => ({ label, tone: group.id })),
  ]),
);
