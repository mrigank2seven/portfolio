"use client";

import { useEffect, useRef } from "react";

const DESKTOP_COUNT = 140;
const MOBILE_COUNT = 70;
const MOBILE_WIDTH = 640;
const MIN_SPEED = 0.3;
const MAX_SPEED = 1;
const DRAG = 0.9995;
const DRIFT = 0.012;
const POINTER_RADIUS = 160;
const POINTER_FORCE = 0.9;
const EDGE_MARGIN = 20;
const BURST_SPREAD = 0.04;
const MIN_SIZE = 1.2;
const MAX_SIZE = 3;

const ACCENTS = ["#60a5fa", "#a78bfa", "#f87171"] as const;
const SPECK_CHANCE = 0.2;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string | null;
};

const spawn = (width: number, height: number): Particle => {
  const angle = Math.random() * Math.PI * 2;
  const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
  const radius = Math.random() * Math.min(width, height) * BURST_SPREAD;
  return {
    x: width / 2 + Math.cos(angle) * radius,
    y: height / 2 + Math.sin(angle) * radius,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
    color:
      Math.random() < SPECK_CHANCE
        ? null
        : ACCENTS[Math.floor(Math.random() * ACCENTS.length)],
  };
};

const isOutside = (p: Particle, width: number, height: number) =>
  p.x < -EDGE_MARGIN ||
  p.x > width + EDGE_MARGIN ||
  p.y < -EDGE_MARGIN ||
  p.y > height + EDGE_MARGIN;

const advance = (
  p: Particle,
  width: number,
  height: number,
  pointer: { x: number; y: number } | null,
): Particle => {
  let vx = p.vx * DRAG + (Math.random() - 0.5) * DRIFT;
  let vy = p.vy * DRAG + (Math.random() - 0.5) * DRIFT;

  if (pointer) {
    const dx = p.x - pointer.x;
    const dy = p.y - pointer.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 0 && dist < POINTER_RADIUS) {
      const push = (1 - dist / POINTER_RADIUS) * POINTER_FORCE;
      vx += (dx / dist) * push;
      vy += (dy / dist) * push;
    }
  }

  const next = { ...p, x: p.x + vx, y: p.y + vy, vx, vy };
  return isOutside(next, width, height) ? spawn(width, height) : next;
};

export default function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let pointer: { x: number; y: number } | null = null;
    let speckColor = "#111111";
    let frame = 0;
    let isVisible = true;

    const readSpeckColor = () => {
      speckColor = getComputedStyle(root).getPropertyValue("--fg").trim() || speckColor;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.globalAlpha = p.color ? 0.85 : 0.35;
        ctx.fillStyle = p.color ?? speckColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      particles = particles.map((p) => advance(p, width, height, pointer));
      draw();
      frame = isVisible ? requestAnimationFrame(step) : 0;
    };

    const start = () => {
      if (reduceMotion || frame || !isVisible) return;
      frame = requestAnimationFrame(step);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < MOBILE_WIDTH ? MOBILE_COUNT : DESKTOP_COUNT;
      const reach = Math.hypot(width, height) / 2;
      particles = Array.from({ length: count }, () => {
        const p = spawn(width, height);
        const speed = Math.hypot(p.vx, p.vy);
        const travel = (Math.random() * reach) / speed;
        return { ...p, x: p.x + p.vx * travel, y: p.y + p.vy * travel };
      });
      draw();
    };

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      pointer = null;
    };

    readSpeckColor();
    resize();
    start();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      start();
    });
    visibilityObserver.observe(parent);

    const themeObserver = new MutationObserver(() => {
      readSpeckColor();
      if (reduceMotion) draw();
    });
    themeObserver.observe(root, { attributes: true, attributeFilter: ["class"] });

    if (!reduceMotion) {
      window.addEventListener("pointermove", onMove, { passive: true });
      root.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
