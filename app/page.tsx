import { Suspense } from "react";
import type { Metadata } from "next";
import FluidDemoPage from "@/demos/fluid/page";
import { createFluidMetadata } from "@/lib/demoMetadata";

export const metadata: Metadata = createFluidMetadata();

export default function Home() {
  return (
    <Suspense fallback={null}>
      <FluidDemoPage />
    </Suspense>
  );
}
