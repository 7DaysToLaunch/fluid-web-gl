"use client";

import { useState } from "react";
import FluidBackground from "@/components/FluidBackground";
import FluidConfigurator from "@/components/FluidConfigurator";
import CopyButtons from "@/components/CopyButtons";
import FramerInstructions from "@/components/FramerInstructions";
import {
  cloneFluidConfig,
  defaultFluidConfig,
} from "@/lib/defaultFluidConfig";
import styles from "@/app/page.module.css";

export default function FluidDemo() {
  const [config, setConfig] = useState(() => cloneFluidConfig(defaultFluidConfig));

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Fluid Animation</h1>
          <span className={styles.badge}>Free</span>
        </div>
        <p className={styles.description}>
          A WebGL fluid animation component that solves the
          Navier-Stokes equations for incompressible flow. Hover over the
          preview to inject light and swirl the fluid, then tune the look below.
        </p>
        <CopyButtons config={config} />
        <FramerInstructions />
      </header>

      <div className={styles.demoGrid}>
        <div className={styles.preview}>
          <FluidBackground config={config} />
        </div>
        <FluidConfigurator config={config} onChange={setConfig} />
      </div>
    </div>
  );
}
