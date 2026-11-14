export const SITE_URL = "https://northstar53.com";
export const BOOKING_URL = "https://calendar.app.google/C9jPgpEBdUk36dfw7";
export const WHATSAPP_URL =
  "https://wa.me/916268535490?text=Hello%20Northstar%2C%20I%27d%20like%20to%20discuss%20a%20potential%20business%20transformation%20initiative.";

export type PillarSlug = "modernize" | "intelligence" | "build";

export type Service = {
  slug: string;
  title: string;
  description: string;
  challenge: string;
  whatWeDo: string[];
  outcomes: string[];
  technologies: string[];
};

export type Pillar = {
  slug: PillarSlug;
  number: string;
  name: string;
  title: string;
  statement: string;
  description: string;
  cta: string;
  services: Service[];
};

export const pillars: Pillar[] = [
  {
    slug: "modernize",
    number: "01",
    name: "Modernize",
    title: "Business Modernization",
    statement: "Modernize your business operations.",
    description:
      "Help organizations modernize the systems, processes and technology foundations that run their business.",
    cta: "Have a modernization challenge? Let’s talk.",
    services: [
      {
        slug: "erp-business-systems",
        title: "ERP & Business Systems",
        description:
          "Plan and implement ERPNext and other core business systems around your processes to connect operations and support growth.",
        challenge:
          "Core systems can become fragmented, rigid and difficult to change as a business grows.",
        whatWeDo: [
          "Assess process fit for ERPNext and core business systems",
          "Define a practical modernization path",
          "Design operating workflows around the business",
          "Configure, integrate and improve core business systems",
        ],
        outcomes: [
          "Reduced operational complexity",
          "Better visibility across operations",
          "Faster, more consistent processes",
          "A foundation that can scale",
        ],
        technologies: [
          "ERPNext",
          "Business system integrations",
          "Workflow design",
        ],
      },
      {
        slug: "crm-customer-operations",
        title: "CRM & Customer Operations",
        description:
          "Connect sales, customer engagement and service processes into one seamless customer journey.",
        challenge:
          "Customer information and handoffs often sit across disconnected teams and systems.",
        whatWeDo: [
          "Map the customer journey",
          "Connect sales and service workflows",
          "Design practical customer operations",
          "Create clearer team visibility",
        ],
        outcomes: [
          "A more connected customer journey",
          "Improved customer experience",
          "Less manual handoff work",
          "Better relationship visibility",
        ],
        technologies: [
          "CRM platforms",
          "Customer workflows",
          "System integrations",
        ],
      },
      {
        slug: "process-workflow-optimization",
        title: "Process & Workflow Optimization",
        description:
          "Digitize and automate processes to reduce manual work and improve operational efficiency.",
        challenge:
          "Manual workarounds and disconnected workflows slow teams down and create avoidable risk.",
        whatWeDo: [
          "Understand the current workflow",
          "Identify unnecessary effort and friction",
          "Redesign processes around clear decisions",
          "Digitize repeatable operational work",
        ],
        outcomes: [
          "Reduced manual effort",
          "Faster processes",
          "Improved operational consistency",
          "Clearer ownership and visibility",
        ],
        technologies: [
          "Workflow automation",
          "Integration patterns",
          "Process analytics",
        ],
      },
      {
        slug: "cloud-infrastructure",
        title: "Cloud & Infrastructure",
        description:
          "Modernize your technology foundation with scalable, secure and cost-effective cloud solutions.",
        challenge:
          "Technology foundations need to adapt without interrupting the operations that depend on them.",
        whatWeDo: [
          "Review the current technology foundation",
          "Create a staged modernization plan",
          "Design for resilience and scale",
          "Support practical migration and optimization",
        ],
        outcomes: [
          "Improved scalability",
          "A more secure foundation",
          "Better cost visibility",
          "Modernized technology operations",
        ],
        technologies: [
          "Cloud platforms",
          "Infrastructure architecture",
          "Observability",
        ],
      },
    ],
  },
  {
    slug: "intelligence",
    number: "02",
    name: "Intelligence",
    title: "Data & Intelligence",
    statement: "Turn business data into intelligence.",
    description:
      "Help organizations connect data, understand performance and use AI to make better decisions.",
    cta: "Your data already contains answers. Let’s find them.",
    services: [
      {
        slug: "data-analytics",
        title: "Data Analytics & Business Reporting",
        description:
          "Bring data together to uncover insights, trends and opportunities across your business.",
        challenge:
          "Useful business data is often scattered across systems, spreadsheets and teams.",
        whatWeDo: [
          "Identify the decisions that matter",
          "Connect relevant data sources",
          "Create a usable reporting foundation",
          "Surface trends and opportunities",
        ],
        outcomes: [
          "Improved visibility",
          "Clearer performance reporting",
          "More confident decisions",
          "A trusted data foundation",
        ],
        technologies: ["Data platforms", "Reporting tools", "Data modeling"],
      },
      {
        slug: "business-intelligence",
        title: "Business Intelligence & Management Dashboards",
        description:
          "Transform business data into actionable dashboards, reports and performance insights.",
        challenge:
          "Leaders need timely, understandable views of performance - not more isolated reports.",
        whatWeDo: [
          "Define decision-ready measures",
          "Design management dashboards",
          "Build practical reporting experiences",
          "Establish an approach to data quality",
        ],
        outcomes: [
          "Faster decision-making",
          "Shared performance visibility",
          "Less reporting effort",
          "More actionable insights",
        ],
        technologies: [
          "BI platforms",
          "Dashboard design",
          "Metrics frameworks",
        ],
      },
      {
        slug: "ai-powered-insights",
        title: "AI-Powered Insights",
        description:
          "Use AI to uncover patterns, answer questions and generate intelligent business insights.",
        challenge:
          "Teams need ways to explore growing volumes of information without adding complexity.",
        whatWeDo: [
          "Identify valuable AI opportunities",
          "Prepare useful data inputs",
          "Design human-centred insight experiences",
          "Evaluate outputs for business usefulness",
        ],
        outcomes: [
          "Faster access to insights",
          "Better understanding of patterns",
          "Practical decision support",
          "AI applied with clear purpose",
        ],
        technologies: [
          "AI capabilities",
          "Data products",
          "Analytics workflows",
        ],
      },
      {
        slug: "ai-automation",
        title: "AI & Automation",
        description:
          "Apply AI and intelligent automation to simplify work, accelerate decisions and improve productivity.",
        challenge:
          "Repetitive work can keep skilled teams away from more valuable decisions and customer work.",
        whatWeDo: [
          "Find high-value automation opportunities",
          "Design responsible human oversight",
          "Connect systems and workflows",
          "Measure adoption and improvement",
        ],
        outcomes: [
          "Reduced operational effort",
          "Faster decisions",
          "Improved productivity",
          "More consistent workflows",
        ],
        technologies: [
          "Intelligent automation",
          "AI workflows",
          "System integrations",
        ],
      },
    ],
  },
  {
    slug: "build",
    number: "03",
    name: "Build",
    title: "Digital Solutions & Advisory",
    statement: "Build and scale your digital capabilities.",
    description:
      "Help organizations turn business ideas, technology strategies and transformation opportunities into scalable digital capabilities.",
    cta: "Have an idea worth building? Let’s talk.",
    services: [
      {
        slug: "product-engineering",
        title: "Product Engineering",
        description:
          "Design, build and scale digital products tailored to your business and customers.",
        challenge:
          "A promising product needs the right path from business opportunity to a scalable, useful experience.",
        whatWeDo: [
          "Clarify the product opportunity",
          "Shape the experience and architecture",
          "Build in focused, iterative releases",
          "Support scale and continuous improvement",
        ],
        outcomes: [
          "Faster time to market",
          "A scalable product foundation",
          "Improved user experience",
          "Practical delivery momentum",
        ],
        technologies: [
          "Product architecture",
          "Web and mobile",
          "Platform engineering",
        ],
      },
      {
        slug: "technology-strategy",
        title: "Technology Strategy",
        description:
          "Turn business goals into practical technology strategies, architectures and roadmaps.",
        challenge:
          "Technology investments need a clear connection to business priorities and a realistic sequence of action.",
        whatWeDo: [
          "Understand ambition and constraints",
          "Assess the technology landscape",
          "Define an actionable target state",
          "Create a staged technology roadmap",
        ],
        outcomes: [
          "Clearer technology decisions",
          "Better investment alignment",
          "Reduced transformation risk",
          "A practical path forward",
        ],
        technologies: [
          "Technology roadmaps",
          "Architecture design",
          "Operating models",
        ],
      },
      {
        slug: "product-modernization",
        title: "Product Modernization",
        description:
          "Transform legacy applications and platforms into modern, scalable digital solutions.",
        challenge:
          "Legacy products can constrain delivery, experience and growth while remaining essential to the business.",
        whatWeDo: [
          "Assess application constraints",
          "Prioritize modernization opportunities",
          "Design an incremental delivery approach",
          "Modernize with operational continuity in mind",
        ],
        outcomes: [
          "Improved scalability",
          "Reduced technical complexity",
          "A better digital experience",
          "Less delivery friction",
        ],
        technologies: [
          "Application architecture",
          "Platform modernization",
          "Integration design",
        ],
      },
      {
        slug: "digital-experience",
        title: "Digital Experience",
        description:
          "Create engaging digital experiences across web, mobile and customer-facing channels.",
        challenge:
          "Digital experiences must make complicated tasks clearer for customers, teams and partners.",
        whatWeDo: [
          "Understand users and business context",
          "Design clear journeys and interfaces",
          "Prototype before committing",
          "Build and improve the experience",
        ],
        outcomes: [
          "Better customer experience",
          "Clearer digital journeys",
          "Improved adoption",
          "Experiences designed around real needs",
        ],
        technologies: ["Experience design", "Web platforms", "Design systems"],
      },
    ],
  },
];

export const allServices = pillars.flatMap((pillar) =>
  pillar.services.map((service) => ({ ...service, pillar })),
);

export const processSteps = [
  [
    "01",
    "Discover",
    "Understand the business, technology environment, opportunities and constraints.",
  ],
  [
    "02",
    "Define",
    "Identify opportunities and establish the transformation roadmap.",
  ],
  ["03", "Design", "Create the architecture, experience and operating model."],
  ["04", "Deliver", "Build, modernize and implement."],
  ["05", "Optimize", "Measure outcomes and continuously improve."],
] as const;

export const challenges = [
  [
    "Modernize legacy systems",
    "Replace fragmented or outdated technology with modern, scalable platforms.",
    "modernize",
  ],
  [
    "Improve operational efficiency",
    "Eliminate manual processes and connect disconnected workflows.",
    "modernize",
  ],
  [
    "Make better decisions",
    "Turn scattered business data into actionable intelligence.",
    "intelligence",
  ],
  [
    "Automate repetitive work",
    "Use AI and automation to reduce operational effort and improve productivity.",
    "intelligence",
  ],
  [
    "Build a new digital product",
    "Take an idea from strategy to production with the right technology foundation.",
    "build",
  ],
  [
    "Create a technology roadmap",
    "Align technology investments with business priorities and a practical path forward.",
    "build",
  ],
] as const;

export const industries = [
  {
    slug: "manufacturing-engineering",
    title: "Manufacturing & Engineering",
    summary:
      "Coordinate purchasing, production, inventory and delivery with a clearer view of work in progress.",
    workflows: [
      "Procurement, stock and material availability",
      "Production, projects and operational handoffs",
      "Cost, margin and delivery reporting",
    ],
    services: [
      ["ERP implementation", "/erp-implementation"],
      [
        "Process & workflow optimization",
        "/what-we-do/modernize/process-workflow-optimization",
      ],
      [
        "Data analytics & reporting",
        "/what-we-do/intelligence/data-analytics",
      ],
    ],
  },
  {
    slug: "wholesale-distribution",
    title: "Wholesale & Distribution",
    summary:
      "Connect purchasing, inventory, order fulfilment and customer operations across locations and channels.",
    workflows: [
      "Order-to-delivery and returns",
      "Warehouse, replenishment and supplier coordination",
      "Margin, stock and service-level visibility",
    ],
    services: [
      ["ERP implementation", "/erp-implementation"],
      [
        "CRM & customer operations",
        "/what-we-do/modernize/crm-customer-operations",
      ],
      [
        "Business intelligence",
        "/what-we-do/intelligence/business-intelligence",
      ],
    ],
  },
  {
    slug: "retail-ecommerce",
    title: "Retail & E-commerce",
    summary:
      "Make the experience more consistent across storefronts, digital channels, fulfilment and customer service.",
    workflows: [
      "Product, price and inventory information across channels",
      "Order fulfilment, exchanges and customer support",
      "Sales and customer behaviour reporting",
    ],
    services: [
      ["ERP implementation", "/erp-implementation"],
      [
        "CRM & customer operations",
        "/what-we-do/modernize/crm-customer-operations",
      ],
      ["Digital experience", "/what-we-do/build/digital-experience"],
    ],
  },
  {
    slug: "professional-project-services",
    title: "Professional & Project-Based Services",
    summary:
      "Help teams connect the path from opportunity to delivery, resourcing, project performance and billing.",
    workflows: [
      "Lead handoff and client relationship management",
      "Project planning, utilization and delivery status",
      "Time, cost, margin and invoicing visibility",
    ],
    services: [
      ["CRM & customer operations", "/what-we-do/modernize/crm-customer-operations"],
      ["ERP implementation", "/erp-implementation"],
      ["Technology strategy", "/what-we-do/build/technology-strategy"],
    ],
  },
  {
    slug: "logistics-field-services",
    title: "Logistics & Field Services",
    summary:
      "Give office and field teams a more connected view of jobs, assets, schedules and customer updates.",
    workflows: [
      "Dispatch, job scheduling and field handoffs",
      "Parts, assets and service history",
      "Completion status, proof of delivery and customer communication",
    ],
    services: [
      ["ERP implementation", "/erp-implementation"],
      [
        "Process & workflow optimization",
        "/what-we-do/modernize/process-workflow-optimization",
      ],
      ["AI & automation", "/what-we-do/intelligence/ai-automation"],
    ],
  },
  {
    slug: "healthcare-operations",
    title: "Healthcare Operations",
    summary:
      "Explore administrative workflows for providers and care organizations, from scheduling and supplies to service communication.",
    workflows: [
      "Appointment, referral and service coordination",
      "Administrative records, billing and supply workflows",
      "Communication between teams and service users",
    ],
    services: [
      [
        "Process & workflow optimization",
        "/what-we-do/modernize/process-workflow-optimization",
      ],
      [
        "Cloud & infrastructure",
        "/what-we-do/modernize/cloud-infrastructure",
      ],
      ["Digital experience", "/what-we-do/build/digital-experience"],
    ],
    consideration:
      "Clinical systems, sensitive data and regulatory obligations require a context-specific assessment with the right domain and compliance specialists.",
  },
  {
    slug: "financial-services",
    title: "Financial Services",
    summary:
      "Improve internal service workflows, customer operations and decision support around existing financial platforms.",
    workflows: [
      "Customer onboarding and service case handoffs",
      "Operational review, approvals and information access",
      "Management reporting and process automation",
    ],
    services: [
      [
        "CRM & customer operations",
        "/what-we-do/modernize/crm-customer-operations",
      ],
      [
        "Business intelligence",
        "/what-we-do/intelligence/business-intelligence",
      ],
      ["Technology strategy", "/what-we-do/build/technology-strategy"],
    ],
    consideration:
      "Core financial systems and regulated data need careful security, controls and jurisdiction-specific review. We start by understanding those constraints.",
  },
  {
    slug: "education-training",
    title: "Education & Training",
    summary:
      "Connect the administrative journey from first enquiry through enrolment, delivery, payment and ongoing communication.",
    workflows: [
      "Enquiry, admissions and learner communications",
      "Course, instructor and resource scheduling",
      "Fees, service requests and operational reporting",
    ],
    services: [
      [
        "CRM & customer operations",
        "/what-we-do/modernize/crm-customer-operations",
      ],
      ["Digital experience", "/what-we-do/build/digital-experience"],
      [
        "Data analytics & reporting",
        "/what-we-do/intelligence/data-analytics",
      ],
    ],
  },
  {
    slug: "transportation-aviation",
    title: "Transportation & Aviation",
    summary:
      "Support coordination across schedules, service teams, assets and customer-facing operations.",
    workflows: [
      "Operational scheduling and cross-team handoffs",
      "Asset, maintenance or service information",
      "Customer updates and operational performance reporting",
    ],
    services: [
      ["Technology strategy", "/what-we-do/build/technology-strategy"],
      [
        "Process & workflow optimization",
        "/what-we-do/modernize/process-workflow-optimization",
      ],
      ["Data analytics & reporting", "/what-we-do/intelligence/data-analytics"],
    ],
    consideration:
      "Safety-critical operations and regulated systems require qualified sector specialists and controls specific to the operating environment.",
  },
] as const;

export const insights = [
  "Modernization",
  "AI & Automation",
  "Data & Intelligence",
  "Digital Engineering",
  "Technology Strategy",
] as const;

export const insightTopics = [
  [
    "Modernization",
    "Make core systems easier to change by addressing process fit, integration and adoption alongside the technology.",
  ],
  [
    "AI & Automation",
    "Focus on repeatable work and clear decisions, with appropriate human oversight and measurable business value.",
  ],
  [
    "Data & Intelligence",
    "Connect trusted data to the decisions people need to make, rather than adding reports without a purpose.",
  ],
  [
    "Digital Engineering",
    "Build and evolve digital products in focused increments, balancing user needs with a scalable foundation.",
  ],
  [
    "Technology Strategy",
    "Turn business priorities into practical technology choices, investment decisions and a sequenced roadmap.",
  ],
] as const;

export const insightArticles = [
  {
    slug: "erp-business-constraint",
    category: "Modernization",
    title: "5 Signs Your ERP Has Become a Business Constraint",
    summary:
      "Look for routine workarounds, unreliable reporting, slow process changes, users avoiding the system, and fragile customizations or integrations. These signs call for a fit review, not an automatic replacement.",
  },
  {
    slug: "legacy-platform-modernization",
    category: "Modernization",
    title: "What Actually Happens During a Legacy Platform Modernization",
    summary:
      "Modernization starts with understanding dependencies, operational risk and user needs. Teams can then prioritize the changes, choose an incremental path, and validate each release while keeping essential services running.",
  },
  {
    slug: "ai-automation-enterprise-value",
    category: "AI & Automation",
    title: "Where AI Automation Can Create Measurable Enterprise Value",
    summary:
      "Look for repeatable work with clear inputs, predictable decisions and a meaningful cost to delay. Establish a baseline, define where people stay in control, and measure quality and cycle time as well as effort saved.",
  },
  {
    slug: "dashboards-to-decision-intelligence",
    category: "Data & Intelligence",
    title: "From Dashboards to Decision Intelligence",
    summary:
      "A useful dashboard begins with a decision, its owner and the signal that should prompt action. Agree on definitions and data quality first, then present only the measures that help teams respond.",
  },
  {
    slug: "cost-fragmented-business-systems",
    category: "Modernization",
    title: "The Hidden Cost of Fragmented Business Systems",
    summary:
      "Disconnected systems create costs beyond licensing: reconciliation, repeated data entry, delayed decisions and fragile handoffs. Map how information moves across a process before deciding whether integration, workflow redesign or platform change is needed.",
  },
  {
    slug: "digital-capabilities-without-rebuild",
    category: "Digital Engineering",
    title: "Building Digital Capabilities Without Rebuilding Everything",
    summary:
      "A new digital experience does not always require replacing every underlying system. Identify the capabilities that differentiate the business, connect to existing systems where practical, and modernize foundations in stages.",
  },
  {
    slug: "technology-strategy-practical-roadmap",
    category: "Technology Strategy",
    title: "Turning a Technology Strategy Into a Practical Roadmap",
    summary:
      "A useful roadmap connects business priorities to specific decisions, dependencies and investment choices. Sequence the work around value and delivery constraints, then revisit the plan as assumptions and business needs change.",
  },
] as const;

export function getPillar(slug: string) {
  return pillars.find((pillar) => pillar.slug === slug);
}

export function getService(pillarSlug: string, serviceSlug: string) {
  return allServices.find(
    ({ pillar, slug }) => pillar.slug === pillarSlug && slug === serviceSlug,
  );
}
