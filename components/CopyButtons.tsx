"use client";

import { useCallback, useState } from "react";
import { buildFramerExport } from "@/lib/buildFramerExport";
import { buildReactExport } from "@/lib/buildReactExport";
import type { FluidConfig } from "@/lib/fluidConfig";
import styles from "./CopyButtons.module.css";

type CopyButtonsProps = {
  config: FluidConfig;
};

type CopyTarget = "react" | "framer" | null;

export default function CopyButtons({ config }: CopyButtonsProps) {
  const [copied, setCopied] = useState<CopyTarget>(null);

  const copy = useCallback(
    async (target: CopyTarget, text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(target);
        window.setTimeout(() => setCopied(null), 2000);
      } catch {
        setCopied(null);
      }
    },
    [],
  );

  return (
    <div className={styles.row}>
      <button
        type="button"
        className={styles.primaryButton}
        onClick={() => copy("react", buildReactExport(config))}
      >
        {copied === "react" ? "Copied!" : "Copy for React"}
      </button>
      <button
        type="button"
        className={styles.secondaryButton}
        onClick={() => copy("framer", buildFramerExport(config))}
      >
        {copied === "framer" ? "Copied!" : "Copy for Framer"}
      </button>
    </div>
  );
}
