import {
  cloneFluidConfig,
  defaultFluidConfig,
  type FluidConfig,
} from "@/demos/fluid/config";

export type FluidPreset = {
  id: string;
  name: string;
  description: string;
  swatches: string[];
  config: FluidConfig;
};

function preset(
  id: string,
  name: string,
  description: string,
  config: FluidConfig,
): FluidPreset {
  const merged = cloneFluidConfig({ ...defaultFluidConfig, ...config });
  const palette = merged.colorPalette ?? defaultFluidConfig.colorPalette!;

  return {
    id,
    name,
    description,
    swatches: [
      merged.backgroundColor ?? defaultFluidConfig.backgroundColor!,
      ...palette.slice(0, 4),
    ],
    config: merged,
  };
}

export const fluidPresets: FluidPreset[] = [
  preset("default", "Purple Haze", "Balanced glow for hero sections.", {}),
  preset("neon", "Neon Pulse", "High bloom and curl for bold landing pages.", {
    backgroundColor: "#050505",
    colorPalette: ["#0a0a0a", "#120033", "#00d4ff", "#ff00aa", "#ffe600"],
    curl: 42,
    splatForce: 8500,
    bloomIntensity: 1,
    bloomThreshold: 0.45,
    sunraysWeight: 0.85,
    colorUpdateSpeed: 18,
  }),
  preset("ember", "Ember", "Warm, slow dissipation for editorial layouts.", {
    backgroundColor: "#0f0705",
    colorPalette: ["#2a1208", "#5c1f0a", "#ff6a00", "#ff9a3c", "#ffd166"],
    densityDissipation: 0.6,
    velocityDissipation: 0.08,
    curl: 18,
    splatRadius: 0.35,
    bloomIntensity: 0.65,
    sunrays: false,
    colorUpdateSpeed: 6,
  }),
  preset("ocean", "Ocean", "Cool and calm for SaaS backgrounds.", {
    backgroundColor: "#041018",
    colorPalette: ["#062033", "#0a3d5c", "#1ec8ff", "#4fd1c5", "#a7f3d0"],
    curl: 12,
    splatForce: 4500,
    densityDissipation: 1.4,
    velocityDissipation: 0.35,
    bloomIntensity: 0.55,
    sunraysWeight: 0.5,
    colorUpdateSpeed: 8,
  }),
  preset("ink", "Midnight Ink", "Moody monochrome with subtle motion.", {
    backgroundColor: "#050505",
    colorPalette: ["#101010", "#1a1a1a", "#333333", "#555555", "#888888"],
    colorful: false,
    bloom: false,
    sunrays: false,
    curl: 8,
    splatForce: 3200,
    splatRadius: 0.18,
    densityDissipation: 1.8,
    brightness: 0.35,
  }),
  preset("ghost", "Ghost Overlay", "Transparent background for text on top.", {
    backgroundColor: "#000000",
    transparent: true,
    colorPalette: ["#1a1a1a", "#333333", "#666666", "#999999", "#cccccc"],
    bloomIntensity: 0.35,
    sunrays: false,
    splatForce: 3800,
    densityDissipation: 1.2,
    brightness: 0.4,
  }),
  preset("aurora", "Aurora", "Soft greens and violets for creative portfolios.", {
    backgroundColor: "#050810",
    colorPalette: ["#0b1f1a", "#123524", "#2dd4bf", "#7c3aed", "#c4b5fd"],
    curl: 26,
    splatRadius: 0.3,
    bloomIntensity: 0.75,
    sunraysWeight: 0.7,
    colorUpdateSpeed: 12,
  }),
  preset("minimal", "Minimal Drift", "Quiet motion with effects dialed back.", {
    backgroundColor: "#111111",
    colorPalette: ["#1f1f1f", "#2a2a2a", "#444444", "#666666", "#9470ff"],
    bloom: false,
    sunrays: false,
    shading: false,
    curl: 6,
    splatForce: 2200,
    splatRadius: 0.15,
    densityDissipation: 2.2,
    velocityDissipation: 0.5,
    colorUpdateSpeed: 4,
  }),
];
