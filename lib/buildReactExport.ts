import type { FluidConfig } from "@/lib/fluidConfig";

export function buildReactExport(config: FluidConfig): string {
  const serialized = JSON.stringify(config, null, 2);

  return `// npm install webgl-fluid-enhanced

"use client";

import { useEffect, useRef } from "react";
import WebGLFluidEnhanced from "webgl-fluid-enhanced";

const fluidConfig = ${serialized};
const INITIAL_SPLATS = 5;

type FluidBackgroundProps = {
  className?: string;
};

export default function FluidBackground({ className }: FluidBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fluidRef = useRef<WebGLFluidEnhanced | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const fluid = new WebGLFluidEnhanced(container);
    fluidRef.current = fluid;
    fluid.setConfig(fluidConfig);
    fluid.start();
    fluid.multipleSplats(INITIAL_SPLATS);

    return () => {
      fluid.stop();
      fluidRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
    />
  );
}

// Usage:
// <div style={{ width: "100%", height: "100vh" }}>
//   <FluidBackground />
// </div>
`;
}
