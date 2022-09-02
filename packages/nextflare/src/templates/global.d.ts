declare global {
  interface Env extends Record<string, unknown> {
    ASSETS: DurableObjectStub;
  }
}

export {};
