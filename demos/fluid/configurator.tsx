"use client";

import { useState, type ReactNode } from "react";
import {
  cloneFluidConfig,
  defaultFluidConfig,
  type FluidConfig,
} from "@/demos/fluid/config";
import { fluidPresets } from "@/demos/fluid/presets";
import {
  randomBackgroundFromPalette,
  randomPalette,
} from "@/demos/fluid/randomPalette";
import styles from "./configurator.module.css";

type FluidConfiguratorProps = {
  config: FluidConfig;
  onChange: (config: FluidConfig) => void;
};

type SectionId = "presets" | "colors" | "interaction" | "simulation";

type ConfiguratorSectionProps = {
  id: SectionId;
  title: string;
  isOpen: boolean;
  onToggle: (id: SectionId) => void;
  action?: ReactNode;
  children: ReactNode;
};

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`${styles.accordionChevron} ${isOpen ? styles.accordionChevronOpen : ""}`}
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ConfiguratorSection({
  id,
  title,
  isOpen,
  onToggle,
  action,
  children,
}: ConfiguratorSectionProps) {
  return (
    <section className={styles.accordion}>
      <div className={styles.accordionHeader}>
        <button
          type="button"
          className={styles.accordionTrigger}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          id={`${id}-trigger`}
          onClick={() => onToggle(id)}
        >
          <span className={styles.accordionTitle}>{title}</span>
          <ChevronIcon isOpen={isOpen} />
        </button>
        {action ? (
          <div className={styles.accordionAction} onClick={(event) => event.stopPropagation()}>
            {action}
          </div>
        ) : null}
      </div>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        className={`${styles.accordionBody} ${isOpen ? styles.accordionBodyOpen : ""}`}
        hidden={!isOpen}
      >
        {children}
      </div>
    </section>
  );
}

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
  { key: "transparent", label: "Transparent background" },
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
  const [openSections, setOpenSections] = useState<Record<SectionId, boolean>>({
    presets: true,
    colors: true,
    interaction: true,
    simulation: true,
  });

  const toggleSection = (id: SectionId) => {
    setOpenSections((current) => ({ ...current, [id]: !current[id] }));
  };

  const reset = () => onChange(cloneFluidConfig(defaultFluidConfig));

  const shuffleColors = () => {
    const palette = randomPalette();
    onChange({
      ...config,
      colorPalette: palette,
      backgroundColor: randomBackgroundFromPalette(palette),
    });
  };

  return (
    <aside className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>Configurator</h2>
        <button type="button" className={styles.resetButton} onClick={reset}>
          Reset
        </button>
      </div>

      <div className={`${styles.accordionList} brandScroll`}>
        <ConfiguratorSection
          id="presets"
          title="Presets"
          isOpen={openSections.presets}
          onToggle={toggleSection}
        >
          <div className={`${styles.presetGrid} brandScroll`}>
            {fluidPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={styles.presetButton}
                onClick={() => onChange(cloneFluidConfig(preset.config))}
                title={`${preset.name} — ${preset.description}`}
              >
                <span className={styles.presetSwatches} aria-hidden="true">
                  {preset.swatches.map((color, index) => (
                    <span
                      key={`${preset.id}-${index}`}
                      className={styles.presetSwatch}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </span>
                <span className={styles.presetName}>{preset.name}</span>
              </button>
            ))}
          </div>
        </ConfiguratorSection>

        <ConfiguratorSection
          id="colors"
          title="Colors"
          isOpen={openSections.colors}
          onToggle={toggleSection}
          action={
            <button
              type="button"
              className={styles.inlineButton}
              onClick={shuffleColors}
            >
              Shuffle
            </button>
          }
        >
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
        </ConfiguratorSection>

        <ConfiguratorSection
          id="interaction"
          title="Interaction"
          isOpen={openSections.interaction}
          onToggle={toggleSection}
        >
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
        </ConfiguratorSection>

        <ConfiguratorSection
          id="simulation"
          title="Simulation"
          isOpen={openSections.simulation}
          onToggle={toggleSection}
        >
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
        </ConfiguratorSection>
      </div>
    </aside>
  );
}
