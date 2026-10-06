"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type PaletteState = {
  open: boolean;
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
};

const PaletteContext = createContext<PaletteState | null>(null);

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);
  return <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>;
}

export function usePalette(): PaletteState {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error("usePalette must be used inside <PaletteProvider>");
  return ctx;
}
