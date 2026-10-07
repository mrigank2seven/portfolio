"use client";

import { Download, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { navSections, profile } from "@/content/site";
import { usePalette } from "./PaletteContext";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setOpen: setPaletteOpen } = usePalette();

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-bg/70 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link href="/#about" className="flex items-center gap-2 text-sm font-semibold">
          <span className="grid size-6 place-items-center rounded-md bg-cta font-mono text-[10px] text-cta-fg">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-6 text-sm text-muted lg:flex">
          {navSections.map((s) => (
            <li key={s.id}>
              <Link href={`/#${s.id}`} className="transition-colors hover:text-fg">
                {s.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="hidden items-center gap-2 rounded-md border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:text-fg sm:flex"
          >
            <Search className="size-3.5" />
            Search
            <kbd className="font-mono">⌘K</kbd>
          </button>
          <ThemeToggle />
          <a
            href={profile.resume}
            download
            className="hidden items-center gap-2 rounded-full bg-cta px-4 py-2 text-sm font-medium text-cta-fg transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Resume
            <Download className="size-4" />
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="grid size-9 place-items-center rounded-md border border-line text-muted lg:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul className="border-t border-line bg-bg px-4 py-2 lg:hidden">
          {navSections.map((s) => (
            <li key={s.id}>
              <Link
                href={`/#${s.id}`}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 text-sm text-muted hover:text-fg"
              >
                {s.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setPaletteOpen(true);
              }}
              className="block w-full py-2.5 text-left text-sm text-muted hover:text-fg"
            >
              Search…
            </button>
          </li>
        </ul>
      )}
    </header>
  );
}
