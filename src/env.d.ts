declare namespace Astro {
  interface Locals {
    lang?: string;
  }
}
interface ImportMetaEnv {
  SSR: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  glob: <T = unknown>(
    pattern: string,
    options?: { eager?: boolean; import?: string },
  ) => Record<string, T>;
}
