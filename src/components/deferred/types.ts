import type { Component } from 'vue';

interface DeferredLoadContext {
    signal: AbortSignal;
    attempt: number;
}
type DeferredLoader = (context: DeferredLoadContext) => Promise<Component | { default: Component }>;

export type { DeferredLoadContext, DeferredLoader };
