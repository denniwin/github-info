/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GIT_HUB_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
