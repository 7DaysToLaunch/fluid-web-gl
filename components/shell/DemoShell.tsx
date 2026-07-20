import type { ReactNode } from "react";
import CopyDock, { type CopyDockExports } from "@/components/shell/CopyDock";
import styles from "./DemoShell.module.css";

type DemoShellProps = {
  title: string;
  description: string;
  badge?: string;
  configurator: ReactNode;
  preview: ReactNode;
  copyExports: CopyDockExports;
};

export default function DemoShell({
  title,
  description,
  badge = "Free",
  configurator,
  preview,
  copyExports,
}: DemoShellProps) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>{title}</h1>
          <span className={styles.badge}>{badge}</span>
        </div>
        <p className={styles.description}>{description}</p>
      </header>

      <div className={styles.demoGrid}>
        {configurator}
        <div className={styles.preview}>{preview}</div>
      </div>

      <div className={styles.copyDock}>
        <CopyDock exports={copyExports} />
      </div>
    </div>
  );
}
