import type { Component } from 'vue';
import * as ui from '../index';

/** Register public Vue components without treating exported helpers as components. */
export const storyComponents = Object.fromEntries(
    Object.entries(ui).filter(([name]) => /^[A-Z]/.test(name)),
) as Record<string, Component>;
