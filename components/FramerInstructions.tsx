"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./FramerInstructions.module.css";

type FramerInstructionsProps = {
  buttonClassName?: string;
};

function HelpIcon() {
  return (
    <svg className={styles.buttonIcon} viewBox="0 0 16 16" aria-hidden="true" fill="none">
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6.2 6.15C6.35 5.2 7.08 4.65 8 4.65C8.98 4.65 9.75 5.35 9.75 6.3C9.75 7.45 8.35 7.55 8.35 8.75V8.9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="8" cy="11.15" r="0.75" fill="currentColor" />
    </svg>
  );
}

export default function FramerInstructions({
  buttonClassName,
}: FramerInstructionsProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        className={buttonClassName ?? styles.triggerButton}
        onClick={() => setOpen(true)}
        title="How to add to Framer"
      >
        <HelpIcon />
        Framer guide
      </button>

      {open ? (
        <div className={styles.overlay} onClick={close} role="presentation">
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="framer-instructions-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 id="framer-instructions-title" className={styles.modalTitle}>
                How to add to Framer
              </h2>
              <button
                type="button"
                className={styles.closeButton}
                onClick={close}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <ol className={styles.list}>
              <li>
                Tune the fluid in the configurator, then click{" "}
                <strong>Copy for Framer</strong>.
              </li>
              <li>
                In Framer, open <strong>Assets → Code</strong> and create a new
                Code Component.
              </li>
              <li>Paste the copied code into the component file.</li>
              <li>
                When Framer prompts for dependencies, install{" "}
                <code>webgl-fluid-enhanced</code>.
              </li>
              <li>
                Drag the component onto your canvas and set its width and height
                to fill the frame or section you want.
              </li>
              <li>
                Preview the site and move your cursor over the component to see
                the hover swirl.
              </li>
            </ol>
          </div>
        </div>
      ) : null}
    </>
  );
}
