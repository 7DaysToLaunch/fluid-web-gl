function hslToHex(h: number, s: number, l: number): string {
  const saturation = s / 100;
  const lightness = l / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const huePrime = h / 60;
  const x = chroma * (1 - Math.abs((huePrime % 2) - 1));
  let r = 0;
  let g = 0;
  let b = 0;

  if (huePrime >= 0 && huePrime < 1) [r, g, b] = [chroma, x, 0];
  else if (huePrime < 2) [r, g, b] = [x, chroma, 0];
  else if (huePrime < 3) [r, g, b] = [0, chroma, x];
  else if (huePrime < 4) [r, g, b] = [0, x, chroma];
  else if (huePrime < 5) [r, g, b] = [x, 0, chroma];
  else [r, g, b] = [chroma, 0, x];

  const m = lightness - chroma / 2;
  const toHex = (channel: number) =>
    Math.round((channel + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function randomPalette(baseHue = Math.random() * 360): string[] {
  const hueShift = 18 + Math.random() * 28;
  const saturations = [42, 55, 72, 68, 78];
  const lightnesses = [12, 18, 52, 38, 62];

  return lightnesses.map((lightness, index) => {
    const hue = (baseHue + index * hueShift) % 360;
    return hslToHex(hue, saturations[index], lightness);
  });
}

export function randomBackgroundFromPalette(palette: string[]): string {
  const shadow = palette[0] ?? "#121212";
  return shadow.startsWith("#") ? shadow : "#121212";
}
