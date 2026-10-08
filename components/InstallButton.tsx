"use client";

import { Smartphone } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
};

const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

const isIos = () => {
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (ua.includes("Macintosh") && navigator.maxTouchPoints > 1);
};

const noopSubscribe = () => () => {};
const needsIosHint = () => isIos() && !isStandalone();

export default function InstallButton() {
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null);
  const [showHint, setShowHint] = useState(false);
  const ios = useSyncExternalStore(noopSubscribe, needsIosHint, () => false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e as InstallPromptEvent);
    };
    const onInstalled = () => setPromptEvent(null);

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!promptEvent && !ios) return null;

  const install = async () => {
    if (!promptEvent) {
      setShowHint((h) => !h);
      return;
    }
    await promptEvent.prompt();
    // a prompt event can only be used once, whatever the user chose
    setPromptEvent(null);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={install}
        aria-label="Install app"
        className="grid size-9 place-items-center rounded-md border border-line text-muted transition-colors hover:text-fg"
      >
        <Smartphone className="size-4" />
      </button>
      {showHint && (
        <p
          role="status"
          className="absolute right-0 top-11 w-56 rounded-md border border-line bg-bg p-3 text-xs text-muted"
        >
          Tap the Share button, then “Add to Home Screen” to install.
        </p>
      )}
    </div>
  );
}
