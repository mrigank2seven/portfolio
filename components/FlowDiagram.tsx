"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { Diagram } from "@/content/site";

const NODE_W = 132;
const NODE_H = 40;

export default function FlowDiagram({ diagram }: { diagram: Diagram }) {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(diagram.nodes[0].id);
  const byId = new Map(diagram.nodes.map((n) => [n.id, n]));
  const active = byId.get(activeId) ?? diagram.nodes[0];

  return (
    <div>
      <svg
        viewBox="0 0 800 300"
        role="group"
        aria-label={diagram.title}
        className="w-full"
      >
        {diagram.edges.map(([a, b], i) => {
          const from = byId.get(a);
          const to = byId.get(b);
          if (!from || !to) return null;
          const isHot = a === activeId || b === activeId;
          return (
            <g key={`${a}-${b}`}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                strokeWidth={isHot ? 2 : 1.5}
                strokeDasharray="4 4"
                className={isHot ? "stroke-accent" : "stroke-line"}
              />
              {!reduce && (
                <motion.circle
                  r={3.5}
                  className="fill-accent"
                  initial={{ cx: from.x, cy: from.y, opacity: 0 }}
                  animate={{
                    cx: [from.x, to.x],
                    cy: [from.y, to.y],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.35,
                  }}
                />
              )}
            </g>
          );
        })}

        {diagram.nodes.map((n) => (
          <g
            key={n.id}
            tabIndex={0}
            role="button"
            aria-label={`${n.label}: ${n.desc}`}
            onMouseEnter={() => setActiveId(n.id)}
            onFocus={() => setActiveId(n.id)}
            onClick={() => setActiveId(n.id)}
            className="cursor-pointer outline-none"
          >
            <rect
              x={n.x - (n.w ?? NODE_W) / 2}
              y={n.y - NODE_H / 2}
              width={n.w ?? NODE_W}
              height={NODE_H}
              rx={8}
              strokeWidth={1.5}
              className={n.id === activeId ? "fill-surface stroke-accent" : "fill-surface stroke-line"}
            />
            <text
              x={n.x}
              y={n.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={12}
              className="fill-fg font-mono"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-4 rounded-lg border border-line bg-surface p-4" aria-live="polite">
        <p className="font-mono text-sm text-accent">{active.label}</p>
        <p className="mt-1 text-sm text-muted">{active.desc}</p>
      </div>
    </div>
  );
}
