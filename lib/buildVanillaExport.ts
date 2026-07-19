import type { FluidConfig } from "@/lib/fluidConfig";

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
