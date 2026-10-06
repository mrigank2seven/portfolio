export const profile = {
  name: "Mrigank Gupta",
  initials: "MG",
  role: "Software Engineer II",
  company: "Progfin",
  location: "Lucknow, India",
  email: "mail.mrigank7@gmail.com",
  linkedin: "https://www.linkedin.com/in/mrigank2seven",
  resume: "/resume.pdf",
  headline: "Building Scalable Fintech Backends.",
  tagline:
    "Python/Django engineer with 4+ years designing lending, payments and AI-driven document pipelines for high-volume financial systems.",
  aboutParagraphs: [
    "I'm a Python/Django engineer with 4+ years of experience building backend systems, REST APIs and microservices for fintech lending and payment platforms on AWS.",
    "In money-moving software a wrong number is a real loss, so I lean on precise decimal arithmetic, tracked job states and retries that are safe to repeat. Lately that has meant AI-driven document pipelines, database performance work and TOTP security across Django services.",
  ],
} as const;

export const navSections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "architecture", label: "Architecture" },
  { id: "skills", label: "Skills" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export type Stat = { value: string; label: string; todo?: boolean };

export const aboutStats: Stat[] = [
  { value: "4+", label: "Years building backend systems" },
  { value: "35→85%+", label: "Invoice extraction success rate" },
  { value: "7", label: "Django services secured with TOTP" },
  { value: "6", label: "Systems integrated in lending workflows" },
];

export type ExperienceGroup = { title: string; tags: string[]; points: string[] };

export const experience = {
  company: "Progfin",
  place: "New Delhi",
  role: "Software Engineer II",
  period: "April 2022 – Present",
  summary:
    "Backend engineer on lending and payment platforms: AI document pipelines, credit workflows, admin security and portfolio analytics.",
  groups: [
    {
      title: "AI & Document Intelligence",
      tags: ["Python", "OCR", "LLM", "Celery"],
      points: [
        "Built an in-house OCR + LLM invoice-extraction pipeline with job states, retry/backoff and IRN/e-invoice parsing, raising extraction success from 35% to 85%+.",
        "Built Aadhaar masking for PDF, JPEG and PNG using PDF redaction with OCR fallback, behind authenticated APIs.",
      ],
    },
    {
      title: "Lending & Financial Workflows",
      tags: ["Django", "DRF", "Celery", "PostgreSQL", "SFTP", "PGP"],
      points: [
        "Architected Pre-Approval Loan Eligibility, combining ERP data, ledgers, sales history, CIBIL and GSTIN into one credit decision.",
        "Connected LMS, LOS, ERP, UMS, LedgerParser and ElapDB so invoice, lending and approval data stay consistent, using precise decimal arithmetic for interest, limits and fees.",
        "Built lender onboarding workflows with data mapping, PGP-encrypted SFTP exchange and response reconciliation.",
      ],
    },
    {
      title: "Security & Performance",
      tags: ["Django", "TOTP", "PostgreSQL"],
      points: [
        "Implemented TOTP admin authentication across 7 Django services with encrypted secrets, recovery codes, lockouts and automated tests.",
        "Led PostgreSQL optimization: removed repeated lookups, consolidated invoice-status aggregation and added concurrent index migrations.",
      ],
    },
    {
      title: "Analytics & Risk",
      tags: ["DRF", "PostgreSQL", "Analytics"],
      points: [
        "Built portfolio analytics APIs for distributor performance, growth, company drill-downs and AUM, utilization and delinquency.",
        "Built a fraud and deduplication framework using Business PAN, CIBIL history and past relationships, applying statistical analysis and business rules to improve underwriting accuracy.",
      ],
    },
  ] satisfies ExperienceGroup[],
};

export type Project = {
  title: string;
  blurb: string;
  tags: string[];
  highlight?: string;
  slug?: string;
};

export const projects: Project[] = [
  {
    title: "OCR + LLM Invoice Extraction",
    blurb:
      "A job-driven pipeline that turns invoices into structured data with IRN/e-invoice checks, plus Aadhaar document masking built on the same OCR stack.",
    tags: ["Python", "OCR", "LLM", "Celery", "PDF Redaction"],
    highlight: "35% → 85%+ success",
    slug: "ocr-llm-invoice-extraction",
  },
  {
    title: "Pre-Approval Loan Eligibility",
    blurb:
      "One data-driven credit assessment over ERP data, ledgers, sales history, CIBIL and GSTIN, ending in a single lending decision.",
    tags: ["Django", "PostgreSQL", "CIBIL", "GSTIN"],
    slug: "pre-approval-loan-eligibility",
  },
  {
    title: "TOTP Admin Authentication",
    blurb:
      "Second-factor login for privileged admins across 7 Django services, with encrypted secrets, recovery codes and lockout controls.",
    tags: ["Django", "TOTP", "Security"],
    highlight: "7 services",
    slug: "totp-admin-authentication",
  },
  {
    title: "Cross-System Financial Workflows",
    blurb:
      "Keeps invoice, lending and approval data consistent across LMS, LOS, ERP, UMS, LedgerParser and ElapDB, and onboards lenders over PGP-encrypted SFTP.",
    tags: ["Microservices", "DRF", "Celery", "SFTP", "PGP"],
    highlight: "6 systems",
  },
  {
    title: "Fraud & Portfolio Analytics",
    blurb:
      "Portfolio APIs for AUM, utilization and delinquency, alongside a deduplication framework that flags repeat applications and suspicious borrower relationships.",
    tags: ["DRF", "PostgreSQL", "Analytics", "Risk"],
  },
  {
    title: "PostgreSQL Performance Tuning",
    blurb:
      "Removed repeated lookups, consolidated invoice-status aggregation and shipped concurrent index migrations for production reliability.",
    tags: ["PostgreSQL", "Indexing", "Django ORM"],
  },
];

export type DiagramNode = {
  id: string;
  label: string;
  desc: string;
  x: number;
  y: number;
  w?: number;
};

export type Diagram = {
  id: string;
  tab: string;
  title: string;
  summary: string;
  nodes: DiagramNode[];
  edges: [string, string][];
};

export const diagrams: Diagram[] = [
  {
    id: "ocr",
    tab: "OCR + LLM Pipeline",
    title: "Invoice Extraction Pipeline",
    summary: "Job-state driven extraction with retry/backoff and compliance parsing.",
    nodes: [
      { id: "in", label: "Invoice", desc: "Invoice document enters the system.", x: 70, y: 110 },
      { id: "q", label: "Job Queue", desc: "Each document becomes a job with tracked state.", x: 230, y: 110 },
      { id: "ocr", label: "OCR", desc: "Text and layout are recognized from the document.", x: 390, y: 110 },
      { id: "llm", label: "LLM Extract", desc: "Structured fields are extracted from the recognized text.", x: 550, y: 110 },
      { id: "irn", label: "IRN Parse", desc: "IRN / e-invoice compliance data is parsed and checked.", x: 710, y: 110 },
      { id: "retry", label: "Retry / Backoff", desc: "Failed jobs are retried with backoff instead of manual handling.", x: 390, y: 230 },
    ],
    edges: [
      ["in", "q"],
      ["q", "ocr"],
      ["ocr", "llm"],
      ["llm", "irn"],
      ["llm", "retry"],
      ["retry", "q"],
    ],
  },
  {
    id: "eligibility",
    tab: "Loan Eligibility",
    title: "Pre-Approval Eligibility",
    summary: "Many data sources reduced to one lending decision.",
    nodes: [
      { id: "erp", label: "ERP Data", desc: "Operational data from the borrower's ERP.", x: 90, y: 40 },
      { id: "ledger", label: "Manual Ledgers", desc: "Ledgers uploaded or entered by hand.", x: 90, y: 110 },
      { id: "sales", label: "Sales History", desc: "Historical sales performance.", x: 90, y: 180 },
      { id: "cibil", label: "CIBIL", desc: "Credit bureau history.", x: 90, y: 250 },
      { id: "agg", label: "Aggregator", desc: "Normalizes and consolidates every source, including GSTIN data.", x: 350, y: 145 },
      { id: "assess", label: "Credit Assessment", desc: "Business rules and statistical checks score creditworthiness.", x: 550, y: 145 },
      { id: "decision", label: "Decision", desc: "Data-driven pre-approval outcome.", x: 730, y: 145 },
    ],
    edges: [
      ["erp", "agg"],
      ["ledger", "agg"],
      ["sales", "agg"],
      ["cibil", "agg"],
      ["agg", "assess"],
      ["assess", "decision"],
    ],
  },
  {
    id: "totp",
    tab: "TOTP Admin Auth",
    title: "Privileged-Admin Authentication",
    summary: "Second-factor login for admins, rolled out across 7 Django services.",
    nodes: [
      { id: "login", label: "Admin Login", desc: "Privileged admin signs in with their password.", x: 70, y: 110 },
      { id: "lock", label: "Lockout Check", desc: "Repeated failures lock the account before codes can be brute-forced.", x: 230, y: 110 },
      { id: "verify", label: "TOTP Verify", desc: "The 6-digit time-based code is validated against the admin's secret.", x: 390, y: 110 },
      { id: "secret", label: "Encrypted Secret", desc: "TOTP secrets are stored encrypted, never in plaintext.", x: 390, y: 230 },
      { id: "recovery", label: "Recovery Codes", desc: "One-time recovery codes let admins back in if the device is lost.", x: 550, y: 230 },
      { id: "session", label: "Admin Session", desc: "Access is granted only after the second factor passes.", x: 710, y: 110 },
      { id: "tests", label: "Auth-Flow Tests", desc: "Automated tests cover the whole flow in each of the 7 services.", x: 230, y: 230 },
    ],
    edges: [
      ["login", "lock"],
      ["lock", "verify"],
      ["verify", "session"],
      ["secret", "verify"],
      ["recovery", "verify"],
      ["tests", "lock"],
    ],
  },
  {
    id: "aadhaar",
    tab: "Aadhaar Masking",
    title: "Aadhaar Document Masking",
    summary: "Locate the Aadhaar number on a card and mask its first 8 digits before the document is stored or shared.",
    nodes: [
      { id: "card", label: "Aadhaar Card", desc: "The uploaded Aadhaar card image or document.", x: 90, y: 145 },
      { id: "locate", label: "Locate Aadhaar Number", desc: "Find where the 12-digit Aadhaar number sits on the card.", x: 300, y: 145, w: 170 },
      { id: "mask", label: "Mask First 8", desc: "Cover the first 8 digits so only the last 4 stay visible.", x: 510, y: 145 },
      { id: "out", label: "Masked Document", desc: "The card with its Aadhaar number masked, safe to store or share.", x: 710, y: 145 },
    ],
    edges: [
      ["card", "locate"],
      ["locate", "mask"],
      ["mask", "out"],
    ],
  },
  {
    id: "lending",
    tab: "Lending Platform",
    title: "Data to Disbursal",
    summary: "Accounting and ledger data consolidated, underwritten and handed to loan servicing.",
    nodes: [
      { id: "erp", label: "ERP Data", desc: "Synced accounting data: invoices, sales and purchase ledgers, transactions.", x: 80, y: 60 },
      { id: "manual", label: "Manual Ledger", desc: "Ledgers provided by the business directly rather than synced from an ERP.", x: 80, y: 170 },
      { id: "parser", label: "Ledger Parser", desc: "Extracts, normalizes and parses manual ledgers into transactions.", x: 250, y: 170 },
      { id: "consol", label: "Data Consolidation", desc: "Brings synced and manual ledger data into one consolidated financial view.", x: 410, y: 115, w: 160 },
      { id: "vis", label: "Visibility Report", desc: "Underwriting-oriented view of the business's financial activity.", x: 580, y: 60 },
      { id: "checks", label: "CIBIL + GSTIN", desc: "Credit history check plus GSTIN verification, matched against the ledger for consistency.", x: 580, y: 170 },
      { id: "uw", label: "Underwriting", desc: "Combines visibility, ledger, credit and GST checks into an approve or reject decision.", x: 730, y: 60 },
      { id: "servicing", label: "Loan Servicing", desc: "Approved cases move on to loan creation, disbursal, repayment and collections.", x: 730, y: 200 },
    ],
    edges: [
      ["erp", "consol"],
      ["manual", "parser"],
      ["parser", "consol"],
      ["consol", "vis"],
      ["vis", "uw"],
      ["checks", "uw"],
      ["uw", "servicing"],
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "Go", "SQL"] },
  { group: "Frameworks", items: ["Django", "Django REST Framework", "FastAPI", "Celery"] },
  { group: "Data & Caching", items: ["PostgreSQL", "MySQL", "Redis", "DynamoDB", "Data Warehousing"] },
  {
    group: "Cloud & DevOps",
    items: [
      "AWS (EC2, S3)",
      "Lambda",
      "ECS",
      "Glacier",
      "SQS / SNS",
      "Athena",
      "AWS DMS",
      "CloudWatch",
      "SigNoz",
      "Logging",
      "Monitoring",
      "Docker",
      "CI/CD",
    ],
  },
  { group: "AI & Automation", items: ["OCR", "LLMs", "OpenAI API", "Async Processing"] },
  {
    group: "Engineering",
    items: ["Microservices", "Event-Driven Architecture", "Distributed Systems", "System Design", "REST API Design", "Database Optimization"],
  },
  { group: "Tools", items: ["Git", "Jira", "Postman"] },
];

export const impact: Stat[] = [
  { value: "35% → 85%+", label: "OCR + LLM invoice extraction success" },
  { value: "7", label: "Django services with TOTP admin auth" },
  { value: "5 → 1", label: "Data sources (ERP, ledgers, sales, CIBIL, GSTIN) reduced to one lending decision" },
  { value: "3", label: "Document formats (PDF, JPEG, PNG) covered by Aadhaar masking" },
  { value: "₹250 Cr+", label: "Annual AUM Impact" },
  { value: "99%", label: "System Availability" },
  { value: "90%+", label: "Tickets Closed Within SLA" },
  { value: "TODO", label: "Payment or processing turnaround improvement", todo: true },
  { value: "TODO", label: "Query latency improvement from PostgreSQL tuning", todo: true },
];

export const education = {
  school: "Glocal University",
  degree: "Master's in Business Administration, Business Analytics",
  period: "2017 – 2019",
  courses: [
    "Business Intelligence and Data Visualization",
    "Big Data Management and Analytics",
    "Marketing Analytics and Consumer Insights",
    "Financial Analytics and Risk Management",
    "Strategic Business Analytics",
  ],
};
