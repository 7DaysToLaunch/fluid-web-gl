"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import DemoShell from "@/components/shell/DemoShell";
import FluidBackground from "@/demos/fluid/component";
import FluidConfigurator from "@/demos/fluid/configurator";
import { decodeFluidConfig } from "@/demos/fluid/codec";
import {
  cloneFluidConfig,
  defaultFluidConfig,
  viralFluidConfig,
  type FluidConfig,
} from "@/demos/fluid/config";
import {
  buildFramerExport,
  buildReactExport,
  buildVanillaExport,
} from "@/demos/fluid/export";
import { buildShareUrl } from "@/lib/configCodec";
import { useShareableConfig } from "@/lib/useShareableConfig";

const DEMO_PATH = "/";

export default function FluidDemoPage() {
  const pathname = usePathname();
  const [config, setConfig] = useShareableConfig<FluidConfig>({
    defaults: cloneFluidConfig({ ...defaultFluidConfig, ...viralFluidConfig }),
    clone: cloneFluidConfig,
    decode: decodeFluidConfig,
  });

  const copyExports = useMemo(
    () => ({
      buildReact: () => buildReactExport(config),
      buildFramer: () => buildFramerExport(config),
      buildVanilla: () => buildVanillaExport(config),
      buildShareUrl: () => buildShareUrl(pathname || DEMO_PATH, config),
    }),
    [config, pathname],
  );

  return (
    <DemoShell
      title="Fluid Animation"
      description="A WebGL fluid animation component that solves the Navier-Stokes equations for incompressible flow. Start from a preset, hover the preview to swirl the fluid, then copy code or share your exact configuration."
      configurator={<FluidConfigurator config={config} onChange={setConfig} />}
      preview={<FluidBackground config={config} />}
      copyExports={copyExports}
    />
  );
}
