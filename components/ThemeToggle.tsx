"use client";

import { Moon, Sun } from "lucide-react";

export function toggleTheme() {
  const isLight = document.documentElement.classList.toggle("light");
  try {
    localStorage.setItem("theme", isLight ? "light" : "dark");
  } catch {
    // storage can be blocked; the theme still applies for this visit
  }
}

export default function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="grid size-9 place-items-center rounded-md border border-line text-muted transition-colors hover:text-fg"
    >
      <Sun className="block size-4 light:hidden" />
      <Moon className="hidden size-4 light:block" />
    </button>
  );
}
