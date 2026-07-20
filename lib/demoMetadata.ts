import type { Metadata } from "next";

const SITE_URL = "https://smokey-five.vercel.app";

export function createFluidMetadata(): Metadata {
  return {
    title: "Fluid Animation — WebGL background you can copy",
    description:
      "A configurable WebGL fluid simulation with presets, share links, and React, Framer, and vanilla export.",
    openGraph: {
      title: "Fluid Animation",
      description:
        "Hover to swirl the fluid, tune the look, then copy the code or share your exact configuration.",
      url: SITE_URL,
      siteName: "Fluid Animation",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Fluid Animation",
      description:
        "Configurable WebGL fluid with presets, share links, and copy-paste export.",
    },
  };
}
