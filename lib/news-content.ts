export type NewsSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
  vulnerabilities?: NewsVulnerability[];
};

export type NewsVulnerability = {
  cve: string;
  product: string;
  score: string;
  published: string;
  addedToKev: string;
  impact: string;
  scope: string;
  action: string;
};

export type NewsSource = {
  label: string;
  href: string;
  note?: string;
};

export type NewsStory = {
  slug: string;
  category: string;
  tags: string[];
  title: string;
  summary: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  takeaway: string;
  showTakeaway?: boolean;
  sections: NewsSection[];
  faqs: { question: string; answer: string }[];
  sources: NewsSource[];
};

export const newsStories: NewsStory[] = [
  {
    slug: "five-critical-cves-security-teams-2026",
    category: "Cybersecurity news",
    tags: ["Critical CVEs", "CISA KEV", "Threat briefing", "GitLab", "Puppet"],
    title: "Five Critical CVEs Security Teams Should Check Now",
    summary:
      "Five critical vulnerabilities published in the past two months have been added to CISA’s Known Exploited Vulnerabilities catalog. Here is what each affects and where to check for exposure.",
    description:
      "Five recent critical CVEs in CISA KEV affect GitLab, Puppet, Arista VeloCloud, FreeSWITCH and Collabora. See the risks, timelines and vendor fixes.",
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-19",
    showTakeaway: false,
    takeaway:
      "All five vulnerabilities have CVSS v3.1 scores from 9.8 to 10.0 and appear in CISA’s Known Exploited Vulnerabilities catalog. That signals urgency, not proof that your organization is compromised. Check exact products, versions and configurations against the linked CISA and CVE records.",
    sections: [
      {
        heading: "The headlines are moving past endpoints",
        paragraphs: [
          "Security teams are used to checking browsers and internet-facing apps. The harder question is whether they also know every service that can push code, configure servers, coordinate networks, handle calls or share documents. Five critical vulnerabilities across those systems were added to CISA’s Known Exploited Vulnerabilities (KEV) catalog in the past two months.",
          "A snapshot of the CISA catalog dated November 17 contains 69 entries added between September 18 and November 17. That is a count of catalog additions, not vulnerabilities all disclosed in that window. The five below were published during the same two-month period, carry CVSS v3.1 scores of 9.8 or higher, and were subsequently added to KEV.",
          "These are not evidence of one coordinated campaign. They are a cross-section of products that sit close to identity, software delivery and core operations. CISA KEV inclusion means a vulnerability is known to have been exploited in the wild; it does not mean every organization using the product has been targeted or compromised.",
        ],
      },
      {
        heading: "Five vulnerabilities to put on the radar",
        paragraphs: [
          "This is an editorial watchlist, not a universal ranking. Severity, KEV status and the role each product plays in a company’s technology estate make these five worth checking promptly.",
        ],
        vulnerabilities: [
          {
            cve: "CVE-2026-97229",
            product: "GitLab CI/CD",
            score: "10.0",
            published: "October 13",
            addedToKev: "October 29",
            impact:
              "Under certain conditions, an unauthenticated attacker could use a crafted regular expression in a CI/CD configuration to execute code on the GitLab server.",
            scope:
              "GitLab CE/EE versions 19.2 before 19.2.8, 19.3 before 19.3.5, and 19.4 before 19.4.2.",
            action:
              "Check the running branch and move to its fixed release. CI/CD hosts can hold source code, deployment credentials and release access.",
          },
          {
            cve: "CVE-2026-115731",
            product: "Perforce Puppet Enterprise",
            score: "9.9",
            published: "November 3",
            addedToKev: "November 17",
            impact:
              "A crafted report can lead to code execution on Puppet Server by a client with a CA-signed agent certificate. Weak certificate auto-signing can make the attack reachable to an unauthenticated network attacker.",
            scope:
              "Puppet Server report processing in affected releases. Confirm exact versions and conditions in the CVE record.",
            action:
              "Apply the available security fix and review how agent certificates are approved, especially any automatic signing rules.",
          },
          {
            cve: "CVE-2026-114625",
            product: "Arista VeloCloud Orchestrator",
            score: "9.9",
            published: "October 22",
            addedToKev: "October 23",
            impact:
              "On-premises VeloCloud Orchestrator deployments may allow an authenticated user to gain operator privileges and reach privileged internal functionality, affecting the orchestrator and managed data.",
            scope:
              "Applies to on-premises VCO. CISA states hosted and Dedicated services were already patched.",
            action:
              "Check on-premises versions and apply the available security fix. Do not assume hosted-service remediation covers a self-managed deployment.",
          },
          {
            cve: "CVE-2026-116779",
            product: "FreeSWITCH",
            score: "9.8",
            published: "November 5",
            addedToKev: "November 9",
            impact:
              "A specially handled inbound SIP MESSAGE can reach FreeSWITCH API commands. The issue can expose configuration and credentials, affect call control, and permit command execution. Exploitation has been observed in the wild.",
            scope:
              "FreeSWITCH versions before 1.11.3.",
            action:
              "Upgrade to 1.11.3 or later and review which SIP profiles permit inbound messages.",
          },
          {
            cve: "CVE-2026-110447",
            product: "Collabora Online Built-in CODE Server",
            score: "9.8",
            published: "October 14",
            addedToKev: "October 23",
            impact:
              "A request can trigger command execution as the web-server user when the built-in CODE Server is not running, such as during a restart, upgrade or crash. Exploitation was reported in September and October.",
            scope:
              "The Nextcloud built-in CODE Server app before 26.4.303. Standalone Collabora Online servers are not affected.",
            action:
              "Upgrade the built-in app to 26.4.303 or later, or remove it. Disabling the app alone is not enough.",
          },
        ],
      },
      {
        heading: "Why the product context matters",
        paragraphs: [
          "A critical score is a useful alert, but these cases show why teams need the affected product and deployment details too. One flaw sits in CI/CD, another in configuration management, and others in systems that manage network services, voice traffic or shared documents.",
          "Those platforms often connect to credentials, internal services or production workflows. That does not make every installation equally exposed. Version, configuration, network reachability and vendor status all change the practical risk. For example, the Collabora issue is specific to the built-in Nextcloud app and its stopped-server condition, while CISA’s record distinguishes on-premises VCO from hosted services.",
        ],
      },
      {
        heading: "What security teams should check first",
        paragraphs: [
          "Start with an inventory search for the five products, then confirm versions and deployment type with the system owner. Check vendor advisories for the exact affected ranges and fixes. Prioritize reachable control planes and systems connected to source code, credentials or critical operations.",
          "CISA KEV inclusion is a reason to accelerate review, not a reason to assume compromise. If the affected system may have been exposed while vulnerable, use your incident-response process to review relevant logs and indicators as well as patching. Record the owner and verify the fixed version is actually deployed.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why are these five CVEs highlighted?",
        answer:
          "They were published between September 18 and November 18, 2026, have CVSS v3.1 scores of at least 9.8, and were added to CISA’s Known Exploited Vulnerabilities catalog. This is an editorial selection, not a complete ranking of every critical flaw.",
      },
      {
        question: "Does a CISA KEV entry mean my company was attacked?",
        answer:
          "No. KEV inclusion means the vulnerability is known to have been exploited in the wild. It does not show whether a particular organization was targeted or compromised. Check affected versions, exposure and relevant logs.",
      },
      {
        question: "Are all installations of the named products affected?",
        answer:
          "No. Each issue has specific affected versions or configurations. Check the linked CVE record and CISA entry before deciding whether a system is affected. For example, the Collabora issue concerns the built-in CODE Server app in Nextcloud, not standalone Collabora servers.",
      },
      {
        question: "What should an organization do if it finds an affected system?",
        answer:
          "Follow the vendor’s current remediation guidance, confirm the fix is installed, and review exposure. If the system was reachable while vulnerable or there are signs of unauthorized access, involve the incident-response team and preserve relevant evidence.",
      },
    ],
    sources: [
      {
        label: "CISA Known Exploited Vulnerabilities Catalog",
        href: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
      },
      {
        label: "CISA KEV JSON feed",
        href: "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json",
        note:
          "Catalog-addition dates are not the same as CVE publication or discovery dates. Count above uses the 2026.11.17 snapshot.",
      },
      {
        label: "CVE Program",
        href: "https://www.cve.org/",
        note: "Use the CVE ID links above to open individual CVE records.",
      },
    ],
  },
  {
    slug: "data-security-beyond-firewalls",
    category: "Data security",
    tags: [
      "Data security",
      "Data protection",
      "Security operations",
      "Identity",
      "Privacy",
      "AI governance",
    ],
    title: "Data Security Beyond Firewalls: A Practical Guide",
    summary:
      "Firewalls are only one control. Build data security around discovery, least-privilege access, encryption, monitoring, recovery and clear ownership across cloud, SaaS and AI workflows.",
    description:
      "A practical guide to data security beyond firewalls, covering data discovery, identity, encryption, monitoring, incident response, backup and AI use.",
    publishedAt: "2026-11-18",
    takeaway:
      "Data security is the practice of protecting information from unauthorized access, change, disclosure, loss and misuse throughout its lifecycle. Firewalls help control network traffic, but effective protection also needs data discovery, least-privilege access, encryption, monitoring, tested recovery and clear ownership.",
    sections: [
      {
        heading: "Why data security cannot stop at the network boundary",
        paragraphs: [
          "Business data lives in more places than a production database. It may be copied into analytics platforms, SaaS tools, employee devices, backups, logs, email, file shares, APIs and AI-assisted workflows. A network firewall can help manage traffic between systems, but it cannot decide whether an employee should export a customer list, whether a service account has excessive access or whether an old backup should still be retained.",
          "The risk is not only a dramatic external breach. Accidental sharing, compromised credentials, excessive permissions, misconfigured cloud storage, insecure integrations, malicious insiders and unmanaged copies can all expose information. Controls need to follow the data and the identities that use it.",
          "IBM’s 2026 Cost of a Data Breach report estimates the global average breach cost at USD 4.99 million, up 12% from the previous year. This is a study-wide average, not a prediction for any individual organization. It is a reminder to evaluate prevention, detection, response and recovery together rather than treating security as a single appliance purchase.",
        ],
      },
      {
        heading: "Start by finding and classifying the data",
        paragraphs: [
          "Organizations cannot protect information they do not know they hold. Create a practical inventory of important data stores and flows, including business systems, cloud services, exports, backups, non-production environments and third-party connections. Identify the business owner and the people or services that can access each store.",
          "Classify information according to its business sensitivity and the harm caused by misuse or exposure. The categories should be understandable to employees and useful for deciding access, handling, retention and monitoring. Classification is a tool for applying proportionate controls, not a labeling exercise for its own sake.",
          "Collect and retain only what the business needs. Removing unnecessary copies and retiring data that no longer has a purpose can reduce the amount that needs to be protected, searched and recovered.",
        ],
        points: [
          "What information is held, and where does it flow?",
          "Who owns it and who or what can access it?",
          "Why is it collected, how long is it needed, and when should it be deleted?",
          "Which vendors, integrations, reports and AI workflows receive a copy?",
        ],
      },
      {
        heading: "Build layered controls around information",
        paragraphs: [
          "A resilient data protection plan combines controls that reduce the chance of exposure with controls that help detect and contain incidents. Select controls based on data sensitivity, business impact, legal duties and how the information is actually used.",
        ],
        points: [
          "Identity and access: use unique identities, least privilege, strong authentication and regular access reviews. Pay attention to administrators, service accounts, contractors and machine identities.",
          "Encryption and key management: protect data in transit and at rest where appropriate. Define who can access cryptographic keys, how they are rotated, and how recovery works.",
          "Application and integration security: secure APIs, exports and service connections. Validate authorization at the data level and avoid giving integrations broader access than their task requires.",
          "Monitoring and response: record meaningful access and administrative events, protect the logs, alert on unusual or high-impact activity, and define who investigates and contains it.",
          "Data loss controls: use clear rules for sharing, downloading and transferring sensitive data. Test controls against legitimate workflows to reduce unsafe workarounds.",
          "Backups and recovery: maintain protected, appropriately separated copies and test that critical data can be restored within business needs.",
          "Retention and disposal: make retention periods and deletion responsibilities explicit, including in exports, logs, backups and supplier environments.",
        ],
      },
      {
        heading: "Make security operations data-aware",
        paragraphs: [
          "Security operations become more useful when events can be connected to the data, identities and business services they affect. A sign-in anomaly matters more when the identity can access sensitive records. A large export matters more when the destination is unusual and the data owner did not expect it.",
          "Connect relevant signals from identity providers, endpoints, cloud platforms, databases and business applications where feasible. Establish normal access patterns carefully, then route meaningful exceptions to people who can investigate. Automation can enrich and route alerts, but high-impact actions should have clear authorization, testing and human accountability.",
          "Prepare an incident process that includes security, IT, legal, privacy, communications and business owners. Know how to contain access, preserve evidence, assess affected data and restore operations. Follow applicable notification requirements and contractual obligations with qualified legal and privacy guidance.",
        ],
      },
      {
        heading: "Cloud, SaaS and AI add new data paths",
        paragraphs: [
          "Cloud services and SaaS do not remove the need for data governance. Clarify the shared responsibilities between your organization and the provider, configure access and sharing deliberately, and review how data is copied, logged, backed up and deleted.",
          "AI introduces additional questions: what information may employees enter into external tools, what data can a model retrieve, how are prompts and outputs retained, and can an automated agent take actions beyond its intended role? Define approved use, data boundaries, access controls and review responsibilities before expanding adoption.",
          "Treat every new integration or AI workflow as a data-flow change. Record what moves, why it is needed, who can access it, where it is processed and how it can be removed or corrected.",
        ],
      },
      {
        heading: "A practical 30-day starting plan",
        paragraphs: [
          "A first month does not need to solve every security challenge. It can establish enough visibility to identify immediate gaps and agree on a focused improvement roadmap.",
        ],
        points: [
          "Weeks 1–2: identify a small number of high-value data sets and map owners, locations, access paths and external sharing.",
          "Weeks 2–3: review privileged access, shared accounts, exposed storage, key integrations and backup coverage for those data sets.",
          "Weeks 3–4: confirm monitoring and incident contacts, test a restore or access-revocation exercise, and record unresolved risks with owners.",
          "Then: prioritize improvements by data sensitivity, exposure, business impact and delivery effort. Revisit the map as systems and business processes change.",
        ],
      },
      {
        heading: "How Northstar connects data and business change",
        paragraphs: [
          "Northstar works across business systems, data and technology strategy. We help teams understand how information moves through workflows and integrations, clarify ownership and requirements, and turn transformation priorities into a practical roadmap. Security-specific design, testing and incident response should involve the organization’s security specialists and qualified providers.",
          "The goal is to make protection part of how systems and processes are designed and operated, rather than a final gate added after data has already spread across the environment.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is data security?",
        answer:
          "Data security is the set of policies, processes and technical controls used to protect information from unauthorized access, disclosure, alteration, loss or misuse throughout its lifecycle.",
      },
      {
        question: "Are firewalls enough to protect company data?",
        answer:
          "No. Firewalls can help control network traffic, but data protection also depends on identity and access controls, encryption, secure applications and integrations, monitoring, backups, retention and incident response.",
      },
      {
        question: "What is the first step in improving data security?",
        answer:
          "Identify important data, where it is stored and shared, who owns it and who can access it. This inventory helps an organization prioritize controls based on sensitivity and business impact.",
      },
      {
        question: "How should organizations protect data used with AI?",
        answer:
          "Define approved tools and data boundaries, restrict access to the minimum needed, understand prompt and output retention, monitor connected sources and agent actions, and assign human owners for high-impact decisions.",
      },
      {
        question: "What is the difference between data security and data privacy?",
        answer:
          "Data security focuses on protecting information from unauthorized access, change, loss or disclosure. Data privacy focuses on whether personal information is collected, used, shared and retained appropriately. The two are related and often rely on shared governance and controls.",
      },
    ],
    sources: [
      {
        label: "NIST Cybersecurity Framework 2.0",
        href: "https://www.nist.gov/cyberframework",
      },
      {
        label: "NIST Privacy Framework",
        href: "https://www.nist.gov/privacy-framework",
      },
      {
        label: "CISA Cross-Sector Cybersecurity Performance Goals",
        href: "https://www.cisa.gov/cross-sector-cybersecurity-performance-goals",
      },
      {
        label: "IBM Cost of a Data Breach report",
        href: "https://www.ibm.com/reports/data-breach",
        note: "The report's global average is not an estimate of any one organization's breach cost.",
      },
      {
        label: "Verizon 2026 Data Breach Investigations Report",
        href: "https://www.verizon.com/business/resources/reports/dbir/",
        note: "DBIR findings reflect the report's stated incident period and data set.",
      },
    ],
  },
];

export function getNewsStory(slug: string) {
  return newsStories.find((story) => story.slug === slug);
}
