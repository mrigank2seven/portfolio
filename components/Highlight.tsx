import { Fragment } from "react";

const TERMS = [
  "Python",
  "Django REST Framework",
  "Django",
  "DRF",
  "Celery",
  "PostgreSQL",
  "AWS",
  "REST APIs",
  "microservices",
  "OCR",
  "LLM",
  "TOTP",
  "IRN/e-invoice",
  "e-invoice",
  "retry/backoff",
  "CIBIL",
  "GSTIN",
  "Business PAN",
  "PGP-encrypted SFTP",
  "Aadhaar",
  "LMS",
  "LOS",
  "ERP",
  "UMS",
  "LedgerParser",
  "ElapDB",
  "AUM",
  "fraud analytics",
  "deduplication",
  "concurrent index migrations",
];

const METRICS = String.raw`\d+(?:\.\d+)?%\+?|\d+\+ years`;

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");

const PATTERN = new RegExp(
  `(?<![\\w])(${[...TERMS].sort((a, b) => b.length - a.length).map(escape).join("|")}|${METRICS})(?![\\w])`,
  "g",
);

export default function Highlight({ text }: { text: string }) {
  const parts = text.split(PATTERN);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-medium text-accent">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
