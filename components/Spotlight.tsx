"use client";

import { useEffect, useRef } from "react";

const SPACING = 26;
const RING_RADIUS = 240;
const RING_BREATH = 24;
const RING_WIDTH = 200;
const CULL_SCALE = 0.12;
const PILL_LENGTH = 11;
const PILL_THICKNESS = 4.2;
const ANGLE_JITTER = 0.5;
const RING_FOLLOW = 0.12;
const IDLE_MS = 120;
const FADE_IN = 0.2;
const FADE_OUT = 0.06;
const LUT_SIZE = 32;

const PALETTE = ["#2c64ed", "#f84242", "#ffcf03"] as const;

const toRgb = (hex: string) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

const buildLut = (palette: readonly string[]) => {
  const [a, b, c] = palette.map(toRgb);
  return Array.from({ length: LUT_SIZE }, (_, i) => {
    const t = i / (LUT_SIZE - 1);
    const [from, to, k] = t < 0.5 ? [a, b, t * 2] : [b, c, (t - 0.5) * 2];
    const rgb = from.map((v, j) => Math.round(v + (to[j] - v) * k));
    return `rgb(${rgb.join(",")})`;
  });
};

const LUT = buildLut(PALETTE);

const colorNoise = (x: number, y: number, t: number) =>
  (Math.sin(x * 0.007 + t * 0.5) +
    Math.sin(y * 0.009 - t * 0.4) +
    Math.sin((x + y) * 0.005 + t * 0.3)) /
    6 +
  0.5;

const angleNoise = (x: number, y: number, t: number) =>
  Math.sin(x * 0.045 + t * 0.85) * Math.cos(y * 0.04 - t * 0.7);

export default function Spotlight() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = 0;
    let height = 0;
    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let intensity = 0;
    let isMoving = false;
    let frame = 0;
    let idleTimer: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const radius = RING_RADIUS + Math.sin(time) * RING_BREATH;
      const reach = radius + RING_WIDTH * 2.2;
      const x0 = Math.max(0, Math.floor((rx - reach) / SPACING));
      const x1 = Math.ceil((rx + reach) / SPACING);
      const y0 = Math.max(0, Math.floor((ry - reach) / SPACING));
      const y1 = Math.ceil((ry + reach) / SPACING);
      ctx.lineCap = "round";

      for (let gy = y0; gy <= y1; gy++) {
        const rowShift = (gy & 1) * (SPACING / 2);
        for (let gx = x0; gx <= x1; gx++) {
          const px = gx * SPACING + rowShift;
          const py = gy * SPACING;
          const dx = px - rx;
          const dy = py - ry;
          const offset = (Math.hypot(dx, dy) - radius) / RING_WIDTH;
          const scale = Math.exp(-offset * offset);
          if (scale < CULL_SCALE) continue;

          const angle = Math.atan2(dy, dx) + angleNoise(px, py, time) * ANGLE_JITTER;
          const thickness = PILL_THICKNESS * scale;
          const half = Math.max(0, (PILL_LENGTH * scale - thickness) / 2);
          const ux = Math.cos(angle) * half;
          const uy = Math.sin(angle) * half;
          const tone = Math.min(1, Math.max(0, colorNoise(px, py, time)));

          ctx.globalAlpha = intensity * Math.min(1, scale * 1.6);
          ctx.strokeStyle = LUT[Math.round(tone * (LUT_SIZE - 1))];
          ctx.lineWidth = thickness;
          ctx.beginPath();
          ctx.moveTo(px - ux, py - uy);
          ctx.lineTo(px + ux, py + uy);
          ctx.stroke();
        }
      }
    };

    const tick = (now: number) => {
      intensity += ((isMoving ? 1 : 0) - intensity) * (isMoving ? FADE_IN : FADE_OUT);
      if (!isMoving && intensity < 0.01) {
        intensity = 0;
        ctx.clearRect(0, 0, width, height);
        frame = 0;
        return;
      }
      rx += (mx - rx) * RING_FOLLOW;
      ry += (my - ry) * RING_FOLLOW;
      draw(now / 1000);
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!frame) {
        rx = mx;
        ry = my;
      }
      isMoving = true;
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        isMoving = false;
      }, IDLE_MS);
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      isMoving = false;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.clearTimeout(idleTimer);
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
