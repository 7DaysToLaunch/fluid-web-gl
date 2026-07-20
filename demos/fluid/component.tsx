"use client";

import { useEffect, useRef } from "react";
import WebGLFluidEnhanced from "webgl-fluid-enhanced";
import {
  defaultFluidConfig,
  INITIAL_SPLATS,
  type FluidConfig,
} from "@/demos/fluid/config";

type FluidBackgroundProps = {
  className?: string;
  config?: FluidConfig;
};

export default function FluidBackground({
  className,
  config = defaultFluidConfig,
}: FluidBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fluidRef = useRef<WebGLFluidEnhanced | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const fluid = new WebGLFluidEnhanced(container);
    fluidRef.current = fluid;
    fluid.setConfig({ ...defaultFluidConfig, ...config });
    fluid.start();
    fluid.multipleSplats(INITIAL_SPLATS);

    return () => {
      fluid.stop();
      fluidRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fluidRef.current?.setConfig({ ...defaultFluidConfig, ...config });
  }, [config]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
    />
  );
}
