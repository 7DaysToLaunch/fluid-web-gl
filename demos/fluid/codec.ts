import { decodeConfig } from "@/lib/configCodec";
import {
  cloneFluidConfig,
  defaultFluidConfig,
  type FluidConfig,
} from "@/demos/fluid/config";

function isHexColor(value: unknown): value is string {
  return typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value);
}

export function normalizeFluidConfig(raw: unknown): FluidConfig | null {
  if (!raw || typeof raw !== "object") return null;

  const input = raw as Record<string, unknown>;
  const normalized: Record<string, unknown> = {
    ...cloneFluidConfig(defaultFluidConfig),
  };

  for (const key of Object.keys(defaultFluidConfig) as (keyof FluidConfig)[]) {
    const value = input[key as string];
    if (value === undefined) continue;

    const defaultValue = defaultFluidConfig[key];
    if (typeof defaultValue === "boolean" && typeof value === "boolean") {
      normalized[key as string] = value;
      continue;
    }

    if (typeof defaultValue === "number" && typeof value === "number") {
      if (!Number.isFinite(value)) continue;
      normalized[key as string] = value;
      continue;
    }

    if (typeof defaultValue === "string" && typeof value === "string") {
      if (key === "backgroundColor" && !isHexColor(value)) continue;
      normalized[key as string] = value;
    }
  }

  if (Array.isArray(input.colorPalette)) {
    const palette = input.colorPalette.filter(isHexColor);
    if (palette.length === 5) {
      normalized.colorPalette = palette;
    }
  }

  return normalized as FluidConfig;
}

export function decodeFluidConfig(encoded: string): FluidConfig | null {
  try {
    return normalizeFluidConfig(decodeConfig(encoded));
  } catch {
    return null;
  }
}
