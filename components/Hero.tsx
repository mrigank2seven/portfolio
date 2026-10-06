"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { profile } from "@/content/site";
import Highlight from "./Highlight";

const terminalLines = [
  { prompt: true, text: "whoami" },
  { prompt: false, text: `${profile.name.toLowerCase()}, ${profile.role.toLowerCase()} @ ${profile.company.toLowerCase()}` },
  { prompt: true, text: "cat stack.txt" },
  { prompt: false, text: "python · django · drf · celery · postgres · aws" },
  { prompt: true, text: "ls impact/" },
  { prompt: false, text: "ocr-llm-pipeline  loan-eligibility  totp-auth  pg-tuning" },
];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="relative mx-auto grid max-w-5xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted">
              <MapPin className="size-3.5 text-accent" />
              {profile.location}
            </p>
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-surface px-3 py-1 font-mono text-xs text-fg">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-green-400" />
              </span>
              {profile.availability}
            </p>
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
            Building scalable{" "}
            <span className="text-accent">fintech backends.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted"><Highlight text={profile.tagline} /></p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
            >
              <Download className="size-4" />
              Download resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent"
            >
              Get in touch
              <ArrowDown className="size-4" />
            </a>
          </div>
        </div>

        <div
          className="rounded-xl border border-line bg-surface/80 shadow-2xl backdrop-blur"
          aria-label="Terminal summary"
        >
          <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
            <span className="size-2.5 rounded-full bg-red-400/70" />
            <span className="size-2.5 rounded-full bg-yellow-400/70" />
            <span className="size-2.5 rounded-full bg-green-400/70" />
            <span className="ml-3 font-mono text-xs text-muted">~/mrigank</span>
          </div>
          <div className="space-y-1.5 p-4 font-mono text-[13px] leading-relaxed">
            {terminalLines.map((line, i) => (
              <motion.p
                key={i}
                initial={reduce ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.35, duration: 0.3 }}
                className={line.prompt ? "text-fg" : "pl-4 text-muted"}
              >
                {line.prompt && <span className="mr-2 text-accent">$</span>}
                {line.text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
