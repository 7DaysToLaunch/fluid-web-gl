"use client";

import {
  cloneFluidConfig,
  defaultFluidConfig,
} from "@/lib/defaultFluidConfig";
import type { FluidConfig } from "@/lib/fluidConfig";
import styles from "./FluidConfigurator.module.css";

type FluidConfiguratorProps = {
  config: FluidConfig;
  onChange: (config: FluidConfig) => void;
};

type SliderField = {
  key: keyof FluidConfig;
  label: string;
  min: number;
  max: number;
  step: number;
};

type ToggleField = {
  key: keyof FluidConfig;
  label: string;
};

const sliderFields: SliderField[] = [
  { key: "splatRadius", label: "Splat radius", min: 0.05, max: 1, step: 0.01 },
  { key: "splatForce", label: "Splat force", min: 1000, max: 10000, step: 100 },
  { key: "curl", label: "Curl", min: 0, max: 50, step: 1 },
  {
    key: "densityDissipation",
    label: "Density dissipation",
    min: 0,
    max: 4,
    step: 0.1,
  },
  {
    key: "velocityDissipation",
    label: "Velocity dissipation",
    min: 0,
    max: 1,
    step: 0.05,
  },
  { key: "pressure", label: "Pressure", min: 0, max: 1, step: 0.05 },
  {
    key: "bloomIntensity",
    label: "Bloom intensity",
    min: 0,
    max: 1,
    step: 0.05,
  },
  {
    key: "bloomThreshold",
    label: "Bloom threshold",
    min: 0.1,
    max: 1,
    step: 0.05,
  },
  { key: "sunraysWeight", label: "Sunrays weight", min: 0, max: 1, step: 0.05 },
  { key: "brightness", label: "Brightness", min: 0.1, max: 1, step: 0.05 },
  {
    key: "colorUpdateSpeed",
    label: "Color update speed",
    min: 1,
    max: 30,
    step: 1,
  },
];

const toggleFields: ToggleField[] = [
  { key: "hover", label: "Hover interaction" },
  { key: "colorful", label: "Colorful mode" },
  { key: "shading", label: "Shading" },
  { key: "bloom", label: "Bloom" },
  { key: "sunrays", label: "Sunrays" },
];

const paletteLabels = ["Shadow", "Deep", "Bright", "Mid", "Accent"];

function updateNumber(
  config: FluidConfig,
  key: keyof FluidConfig,
  value: number,
): FluidConfig {
  return { ...config, [key]: value };
}

function updateBoolean(
  config: FluidConfig,
  key: keyof FluidConfig,
  value: boolean,
): FluidConfig {
  return { ...config, [key]: value };
}

function updatePaletteColor(
  config: FluidConfig,
  index: number,
  value: string,
): FluidConfig {
  const palette = [...(config.colorPalette ?? defaultFluidConfig.colorPalette!)];
  palette[index] = value;
  return { ...config, colorPalette: palette };
}

export default function FluidConfigurator({
  config,
  onChange,
}: FluidConfiguratorProps) {
  const reset = () => onChange(cloneFluidConfig(defaultFluidConfig));

  return (
    <aside className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>Configurator</h2>
        <button type="button" className={styles.resetButton} onClick={reset}>
          Reset
        </button>
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Colors</h3>
        <label className={styles.field}>
          <span className={styles.label}>Background</span>
          <input
            type="color"
            className={styles.colorInput}
            value={config.backgroundColor ?? defaultFluidConfig.backgroundColor}
            onChange={(event) =>
              onChange({ ...config, backgroundColor: event.target.value })
            }
          />
        </label>
        <div className={styles.paletteGrid}>
          {(config.colorPalette ?? defaultFluidConfig.colorPalette!).map(
            (color: string, index: number) => (
              <label key={paletteLabels[index]} className={styles.paletteField}>
                <span className={styles.label}>{paletteLabels[index]}</span>
                <input
                  type="color"
                  className={styles.colorInput}
                  value={color}
                  onChange={(event) =>
                    onChange(updatePaletteColor(config, index, event.target.value))
                  }
                />
              </label>
            ),
          )}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Interaction</h3>
        <div className={styles.toggleGrid}>
          {toggleFields.map(({ key, label }) => (
            <label key={String(key)} className={styles.toggleField}>
              <input
                type="checkbox"
                checked={Boolean(config[key])}
                onChange={(event) =>
                  onChange(updateBoolean(config, key, event.target.checked))
                }
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Simulation</h3>
        <div className={styles.sliderList}>
          {sliderFields.map(({ key, label, min, max, step }) => {
            const value = Number(config[key] ?? defaultFluidConfig[key]);
            return (
              <label key={String(key)} className={styles.sliderField}>
                <div className={styles.sliderHeader}>
                  <span className={styles.label}>{label}</span>
                  <span className={styles.value}>{value.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={value}
                  onChange={(event) =>
                    onChange(
                      updateNumber(config, key, Number(event.target.value)),
                    )
                  }
                />
              </label>
            );
          })}
        </div>
      </section>
    </aside>
  );
}
