"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { diagrams } from "@/content/site";
import Highlight from "./Highlight";
import { Section } from "./ui";

const FlowDiagram = dynamic(() => import("./FlowDiagram"), {
  loading: () => <div aria-hidden className="aspect-[8/3] w-full" />,
});

export default function Architecture() {
  const [activeId, setActiveId] = useState(diagrams[0].id);
  const active = diagrams.find((d) => d.id === activeId) ?? diagrams[0];

  return (
    <Section id="architecture" eyebrow="architecture" title="How the Systems Fit Together">
      <p className="-mt-4 mb-6 max-w-2xl text-muted">
        Simplified views of systems I&apos;ve built. Pick a diagram, then hover or tap a step to see what it does.
      </p>
      <div role="tablist" aria-label="Architecture diagrams" className="flex flex-wrap gap-2">
        {diagrams.map((d) => (
          <button
            key={d.id}
            type="button"
            role="tab"
            id={`tab-${d.id}`}
            aria-selected={d.id === activeId}
            aria-controls="diagram-panel"
            onClick={() => setActiveId(d.id)}
            className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors ${
              d.id === activeId
                ? "border-accent bg-accent/10 text-accent"
                : "border-line text-muted hover:text-fg"
            }`}
          >
            {d.tab}
          </button>
        ))}
      </div>

      <div
        id="diagram-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
        className="mt-6 rounded-xl border border-line bg-surface/60 p-4 sm:p-6"
      >
        <h3 className="font-semibold">{active.title}</h3>
        <p className="mt-1 text-sm text-muted"><Highlight text={active.summary} /></p>
        <div className="mt-4">
          <FlowDiagram key={active.id} diagram={active} />
        </div>
      </div>
    </Section>
  );
}
