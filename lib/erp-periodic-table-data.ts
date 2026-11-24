export type ErpPeriodicElement = {
  symbol: string;
  name: string;
  description: string;
};

export type ErpPeriodicRecipe = {
  name: string;
  elements: string[];
};

export const erpPeriodicGroups = [
  "Finance",
  "Sales & CRM",
  "Procurement",
  "Inventory & logistics",
  "Manufacturing",
  "People & HR",
  "Service & projects",
  "Enterprise management",
] as const;

export const erpPeriodicRows = [
  "Record",
  "Plan",
  "Execute",
  "Govern",
  "Predict",
  "Act",
] as const;

export const erpPeriodicCells: ErpPeriodicElement[][] = [
  [
    { symbol: "Co", name: "Chart of accounts", description: "Standardize financial classification." },
    { symbol: "Cu", name: "Customer master", description: "Unify customer identity, terms and history." },
    { symbol: "Su", name: "Supplier master", description: "Maintain supplier identity, terms and qualifications." },
    { symbol: "It", name: "Item master", description: "Standardize SKUs, units and locations." },
    { symbol: "Bm", name: "Bill of materials", description: "Define product structures and component requirements." },
    { symbol: "Em", name: "Employee master", description: "Maintain workforce identity and employment records." },
    { symbol: "As", name: "Asset & project master", description: "Catalog assets, projects and service contracts." },
    { symbol: "Or", name: "Organization structure", description: "Define entities, cost centers and reporting hierarchies." },
  ],
  [
    { symbol: "Bu", name: "Budgeting & cash planning", description: "Plan cash requirements and operating budgets." },
    { symbol: "Op", name: "Opportunity pipeline", description: "Prioritize leads and plan sales activity." },
    { symbol: "Sp", name: "Sourcing & purchasing plan", description: "Plan sourcing and supplier commitments." },
    { symbol: "Dp", name: "Demand & stock planning", description: "Set stock targets and replenishment policies." },
    { symbol: "Mp", name: "Material & capacity planning", description: "Align capacity, materials and production schedules." },
    { symbol: "Wp", name: "Workforce planning", description: "Match staffing and skills to anticipated demand." },
    { symbol: "Pp", name: "Project & service planning", description: "Plan resources, costs and service commitments." },
    { symbol: "St", name: "Strategy & KPI planning", description: "Set targets and align teams to business objectives." },
  ],
  [
    { symbol: "Gl", name: "Accounting & payments", description: "Post journals, invoices, collections and payments." },
    { symbol: "So", name: "Order management", description: "Manage quotes, orders, fulfillment and billing handoffs." },
    { symbol: "Po", name: "Purchase orders", description: "Issue orders, track receipts and match invoices." },
    { symbol: "Wh", name: "Warehouse & dispatch", description: "Receive, pick, pack, transfer and dispatch stock." },
    { symbol: "Wo", name: "Work orders", description: "Run production, issue materials and record output." },
    { symbol: "Py", name: "Payroll & attendance", description: "Process pay, attendance, leave and employee expenses." },
    { symbol: "Sv", name: "Service & project delivery", description: "Manage tickets, field jobs, timesheets and milestones." },
    { symbol: "Wf", name: "Workflow & approvals", description: "Route business tasks and approvals across teams." },
  ],
  [
    { symbol: "Tx", name: "Tax, close & reconciliation", description: "Reconcile ledgers and enforce tax and close controls." },
    { symbol: "Cr", name: "Credit & pricing controls", description: "Check credit limits, discount permissions and margins." },
    { symbol: "Sc", name: "Supplier compliance", description: "Check contracts, supplier risks and purchasing policy." },
    { symbol: "Tr", name: "Traceability & stock audit", description: "Track lots, serials, expiry and inventory adjustments." },
    { symbol: "Qc", name: "Quality & maintenance", description: "Manage inspections, defects and maintenance controls." },
    { symbol: "Hr", name: "HR compliance", description: "Control payroll policy, access and statutory obligations." },
    { symbol: "Sl", name: "SLA & project controls", description: "Monitor commitments, budgets and delivery risks." },
    { symbol: "Gr", name: "Risk & governance", description: "Enforce controls, auditability and policy ownership." },
  ],
  [
    { symbol: "Cf", name: "Cash & anomaly intelligence", description: "Predict cash gaps and flag unusual transactions." },
    { symbol: "Ch", name: "Churn & sales intelligence", description: "Estimate conversion, churn and revenue opportunity." },
    { symbol: "Sr", name: "Supplier risk intelligence", description: "Predict late deliveries and flag unusual spend." },
    { symbol: "Sf", name: "Stock forecasting", description: "Forecast shortages, excess and expiry exposure." },
    { symbol: "Pd", name: "Predictive maintenance", description: "Detect failure signals and recommend inspection." },
    { symbol: "Ta", name: "Talent & staffing insights", description: "Forecast staffing needs using appropriate, authorized data." },
    { symbol: "Pr", name: "Project risk prediction", description: "Identify likely schedule, cost and service overruns." },
    { symbol: "Pi", name: "Process intelligence", description: "Find process bottlenecks and explain performance variance." },
  ],
  [
    { symbol: "Fa", name: "Finance agent", description: "Prepare reconciliation exceptions and collection follow-ups for review." },
    { symbol: "Sa", name: "Sales agent", description: "Prepare quotations and draft customer follow-ups within pricing rules." },
    { symbol: "Pa", name: "Procurement agent", description: "Draft purchase requests and chase supplier confirmations." },
    { symbol: "Ia", name: "Inventory agent", description: "Propose transfers and replenishment orders for approval." },
    { symbol: "Ma", name: "Production agent", description: "Propose rescheduling and maintenance work orders." },
    { symbol: "Ha", name: "HR assistant", description: "Answer authorized HR questions and route employee requests." },
    { symbol: "Da", name: "Delivery agent", description: "Triage tickets, suggest assignments and draft project updates." },
    { symbol: "Ea", name: "Enterprise orchestrator", description: "Coordinate agents across domains and escalate exceptions." },
  ],
];

export const erpPeriodicFoundations: ErpPeriodicElement[] = [
  { symbol: "Md", name: "Master data governance", description: "Own data quality, stewardship and definitions." },
  { symbol: "Api", name: "APIs & integration", description: "Connect ERP, CRM, banks and other systems." },
  { symbol: "Ev", name: "Events & orchestration", description: "Trigger reliable, observable cross-system workflows." },
  { symbol: "Bi", name: "Data platform & BI", description: "Unify metrics and provide governed reporting." },
  { symbol: "Ai", name: "AI models & business context", description: "Ground models in permitted enterprise data and tools." },
  { symbol: "Id", name: "Identity & access", description: "Enforce roles, least privilege and segregation of duties." },
  { symbol: "Au", name: "Audit & AI guardrails", description: "Log actions, evaluate AI and require risk-based approvals." },
  { symbol: "Cl", name: "Cloud & resilience", description: "Manage availability, backup, recovery and observability." },
];

export const erpPeriodicRecipes: ErpPeriodicRecipe[] = [
  { name: "All capabilities", elements: [] },
  { name: "Intelligent finance", elements: ["Co", "Bu", "Gl", "Tx", "Cf", "Fa", "Md", "Api", "Bi", "Au", "Id"] },
  { name: "Smart distribution", elements: ["Cu", "It", "Dp", "So", "Po", "Wh", "Tr", "Sf", "Ia", "Api", "Ev", "Au", "Id"] },
  { name: "Smart factory", elements: ["Bm", "Mp", "Wo", "Qc", "Pd", "Ma", "It", "Wh", "Md", "Ev", "Au", "Id"] },
  { name: "Revenue assurance", elements: ["Cu", "Co", "So", "Gl", "Cr", "Tx", "Cf", "Fa", "Pi", "Api", "Bi", "Au", "Id"] },
];

export const erpPeriodicColors = [
  "#82b6f5",
  "#5bd4be",
  "#e4b575",
  "#a5c977",
  "#c6a1f3",
  "#f0a1b6",
  "#82ccd8",
  "#aab6ec",
] as const;

export const erpPeriodicElementCount =
  erpPeriodicCells.flat().length + erpPeriodicFoundations.length;
