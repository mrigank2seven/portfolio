"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { navSections, profile } from "@/content/site";
import { toggleTheme } from "./ThemeToggle";

const itemClass =
  "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm text-muted data-[selected=true]:bg-accent/10 data-[selected=true]:text-fg";

function Item({ children, onSelect }: { children: ReactNode; onSelect: () => void }) {
  return (
    <Command.Item onSelect={onSelect} className={itemClass}>
      {children}
    </Command.Item>
  );
}

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  const run = (fn: () => void | Promise<void>) => () => {
    setOpen(false);
    void fn();
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setToast("Email copied");
    } catch {
      setToast("Couldn't copy email");
    }
  };

  return (
    <>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command palette"
        overlayClassName="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        contentClassName="fixed left-1/2 top-[18%] z-50 w-[92vw] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-line bg-surface shadow-2xl"
      >
        <Command.Input
          placeholder="Type a command or search…"
          className="w-full border-b border-line bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted"
        />
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-muted">
            No results.
          </Command.Empty>
          <Command.Group
            heading="Go to"
            className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-muted"
          >
            {navSections.map((s) => (
              <Item key={s.id} onSelect={run(() => router.push(`/#${s.id}`))}>
                {s.label}
              </Item>
            ))}
          </Command.Group>
          <Command.Group
            heading="Actions"
            className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-muted"
          >
            <Item onSelect={run(copyEmail)}>Copy email</Item>
            <Item
              onSelect={run(() => {
                window.open(profile.resume, "_blank");
              })}
            >
              Download resume
            </Item>
            <Item
              onSelect={run(() => {
                window.open(profile.linkedin, "_blank", "noopener");
              })}
            >
              Open LinkedIn
            </Item>
            <Item onSelect={run(toggleTheme)}>Toggle theme</Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-md border border-line bg-surface px-4 py-2 text-sm shadow-lg"
        >
          {toast}
        </div>
      )}
    </>
  );
}
