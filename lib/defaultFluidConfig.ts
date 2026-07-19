export const defaultFluidConfig = {
  backgroundColor: "#121212",
  hover: true,
  colorPalette: ["#583c58", "#1e0a58", "#4e3cff", "#583c58", "#8838ff"],
  simResolution: 128,
  dyeResolution: 1024,
  captureResolution: 512,
  densityDissipation: 1,
  velocityDissipation: 0.2,
  pressure: 0.8,
  pressureIterations: 20,
  curl: 30,
  splatRadius: 0.25,
  splatForce: 6000,
  shading: true,
  colorful: true,
  colorUpdateSpeed: 10,
  bloom: true,
  bloomIterations: 8,
  bloomResolution: 256,
  bloomIntensity: 0.8,
  bloomThreshold: 0.6,
  bloomSoftKnee: 0.7,
  sunrays: true,
  sunraysResolution: 196,
  sunraysWeight: 1,
  brightness: 0.5,
  transparent: false,
};

export type FluidConfig = Partial<{
  [K in keyof typeof defaultFluidConfig]: (typeof defaultFluidConfig)[K];
}>;

export function cloneFluidConfig(config: FluidConfig): FluidConfig {
  return {
    ...config,
    colorPalette: config.colorPalette ? [...config.colorPalette] : undefined,
  };
}
