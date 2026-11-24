export type MaturityOption = {
  id: string;
  label: string;
  score: number;
  evidence: string;
  exposure: string;
  nextStep: string;
  serviceLabel: string;
  serviceHref: string;
};

export type MaturityQuestion = {
  id: string;
  dimension: string;
  prompt: string;
  options: MaturityOption[];
};

export const maturityQuestions: MaturityQuestion[] = [
  {
    id: "process",
    dimension: "Process management",
    prompt: "How do teams manage work that crosses functions?",
    options: [
      {
        id: "local-routines",
        label:
          "Work runs smoothly within individual teams, but things often slow down when multiple departments need to work together.",
        score: 2,
        evidence:
          "Documented local routines provide a useful starting point for alignment.",
        exposure:
          "Hand-offs can become inconsistent when volume, exceptions or staffing change.",
        nextStep:
          "Map one high-volume workflow from start to finish, identify decision owners, and agree on a few hand-off measures.",
        serviceLabel: "Process & workflow optimization",
        serviceHref: "/what-we-do/modernize/process-workflow-optimization",
      },
      {
        id: "person-dependent",
        label:
          "There is no common way of working; everyone handles things in their own way.",
        score: 0,
        evidence:
          "Experienced staff are keeping important work moving despite limited formal support.",
        exposure:
          "Knowledge can be difficult to transfer, and service may vary between people or teams.",
        nextStep:
          "Document the decisions and exceptions for one important workflow before selecting new tools.",
        serviceLabel: "Process & workflow optimization",
        serviceHref: "/what-we-do/modernize/process-workflow-optimization",
      },
      {
        id: "owned-measured",
        label:
          "A designated person regularly reviews how work is going and makes sure repeated issues are addressed.",
        score: 4,
        evidence:
          "End-to-end ownership and regular review give teams a basis for making controlled improvements.",
        exposure:
          "As the business changes, confirm that measures and decision rights still reflect customer and operating priorities.",
        nextStep:
          "Use workflow evidence to prioritize the next improvement and verify its effect with the teams involved.",
        serviceLabel: "Technology strategy",
        serviceHref: "/what-we-do/build/technology-strategy",
      },
      {
        id: "manual-handoffs",
        label:
          "Different teams use different systems and spreadsheets, so information has to be shared manually.",
        score: 1,
        evidence:
          "Teams have found practical ways to bridge gaps and keep work progressing.",
        exposure:
          "Manual hand-offs can introduce delay, duplicate entry and unclear accountability.",
        nextStep:
          "Trace where information is created, checked and re-entered before deciding whether to redesign or integrate the workflow.",
        serviceLabel: "Process & workflow optimization",
        serviceHref: "/what-we-do/modernize/process-workflow-optimization",
      },
      {
        id: "shared-workflows",
        label:
          "Work generally follows a common process, and anything that falls outside it is reviewed by the team.",
        score: 3,
        evidence:
          "Common workflows give teams a consistent way to complete routine work.",
        exposure:
          "Review whether repeated exceptions point to a policy, process or system gap.",
        nextStep:
          "Prioritize the exceptions with the greatest effect on service or effort, then test a focused process change.",
        serviceLabel: "Process & workflow optimization",
        serviceHref: "/what-we-do/modernize/process-workflow-optimization",
      },
    ],
  },
  {
    id: "systems",
    dimension: "Systems integration",
    prompt: "How do key systems share information?",
    options: [
      {
        id: "local-applications",
        label:
          "Employees often have to enter the same information into different systems.",
        score: 1,
        evidence:
          "Teams can choose tools that meet immediate needs in their own areas.",
        exposure:
          "Local choices may create duplicate records and make end-to-end changes harder to manage.",
        nextStep:
          "Inventory the systems and hand-offs in one priority workflow, including who owns each record.",
        serviceLabel: "ERP implementation",
        serviceHref: "/erp-implementation",
      },
      {
        id: "managed-interfaces",
        label:
          "Important systems share information automatically, and someone regularly checks that everything is working properly.",
        score: 3,
        evidence:
          "Important integrations have defined ownership and reduce some avoidable manual transfer.",
        exposure:
          "Check how interface failures, data changes and new business requirements are monitored and resolved.",
        nextStep:
          "Review critical integrations for clear ownership, failure alerts and reconciliation procedures.",
        serviceLabel: "Cloud & infrastructure",
        serviceHref: "/what-we-do/modernize/cloud-infrastructure",
      },
      {
        id: "file-bridges",
        label:
          "We regularly rely on Excel files and shared documents to move information between different systems.",
        score: 0,
        evidence:
          "Staff are maintaining continuity across systems that do not connect directly.",
        exposure:
          "Important updates can be delayed, duplicated or difficult to trace.",
        nextStep:
          "Choose one recurring file-based hand-off and assess its volume, error handling and source-of-truth needs.",
        serviceLabel: "ERP implementation",
        serviceHref: "/erp-implementation",
      },
      {
        id: "intentional-architecture",
        label:
          "We have clear rules for how our systems share information, who is responsible for it, and how changes are managed.",
        score: 4,
        evidence:
          "Clear standards and dependency awareness help teams evolve the environment with fewer surprises.",
        exposure:
          "Revisit architecture decisions as products, volumes, vendors and operating requirements change.",
        nextStep:
          "Use the architecture and ownership model to identify the next constraint that is worth addressing.",
        serviceLabel: "Technology strategy",
        serviceHref: "/what-we-do/build/technology-strategy",
      },
      {
        id: "critical-integrations",
        label:
          "A few systems are connected, but people still have to compare records and fix differences themselves.",
        score: 2,
        evidence:
          "The most important systems are connected in at least some parts of the operation.",
        exposure:
          "Gaps in less visible workflows may still create duplicate effort or inconsistent records.",
        nextStep:
          "Map the remaining manual reconciliations and rank them by business impact and frequency.",
        serviceLabel: "Process & workflow optimization",
        serviceHref: "/what-we-do/modernize/process-workflow-optimization",
      },
    ],
  },
  {
    id: "data",
    dimension: "Data and decisions",
    prompt: "Can teams trust their data when decisions are due?",
    options: [
      {
        id: "shared-definitions",
        label:
          "Teams generally agree on what the important numbers mean, but some information still needs to be checked manually.",
        score: 3,
        evidence:
          "Shared definitions give teams a more consistent basis for discussing performance.",
        exposure:
          "Manual checks and disconnected sources may limit timeliness or traceability.",
        nextStep:
          "Document source ownership and automate the highest-value quality checks.",
        serviceLabel: "Data analytics & reporting",
        serviceHref: "/what-we-do/intelligence/data-analytics",
      },
      {
        id: "independent-reports",
        label:
          "Different teams prepare their own reports, and the numbers don't always match.",
        score: 0,
        evidence:
          "Teams are already using available information to answer important business questions.",
        exposure:
          "Conflicting definitions and manual assembly can weaken confidence and delay decisions.",
        nextStep:
          "Select one recurring management question and agree on its owner, definition and source data.",
        serviceLabel: "Business intelligence",
        serviceHref: "/what-we-do/intelligence/business-intelligence",
      },
      {
        id: "periodic-reporting",
        label:
          "Important business reports are sometimes delayed, and different teams may understand the same figures differently.",
        score: 2,
        evidence:
          "The organization has established reporting routines and identifiable information needs.",
        exposure:
          "Reports may describe results without helping users decide what to do next.",
        nextStep:
          "Connect a small set of measures to specific decisions, owners and review timing.",
        serviceLabel: "Business intelligence",
        serviceHref: "/what-we-do/intelligence/business-intelligence",
      },
      {
        id: "governed-data",
        label:
          "Clear responsibilities and checks ensure that the information we use is accurate, consistent and easy to trace back to its source.",
        score: 4,
        evidence:
          "Governed measures and traceable data support more consistent, timely decisions.",
        exposure:
          "Keep definitions, access and quality controls aligned as new use cases and data sources are introduced.",
        nextStep:
          "Identify where trusted data can support a new operational decision or carefully scoped automation.",
        serviceLabel: "AI & automation",
        serviceHref: "/what-we-do/intelligence/ai-automation",
      },
      {
        id: "spreadsheet-owners",
        label:
          "A small number of people regularly check and update spreadsheets to make sure the information is accurate.",
        score: 1,
        evidence:
          "A small group has built valuable working knowledge about the data.",
        exposure:
          "Reporting may depend on individual availability and undocumented calculations.",
        nextStep:
          "Record the calculation and source for one important metric, then agree who owns its definition.",
        serviceLabel: "Data analytics & reporting",
        serviceHref: "/what-we-do/intelligence/data-analytics",
      },
    ],
  },
  {
    id: "delivery",
    dimension: "Change delivery",
    prompt: "How are technology and process changes prioritized?",
    options: [
      {
        id: "governed-portfolio",
        label:
          "We follow a clear plan for improvements, balancing business needs, potential challenges and our team's ability to deliver.",
        score: 4,
        evidence:
          "Portfolio decisions connect delivery capacity and dependencies to intended business outcomes.",
        exposure:
          "Ensure governance stays responsive and does not create unnecessary delay for low-risk learning.",
        nextStep:
          "Revisit assumptions and measures at planned decision points, and adjust the portfolio when evidence changes.",
        serviceLabel: "Technology strategy",
        serviceHref: "/what-we-do/build/technology-strategy",
      },
      {
        id: "urgent-requests",
        label:
          "Urgent problems usually get attention first, while planned improvements often get pushed back.",
        score: 1,
        evidence:
          "Teams are responsive to emerging operational issues and immediate business demands.",
        exposure:
          "Urgency can crowd out preventative work and make investment trade-offs hard to see.",
        nextStep:
          "Create a lightweight intake that records business impact, risk, effort and the cost of waiting.",
        serviceLabel: "Technology strategy",
        serviceHref: "/what-we-do/build/technology-strategy",
      },
      {
        id: "sequenced-releases",
        label:
          "We have a plan for introducing changes, but don't regularly review whether they have actually improved the way we work.",
        score: 3,
        evidence:
          "Incremental delivery and dependency planning make change more manageable.",
        exposure:
          "Without outcome reviews, teams may complete work without confirming that it improved the intended process.",
        nextStep:
          "Add a post-release review that checks adoption, service quality and the business measure behind the change.",
        serviceLabel: "Product engineering",
        serviceHref: "/what-we-do/build/product-engineering",
      },
      {
        id: "reactive-change",
        label:
          "Decisions to change the way we work are often made on the spot, without fully considering their wider impact.",
        score: 0,
        evidence:
          "The organization is identifying issues that need attention and building awareness of change demand.",
        exposure:
          "Uncoordinated changes can create operational risk and repeated effort.",
        nextStep:
          "Establish a simple change register with an owner, affected workflow and expected outcome.",
        serviceLabel: "Technology strategy",
        serviceHref: "/what-we-do/build/technology-strategy",
      },
      {
        id: "roadmap-competes",
        label:
          "There is a list of planned improvements, but day-to-day work often makes it difficult to move them forward.",
        score: 2,
        evidence:
          "Leaders have articulated priorities and a starting sequence for planned work.",
        exposure:
          "Competing initiatives can dilute delivery capacity and defer foundational dependencies.",
        nextStep:
          "Make capacity and dependencies visible, then distinguish committed work from options still under review.",
        serviceLabel: "Technology strategy",
        serviceHref: "/what-we-do/build/technology-strategy",
      },
    ],
  },
  {
    id: "adoption",
    dimension: "People and adoption",
    prompt: "How are employees prepared for change and supported after launch?",
    options: [
      {
        id: "training-events",
        label:
          "People receive instructions shortly before a change goes live, and the business addresses difficulties as employees encounter them.",
        score: 2,
        evidence:
          "Teams recognize the need to prepare users before a change goes live.",
        exposure:
          "One-time training may not address role-specific practice or issues that emerge during real work.",
        nextStep:
          "Identify affected roles and give them a way to practice and report issues before and after launch.",
        serviceLabel: "ERP implementation",
        serviceHref: "/erp-implementation",
      },
      {
        id: "embedded-ownership",
        label:
          "Employees are involved in planning and testing changes, and the business checks whether people are actually using the new ways of working.",
        score: 4,
        evidence:
          "User participation and clear ownership support adoption beyond the launch date.",
        exposure:
          "Keep feedback loops active so process ownership continues as teams and operating needs evolve.",
        nextStep:
          "Use adoption evidence and user feedback to prioritize the next improvement cycle.",
        serviceLabel: "ERP implementation",
        serviceHref: "/erp-implementation",
      },
      {
        id: "late-involvement",
        label:
          "Management decides what needs to change, and employees are brought into the process only when implementation begins.",
        score: 0,
        evidence:
          "Teams are moving change forward and can use early user involvement to reduce surprises.",
        exposure:
          "Late feedback can reveal workflow or role concerns after they are expensive to address.",
        nextStep:
          "Invite representative users into discovery and test a realistic scenario before design is finalized.",
        serviceLabel: "Process & workflow optimization",
        serviceHref: "/what-we-do/modernize/process-workflow-optimization",
      },
      {
        id: "role-ready",
        label:
          "Employees know where to get help and whom to approach, and their feedback helps improve future changes.",
        score: 3,
        evidence:
          "Defined roles and feedback channels give teams a practical foundation for adoption.",
        exposure:
          "Check that feedback leads to visible decisions and that support owners have capacity to act.",
        nextStep:
          "Review recurring user feedback with process owners and convert the most important themes into improvements.",
        serviceLabel: "ERP implementation",
        serviceHref: "/erp-implementation",
      },
      {
        id: "local-champions",
        label:
          "Some team members take the lead in helping others, but preparing the wider workforce for change is largely informal.",
        score: 1,
        evidence:
          "Local champions provide useful knowledge and trust within their teams.",
        exposure:
          "Adoption can depend too heavily on a few individuals without clear time and management support.",
        nextStep:
          "Give champions a defined role, involve managers and plan support for users who need more help.",
        serviceLabel: "ERP implementation",
        serviceHref: "/erp-implementation",
      },
    ],
  },
  {
    id: "strategy",
    dimension: "Strategy and outcomes",
    prompt: "How do technology investments support business goals?",
    options: [
      {
        id: "technology-queue",
        label:
          "We tend to invest in technology when someone asks for it, rather than evaluating which investments will deliver the greatest business value.",
        score: 1,
        evidence:
          "Teams are surfacing demand and identifying tools that may address real needs.",
        exposure:
          "Without comparable outcomes and dependencies, investment choices can be difficult to prioritize.",
        nextStep:
          "For the next decision, document the business problem, expected outcome, alternatives and cost of waiting.",
        serviceLabel: "Technology strategy",
        serviceHref: "/what-we-do/build/technology-strategy",
      },
      {
        id: "outcome-roadmap",
        label:
          "We follow a shared technology plan that connects business goals with planned investments and clear responsibilities.",
        score: 3,
        evidence:
          "The roadmap links strategic intent to accountable initiatives and delivery decisions.",
        exposure:
          "Confirm that benefits are reviewed after release, not only when the initiative is approved.",
        nextStep:
          "Use post-delivery evidence to update priorities and adjust the roadmap assumptions.",
        serviceLabel: "Technology strategy",
        serviceHref: "/what-we-do/build/technology-strategy",
      },
      {
        id: "agreed-priorities",
        label:
          "Management sets the main business priorities, but individual teams decide which technology projects to pursue.",
        score: 2,
        evidence:
          "There is leadership alignment on direction, which can anchor more coordinated planning.",
        exposure:
          "Different interpretations may create duplicated initiatives or competing definitions of success.",
        nextStep:
          "Translate one priority into an accountable outcome, shared measures and a visible sequence of work.",
        serviceLabel: "Technology strategy",
        serviceHref: "/what-we-do/build/technology-strategy",
      },
      {
        id: "uncoordinated-investment",
        label:
          "Technology decisions are made separately by different departments, with limited visibility into what others are investing in.",
        score: 0,
        evidence:
          "Individual teams are taking initiative to address their immediate needs.",
        exposure:
          "The organization may fund overlapping solutions or miss dependencies across teams.",
        nextStep:
          "Create a shared view of current initiatives and agree on the business outcomes they are meant to support.",
        serviceLabel: "Technology strategy",
        serviceHref: "/what-we-do/build/technology-strategy",
      },
      {
        id: "governed-outcomes",
        label:
          "We measure the impact of technology investments and use what we learn to guide future decisions.",
        score: 4,
        evidence:
          "Clear accountability and outcome reviews make it easier to adapt investment decisions.",
        exposure:
          "Keep measures proportionate and ensure governance does not reward delivery activity over business results.",
        nextStep:
          "Use outcome reviews to identify the next capability gap and stage the investment around delivery capacity.",
        serviceLabel: "Technology strategy",
        serviceHref: "/what-we-do/build/technology-strategy",
      },
    ],
  },
];

export type MaturityDimensionResult = {
  id: string;
  dimension: string;
  answer: string;
  score: number;
  evidence: string;
  exposure: string;
  nextStep: string;
  serviceLabel: string;
  serviceHref: string;
};

export type MaturityScanResult = {
  score: number;
  level: string;
  summary: string;
  strengths: MaturityDimensionResult[];
  focusAreas: MaturityDimensionResult[];
  dimensions: MaturityDimensionResult[];
};

const maturityBands = [
  {
    minimum: 80,
    level: "Adaptive",
    summary:
      "Your responses point to established modernization practices across most areas. The opportunity is to keep improving from evidence and sustain those practices as the business changes.",
  },
  {
    minimum: 60,
    level: "Managed",
    summary:
      "Several important practices are in place. A targeted improvement in the least consistent areas can make modernization more repeatable across the business.",
  },
  {
    minimum: 40,
    level: "Connected",
    summary:
      "Some teams and systems are working in a coordinated way, while important hand-offs or measures remain uneven. Focus on one end-to-end workflow to build momentum.",
  },
  {
    minimum: 20,
    level: "Emerging",
    summary:
      "Modernization practices are forming, but work may still rely on manual coordination or individual knowledge. Start with clear ownership and a practical baseline.",
  },
  {
    minimum: 0,
    level: "Foundational",
    summary:
      "Your answers suggest that modernization is mostly reactive today. This is a starting point for prioritization, not a judgment of your team or business.",
  },
] as const;

export function buildMaturityResult(
  answers: Record<string, string>,
): MaturityScanResult {
  const dimensions = maturityQuestions.map((question) => {
    const option = question.options.find(
      ({ id }) => id === answers[question.id],
    );
    if (!option) {
      throw new Error(`Missing or invalid answer for ${question.id}.`);
    }

    return {
      id: question.id,
      dimension: question.dimension,
      answer: option.label,
      score: option.score,
      evidence: option.evidence,
      exposure: option.exposure,
      nextStep: option.nextStep,
      serviceLabel: option.serviceLabel,
      serviceHref: option.serviceHref,
    };
  });

  const score = Math.round(
    (dimensions.reduce((total, item) => total + item.score, 0) /
      (dimensions.length * 4)) *
      100,
  );
  const band = maturityBands.find(({ minimum }) => score >= minimum);
  if (!band) throw new Error("Unable to determine maturity band.");

  const strengths = dimensions
    .filter(({ score: value }) => value >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  if (!strengths.length) {
    strengths.push(
      ...[...dimensions].sort((a, b) => b.score - a.score).slice(0, 2),
    );
  }

  let focusAreas = dimensions
    .filter(({ score: value }) => value <= 1)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);
  if (!focusAreas.length) {
    focusAreas = [...dimensions].sort((a, b) => a.score - b.score).slice(0, 2);
  }

  const strongest = [...dimensions].sort((a, b) => b.score - a.score)[0];
  const priority = [...dimensions].sort((a, b) => a.score - b.score)[0];
  const summary = `${band.summary} Your strongest signal is ${strongest.dimension}; the clearest opportunity is ${priority.dimension}.`;

  return {
    score,
    level: band.level,
    summary,
    strengths,
    focusAreas,
    dimensions,
  };
}

export function getPublicMaturityQuestions() {
  return maturityQuestions.map(({ id, dimension, prompt, options }) => ({
    id,
    dimension,
    prompt,
    options: options.map(({ id: optionId, label }) => ({
      id: optionId,
      label,
    })),
  }));
}
