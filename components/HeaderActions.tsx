"use client";

import { useCallback, useState } from "react";
import { buildFramerExport } from "@/lib/buildFramerExport";
import { buildReactExport } from "@/lib/buildReactExport";
import { buildVanillaExport } from "@/lib/buildVanillaExport";
import type { FluidConfig } from "@/lib/fluidConfig";
import FramerInstructions from "@/components/FramerInstructions";
import GitHubLink from "@/components/GitHubLink";
import styles from "./HeaderActions.module.css";

type HeaderActionsProps = {
  config: FluidConfig;
};

type CopyTarget = "react" | "framer" | "vanilla" | null;

function CopyIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true" fill="none">
      <path
        d="M5.5 2.75H3.75C2.92 2.75 2.25 3.42 2.25 4.25V12.25C2.25 13.08 2.92 13.75 3.75 13.75H10.75C11.58 13.75 12.25 13.08 12.25 12.25V10.5M5.5 2.75H11.25C12.08 2.75 12.75 3.42 12.75 4.25V9.5M5.5 2.75V4.25C5.5 5.08 6.17 5.75 7 5.75H12.75"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HeaderActions({ config }: HeaderActionsProps) {
  const [copied, setCopied] = useState<CopyTarget>(null);

  const copy = useCallback(async (target: CopyTarget, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(target);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }, []);

  return (
    <div className={styles.toolbar}>
      <div className={styles.group}>
        <button
          type="button"
          className={`${styles.button} ${styles.primary}`}
          onClick={() => copy("react", buildReactExport(config))}
        >
          <CopyIcon />
          {copied === "react" ? "Copied!" : "React"}
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.secondary}`}
          onClick={() => copy("framer", buildFramerExport(config))}
        >
          <CopyIcon />
          {copied === "framer" ? "Copied!" : "Framer"}
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.secondary}`}
          onClick={() => copy("vanilla", buildVanillaExport(config))}
        >
          <CopyIcon />
          {copied === "vanilla" ? "Copied!" : "Vanilla"}
        </button>
      </div>

      <span className={styles.divider} aria-hidden="true" />

      <div className={styles.group}>
        <FramerInstructions buttonClassName={`${styles.button} ${styles.ghost}`} />
        <GitHubLink className={`${styles.iconButton} ${styles.ghost}`} />
      </div>
    </div>
  );
}
