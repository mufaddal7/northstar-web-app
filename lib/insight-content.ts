import { insightArticles } from "@/lib/site-data";

type InsightSlug = (typeof insightArticles)[number]["slug"];

type InsightContent = {
  opening: string;
  sections: {
    heading: string;
    paragraphs: string[];
    points?: string[];
  }[];
  decisionPrompt: string;
  service: {
    heading: string;
    copy: string;
    label: string;
    href: string;
  };
  cta: {
    title: string;
    copy: string;
    contactLabel: string;
  };
  related: InsightSlug[];
};

export const insightContent: Record<InsightSlug, InsightContent> = {
  "erp-business-constraint": {
    opening:
      "An ERP can feel adequate for years, then become harder to work around as products, locations, reporting needs and customer expectations change. Look for five recurring signs: workarounds, unreliable reporting, slow changes, people avoiding the system, and fragile customizations or integrations. None proves that you need a replacement; together, they are a reason to investigate the process, data and platform fit.",
    sections: [
      {
        heading: "Workarounds have become part of the process",
        paragraphs: [
          "Teams may maintain spreadsheets beside the ERP, enter the same information more than once, or rely on manual handoffs to complete routine work. These workarounds can hide a process, data or integration issue and make it harder to know which record is current.",
        ],
        points: [
          "Orders, customer details or stock movements are re-entered",
          "Teams keep parallel records to reconcile later",
        ],
      },
      {
        heading: "Reports arrive late or cannot be trusted",
        paragraphs: [
          "If teams wait for manual extracts, repeatedly reconcile totals, or cannot trace a report back to source transactions, the issue may be data quality, ownership or system integration. Slow reporting makes it harder to respond while a decision still matters.",
        ],
      },
      {
        heading: "Routine changes take disproportionate effort",
        paragraphs: [
          "Adding a product, location, approval rule or useful report should not depend on a chain of risky fixes or one specialist’s memory. The warning sign is not that change takes effort; it is that the effort is unpredictable, expensive or creates new exceptions.",
        ],
      },
      {
        heading: "People avoid the system to get work done",
        paragraphs: [
          "When users delay updates, bypass a critical step or keep their own records because the system slows them down, the official process and the real process have drifted apart. Talk with the people doing the work to understand where the friction occurs before deciding whether it is a usability, training or workflow issue.",
        ],
      },
      {
        heading: "Customizations and integrations are becoming fragile",
        paragraphs: [
          "If routine updates break connected systems, custom code is difficult to support, or only a few people understand how key workflows fit together, the cost and risk of change are rising. Map the dependencies and identify whether the cause is an integration, data, configuration or platform limitation.",
          "Before discussing replacement, trace one representative workflow from start to finish and compare the documented process with what happens in practice. The right next step may be process simplification, data cleanup, training, a better integration, targeted configuration or a phased platform change. Compare options by business outcome, operating risk and total cost, including migration and support.",
        ],
      },
    ],
    decisionPrompt:
      "Which workaround consumes the most team time, and what would need to change for it to disappear?",
    service: {
      heading: "Review ERP fit before choosing a platform",
      copy:
        "Northstar begins with process fit, information flows and adoption needs. The result is a practical view of what to improve now and what, if anything, should change in the system.",
      label: "Explore ERP implementation",
      href: "/erp-implementation",
    },
    cta: {
      title: "Find out whether your ERP needs tuning or a new direction.",
      copy:
        "Bring one difficult workflow to a focused conversation. We can help identify the cause and the next sensible step.",
      contactLabel: "Discuss an ERP constraint",
    },
    related: [
      "cost-fragmented-business-systems",
      "technology-strategy-practical-roadmap",
    ],
  },
  "legacy-platform-modernization": {
    opening:
      "Modernizing a legacy platform is not a single technology upgrade. It is a sequence of business and engineering decisions about what must stay reliable, what should improve, and how to make that change without putting essential operations at unnecessary risk.",
    sections: [
      {
        heading: "Understand what the platform is responsible for",
        paragraphs: [
          "Begin with the capabilities the platform supports, the people and customers who depend on them, and the consequences of interruption. Map important integrations, data ownership, scheduled jobs, manual workarounds and operational controls. Documentation is useful, but interviews, logs and observed workflows reveal where the real dependencies are.",
          "Agree on outcomes before selecting a technical approach. Faster releases, lower support effort, better customer experience, stronger security or easier integration are different goals. Each calls for different evidence and can lead to a different modernization path.",
        ],
        points: [
          "Inventory applications, interfaces, data flows and accountable owners",
          "Identify operational constraints, compliance needs and recovery expectations",
          "Record the current cost of delay, incidents and difficult changes",
        ],
      },
      {
        heading: "Select an approach for each capability",
        paragraphs: [
          "A platform does not have to be modernized all at once. Some components may be kept and maintained, while others are rehosted, replatformed, refactored, replaced or retired. Choose based on business value, risk, dependencies and the cost of operating the result.",
          "Where a full rewrite would delay value or increase risk, create a boundary around a capability and replace it in manageable increments. Preserve stable parts that still serve the business. The goal is a better operating position, not novelty for its own sake.",
        ],
      },
      {
        heading: "Plan releases around continuity and learning",
        paragraphs: [
          "Each release should have a clear scope, acceptance criteria, data handling plan and rollback or recovery path appropriate to the service. Test integrations and real operating scenarios, not only isolated components. Monitoring and support ownership should be ready before users depend on a change.",
          "Release in increments that let teams validate assumptions and adapt the next step. Include the people who use and support the platform in reviews and training. A technically successful deployment is only one part of a successful modernization.",
        ],
      },
    ],
    decisionPrompt:
      "Which business capability would benefit most from a smaller, safer change this quarter?",
    service: {
      heading: "Modernize products without losing sight of operations",
      copy:
        "Northstar helps teams understand dependencies, define a target state and sequence product modernization around business priorities and operational continuity.",
      label: "Explore product modernization",
      href: "/what-we-do/build/product-modernization",
    },
    cta: {
      title: "Turn a legacy platform concern into a staged plan.",
      copy:
        "Start with the service that matters most. We can help map dependencies, compare options and define a first release with a clear outcome.",
      contactLabel: "Discuss platform modernization",
    },
    related: [
      "digital-capabilities-without-rebuild",
      "technology-strategy-practical-roadmap",
    ],
  },
  "ai-automation-enterprise-value": {
    opening:
      "The best automation candidates are not simply the tasks that look repetitive. They are workflows with a clear business purpose, known inputs, a manageable range of exceptions and a way to verify that the result is correct. Choosing carefully matters more than adding AI to a process because the technology is available.",
    sections: [
      {
        heading: "Choose a workflow with a clear cost of friction",
        paragraphs: [
          "Look for recurring work that consumes meaningful time, delays a customer or decision, creates avoidable rework, or limits a team’s capacity. Follow the task from the information arriving through to the action being taken. This often reveals that the largest opportunity is removing duplicate entry or fixing a handoff, rather than automating the most visible step.",
          "Define the task boundaries. Separate predictable cases from exceptions, identify the systems involved and establish who owns the outcome. If the underlying process changes every time, standardize it first or keep the automation narrowly scoped.",
        ],
        points: [
          "A named process owner and a specific user need",
          "Inputs and expected outputs that can be checked",
          "Known exceptions and an escalation route for uncertain cases",
          "A baseline for effort, turnaround time, errors or service quality",
        ],
      },
      {
        heading: "Keep people accountable for consequential decisions",
        paragraphs: [
          "Decide what the system may do automatically, what requires a person’s review, and when it must stop and ask for help. Use approval steps for actions that affect money, customer commitments, access or regulated records. Make the source of important information visible so staff can verify a recommendation instead of trusting an unexplained answer.",
          "Treat access, privacy, retention and auditability as part of the design. Give automation only the permissions it needs, log actions that matter, and provide a clear way to correct mistakes. Human review should be purposeful, not a box-ticking step that people learn to ignore.",
        ],
      },
      {
        heading: "Measure value in a controlled pilot",
        paragraphs: [
          "Compare the pilot with the baseline using a small set of measures, such as completion time, error and rework rate, service quality, adoption and cost to operate. Check performance on normal cases and exceptions. Review the results with the people who use the workflow before extending it.",
          "A useful pilot can show that automation is worthwhile, that the process needs redesign first, or that a human-led approach is safer. All three are valuable decisions. Scale only when quality, oversight and operating ownership are clear.",
        ],
      },
    ],
    decisionPrompt:
      "Can your team name the owner, expected output and escalation path for the task you want to automate?",
    service: {
      heading: "Start with the workflow, then choose the right automation",
      copy:
        "Northstar connects process improvement, data readiness and AI automation so teams can test a focused use case with suitable human oversight.",
      label: "Explore AI and automation",
      href: "/what-we-do/intelligence/ai-automation",
    },
    cta: {
      title: "Scope an automation pilot around a real business measure.",
      copy:
        "We can help assess a candidate workflow, define guardrails and agree on how to evaluate a pilot before it grows.",
      contactLabel: "Discuss an automation opportunity",
    },
    related: [
      "dashboards-to-decision-intelligence",
      "cost-fragmented-business-systems",
    ],
  },
  "dashboards-to-decision-intelligence": {
    opening:
      "A dashboard is useful when it helps someone make a better decision at the right moment. More charts do not create more insight if users do not agree on what a measure means, cannot trust its source, or do not know what action should follow.",
    sections: [
      {
        heading: "Start with a decision, not a screen",
        paragraphs: [
          "Name the decision the dashboard should support, who owns it, how often it is made and what information is needed. A finance leader reviewing cash exposure, a service manager managing a backlog and an operations lead responding to a stockout need different signals and different levels of detail.",
          "Work backwards from the action. Which change in a measure should prompt investigation? What context helps explain it? Which details are useful for follow-up, and which only add noise? This keeps the dashboard focused on the work rather than the available data.",
        ],
        points: [
          "Decision and accountable owner",
          "Measure definition, target or relevant comparison",
          "Refresh timing that matches the decision cycle",
          "Action or investigation expected when the signal changes",
        ],
      },
      {
        heading: "Build trust in definitions and data",
        paragraphs: [
          "Agree on terms such as revenue, active customer, overdue order or available stock before publishing a metric. Document the source, calculation, filters, refresh schedule and any known limitations. If teams use different definitions, make the difference explicit and resolve it with the people responsible for the business process.",
          "Validate the numbers against source records and the decisions they are intended to support. Assign ownership for data quality and changes to definitions. A reliable model and clear stewardship are more valuable than adding another visualization layer over conflicting data.",
        ],
      },
      {
        heading: "Make the insight part of an operating rhythm",
        paragraphs: [
          "A useful insight connects a signal to a response. Give users a way to move from an unexpected result to the relevant detail, then define how actions and outcomes are reviewed. Some decisions need a daily queue; others belong in a weekly or monthly review.",
          "Measure whether the dashboard is helping decisions happen earlier or with less rework. Retire views that no longer serve a decision. Decision intelligence is an ongoing practice of improving the questions, data and actions together.",
        ],
      },
    ],
    decisionPrompt:
      "What decision should change because this dashboard exists, and who will act on the signal?",
    service: {
      heading: "Make reporting useful to the people who act on it",
      copy:
        "Northstar helps define business measures, connect trusted data and build reporting around real operating and management decisions.",
      label: "Explore data analytics and reporting",
      href: "/what-we-do/intelligence/data-analytics",
    },
    cta: {
      title: "Build reporting around a decision your team needs to make.",
      copy:
        "Bring one recurring question or dashboard to a conversation. We can help trace the measure back to its owner, definition and data.",
      contactLabel: "Discuss a reporting challenge",
    },
    related: [
      "ai-automation-enterprise-value",
      "technology-strategy-practical-roadmap",
    ],
  },
  "cost-fragmented-business-systems": {
    opening:
      "The cost of fragmented systems is rarely visible on a single invoice. It shows up in the work between systems: reconciling records, checking which version is current, re-entering information, repairing fragile integrations and waiting for someone to explain a number.",
    sections: [
      {
        heading: "Map the information flow around one process",
        paragraphs: [
          "Choose a process that crosses teams, such as quote to cash, procure to pay or order to delivery. Trace where each important piece of information is created, changed, approved and consumed. Record the systems, files and people involved, including the manual steps that are easy to miss in a process diagram.",
          "This map shows where information is duplicated, delayed or corrected and where ownership is unclear. It also distinguishes a genuine system gap from a process that has never been agreed across teams.",
        ],
      },
      {
        heading: "Estimate operational cost, not just licence cost",
        paragraphs: [
          "Look at the frequency and effort of reconciliation, repeated entry, exception handling and report preparation. Include delays to decisions, customer response and fulfilment, as well as the support burden of brittle integrations. Use a defined period and involve the people doing the work so estimates reflect normal operations.",
          "Do not turn every inconvenience into an invented savings figure. Use observed volumes, time samples and known incidents where available. A transparent range with stated assumptions is more useful than a precise-looking number that cannot be defended.",
        ],
        points: [
          "How often the handoff occurs and how much effort it takes",
          "Where errors, delays or customer follow-up are introduced",
          "What changes if the process volume or product mix grows",
          "Which controls or audit records must be preserved",
        ],
      },
      {
        heading: "Fix the cause, not necessarily every system",
        paragraphs: [
          "Options can include clarifying process ownership, removing duplicate steps, improving data standards, integrating systems, replacing a constrained application or consolidating selected capabilities. A single platform may simplify some work, but it can also create a poor fit if teams have distinct needs or if migration risk is high.",
          "Compare options across the end-to-end process: reliability, security, user effort, integration and support needs, change flexibility and total cost of ownership. Prioritize the handoffs with the clearest business impact and sequence changes so teams can validate results before expanding the scope.",
        ],
      },
    ],
    decisionPrompt:
      "Which handoff creates the most repeated effort or delay, and how often does it occur?",
    service: {
      heading: "Improve the handoffs between systems and teams",
      copy:
        "Northstar maps workflows first, then helps determine whether process redesign, integration or a platform change is the right response.",
      label: "Explore process and workflow optimization",
      href: "/what-we-do/modernize/process-workflow-optimization",
    },
    cta: {
      title: "Make the hidden work visible before investing in new systems.",
      copy:
        "Choose a process with frequent handoffs. We can help map the friction and compare practical ways to reduce it.",
      contactLabel: "Discuss fragmented workflows",
    },
    related: [
      "erp-business-constraint",
      "legacy-platform-modernization",
    ],
  },
  "digital-capabilities-without-rebuild": {
    opening:
      "A new digital service does not automatically require replacing every system behind it. Many businesses can create a better customer or employee experience by adding a focused capability, improving an integration or modernizing one constrained part of the platform while stable systems continue to do their job.",
    sections: [
      {
        heading: "Decide what should differentiate and what should support",
        paragraphs: [
          "Identify the experience or capability that matters to customers and the business. Then separate it from commodity functions that existing platforms already handle well. This helps teams invest engineering effort where it creates value instead of rebuilding capabilities simply because the current architecture is imperfect.",
          "Map the data and services the new experience needs, including ownership, latency, security and failure behavior. A thin interface over a reliable system can be a sensible first step, but only if the underlying contracts and support responsibilities are clear.",
        ],
        points: [
          "A specific user or business outcome for the new capability",
          "Clear ownership of data and interfaces",
          "Security, privacy and operational responsibilities",
          "A plan for monitoring, support and future changes",
        ],
      },
      {
        heading: "Create boundaries that allow change",
        paragraphs: [
          "Use explicit APIs or integration contracts where systems need to communicate. Keep business rules in an intentional place, avoid unnecessary duplication of sensitive data, and design for timeouts or unavailable dependencies. Good boundaries allow a new experience to evolve without turning every change into a full-platform release.",
          "A new interface can expose old constraints if the underlying workflows are slow or inconsistent. Prototype the most important journey with real users and validate the full path, including the operational teams who will resolve exceptions.",
        ],
      },
      {
        heading: "Modernize in increments, with a reason to continue",
        paragraphs: [
          "Deliver a small capability end to end, then assess adoption, service quality and support effort. Use what the team learns to decide whether to extend the experience, improve an integration or modernize a deeper platform component. Keep stable foundations where they remain fit and supported.",
          "There are cases where replacement is the responsible choice, especially when a system cannot meet essential security, reliability or change needs. Make that decision from evidence and a transition plan, not from a blanket rule to rebuild or preserve everything.",
        ],
      },
    ],
    decisionPrompt:
      "Which capability would make a visible difference to users without requiring a full platform replacement?",
    service: {
      heading: "Build a digital capability around real user needs",
      copy:
        "Northstar connects product thinking, engineering and integration planning to deliver useful digital experiences in manageable increments.",
      label: "Explore product engineering",
      href: "/what-we-do/build/product-engineering",
    },
    cta: {
      title: "Find the smallest useful digital capability to build first.",
      copy:
        "We can help shape the user need, assess the systems it depends on and plan a first release that can be tested in practice.",
      contactLabel: "Discuss a digital product idea",
    },
    related: [
      "legacy-platform-modernization",
      "technology-strategy-practical-roadmap",
    ],
  },
  "technology-strategy-practical-roadmap": {
    opening:
      "A technology strategy is useful when it helps leaders make choices: what to fund, what to defer, what must happen first and how progress will be judged. A catalogue of tools or a distant target architecture is not enough if teams cannot connect it to business priorities and delivery capacity.",
    sections: [
      {
        heading: "Start with outcomes and constraints",
        paragraphs: [
          "Agree on the business outcomes that matter over the planning horizon. They may relate to customer experience, operating resilience, better information, growth or the ability to change products faster. Record the current constraints, including people, funding, risk tolerance, contracts and operational commitments.",
          "Use those outcomes to assess the current technology landscape. Focus on the capabilities and dependencies that affect the decisions ahead rather than documenting every component at equal depth. Involve business owners, technology teams and the people accountable for risk and operations.",
        ],
      },
      {
        heading: "Turn choices into a sequenced portfolio",
        paragraphs: [
          "Describe initiatives as outcomes with accountable owners, not as a shopping list of platforms. For each one, capture the problem, expected benefit, dependencies, major risks, capacity needs and how success will be evaluated. Make assumptions visible so leaders know what could change the recommendation.",
          "Sequence work around dependencies and the ability to deliver. Include foundational work such as data quality, integration, security and team capability where it is necessary for later value. A roadmap should show trade-offs, not pretend every priority can happen at once.",
        ],
        points: [
          "A business owner and a measurable outcome",
          "Key dependencies, risks and decision points",
          "A realistic view of capacity and operating constraints",
          "Evidence that will confirm or challenge the plan",
        ],
      },
      {
        heading: "Review the roadmap as conditions change",
        paragraphs: [
          "Treat the roadmap as a working decision tool. Review progress and assumptions on a regular cadence, and revisit priorities when customer needs, regulation, technology or delivery capacity changes. Keep committed work distinguishable from options that still need discovery.",
          "This creates room to learn without losing direction. Leaders can protect the outcomes while changing the sequence or approach when new evidence appears. The result is a practical path that teams can explain and act on.",
        ],
      },
    ],
    decisionPrompt:
      "Can your leadership team explain why the next major technology investment comes before the alternatives?",
    service: {
      heading: "Connect technology choices to business priorities",
      copy:
        "Northstar helps organizations assess their current landscape, make trade-offs explicit and build a roadmap that accounts for dependencies and delivery realities.",
      label: "Explore technology strategy",
      href: "/what-we-do/build/technology-strategy",
    },
    cta: {
      title: "Turn competing technology priorities into a clear sequence.",
      copy:
        "Bring the decisions your team is weighing. We can help connect each option to outcomes, dependencies and a practical next step.",
      contactLabel: "Discuss your technology roadmap",
    },
    related: [
      "digital-capabilities-without-rebuild",
      "dashboards-to-decision-intelligence",
    ],
  },
};
