import type { FluidConfig } from "@/lib/fluidConfig";

export function buildFramerExport(config: FluidConfig): string {
  const serialized = JSON.stringify(config, null, 2);

  return `import { useEffect, useRef } from "react";
import WebGLFluidEnhanced from "webgl-fluid-enhanced";

const fluidConfig = ${serialized};

export default function FluidAnimation() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const fluid = new WebGLFluidEnhanced(container);
    fluid.setConfig(fluidConfig);
    fluid.start();
    fluid.multipleSplats(5);

    return () => {
      fluid.stop();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
    />
  );
}
`;
}
