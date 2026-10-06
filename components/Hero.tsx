"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import { profile } from "@/content/site";

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
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative overflow-hidden border-b border-line"
    >
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(500px circle at var(--mx, 50%) var(--my, 30%), var(--glow), transparent 60%)",
        }}
      />
      <div className="relative mx-auto grid max-w-5xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted">
            <MapPin className="size-3.5 text-accent" />
            {profile.location}
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
            Building scalable{" "}
            <span className="text-accent">fintech backends.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.tagline}</p>
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
