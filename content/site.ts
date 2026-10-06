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
  summary:
    "Results-driven Python/Django developer with 4+ years of experience designing and scaling backend systems, REST APIs and microservices for fintech payment and lending platforms. I automate financial workflows, optimize database performance and build high-volume distributed systems on AWS.",
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

export type ExperienceGroup = { title: string; points: string[] };

export const experience = {
  company: "Progfin",
  place: "New Delhi",
  role: "Software Engineer II",
  period: "April 2022 – Present",
  groups: [
    {
      title: "AI & Document Intelligence",
      points: [
        "Designed and built an end-to-end in-house OCR + LLM invoice-extraction pipeline with job-state management, retry/backoff, structured extraction and IRN/e-invoice compliance parsing, raising extraction success from 35% to 85%+ and reducing manual intervention.",
        "Built Aadhaar document masking for PDF, JPEG and PNG using PDF redaction with OCR fallback, exposed through authenticated APIs with concurrent background processing.",
      ],
    },
    {
      title: "Lending & Financial Workflows",
      points: [
        "Architected and developed a Pre-Approval Loan Eligibility system aggregating ERP data, manual ledgers, sales history, CIBIL, GSTIN and other parameters into a consolidated, data-driven credit assessment and lending decision workflow.",
        "Architected cross-system financial workflows spanning LMS, LOS, ERP, UMS, LedgerParser and ElapDB, improving data consistency across invoice, lending, approval and financial-processing lifecycles.",
        "Improved financial correctness across vendor-finance/co-lender interest posting, sanction-limit aggregation and fee calculations using precise decimal arithmetic.",
        "Developed backend workflows and REST APIs using Python, Django, DRF, Celery and PostgreSQL for lending and financial operations across LMS, LOS and internal platforms.",
        "Built lender-specific client and supplier onboarding workflows with data mapping, PGP-encrypted SFTP exchange and success/failure response reconciliation.",
      ],
    },
    {
      title: "Security & Performance",
      points: [
        "Implemented TOTP-based privileged-admin authentication across 7 Django services, including encrypted secrets, recovery codes, lockout controls and automated authentication-flow testing.",
        "Led PostgreSQL performance optimization across high-volume workflows by eliminating repeated database lookups, consolidating invoice-status aggregation and introducing concurrent index migrations.",
      ],
    },
    {
      title: "Analytics & Risk",
      points: [
        "Developed portfolio analytics APIs covering distributor performance, portfolio growth, management summaries, company drill-downs and industry/brand productivity, including AUM, utilization and delinquency metrics.",
        "Performed fraud analytics to identify suspicious borrower relationships and repeat applications, building a deduplication framework using Business PAN, CIBIL history and historical relationships with the organization.",
        "Applied statistical analysis and business-rule modeling to identify risk patterns, assess borrower creditworthiness and improve fraud detection and underwriting accuracy.",
      ],
    },
  ] satisfies ExperienceGroup[],
};

export type Project = {
  title: string;
  blurb: string;
  tags: string[];
  highlight?: string;
};

export const projects: Project[] = [
  {
    title: "OCR + LLM Invoice Extraction",
    blurb:
      "In-house pipeline with job-state management, retry/backoff, structured extraction and IRN/e-invoice compliance parsing.",
    tags: ["Python", "OCR", "LLM", "Celery"],
    highlight: "35% → 85%+ success",
  },
  {
    title: "Pre-Approval Loan Eligibility",
    blurb:
      "Aggregates ERP data, ledgers, sales history, CIBIL and GSTIN into one data-driven credit assessment and lending decision flow.",
    tags: ["Django", "PostgreSQL", "CIBIL", "GSTIN"],
  },
  {
    title: "Cross-System Financial Workflows",
    blurb:
      "Consistent invoice, lending and approval lifecycles across LMS, LOS, ERP, UMS, LedgerParser and ElapDB.",
    tags: ["Microservices", "DRF", "Celery"],
    highlight: "6 systems",
  },
  {
    title: "TOTP Admin Authentication",
    blurb:
      "Privileged-admin 2FA with encrypted secrets, recovery codes, lockout controls and automated auth-flow tests.",
    tags: ["Django", "Security", "TOTP"],
    highlight: "7 services",
  },
  {
    title: "Aadhaar Document Masking",
    blurb:
      "Masks PDF, JPEG and PNG documents via PDF redaction with OCR fallback, behind authenticated APIs and concurrent workers.",
    tags: ["OCR", "Python", "Async"],
  },
  {
    title: "Lender Onboarding Integrations",
    blurb:
      "Lender-specific client and supplier onboarding with data mapping, PGP-encrypted SFTP exchange and response reconciliation.",
    tags: ["SFTP", "PGP", "Reconciliation"],
  },
  {
    title: "Portfolio Analytics APIs",
    blurb:
      "Distributor performance, portfolio growth, company drill-downs and industry/brand productivity with AUM, utilization and delinquency.",
    tags: ["DRF", "PostgreSQL", "Analytics"],
  },
  {
    title: "Fraud & Deduplication Framework",
    blurb:
      "Flags suspicious borrower relationships and repeat applications using Business PAN, CIBIL history and organizational history.",
    tags: ["Data Analysis", "Risk", "Python"],
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
  { group: "Data & Caching", items: ["PostgreSQL", "MySQL", "Redis"] },
  { group: "Cloud & DevOps", items: ["AWS (EC2, S3)", "Docker", "CI/CD"] },
  { group: "AI & Automation", items: ["OCR", "LLMs", "OpenAI API", "Async Processing"] },
  {
    group: "Engineering",
    items: ["Microservices", "Distributed Systems", "System Design", "REST API Design", "Database Optimization"],
  },
  { group: "Tools", items: ["Git", "Jira", "Postman"] },
];

export const impact: Stat[] = [
  { value: "35% → 85%+", label: "OCR + LLM invoice extraction success" },
  { value: "7", label: "Django services with TOTP admin auth" },
  { value: "TODO", label: "AUM / portfolio size managed", todo: true },
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
