"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { encodeConfig } from "@/lib/configCodec";

type ShareableConfigOptions<T> = {
  defaults: T;
  clone: (config: T) => T;
  decode: (encoded: string) => T | null;
};

export function useShareableConfig<T>({
  defaults,
  clone,
  decode,
}: ShareableConfigOptions<T>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<T>(() => {
    const encoded = searchParams.get("c");
    if (encoded) {
      const decoded = decode(encoded);
      if (decoded) return decoded;
    }
    return clone(defaults);
  });

  useEffect(() => {
    const encoded = encodeConfig(config);
    const nextUrl = `${pathname}?c=${encoded}`;
    window.history.replaceState(null, "", nextUrl);
  }, [config, pathname]);

  return [config, setConfig] as const;
}
