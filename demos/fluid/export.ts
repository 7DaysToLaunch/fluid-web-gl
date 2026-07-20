import type { FluidConfig } from "@/demos/fluid/config";

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

export function buildVanillaExport(config: FluidConfig): string {
  const serialized = JSON.stringify(config, null, 2);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Fluid Background</title>
    <style>
      html,
      body {
        margin: 0;
        height: 100%;
        background: #000000;
      }

      #fluid {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <div id="fluid"></div>

    <script type="module">
      import WebGLFluidEnhanced from "https://esm.sh/webgl-fluid-enhanced";

      const fluidConfig = ${serialized};
      const INITIAL_SPLATS = 5;

      const container = document.getElementById("fluid");
      if (!container) throw new Error("Missing #fluid container");

      const fluid = new WebGLFluidEnhanced(container);
      fluid.setConfig(fluidConfig);
      fluid.start();
      fluid.multipleSplats(INITIAL_SPLATS);
    </script>
  </body>
</html>
`;
}
