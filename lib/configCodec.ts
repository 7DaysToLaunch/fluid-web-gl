export function encodeConfig(config: unknown): string {
  const bytes = new TextEncoder().encode(JSON.stringify(config));
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decodeConfig(encoded: string): unknown {
  const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  const json = new TextDecoder().decode(bytes);
  return JSON.parse(json) as unknown;
}

export function buildShareUrl(
  pathname: string,
  config: unknown,
  origin = "",
): string {
  const base =
    origin || (typeof window !== "undefined" ? window.location.origin : "");
  return `${base}${pathname}?c=${encodeConfig(config)}`;
}
