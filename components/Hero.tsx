"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { profile } from "@/content/site";
import Highlight from "./Highlight";
import LogoMarquee from "./LogoMarquee";
import ParticleCanvas from "./ParticleCanvas";

export default function Hero() {
  const reduce = useReducedMotion();
  const fadeUp = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5, ease: "easeOut" as const },
  });

  return (
    <section className="relative flex min-h-[calc(100svh-3.5rem)] flex-col overflow-hidden border-b border-line">
      <ParticleCanvas />
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-4 pb-8 pt-20 text-center sm:px-6">
        <motion.h1
          {...fadeUp(0.1)}
          className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Building scalable{" "}
          <span className="text-accent">fintech backends.</span>
        </motion.h1>
        <motion.p
          {...fadeUp(0.2)}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
        >
          <Highlight text={profile.tagline} />
        </motion.p>
        <motion.div
          {...fadeUp(0.3)}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={profile.resume}
            download
            className="inline-flex items-center gap-2 rounded-full bg-cta px-8 py-3.5 font-medium text-cta-fg shadow-sm transition-transform hover:scale-105 hover:shadow-lg"
          >
            <Download className="size-4" />
            Download resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/60 px-8 py-3.5 font-medium backdrop-blur transition-colors hover:border-fg"
          >
            Get in touch
            <ArrowDown className="size-4" />
          </a>
        </motion.div>
        <motion.p
          {...fadeUp(0.4)}
          className="mt-8 inline-flex items-center gap-2 font-mono text-xs text-muted"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-green-400" />
          </span>
          {profile.availability}
        </motion.p>
      </div>
      <motion.div {...fadeUp(0.5)} className="relative z-10">
        <LogoMarquee />
      </motion.div>
    </section>
  );
}
