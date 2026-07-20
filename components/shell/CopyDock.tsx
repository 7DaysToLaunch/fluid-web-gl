"use client";

import { useCallback, useState } from "react";
import FramerInstructions from "@/components/FramerInstructions";
import GitHubLink from "@/components/GitHubLink";
import ThemeToggle from "@/components/ThemeToggle";
import styles from "./CopyDock.module.css";

export type CopyDockExports = {
  buildReact: () => string;
  buildFramer: () => string;
  buildVanilla: () => string;
  buildShareUrl: () => string;
};

type CopyDockProps = {
  exports: CopyDockExports;
};

type CopyTarget = "react" | "framer" | "vanilla" | "share" | null;

function ReactIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true" fill="none">
      <circle cx="8" cy="8" r="1.15" fill="currentColor" />
      <ellipse cx="8" cy="8" rx="5.75" ry="2.1" stroke="currentColor" strokeWidth="1.2" />
      <ellipse
        cx="8"
        cy="8"
        rx="5.75"
        ry="2.1"
        stroke="currentColor"
        strokeWidth="1.2"
        transform="rotate(60 8 8)"
      />
      <ellipse
        cx="8"
        cy="8"
        rx="5.75"
        ry="2.1"
        stroke="currentColor"
        strokeWidth="1.2"
        transform="rotate(120 8 8)"
      />
    </svg>
  );
}

function FramerIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      role="img"
    >
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true" fill="none">
      <path
        d="M5.75 4.75L3 8l2.75 3.25M10.25 4.75 13 8l-2.75 3.25"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true" fill="none">
      <path
        d="M6.75 9.25 9.25 6.75M7.5 5.5l1.35-1.35a2.25 2.25 0 0 1 3.18 3.18L9.75 9M8.5 10.5 7.15 11.85a2.25 2.25 0 0 1-3.18-3.18L6.25 7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CopyDock({ exports }: CopyDockProps) {
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
          onClick={() => copy("react", exports.buildReact())}
        >
          <ReactIcon />
          {copied === "react" ? "Copied!" : "React"}
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.secondary}`}
          onClick={() => copy("framer", exports.buildFramer())}
        >
          <FramerIcon />
          {copied === "framer" ? "Copied!" : "Framer"}
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.secondary}`}
          onClick={() => copy("vanilla", exports.buildVanilla())}
        >
          <CodeIcon />
          {copied === "vanilla" ? "Copied!" : "Vanilla"}
        </button>
      </div>

      <button
        type="button"
        className={`${styles.button} ${styles.secondary}`}
        onClick={() => copy("share", exports.buildShareUrl())}
      >
        <LinkIcon />
        {copied === "share" ? "Copied!" : "Share link"}
      </button>

      <FramerInstructions buttonClassName={`${styles.button} ${styles.ghost}`} />

      <span className={styles.divider} aria-hidden="true" />

      <div className={styles.group}>
        <ThemeToggle className={`${styles.iconButton} ${styles.ghost}`} />
        <GitHubLink className={`${styles.iconButton} ${styles.ghost}`} />
      </div>
    </div>
  );
}