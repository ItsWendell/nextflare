declare global {
  interface Env extends Record<string, unknown> {
    ASSETS: KVNamespace;
  }
}

export {};
